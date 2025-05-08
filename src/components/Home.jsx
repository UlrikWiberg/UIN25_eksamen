import { useEffect, useState } from "react";
import "../styles/Home.scss"

export default function Home() {
    const [mainAttractions, setMainAttractions] = useState([]);

    const attractionIds = [
        "K8vZ917K7fV", 
        "K8vZ917_YJf", 
        "K8vZ917bJC7",
        "K8vZ917oWOV" 
    ];

    const getMainAttractions = async () => {
        try {
            const promises = attractionIds.map(id =>
                fetch(`https://app.ticketmaster.com/discovery/v2/attractions/${id}.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv`)
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
                </article>
            ))}
        </main>
    );
}
