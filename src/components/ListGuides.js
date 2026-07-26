import Guide from './Guide'

function ListeGuides({ GuideList }) {
    return (
        <div>
            {GuideList.map((item, index) => (
                <Guide
                    key={index}
                    title={item.title}
                    description={item.description}
                    date={item.date}
                    activité={item.activité}
                />
            ))}
        </div>
    );
}

export default ListeGuides