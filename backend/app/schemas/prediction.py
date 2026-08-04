from pydantic import BaseModel, Field

class PredictionRequest(BaseModel):
    price_in_rupees: float = Field(..., ge=0, description="Base Price/Rent in rupees")
    area_sqft: float = Field(..., gt=0, description="Area in square feet")
    floor_num: int = Field(..., ge=0, description="Floor number")
    bathroom: int = Field(..., ge=0, description="Number of bathrooms")
    balcony: int = Field(..., ge=0, description="Number of balconies")
    car_parking: float = Field(..., ge=0, description="Number of car parking spaces")
    location: str = Field(..., description="Location of the property")
    society: str = Field(..., description="Society name")
    total_floors: int = Field(..., ge=0, description="Total floors in the building")

class PredictionResponse(BaseModel):
    predicted_price: float
