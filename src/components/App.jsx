import '../styles/App.css';
import '../styles/Guides.css';
import GuideCard from './GuideCard';
import { Link } from 'react-router-dom';

function App({ GuideList = [] }) {
  return (
    <div className="App">
        <h1>Liste des guides</h1>
          <Link to={`/new-guide`} className="guide-card-link">
              Créer un nouveau guide
          </Link>
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
