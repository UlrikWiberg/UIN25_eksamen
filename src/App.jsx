import { useEffect, useState } from 'react'
import './App.css'
import Layout from './components/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CategoryPage from './components/CategoryPage';
import EventPage from './components/EventPage';
import Dashboard from './components/Dashboard';

function App() {
  const [mainAttractions, setMainAttractions] = useState([]);

  const getMainAttractions = async () => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=UlHJiRQNsyx9GOXAmsHGHRSHkLdjsLJv&locale=*&id=Z698xZb_Z16v7eGkFy&id=Z698xZb_Z17q339&id=Z698xZb_Z17qfao&id=Z698xZb_Z16vfkqIjU`)
    .then((response) => response.json())
    .then((data) => setMainAttractions(data._embedded?.events))
    .catch((error) => console.error("skjedde feil i fetch av hoved attrasksjoner", error))
};

  useEffect(() => {
    getMainAttractions();
}, []); 

  useEffect(() => {
    console.log("State", mainAttractions)
  }, [mainAttractions]);

  return (
   <Layout>
    <Routes>
      <Route path="/" element={<Home mainAttractions={mainAttractions} />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/event/:id" element={<EventPage />} /> 
    </Routes>
   </Layout>
  )
}

export default App
