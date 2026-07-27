function Guide({ title, description, date, jour, activité }) {
    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <p>{date}</p>
            <p>{jour}</p>
            <p>{activité}</p>
        </div>
    );
}

export default Guide