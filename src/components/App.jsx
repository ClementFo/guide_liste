
import '../styles/App.css';
import '../styles/Guides.css';
import GuideCard from './GuideCard';

function App({ GuideList = [] }) {
  return (
    <div className="App">
        <h1>Liste des guides</h1>
        <div className="grid-cards">
        {GuideList.map((item, index) => (
            <GuideCard
            key={`${item.title}-${index}`}
            title={item.title}
            date={item.date}
            jour={item.jour}
            />
        ))}
        </div>
    </div>
  );
}

export default App;
