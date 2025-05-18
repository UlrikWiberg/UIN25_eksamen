import "../styles/CategoryCard.scss"
import heartIcon from "../assets/heart-regular.svg"
import solidIcon from "../assets/heart-solid.svg"
import { useEffect, useState } from "react"

export default function CategoryCard({ item }){
    /*med categorycard kan jeg mappe ut ulike eventer og attractions på kategoriside
    med en state som sier om kortet er liked eller ikke, kan jeg toggle mellom et fylt hjerte og et tomt hjerte
    som viser om bruker har lagt til å ønskeliste */
    const [liked, setLiked] = useState(false);

    const storageKey = "likedItems";

    useEffect(() => {
        const savedLikes = JSON.parse(localStorage.getItem(storageKey)) || [];
        if (savedLikes.includes(item.id)) {
            setLiked(true);
        }
    }, [item.id])

    const handleHeartClick = () => {
        const savedLikes = JSON.parse(localStorage.getItem(storageKey)) || [];
    
        let updatedLikes;
    
        if (liked) {
          updatedLikes = savedLikes.filter((id) => id !== item.id);
          setLiked(false);
        } else {
          updatedLikes = [...savedLikes, item.id];
          setLiked(true);
        }
    
        localStorage.setItem(storageKey, JSON.stringify(updatedLikes));
      };

      const isEvent = item?._embedded?.venues;

    return(
        <article className="categorycard">
            <h3>{item.name}</h3>
            <img src={item.images?.[0]?.url} alt={item.name} />
            <img src={liked ? solidIcon : heartIcon} alt="liker ikon" className="heart" onClick={handleHeartClick}/>
            {isEvent && (
                <>
                <p>{new Date(item.dates?.start?.dateTime).toLocaleString("no-NO")}</p>
                <p>{new Date(item.dates?.start?.dateTime).toLocaleString("no-NO", {hour: "2-digit", minute: "2-digit",})}</p>
                <p>{item._embedded.venues?.[0]?.country.name}</p>
                <p>{item._embedded.venues?.[0]?.city.name}</p>
                <p>{item._embedded.venues?.[0]?.name}</p>
                </>
            )}
        </article>
    )
}