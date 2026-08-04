from fastapi import APIRouter, HTTPException
from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.preprocessing import preprocess_request
from app.services.inference import inference_service

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok"}

@router.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    try:
        # Preprocess the incoming request
        df = preprocess_request(request)
        
        # Run inference
        predicted_price = inference_service.predict(df)
        
        return PredictionResponse(predicted_price=predicted_price)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
