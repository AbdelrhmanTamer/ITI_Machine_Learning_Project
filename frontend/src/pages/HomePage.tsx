import PredictionForm from '../components/PredictionForm';
import '../index.css';

export default function HomePage() {
  return (
    <div className="page-container">
      <div className="background-gradient"></div>
      <main className="main-content">
        <header className="page-header">
          <h1>House Price <span className="gradient-text">Predictor</span></h1>
          <p>Get an accurate estimate of property values powered by advanced machine learning.</p>
        </header>
        <PredictionForm />
      </main>
    </div>
  );
}
