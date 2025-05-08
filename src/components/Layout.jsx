import { Link } from "react-router-dom";
import "../styles/Layout.scss";

export default function Layout({ children }) {
    return(
        <>
            <header>
                <nav>
                    <Link to="/">Hjem</Link>
                    <Link to="/category/music">Musikk</Link>
                    <Link to="/category/sports">Sport</Link>
                    <Link to="/category/arts">Teater/Show</Link>
                    <Link to="Dashboard">Logg inn</Link>
                </nav>
            </header>
            {children}
            <footer>
                <p>ATTRIBUTION-LINK</p>
            </footer>
        </>
    )
}