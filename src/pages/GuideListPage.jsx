import { useEffect, useState } from 'react';
import App from '../components/App';

function GuideListPage() {
  const [guideList, setGuideList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/guides');

        if (!response.ok) {
          throw new Error('Erreur lors du chargement des guides');
        }

        const data = await response.json();
        setGuideList(data.guides || []);
      } catch (error) {
        console.error(error);
        setGuideList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, []);

  if (loading) {
    return <p>Chargement des guides...</p>;
  }

  return <App GuideList={guideList} />;
}

export default GuideListPage;
