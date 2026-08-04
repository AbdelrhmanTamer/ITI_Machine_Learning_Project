import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_predict_success():
    payload = {
        "price_in_rupees": 50000.0,
        "area_sqft": 1000.0,
        "floor_num": 2,
        "bathroom": 2,
        "balcony": 1,
        "car_parking": 1,
        "location": "thane",
        "society": "other",
        "total_floors": 10
    }
    with TestClient(app) as client:
        response = client.post("/predict", json=payload)
        assert response.status_code == 200
        assert "predicted_price" in response.json()

def test_predict_invalid_input():
    payload = {
        "area_sqft": -100.0, # invalid, gt 0 required
        "floor_num": 2,
    }
    with TestClient(app) as client:
        response = client.post("/predict", json=payload)
        assert response.status_code == 422
