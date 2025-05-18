import "../styles/EventCard.scss"

export default function EventCard({event}) {
    /*Et kort som holder informasjon om et event, informasjonen blir mappet
    ut ifra et prop (event) som blir sent med fra sidene hvor eventkort mappes ut */
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