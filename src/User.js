import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

const User = () => {
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userBirthday, setUserBirthday] = useState({});
  const [userAboutMe, setUserAboutMe] = useState('');

  useEffect(() => {
    axios.get('/user')
      .then(response => {
        setUser(response.data)
      })
  }, [])

  const createUser = () => {
    const user = {};
    user.name = userName;
    user.age = userAge;
    user.birthday = moment(userBirthday).format('MMM Do YYYY');
    user.aboutMe = userAboutMe;

    axios.post('/user', user)
      .then(response => setUser(response.data))
  }


  return (
    <div id="bio">
      <h2>About Me!</h2>
      <h2>{user.name}</h2>
      <p>Age {user.age}</p>
      <p>Birthday {user.birthday}</p>
      <div>About Me {user.aboutMe}</div>

      <form onSubmit={ev => createUser()}>
        <h4>Update User</h4>
        <input type="text" value={userName} onChange={ev => setUserName(ev.target.value)} />
        <input type="text" value={userAge} onChange={ev => setUserAge(ev.target.value)} />
        <input type="date" value={userBirthday} onChange={ev => setUserBirthday(ev.target.value)} />
        <input type="text" value={userAboutMe} onChange={ev => setUserAboutMe(ev.target.value)} />
        <button onClick={() => createUser()}>Submit New User</button>
      </form>
    </div>
  )
}

export default User;