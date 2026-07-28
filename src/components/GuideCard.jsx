import '../styles/Guides.css';
import { Link } from 'react-router-dom';

function Guide({ id, title, activités, jour }) {
    return (
        <div className="guide-card">
            <h1>{title}</h1>
            <p>nombre d'activités: {activités.length} - Durée: {jour} jours</p>
            {/* Permet de naviguer vers la page du guide */}
            <Link to={`/guide/${id}`} className="guide-card-link">
                Voir le guide
            </Link>
        </div>
    );
}

export default Guide