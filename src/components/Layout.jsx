import { Link } from "react-router-dom";
import "../styles/Layout.scss";
import { useEffect, useState } from "react";

export default function Layout({ children }) {
    /*på denne siden har jeg en state som er satt til false
    denne staten sier om en bruker er logget inn eller ikke, og endrer hva som står
    på linken som fører til dashboard om loggedIn staten er satt til true(at bruker er logget inn)
    Layouten innholder header og footer som er lik på alle sidene, og hviser hvor alle andre
    elementer skal legge seg som er ved {children} */
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