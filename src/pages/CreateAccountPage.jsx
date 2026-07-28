import { useState } from 'react';

function CreateAccountPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <main>
      <section>
        <h1>Création de compte</h1>
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

          <div>
            <label htmlFor="role">Rôle</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="User">User</option>
              <option value="Administrateur">Administrateur</option>
            </select>
          </div>

          <button type="submit">Créer un compte</button>
        </form>
      </section>
    </main>
  );
}

export default CreateAccountPage;