import { Link } from "react-router-dom";

export default function CategoryCard({ item }){
    return(
        <article className="categorycard">
            <h3>{item.name}</h3>
            <Link to={`/event/${item.id}`}>Les mer {item.name}</Link>
        </article>
    )
}