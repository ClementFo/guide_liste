import '../styles/Guides.css';
import { Link, useNavigate } from 'react-router-dom';

function Guide({ id, title, description, mobilité, jour, activité }) {
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (!window.confirm('Voulez-vous vraiment supprimer ce guide ?')) {
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/delete_guide', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });

            if (!response.ok) {
                throw new Error('La suppression a échoué');
            }

            navigate('/guides');
        } catch (error) {
            console.error(error);
            alert('Impossible de supprimer le guide');
        }
    };

    return (
        <div className="guide">
            <h1>{title}</h1>
            <p>{description}</p>
            <p>Nombre de jours: {jour}</p>
            <div>
                <strong>Activités :</strong>
                {Array.isArray(activité) && activité.length > 0 ? (
                    <ul>
                        {activité.map((item) => (
                            <li key={item.id}>
                                {item.title} ({item.categorie})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Aucune activité définie</p>
                )}
            </div>
            <p>Mobilité: {mobilité}</p>
            {/* Permet de retourner à la liste des guides */}
            <Link to="/guides" className="guide-card-link">
                Retour à la liste
            </Link>
            <Link to={`/modify-guide/${id}`} className="guide-card-link">
                Modifier le guide
            </Link>
            <button type="button" className="guide-card-link" onClick={handleDelete}>
                Supprimer le guide
            </button>
        </div>
    );
}

export default Guide