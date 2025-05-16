import "../styles/EventCard.scss"

export default function EventCard({event}) {
    return(
        <article className="eventcard">
            <h3>{event.name}</h3>
            <img src={event.images?.[0]?.url} alt={event.name} />
            <p>{event._embedded.venues?.[0]?.name}</p>
            <p>{new Date(event.dates?.start?.dateTime).toLocaleString("no-NO")}</p>
            <button>Kjøp</button>
            <button>Legg til i ønskeliste</button>
        </article>
    )
}