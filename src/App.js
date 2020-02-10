import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import moment from 'moment';
import uuid from 'uuid/v1';
import Calander from './Calander';


function App() {
  
  

  return (
    <div className="App">
      <h2>Personal Manager</h2>
      <Calander />
    </div>
  );
}

export default App;
