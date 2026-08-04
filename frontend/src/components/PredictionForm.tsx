import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PredictionRequest } from '../types/prediction';
import { predictHousePrice } from '../api/predictionClient';
import encodingDict from '../data/encoding_dict.json';
import { Home, IndianRupee, MapPin, Building, Key, Compass, Sofa, Ruler, Hash, Bath, Square, CarFront } from 'lucide-react';

const locations = Object.keys(encodingDict.location_clean).sort();
const societies = Object.keys(encodingDict.Society_clean).sort();

export default function PredictionForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<PredictionRequest>({
    price_in_rupees: 0,
    area_sqft: 0,
    floor_num: 0,
    bathroom: 1,
    balcony: 0,
    car_parking: 0,
    location: locations[0] || 'other',
    society: 'other',
    total_floors: 1
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: e.target.type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (formData.area_sqft <= 0) {
      setError("Area must be greater than 0 square feet.");
      return;
    }

    setLoading(true);
    try {
      const result = await predictHousePrice(formData);
      navigate('/result', { state: { price: result.predicted_price, formData } });
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <Home size={32} className="header-icon" />
        <h2>Property Details</h2>
        <p>Enter the details below to estimate the property value.</p>
      </div>
      
      {error && <div className="error-banner">{error}</div>}

      <form onSubmit={handleSubmit} className="prediction-form">
        <div className="form-grid">

          <div className="input-group">
            <label><IndianRupee size={16}/> Base Price (in Rs.)</label>
            <input type="number" name="price_in_rupees" value={formData.price_in_rupees || ''} onChange={handleChange} required min="0" />
          </div>
          
          <div className="input-group">
            <label><Ruler size={16}/> Area (sqft)</label>
            <input type="number" name="area_sqft" value={formData.area_sqft || ''} onChange={handleChange} required min="1" />
          </div>

          <div className="input-group">
            <label><Hash size={16}/> Floor Number</label>
            <input type="number" name="floor_num" value={formData.floor_num} onChange={handleChange} required min="0" />
          </div>

          <div className="input-group">
            <label><Building size={16}/> Total Floors</label>
            <input type="number" name="total_floors" value={formData.total_floors} onChange={handleChange} required min="1" />
          </div>

          <div className="input-group">
            <label><Bath size={16}/> Bathrooms</label>
            <input type="number" name="bathroom" value={formData.bathroom} onChange={handleChange} required min="0" />
          </div>

          <div className="input-group">
            <label><Square size={16}/> Balconies</label>
            <input type="number" name="balcony" value={formData.balcony} onChange={handleChange} required min="0" />
          </div>

          <div className="input-group">
            <label><CarFront size={16}/> Car Parking</label>
            <input type="number" name="car_parking" value={formData.car_parking} onChange={handleChange} required min="0" />
          </div>

          <div className="input-group">
            <label><MapPin size={16}/> Location</label>
            <select name="location" value={formData.location} onChange={handleChange} required>
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>

          <div className="input-group">
            <label><Building size={16}/> Society</label>
            <select name="society" value={formData.society} onChange={handleChange} required>
              {societies.map(soc => <option key={soc} value={soc}>{soc}</option>)}
            </select>
          </div>

        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? <span className="spinner"></span> : "Predict Price"}
        </button>
      </form>
    </div>
  );
}
