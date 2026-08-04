import joblib
import json

model = joblib.load('models/house_price.pkl')
print(f"Model type: {type(model)}")

try:
    print(f"Features: {model.feature_names_in_}")
except AttributeError:
    print("No feature_names_in_ found.")

# Try to look at the first tree if it's a random forest to get feature count
try:
    print(f"N features in: {model.n_features_in_}")
except AttributeError:
    print("No n_features_in_")
