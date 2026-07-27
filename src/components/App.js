
import '../styles/App.css';
import Guide from './Guide'

function App({ GuideList }) {
  return (
      <div>
          {GuideList.map((item, index) => (
              <Guide
                  key={index}
                  title={item.title}
                  description={item.description}
                  date={item.date}
                  activité={item.activité}
              />
          ))}
      </div>
  );
}

export default App;
