import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardUser from './components/card/CardUser';


export default function App() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/users')
        .then(response => {
            setUsers(response.data);
        })
        .catch(error => {
            console.error('Errore nella richiesta API:', error);
        });
    }, []);
  
    if (! users.length) return;
  
    return (
      <div className="app">
        <header className="app-header bg">
          <h1>Utenti</h1>
          <CardUser user={users} />
        </header>
      </div>
    );
}