import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EventPage(){
    const { id } = useParams();
    const [event, setEvent] = useState();

    const getEvent = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv`)
        .then((response) => response.json())
        .then((data) => setEvent(data))
        .catch((error) =>
        console.error("feil under eventfetch", error));
    };

    useEffect(() => {
        getEvent();
    }, [id]);
    return <h1>{event?.name}</h1>
}