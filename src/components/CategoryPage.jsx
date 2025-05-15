import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import SearchForm from "./SearchForm";
import EventCard from "./EventCard";
import "../styles/CategoryPage.scss"

export default function CategoryPage() {
  const { slug } = useParams();
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [categoryEvents, setCategoryEvents] = useState([]);

  const handleClick = async () => {
    try {
      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv&keyword=${search}`);
      const data = await response.json();
      setSearchResults(data._embedded?.attractions || []);
    } catch (error) {
      console.error("Skjedde feil ved fetch av søk", error);
    }
  };

  const getData = async () => {
    try {
      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv&classificationName=${slug}`);
      const data = await response.json();
      setResult(data._embedded?.attractions || []);
    } catch (error) {
      console.error("Feil under fetch av kategoriattractions", error);
    }
  };

  const getCategoryEvents = async () => {
    try {
      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv&classificationName=${slug}`);
      const data = await response.json();
      setCategoryEvents(data._embedded?.events || []);
    } catch (error) {
      console.error("Feil under fetch av kategorievents", error);
    }
  }

  useEffect(() => {
    getData();
    getCategoryEvents();
  }, [slug]);

  return (
    <>
      <SearchForm setSearch={setSearch} handleClick={handleClick} />
      {searchResults.length > 0 ? (
        <section className="searchresults">
          {searchResults
            .map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
        </section>
      ) : (
        <>
          <h1>{slug}</h1>
          <section className="attraksjoner">
            <h2>Attraksjoner</h2>
            {result.map((item) => (
              <CategoryCard item={item} key={item.id} />
            ))}
          </section>
          <section className="arrangementer">
            <h2>Arrangementer</h2>
            {categoryEvents.length > 0 ? (
              categoryEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))
            ) : (
              <p>ingen arrangementer funnet</p>
            )
          }
          </section>
          <section className="spillesteder">
            <h2>Spillesteder</h2>
            {categoryEvents.map((venue) => (
              <article key={venue.id}>
                <img src={venue._embedded.venues?.[0]?.images?.[0]?.url} alt={venue.name} />
                <h3>{venue._embedded.venues?.[0]?.name}</h3>
                <p>{venue._embedded.venues?.[0]?.country.name}</p>
                <p>{venue._embedded.venues?.[0]?.city.name}</p>
              </article>
            ))}
          </section>
        </>
      )}
    </>
  );
}
