import '../styles/Guides.css';
import { Link } from 'react-router-dom';

function Guide({ title, description, mobilité, jour, activité }) {
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
            <Link to="/" className="guide-card-link">
                Retour à la liste
            </Link>
        </div>
    );
}

export default Guide