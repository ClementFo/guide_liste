import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GuideForm from '../components/GuideForm';

function NewGuidePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [jour, setJour] = useState('');
  const [mobilite, setMobilite] = useState('');
  const [saison, setSaison] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (!title.trim() || !description.trim() || !jour.trim()) {
      setError('Veuillez remplir le titre, la description et le nombre de jours.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/new_guide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          jour: Number(jour),
          mobilité: mobilite,
          saison,
          activité: [],
          userListe: [],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Échec de la création du guide');
      }

      setMessage('Guide créé avec succès.');
      navigate('/guides');
    } catch (err) {
      setError(err.message || 'Une erreur est survenue');
    }
  };

  const handleCancel = () => {
    navigate('/guides');
  };

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

export default NewGuidePage;