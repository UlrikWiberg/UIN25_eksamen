import { useEffect, useState } from "react";
import "../styles/Home.scss"
import { Link } from "react-router-dom";
import EventCard from "./EventCard";

export default function Home({ mainAttractions }) {
    const [city, setCity] = useState("Oslo");
    const [cityEvents, setCityEvents] = useState([]);

    const getCityEvents = async (cityName) => {
        try {
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv&locale=*&city=${cityName}&size=10`)
            const data = await response.json();
            setCityEvents(data._embedded?.events || []);
        } catch (error) {
            console.error("feil ved fetch av by eventer", error);
        }
    }

    useEffect(() => {
        if (city) {
            getCityEvents(city);
        }
    }, [city])

    useEffect(() => {
        console.log(mainAttractions)
    }, [mainAttractions])

    return (
        <main>
            <h1>Sommerens festivaler!</h1>
            {mainAttractions?.map((attraction) => (
                <article key={attraction.id} className="hovedattraksjoner">
                    <h3>{attraction.name}</h3>
                    <img src={attraction.images?.[0]?.url} alt={attraction.name} />
                    <p>{attraction.classifications?.[0]?.genre?.name}</p>
                    <Link to={`event/${attraction.id}`}>Les mer her</Link>
                </article>
            ))}
            <article className="bysortering">
                <h2>Hva skjer i verdens storbyer?</h2>
                <button onClick={() => setCity("Oslo")}>Oslo</button>
                <button onClick={() => setCity("Stockholm")}>Stockholm</button>
                <button onClick={() => setCity("Berlin")}>Berlin</button>
                <button onClick={() => setCity("London")}>London</button>
                <button onClick={() => setCity("Paris")}>Paris</button>
            </article>
            <article className="hjemmeside">
                <h2>i {city} kan du oppleve</h2>
                {cityEvents.length > 0 ? (
                    cityEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))
                ) : (
                    <p>Finner ingen eventer</p>
                )
            }
            </article> 
        </main>
    );
}
