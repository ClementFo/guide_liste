
import '../styles/App.css';
import GuideCard from './GuideCard';

function App({ GuideList = [] }) {
  return (
    <div>
      {GuideList.map((item, index) => (
        <GuideCard
          key={`${item.title}-${index}`}
          title={item.title}
          date={item.date}
        />
      ))}
    </div>
  );
}

export default App;
