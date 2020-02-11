import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Journal = () => {

  const [journalPage, setJournalPage] = useState('');
  const [journalPages, setJournalPages] = useState([]);

  useEffect(() => {
    axios.get('/journal')
      .then(response => setJournalPages(response.data))
  }, [])

  const saveJournal = () => {
    axios.post('/journal', { text: journalPage })
      .then(response => setJournalPages(response.data));
    setJournalPage('');
  }

  return (
    <div id="journal">
      <form onSubmit={ev => ev.preventDefault()}>
        <input type="text" value={journalPage} onChange={ev => setJournalPage(ev.target.value)} />
        <button onClick={() => saveJournal()}>Save</button>
      </form>
      <div id="display">
        {journalPages.map((page, idx) => {
          return (
            <div className="page" key={idx}>Page {idx + 1} {page.text}</div>
          )
        })}
      </div>
    </div>
  )
}

export default Journal;