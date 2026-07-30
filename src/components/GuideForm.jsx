import '../styles/App.css';
import '../styles/Guides.css'
import { useNavigate } from 'react-router-dom';


function GuideForm({ title,
  description,
  jour,
  mobilite,
  saison,
  setTitle,
  setDescription,
  setJour,
  setMobilite,
  setSaison,
  handleSubmit,
  error,
  message }) {
  
  const navigate = useNavigate();

  return (

    <main className="App">
      <section>
        <h1>Modifier le guide</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          <div>
            <label htmlFor="title">Titre du guide</label>
            <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre du guide"
            required
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description du guide"
            rows={4}
            required
            />
          </div>

          <div>
            <label htmlFor="jour">Nombre de jours</label>
            <input
            id="jour"
            type="number"
            min="1"
            value={jour}
            onChange={(e) => setJour(e.target.value)}
            placeholder="Nombre de jours"
            required
            />
          </div>

          <div>
            <label htmlFor="mobilite">Mobilité</label>
            <input
            id="mobilite"
            type="text"
            value={mobilite}
            onChange={(e) => setMobilite(e.target.value)}
            placeholder="à pied, vélo, voiture..."
            />
          </div>

          <div>
            <label htmlFor="saison">Saison</label>
            <input
            id="saison"
            type="text"
            value={saison}
            onChange={(e) => setSaison(e.target.value)}
            placeholder="Été, automne, hiver..."
            />
          </div>

          <div className="form-actions">
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={() => navigate('/guides')}>
            Annuler
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}


export default GuideForm;