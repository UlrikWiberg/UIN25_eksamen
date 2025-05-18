import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import SearchForm from "./SearchForm";
import EventCard from "./EventCard";
import "../styles/CategoryPage.scss"

export default function CategoryPage() {
  /*På kategorisiden fremstilles attractions, events og venues fra de ulike kategoriene musikk, sport og teater
  det er også mulig å søke etter eventer med searchform eller å filterer basert på data, land og by.
  Attractions og events blir mappet ut med hjelp av CategoryCard mens venues blir mappet ut rett i en artikkel */
  const { slug } = useParams();
  const [result, setResult] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [categoryEvents, setCategoryEvents] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [filterCity, setFilterCity] = useState("");

  const handleClick = async () => {
    try {
      const attractionRes = await fetch(
        `https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv&keyword=${search}&size=10`
      );
      const attractionData = await attractionRes.json();
      setResult(attractionData._embedded?.attractions || []);
  
      const eventRes = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv&keyword=${search}&size=10`
      );
      const eventData = await eventRes.json();
      setCategoryEvents(eventData._embedded?.events || []);
    } catch (error) {
      console.error("Feil under søk", error);
    }
  };
  
  const getData = async () => {
    try {
      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv&classificationName=${slug}&size=10`);
      const data = await response.json();
      setResult(data._embedded?.attractions || []);
    } catch (error) {
      console.error("Feil under fetch av kategoriattractions", error);
    }
  };

  const getCategoryEvents = async () => {
    try {
      const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv&classificationName=${slug}&size=10`);
      const data = await response.json();
      setCategoryEvents(data._embedded?.events || []);
    } catch (error) {
      console.error("Feil under fetch av kategorievents", error);
    }
  };

  const getFilteredData = async () => {
    try {
      const eventRes = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv&size=10` +
        `&city=${filterCity}` +
        `&countryCode=${filterCountry}` +
        (filterDate ? `&startDateTime=${filterDate}T00:00:00Z` : "")
      );
      const eventData = await eventRes.json();
      setCategoryEvents(eventData._embedded?.events || []);
  
      const attractionRes = await fetch(
        `https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv&size=10` +
        `&keyword=${filterCity || filterCountry}`
      );
      const attractionData = await attractionRes.json();
      setResult(attractionData._embedded?.attractions || []);
    } catch (error) {
      console.error("Feil under filtrering", error);
    }
  };
  
  useEffect(() => {
    getData();
    getCategoryEvents();
  }, [slug]);

  useEffect(() => {
    console.log(result);
    console.log(categoryEvents);
  }, [])

  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault()
        getFilteredData();}}>
            <label htmlFor="date">Dato:</label>
            <input type="date" id="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)}/>
            <label htmlFor="country">Land:</label>
            <select id="country" value={filterCountry} onChange={(e) => setFilterCountry(e.target.value)}>
              <option value="">Velg et land</option>
              <option value="NO">Norge</option>
              <option value="SE">Sverige</option>
              <option value="De">Tyskland</option>
              <option value="GB">England</option>
              <option value="FR">Frankrike</option>
            </select>
            <label htmlFor="city">By:</label>
            <select id="city" value={filterCity} onChange={(e) => setFilterCity(e.target.value)}>
              <option value="">Velg en by</option>
              <option value="Oslo">Oslo</option>
              <option value="Stockholm">Stockholm</option>
              <option value="Berlin">Berlin</option>
              <option value="London">London</option>
              <option value="Paris">Paris</option>
            </select>
            <button type="submit">Filtrer</button>
        </form>
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
              categoryEvents.map((item) => (
                <CategoryCard key={item.id} item={item} />
              ))
            ) : (
              <p>ingen arrangementer funnet</p>
            )
          }
          </section>
          <section className="spillesteder">
            <h2>Spillesteder</h2>
            {categoryEvents.map((venue) => (
              <article key={venue.id} className="venuekort">
                <img src={venue._embedded.venues?.[0]?.images?.[0]?.url || venue.images?.[1]?.url} alt={venue.name} />
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
