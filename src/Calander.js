import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import moment from 'moment';
import uuid from 'uuid/v1';


const Calander = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [date, setDate] = useState('')
  const [events, setEvents] = useState([]);
  const [details, setDetails] = useState('');


  const createEvent = () => {
    const milliseconds = moment(date, 'YYYYMMDD').valueOf();
    const event = {};
    event.title = eventTitle;
    event.sortDate = milliseconds;
    event.date = moment(date).format('MMM Do YYYY');
    event.details = details;
    event.id = uuid();

    axios.post('/calander', event)
      .then(response => {
        setEvents(response.data);
      }
    )
  }

  // does this belong here?
  useEffect(() => {
    axios.get('/calander')
      .then(response => {
        setEvents(response.data)
      })
  }, [])


  return (
    <div id="calander-container">
      <h3>Calender</h3>
      <form onSubmit={ev => ev.preventDefault()}>
        <input type="text" value={eventTitle} onChange={ev => setEventTitle(ev.target.value)} />
        <input type="date" value={date} onChange={ev => setDate(ev.target.value)} />
        <input type="text" value={details} onChange={ev => setDetails(ev.target.value)} />
        <button onClick={() => createEvent()}>Create Event</button>
      </form>
      <div id="event-list">
        <ul>
          {events.map((event, idx) => {
            return (
              <li key={idx}>
                <p>{event.title}</p>
                <p>{event.date}</p>
                <p>{event.details}</p>
              </li>
            )
          })
          }
        </ul>
      </div>
    </div>
  )


}

export default Calander;