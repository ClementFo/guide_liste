import '../styles/App.css';
import '../styles/Guides.css';
import GuideCard from './GuideCard';

function App({ GuideList = [] }) {
  return (
    <div className="App">
        <h1>Liste des guides</h1>
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
