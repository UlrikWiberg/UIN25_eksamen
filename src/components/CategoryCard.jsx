import { Link } from "react-router-dom";
import "../styles/CategoryCard.scss"

export default function CategoryCard({ item }){
    return(
        <article className="categorycard">
            <h3>{item.name}</h3>
            <img src={item.images?.[0]?.url} alt={item.name} />
            <Link to={`/event/${item.id}`}>Les mer {item.name}</Link>
        </article>
    )
}