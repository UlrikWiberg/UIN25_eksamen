import { Link } from "react-router-dom";

export default function EventCard({event}) {
    return(
        <article className="eventcard">
            <h3>{event.name}</h3>
            <img src={event.images?.[0]?.url} alt={event.name} />
            <Link to={`event/${event.id}`}>Les mer her</Link>
        </article>
    )
}