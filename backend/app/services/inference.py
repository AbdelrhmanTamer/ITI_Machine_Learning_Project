import joblib
import os
import pandas as pd

class ModelInference:
    def __init__(self):
        self.model = None

    def load_model(self):
        model_path = os.path.join(os.path.dirname(__file__), '..', '..', 'models', 'house_price.pkl')
        if os.path.exists(model_path):
            # Suppress unpickling warnings for scikit-learn version differences
            import warnings
            with warnings.catch_warnings():
                warnings.simplefilter("ignore")
                self.model = joblib.load(model_path)
        else:
            print(f"Warning: Model file not found at {model_path}")

    def predict(self, df: pd.DataFrame) -> float:
        if self.model is None:
            raise ValueError("Model is not loaded.")
        
        # Predict
        prediction = self.model.predict(df)
        return float(prediction[0])

inference_service = ModelInference()
