package com.crusty.pricegarage.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.crusty.pricegarage.dto.CarRequest;

@Service
public class PredictionService {
    
    @Autowired
    private RestTemplate restTemplate;

    public Double predictPrice(CarRequest carRequest) {
        String modelUrl = "http://localhost:5000/predict"; // URL of the Python model API
        Map response = restTemplate.postForObject(modelUrl, carRequest, Map.class);
        return (Double) response.get("predicted_price");
    }
}
