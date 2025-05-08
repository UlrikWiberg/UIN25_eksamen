import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import EventPage from './components/EventPage';
import Dashboard from './components/Dashboard';

function App() {
  const [events, setEvents] = useState();

  const getEvents = async () => {
    fetch("https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv")
    .then((response) => response.json())
    .then((data) => setEvents(data._embedded?.events))
    .catch((error) => console.error("Skjedde noe feil ved fetch", error));
  };

  useEffect(() => {
    getEvents();
    console.log("State", events)
  }, [])

  return (
   <Layout>
    <Routes>
      <Route path="/" element={<Home events={events} />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/category/:slug" element={<CategoryPage setEvents={setEvents} events={events} />} />
      <Route path="/event/:id" element={<EventPage />} /> 
    </Routes>
   </Layout>
  )
}

export default App
