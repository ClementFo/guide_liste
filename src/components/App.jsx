import '../styles/App.css';
import '../styles/Guides.css';
import GuideCard from './GuideCard';
import { Link } from 'react-router-dom';

function App({ GuideList = [] }) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const isAdmin = currentUser?.role === 'Administrateur';

  return (
    <div className="App">
        <h1>Liste des guides</h1>
        <p>Connecté en tant que : {currentUser?.email || 'Invité'}</p>
        <p>Rôle : {currentUser?.role || 'User'}</p>
        {isAdmin && (
          <>
            <Link to={`/users`} className="guide-card-link">
              Liste des utilisateurs
            </Link>
            <br />
            <Link to={`/new-guide`} className="guide-card-link">
              Créer un nouveau guide
            </Link>
          </>
        )}
        <div className="grid-cards">
        {GuideList.map((item) => (
            <GuideCard
            key={`${item.title}-${item.id}`} 
            id={item.id}
            title={item.title}
            activités={item.activité}
            jour={item.jour}
            />
        ))}
        </div>
    </div>
  );
}

export default App;
