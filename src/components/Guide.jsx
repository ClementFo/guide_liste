import '../styles/Guides.css';
import { Link } from 'react-router-dom';

function Guide({ title, description, mobilité, jour, activité }) {
    return (
        <div className="guide">
            <h1>{title}</h1>
            <p>{description}</p>
            <p>Nombre de jours: {jour}</p>
            <p>Activité: {activité}</p>
            <p>Mobilité: {mobilité}</p>
            {/* Permet de retourner à la liste des guides */}
            <Link to="/" className="guide-card-link">
                Retour à la liste
            </Link>
        </div>
    );
}

export default Guide