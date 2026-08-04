import pandas as pd
import json
import os
from app.schemas.prediction import PredictionRequest

# Load the encoding dictionaries
MODEL_DIR = os.path.join(os.path.dirname(__file__), '..', '..', 'models')
ENCODING_FILE = os.path.join(MODEL_DIR, 'encoding_dict.json')

encoding_dict = {}
if os.path.exists(ENCODING_FILE):
    with open(ENCODING_FILE, 'r') as f:
        encoding_dict = json.load(f)

def get_encoded_value(dict_name: str, value: str) -> int:
    if dict_name in encoding_dict:
        mapping = encoding_dict[dict_name]
        # lowercase and handle spaces to be safe
        safe_val = str(value).lower().strip()
        if safe_val in mapping:
            return mapping[safe_val]
        # try exact match
        if value in mapping:
            return mapping[value]
        # fallback to 'other' if exists, else 0
        if 'other' in mapping:
            return mapping['other']
    return 0

def preprocess_request(request: PredictionRequest) -> pd.DataFrame:
    # Get encoded values
    loc_clean = get_encoded_value("location_clean", request.location)
    society_clean = get_encoded_value("Society_clean", request.society)
    
    # The model expects exactly these 9 features in this order:
    # ['Price (in rupees)' 'Bathroom' 'Balcony' 'Car Parking' 'area_sqft' 'floor_num' 'total_floors' 'location_clean' 'Society_clean']
    
    data = {
        'Price (in rupees)': [request.price_in_rupees],
        'Bathroom': [request.bathroom],
        'Balcony': [request.balcony],
        'Car Parking': [request.car_parking],
        'area_sqft': [request.area_sqft],
        'floor_num': [request.floor_num],
        'total_floors': [request.total_floors],
        'location_clean': [loc_clean],
        'Society_clean': [society_clean]
    }
    
    return pd.DataFrame(data)
