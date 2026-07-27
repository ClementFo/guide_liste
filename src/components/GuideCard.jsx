import '../styles/Guides.css';
import { Link } from 'react-router-dom';

function Guide({ id, title, date, jour }) {
    const formattedDate = new Date(date).toLocaleDateString("fr-FR");

    return (
        <div className="guide-card">
            <h1>{title}</h1>
            <p>Début le: {formattedDate} - Durée: {jour} jours</p>
            {/* Permet de naviguer vers la page du guide */}
            <Link to={`/guide/${id}`} className="guide-card-link">
                Voir le guide
            </Link>
        </div>
    );
}

export default Guide