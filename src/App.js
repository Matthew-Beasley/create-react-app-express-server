import React from 'react';
import { Link, Route } from 'react-router-dom';
import './App.css';
import Calander from './Calander';
import User from './User';
import Journal from './Journal';


const Home = () => {
  return (
    <div id="home">
      <h2>Home!</h2>
      <p>I should do something interesting here, oh well</p>
    </div>
  )
}

function App() {
  
  return (
    <div className="App">
      <nav>
        <div id="nav-links">
          <Link to="/"><div className="nav-button">Home</div></Link>
          <Link to="/Calander"><div className="nav-button">Calander</div></Link>
          <Link to="/User"><div className="nav-button">User</div></Link>
          <Link to="/Journal"><div className="nav-button">Journal</div></Link>
        </div>
        <h2>Personal Manager</h2>
      </nav> 

      <Route exact path="/"><Home/></Route>
      <Route path="/Calander"><Calander /></Route>
      <Route path="/User"><User /></Route>
      <Route path="/Journal"><Journal /></Route>
    </div>
  );
}

export default App;
