import '../styles/App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://127.0.0.1:8000';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      navigate('/guides');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.detail || 'email ou mot de passe incorrect');
        throw new Error(data.detail || 'Une erreur est survenue');
      }
      const currentUser = {
        email: data.user?.email || email,
        role: data.user?.role || 'User',
      };

      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      setMessage(data.message || 'Utilisateur connecté avec succès');
      navigate('/guides');

    } catch (err) {
      localStorage.removeItem('currentUser');
      setError(err.message || 'Une erreur est survenue');

    } finally {
      setIsSubmitting(false);

    }
  };

  return (
    <main className="App">
      <section>
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="adresse@email.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Se connecter</button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
