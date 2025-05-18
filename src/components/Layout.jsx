import { Link } from "react-router-dom";
import "../styles/Layout.scss";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const isLoggedIn = sessionStorage.getItem("login") === "true";
        setLoggedIn(isLoggedIn)
    }, [])
    return(
        <>
            <header>
                <Link to="/">BilletLyst</Link>
                    <nav>
                        <Link to="/category/music">Musikk</Link>
                        <Link to="/category/sports">Sport</Link>
                        <Link to="/category/theatre">Teater/Show</Link>
                    </nav>
                <Link to={loggedIn ? "/dashboard" : "login"}>{loggedIn ? "Min side" : "Logg inn"}</Link>
            </header>
            {children}
            <footer>
                <p>https://app.ticketmaster.com/discovery/v2/events.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv</p>
            </footer>
        </>
    )
}