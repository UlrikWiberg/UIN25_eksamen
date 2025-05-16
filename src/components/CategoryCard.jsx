import "../styles/CategoryCard.scss"
import heartIcon from "../assets/heart-regular.svg"

export default function CategoryCard({ item }){
    return(
        <article className="categorycard">
            <h3>{item.name}</h3>
            <img src={item.images?.[0]?.url || "/default.jpg"} alt={item.name} />
            <img src={heartIcon} alt="liker ikon" className="heart" />
        </article>
    )
}