import '../styles/App.css';
import { Link } from 'react-router-dom';

function Guide({ title, description, date, jour, activité }) {
    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <p>Date de début: {date}</p>
            <p>Nombre de jours: {jour}</p>
            <p>Activité: {activité}</p>
            {/* Permet de retourner à la liste des guides */}
            <Link to="/" className="guide-card-link">
                Retour à la liste
            </Link>
        </div>
    );
}

export default Guide