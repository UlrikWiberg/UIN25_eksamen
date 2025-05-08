import { Link } from "react-router-dom";
import "../styles/Layout.scss";

export default function Layout({ children }) {
    return(
        <>
            <header>
                <Link to="/">BilletLyst</Link>
                    <nav>
                        <Link to="/category/music">Musikk</Link>
                        <Link to="/category/sports">Sport</Link>
                        <Link to="/category/arts">Teater/Show</Link>
                    </nav>
                <Link to="/dashboard">Logg inn</Link>
            </header>
            {children}
            <footer>
                <p>ATTRIBUTION-LINK</p>
            </footer>
        </>
    )
}