import { PredictionRequest, PredictionResponse } from '../types/prediction';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const predictHousePrice = async (data: PredictionRequest): Promise<PredictionResponse> => {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'An error occurred while fetching the prediction.');
  }

  return response.json();
};
