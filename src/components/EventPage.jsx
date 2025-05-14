import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtistCard from "./ArtistCard";
import EventCard from "./EventCard"; 
import "../styles/EventPage.scss";

export default function EventPage() {
  const { id } = useParams(); 
  const [event, setEvent] = useState(null);
  const [artists, setArtists] = useState([]);
  const [tickets, setTickets] = useState([]);

const getEvent = async () => {
  try {
    const res = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv`
    );
    const data = await res.json();
    setEvent(data);

    const attractions = data._embedded?.attractions || [];
    setArtists(attractions);

  } catch (error) {
    console.error("Feil under eventfetch", error);
  }
};

const getTickets = async (artistId) => {
  try {
    const res = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv&locale=*&attractionId=${artistId}`
    );
    const data = await res.json();
    setTickets(data._embedded?.events || []);
  } catch (error) {
    console.error("Feil ved henting av billetter", error);
  }
};


  

  useEffect(() => {
    getEvent();
  }, [id]);

  useEffect(() => {
    if (event) {
      const attractionId = event._embedded?.attractions?.[0]?.id;
      if (attractionId) {
        getTickets(attractionId);
      }
    }
  }, [event]);
  
  return (
    <>
      {!event ? (
        <p>Laster event...</p>
      ) : (
        <>
          <h1>{event._embedded.attractions?.[0]?.name}</h1>
          <img
            src={event.images?.[0]?.url}
            alt={event.name}
            className="event-img"
          />
          <h2>Sjanger: {event.classifications?.[0]?.genre?.name || "Ukjent"}</h2>

          <h2>Følg oss på sosiale medier:</h2>

          <h2>Festivalpass</h2>
          {tickets.length > 0 ? (
            <section className="tickets">
                {tickets.map((ticket) => (
                    <article className="ticketcard" key={ticket.id}>
                        <img src={ticket.images?.[0]?.url} alt={ticket.name} />
                        <h3>{ticket.name}</h3>
                        <p>{new Date(ticket.dates?.start?.dateTime).toLocaleString("no-NO")}</p>
                    </article>
                ))}
            </section>
          ) : (
            <p>Ingen biletter funnet</p>
          )
        }

          {artists.length > 0 ? (
            <section className="artists">
                <h2>Artister:</h2>
              {artists.map((artist) => (
                <ArtistCard artist={artist} key={artist.id} />
              ))}
            </section>
          ) : (
            <p>Laster artister...</p>
          )}
        </>
      )}
    </>
  );
}





