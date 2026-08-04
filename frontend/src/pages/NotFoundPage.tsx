import { Link } from 'react-router-dom';
import '../index.css';

export default function NotFoundPage() {
  return (
    <div className="page-container center-content">
      <div className="result-card glass-panel text-center">
        <h1 className="gradient-text text-4xl">404</h1>
        <h2 className="mt-4">Page Not Found</h2>
        <p className="mt-2 text-gray-400">The page you are looking for doesn't exist.</p>
        <Link to="/" className="submit-btn mt-6 inline-block">Return Home</Link>
      </div>
    </div>
  );
}
