import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Calander from './Calander';
import User from './User';


const Home = () => {
  return (
  <div id="home">
    <h2>Home!</h2>
    </div>
  )
}


const Journal = () => {

  const [journalPage, setJournalPage] = useState([]);
  const [journalPages, setJournalPages] = useState('');

  useEffect(() => {
    axios.get('/journal')
      .then(response => setJournalPages(response.data))
  })

  const saveJournal = () => {
    axios.post('/journal', [...journalPages, journalPage])
      .then(response => setJournalPages(response.data));
  }

  return (
    <div id="journal">
      <form onSubmit={ev => ev.preventDefault()}>
        <input type="text" value={journalPage} onChange={ev => setJournalPage(ev.target.value)} />
        <button onClick={saveJournal()}>Save</button>
      </form>
    </div>
  )
}


function App() {
  
  return (
    <div className="App">
      <nav>
        <h2>Personal Manager</h2>
        <Link to="/">Home</Link>
        <Link to="/Calander">Calander</Link>
        <Link to="/User">User</Link>
        <Link to="/journal">Journal</Link>
      </nav> 

      <Route exact path="/"><Home/></Route>
      <Route path="/Calander"><Calander /></Route>
      <Route path="/User"><User /></Route>
      <Route path="journal"><Journal /></Route>
    </div>
  );
}

export default App;
