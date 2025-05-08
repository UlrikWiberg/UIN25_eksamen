import { useEffect, useState } from "react";
import "../styles/Home.scss"
import { Link } from "react-router-dom";

export default function Home() {
    const [mainAttractions, setMainAttractions] = useState([]);
//"K8vZ917K7fV"
    const attractionIds = [
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
    };

    useEffect(() => {
        getMainAttractions();
    }, []);

    return (
        <main>
            {mainAttractions?.map((attraction) => (
                <article key={attraction.id} className="hovedattraksjoner">
                    <h3>{attraction.name}</h3>
                    <img src={attraction.images?.[0]?.url} alt={attraction.name} />
                    <p>{attraction.classifications?.[0]?.genre?.name}</p>
                    <Link to={`event/${attraction.id}`}>Les mer her</Link>
                </article>
            ))}
        </main>
    );
}
