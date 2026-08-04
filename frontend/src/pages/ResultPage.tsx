import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, IndianRupee } from 'lucide-react';
import '../index.css';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { price, formData } = location.state || {};

  if (price === undefined) {
    return (
      <div className="page-container center-content">
        <div className="result-card">
          <h2>No prediction data found.</h2>
          <button onClick={() => navigate('/')} className="submit-btn outline-btn">Go Back</button>
        </div>
      </div>
    );
  }

  // Format nicely, e.g. ₹ 42.5 Lac
  const formatPrice = (value: number) => {
    if (value >= 10000000) {
      return `₹ ${(value / 10000000).toFixed(2)} Crore`;
    } else if (value >= 100000) {
      return `₹ ${(value / 100000).toFixed(2)} Lac`;
    } else {
      return `₹ ${value.toLocaleString('en-IN')}`;
    }
  };

  return (
    <div className="page-container center-content">
      <div className="background-gradient"></div>
      
      <div className="result-card glass-panel">
        <div className="result-header">
          <div className="icon-wrapper">
            <IndianRupee size={40} className="header-icon" />
          </div>
          <h3>Estimated Property Value</h3>
        </div>
        
        <div className="price-display">
          <span className="price-text gradient-text">{formatPrice(price)}</span>
        </div>

        <div className="property-summary">
          <h4>Property Summary</h4>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Location</span>
              <span className="summary-value">{formData.location}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Area</span>
              <span className="summary-value">{formData.area_sqft} sqft</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Society</span>
              <span className="summary-value">{formData.society}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Configuration</span>
              <span className="summary-value">{formData.bathroom} Bath, {formData.balcony} Balcony</span>
            </div>
          </div>
        </div>

        <button onClick={() => navigate('/')} className="submit-btn return-btn">
          <ArrowLeft size={18} /> New Prediction
        </button>
      </div>
    </div>
  );
}
