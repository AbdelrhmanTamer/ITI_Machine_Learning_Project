export interface PredictionRequest {
  price_in_rupees: number;
  area_sqft: number;
  floor_num: number;
  bathroom: number;
  balcony: number;
  car_parking: number;
  location: string;
  society: string;
  total_floors: number;
}

export interface PredictionResponse {
  predicted_price: number;
}
