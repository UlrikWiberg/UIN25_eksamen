import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CategoryPage() {
    const { slug } = useParams();
    const [result, setResult] = useState();

    const getData = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv&classificationName=${slug}`)
        .then((response) => response.json())
        .then((data) => setResult(data._embedded?.events))
        .catch((error) => console.error("Feil under fetch", error));
    };

    useEffect(() => {
        getData();
    }, [slug])
    return(
        <>
        <h1>{slug}</h1>
        <section className="flex-section">
            {result?.map((item) => (
                <CategoryCard item={item} key={item.id} />
            ))}
        </section>
        </>
    )
}