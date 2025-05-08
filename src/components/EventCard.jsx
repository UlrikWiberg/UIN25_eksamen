import { Link } from "react-router-dom";
import "../styles/EventCard.scss"

export default function EventCard({event}) {
    return(
        <article className="eventcard">
            <h3>{event.name}</h3>
            <p>{event.id}</p>
            <img src={event.images?.[0]?.url} alt={event.name} />
            <Link to={`event/${event.id}`}>Les mer her</Link>
        </article>
    )
}