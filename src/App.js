import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import moment from 'moment';
import uuid from 'uuid/v1';


function App() {
  const [eventTitle, setEventTitle] = useState({});
  const [date, setDate] = useState('')
  const [events, setEvents] = useState([]);
  const [details, setDetails] = useState('');


  const createEvent = () => {
    const event = {};
    event.title = eventTitle;
    event.date = moment(date).format('MMM Do YYYY');
    event.details = details;
    event.id = uuid();
    setEvents(event);
    
    axios.post('/calander', event)
      .then(response => {
        console.log(response.data)
        //response.data.sort((a, b) => { return a.date.valueOf() - b.date.valueOf() });
        setEvents([...events,response.data]);
      }
    )
  }


  useEffect(() => {
    axios.get('/calander')
      .then(response => {
        console.log(response)
        setEvents([...events, response])
      })
  }, [])
  

  return (
    <div className="App">
      <h2>Personal Manager</h2>
      <div id="calander-container">
        <h3>Calender</h3>
        <form onSubmit={ev => ev.preventDefault()}>
          <input type="text" value={eventTitle} onChange={ev => setEventTitle(ev.target.value)} />
          <input type="date" value={date} onChange={ev => setImmediate(ev.target.value)} />
          <input type="text" value={details} onChange={ev => setDetails(ev.target.value)} />
          <button onClick={() => createEvent()}>Create Event</button>
        </form>
        <div id="event-list">
          {events.map((event, idx) => {
            return (
              <div key={idx}>{event.name}</div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
