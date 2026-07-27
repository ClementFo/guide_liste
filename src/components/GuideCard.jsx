import '../styles/Guides.css';

function Guide({ title, description, date, jour, activité }) {
    const formattedDate = new Date(date).toLocaleDateString("fr-FR");
    return (
        <div className="guide-card">
            <h1>{title}</h1>
            <p>Début le: {formattedDate} - Durée: {jour} jours</p>
        </div>
    );
}

export default Guide