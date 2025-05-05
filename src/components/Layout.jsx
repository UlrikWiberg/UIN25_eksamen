import { Link } from "react-router-dom";
import "../styles/Layout.scss";

export default function Layout({ children }) {
    return(
        <>
            <header>
                <nav>
                    <Link to="/">Hjem</Link>
                    <Link to="musikk">Musikk</Link>
                    <Link to="sport">Sport</Link>
                    <Link to="teater">Teater/Show</Link>
                    <Link to="Dashboard">Logg inn</Link>
                </nav>
            </header>
            {children}

        </>
    )
}