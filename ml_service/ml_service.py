from flask import Flask, request, jsonify
import torch
from torch import nn
import numpy as np
import pandas as pd
import category_encoders
import joblib
import math

app = Flask(__name__)

class CarPriceModel(nn.Module):
    def __init__(self, input_dim):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(input_dim, 256),
            nn.BatchNorm1d(256),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(256, 128),
            nn.BatchNorm1d(128),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, 1)
        )
    
    def forward(self, x):
        return self.network(x).squeeze()

INFLATION_MULTIPLIER = 1.35

model_1 = CarPriceModel(136)
model_1.load_state_dict(torch.load('price_garage_model_v3.pth', weights_only=True))
model_1.eval()

scaler = joblib.load('scaler_v3.pkl')

odometer_idx = list(scaler.feature_names_in_).index('odometer')
print(f"Odometer mean: {scaler.mean_[odometer_idx]}")
print(f"Odometer scale: {scaler.scale_[odometer_idx]}")
print(f"Manual calc: {(45000 - scaler.mean_[odometer_idx]) / scaler.scale_[odometer_idx]}")

encoder = joblib.load('target_encoder_v3.pkl')
feature_columns = joblib.load('feature_columns_v3.pkl')
feature_columns = [c for c in feature_columns if c != 'Unnamed: 0']

scale_cols = ['make', 'model', 'trim', 'state',
              'condition', 'odometer', 'age', 'miles_per_year']

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    df = pd.DataFrame([data])

    # Fill missing optional fields
    if 'trim' not in df.columns:
        df['trim'] = 'Base'
    if 'interior' not in df.columns:
        df['interior'] = 'black'

    # Rename mileage to match training data
    df = df.rename(columns={'mileage': 'odometer'})

    # Feature engineering
    df['age'] = 2024 - df['year']
    df['miles_per_year'] = df['odometer'] / (df['age'] + 1)
    df['is_luxury'] = df['make'].apply(
        lambda x: 1 if x in ['BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Porsche',
                              'Cadillac', 'Lincoln', 'Infiniti', 'Acura', 'Volvo'] else 0
    )

    # Target encode high cardinality columns
    df[['make', 'model', 'trim', 'state']] = encoder.transform(df[['make', 'model', 'trim', 'state']])

    # One hot encode low cardinality columns
    df = pd.get_dummies(df, columns=['body', 'transmission', 'color', 'interior'])

    # Drop year before reindex
    df = df.drop(columns=['year'], errors='ignore')

    # Reindex to match training columns
    df_reindexed = df.reindex(columns=feature_columns, fill_value=0).copy()

    # Convert to numpy and scale directly
    X = df_reindexed.to_numpy().astype(float)

    for col in scale_cols:
        if col in feature_columns:
            col_idx = list(feature_columns).index(col)
            scaler_idx = list(scaler.feature_names_in_).index(col)
            mean = float(scaler.mean_[scaler_idx])
            scale = float(scaler.scale_[scaler_idx])
            X[0, col_idx] = (X[0, col_idx] - mean) / scale

    print(f"Odometer after scaling: {X[0, list(feature_columns).index('odometer')]}")

    tensor = torch.as_tensor(X, dtype=torch.float32)

    with torch.inference_mode():
        prediction = model_1(tensor)

    print(f"Raw prediction: {prediction.item()}")

    prediction = np.expm1(prediction)

    if math.isinf(float(prediction)) or math.isnan(float(prediction)):
        prediction = 0.0

    adjusted_price = float(prediction) * INFLATION_MULTIPLIER

    return jsonify({'predicted_price': adjusted_price})

if __name__ == '__main__':
    app.run(port=5000, debug=True)