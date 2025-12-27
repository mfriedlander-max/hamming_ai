import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-accent-600 text-white">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold hover:opacity-90 transition-opacity">
            Prompt Evaluator
          </Link>
          <div className="flex gap-6">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              Home
            </Link>
            <Link to="/evaluate" className="hover:opacity-80 transition-opacity">
              Evaluate
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
