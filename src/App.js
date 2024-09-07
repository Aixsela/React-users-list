import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardUser from './components/card/CardUser';

function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('https://api-test.tabuiapp.it/api/second-test-crud')
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.error('Errore nella richiesta API:', error);
        });
    }, []);
  
    if (! users.length) return;
  
    return (
      <div className="App">
        <header className="App-header">
          <h1>Utenti</h1>
          <CardUser user={users} />
        </header>
      </div>
    );
}

export default App;
