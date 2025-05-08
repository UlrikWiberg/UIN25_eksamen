import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtistCard from "./ArtistCard";
import "../styles/EventPage.scss"

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState();
  const [artists, setArtists] = useState([]);

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

  useEffect(() => {
    getEvent();
  }, [id]);

  return (
    <>
      {artists.length > 0 ? (
        <section className="artists">
          {artists.map((artist) => (
            <ArtistCard artist={artist} key={artist.id} />
          ))}
        </section>
      ) : (
        <p>Laster artister...</p>
      )}
    </>
  );
}

