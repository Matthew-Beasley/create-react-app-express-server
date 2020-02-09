import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [content, setContent] = useState('');
  useEffect(() => {
    axios.get('/')
    .then(response => setContent(response.data))
  },[])

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
