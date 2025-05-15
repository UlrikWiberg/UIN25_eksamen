import { useEffect, useState } from "react";
import "../styles/Home.scss"
import { Link } from "react-router-dom";
import EventCard from "./EventCard";

export default function Home({ events }) {
    const [mainAttractions, setMainAttractions] = useState([]);
    const [city, setCity] = useState("Oslo");
    const [cityEvents, setCityEvents] = useState([]);

    const getMainAttractions = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv&locale=*&id=Z698xZb_Z16v7eGkFy&id=Z698xZb_Z17q339&id=Z698xZb_Z17qfao&id=Z698xZb_Z16vfkqIjU`)
        .then((response) => response.json())
        .then((data) => setMainAttractions(data._embedded?.events))
        .catch((error) => console.error("skjedde feil i fetch av main", error))
    };

    const getCityEvents = async (cityName) => {
        try {
            const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv&locale=*&city=${cityName}`)
            const data = await response.json();
            setCityEvents(data._embedded?.events || []);
        } catch (error) {
            console.error("feil ved fetch av by eventer", error);
        }
    }

//"K8vZ917K7fV"
 /*   const attractionIds = [
        "Z698xZb_Z16v7eGkFy", 
        "Z698xZb_Z17q339", 
        "Z698xZb_Z17qfao",
        "Z698xZb_Z16vfkqIjU" 
    ];

    const getMainAttractions = async () => {
        try {
            const promises = attractionIds.map(id =>
                fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv`)
                    .then(res => res.json())
            );
            const results = await Promise.all(promises);
            setMainAttractions(results);
        } catch (error) {
            console.error("Feil ved henting av attraksjoner:", error);
        }
    }; */

    useEffect(() => {
        getMainAttractions();
    }, []);

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
                <h2>Hva skjer i {city}?</h2>
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
