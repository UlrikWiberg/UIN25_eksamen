import { useState } from "react"
import SearchForm from "./SearchForm";

export default function Home({ setEvents, events }) {
    const [search, setSearch] = useState();

    const handleClick = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv&keyword=${search}`)
        .then((response) => response.json())
        .then((data) => setEvents(data._embedded?.events))
        .catch((error) => console.error("Skjedde feil ved fetch av søk", error));
    };
    return(
        <main>
            <SearchForm setSearch={setSearch} handleClick={handleClick} />
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
            </section>

        </main>
    )
}