import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import image from '../../assets/pictures/placeholder_man.jpg'
import { Button, Container, ListItem, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function UserDetail() {
    const { id } = useParams();
    const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://api-test.tabuiapp.it/api/second-test-crud/${id}`)
        .then(response => {
            setUserDetails(response.data);
        })
        .catch(error => {
            console.error('Errore nella richiesta API:', error);
        });
    }, []);


    if (! Object.keys(userDetails).length) return;

    const handleUpdate = () => {
        // const {id, name, surname, email } = userDetails;
        // const dataToSave = {id, name, surname, email }
        // axios.post(`https://api-test.tabuiapp.it/api/second-test-crud`, dataToSave)
        // .then(response => {
        //     setUserDetails(response.data);
        // })
        // .catch(error => {
        //     console.error('Errore nella richiesta API:', error);
        // });
    }

    const handleDelete = () => {
        navigate('/');
        // axios.delete(`https://api-test.tabuiapp.it/api/second-test-crud/${userDetails.id}`)
        // .then(response => {
        //     console.log(response);
        //     navigate('/');
        // })
        // .catch(error => {
        //     console.error('Errore nella richiesta API:', error);
        // });
    }
    

  return (
       
      
            
<Stack
  direction="column"
  spacing={4}
  sx={{
    justifyContent: "center",
    alignItems: "center",
  }}
>

    
              
                <img width={100} src={image} alt='prova'></img>
              
                <TextField
                    id="name"
                    required
                    defaultValue={userDetails.name}
                    variant="standard"
                    
                />
                <TextField
                    id="surname"
                    required
                    defaultValue={userDetails.surname}
                    variant="standard"
                />
                <TextField
                    id="email"
                    required
                    defaultValue={userDetails.email}
                    variant="standard"
                />
                 <TextField
                    id="created_at"
                    disabled
                    defaultValue={userDetails.created_at}
                    variant="standard"
                />
                <TextField
                    id="updated_at"
                    disabled
                    defaultValue={userDetails.updated_at}
                    variant="standard"
                />
                <Button variant="contained" onClick={() => navigate('/')}>Indietro</Button>
                <Button variant="contained" onClick={handleUpdate}>Aggiorna</Button>
                <Button variant="contained" color="error" onClick={handleDelete}>Elimina</Button>
         
      
</Stack>
           
   
    );
}
