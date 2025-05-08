import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import SearchForm from "./SearchForm";
import EventCard from "./EventCard";
import "../styles/CategoryPage.scss"

export default function CategoryPage({ setEvents, events }) {
    const { slug } = useParams();
    const [result, setResult] = useState();
    const [search, setSearch] = useState();

    const handleClick = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv&keyword=${search}`)
        .then((response) => response.json())
        .then((data) => setEvents(data._embedded?.attractions))
        .catch((error) => console.error("Skjedde feil ved fetch av søk", error));
    };

    const getData = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv&classificationName=${slug}`)
        .then((response) => response.json())
        .then((data) => setResult(data._embedded?.events))
        .catch((error) => console.error("Feil under fetch av kategori", error));
    };

    useEffect(() => {
        getData();
    }, [slug])
    return(
        <>
        <SearchForm setSearch={setSearch} handleClick={handleClick} />
        {events?.length > 0 ? (
            <section className="searchresults">
                {events
                .filter((event) => 
                ["findings", "neon", "skeikampen", "tons of rock"].some((keyword) => 
                event.name?.toLowerCase().includes(keyword)
                    )
                )
                .map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </section>
        ) : (
            <>
            <h1>{slug}</h1>
            <section className="flex-section">
                {result?.map((item) => (
                    <CategoryCard item={item} key={item.id} />
                ))}
            </section>
            </>
        )}

       {/* <h1>{slug}</h1>
        <section className="flex-section">
            {result?.map((item) => (
                <CategoryCard item={item} key={item.id} />
            ))}
        </section>
        <section>
                {events?.length > 0 ? (
                    events
                    .filter((event) =>
                      ["findings", "neon", "skeikampen", "tons of rock"].some(keyword =>
                        event.name?.toLowerCase().includes(keyword)
                      )
                    )
                    .map((event) => <EventCard key={event.id} event={event} />)                  
                ) : (
                <p>Finner ikke noe på søket ditt</p>
                )}
            </section> */}
        </>
    )
}