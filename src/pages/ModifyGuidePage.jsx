import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GuideForm from '../components/GuideForm';

function ModifyGuide() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [jour, setJour] = useState('');
  const [mobilite, setMobilite] = useState('');
  const [saison, setSaison] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/guides/${id}`);
        if (!response.ok) {
          throw new Error('Guide introuvable');
        }
        const data = await response.json();
        const guide = data.guide || data;

        setTitle(guide.title || '');
        setDescription(guide.description || '');
        setJour(String(guide.jour || ''));
        setMobilite(guide.mobilité || '');
        setSaison(guide.saison || '');
      } catch (err) {
        setError(err.message || 'Impossible de charger le guide');
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!title.trim() || !description.trim() || !jour.trim()) {
      setError('Veuillez remplir le titre, la description et le nombre de jours.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/edit_guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: Number(id),
          title,
          description,
          jour: Number(jour),
          mobilité: mobilite,
          saison,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Échec de la modification du guide');
      }

      setMessage('Guide modifié avec succès.');
      navigate('/guides');
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    }
  };

  const handleCancel = () => {
    navigate('/guides');
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <GuideForm
      title={title}
      description={description}
      jour={jour}
      mobilite={mobilite}
      saison={saison}
      setTitle={setTitle}
      setDescription={setDescription}
      setJour={setJour}
      setMobilite={setMobilite}
      setSaison={setSaison}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      error={error}
      message={message}
    />
  );
}

export default ModifyGuide;
