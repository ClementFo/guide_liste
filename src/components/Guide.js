function Guide({ title, description, date, activité }) {
    return (
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
            <p>{date}</p>
            <p>{activité}</p>
        </div>
    );
}

export default Guide