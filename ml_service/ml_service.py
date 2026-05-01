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

model_1 = CarPriceModel(138)
model_1.load_state_dict(torch.load('price_garage_model.pth', weights_only=True))
model_1.eval()

scaler = joblib.load('scaler.pkl')
encoder = joblib.load('target_encoder.pkl')
feature_columns = joblib.load('feature_columns.pkl')
feature_columns = [c for c in feature_columns if c != 'Unnamed: 0']


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    df = pd.DataFrame([data])
    if 'trim' not in df.columns:
        df['trim'] = 'Base'
    if 'interior' not in df.columns:
        df['interior'] = 'black'
    df = df.rename(columns={'mileage': 'odometer'})        
    df['age'] = 2024 - df['year']
    df['miles_per_year'] = df['odometer'] / (df['age'] + 1)
    df['is_luxury'] = df['make'].apply(
        lambda x: 1 if x in ['BMW', 'Mercedes-Benz', 'Audi', 'Lexus', 'Porsche',
                            'Cadillac', 'Lincoln', 'Infiniti', 'Acura', 'Volvo'] else 0
                 )

    df[['make', 'model', 'trim', 'state']] = encoder.transform(df[['make', 'model', 'trim', 'state']])
    df = pd.get_dummies(df, columns=['body', 'transmission', 'color', 'interior'])
    df['mmr'] = 0.0  # approximate mean mmr from training data
    df['mmr_ratio'] = 0.0  # neutral placeholder

    df = df.reindex(columns=feature_columns, fill_value=0)
    # TODO: remove mmr and mmr_ratio from feature set and retrain model without them
    # For now filling with mean values from training data as placeholder


    scale_cols = ['make', 'model', 'trim', 'state',
                'condition', 'odometer', 'age', 'miles_per_year', 'mmr', 'mmr_ratio']

    df[scale_cols] = scaler.transform(df[scale_cols])

    
    df = df.drop(columns=['year'], errors='ignore')

    print(f"Shape: {df.shape}")
    print(f"Columns: {df.columns.tolist()}")

    tensor = torch.as_tensor(df.astype(float).values, dtype=torch.float32)

    with torch.inference_mode():
        prediction = model_1(tensor)

    prediction = np.expm1(prediction)
        
    prediction = np.expm1(prediction)

    if math.isinf(prediction) or math.isnan(prediction):
        prediction = 0.0

    return jsonify({'predicted_price': float(prediction)})

if __name__ == '__main__':
    app.run(port=5000, debug=True)
    
