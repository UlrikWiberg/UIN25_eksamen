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
      console.error("Feil under fetch av kategori", error);
    }
  };

  useEffect(() => {
    getData();
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
          <section className="flex-section">
            {result.map((item) => (
              <CategoryCard item={item} key={item.id} />
            ))}
          </section>
        </>
      )}
    </>
  );
}
