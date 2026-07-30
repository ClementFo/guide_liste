import '../styles/Guides.css';
import { Link, useNavigate } from 'react-router-dom';

function Guide({ id, title, activités, jour }) {
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
        <div className="guide-card">
            <h1>{title}</h1>
            <p>nombre d'activités: {activités.length} - Durée: {jour} jours</p>
            {/* Permet de naviguer vers la page du guide */}
            
            <button type="button" className="guide-card-link">
                <Link to={`/guide/${id}`} className="guide-card-link">
                    Voir le guide
                </Link>
            </button>
            
            <button type="button" className="guide-card-link">
                <Link to={`/modify-guide/${id}`} className="guide-card-link">
                    Modifier le guide
                </Link>
            </button>
            <button type="button" className="guide-card-link" onClick={handleDelete}>
                Supprimer le guide
            </button>
        </div>
    );
}

export default Guide