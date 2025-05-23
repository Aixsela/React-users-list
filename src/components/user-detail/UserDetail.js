import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import image from '../../assets/pictures/user.png'
import { Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UpgradeIcon from '@mui/icons-material/Upgrade';


export default function UserDetail() {
    const { id } = useParams();
    const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate()
    const formatter = new Intl.DateTimeFormat('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })

      
    Notification.requestPermission()


    useEffect(() => {
        axios.get(`http://localhost:3000/users/${id}`)
        .then(response => {
            setUserDetails(response.data);
        })
        .catch(error => {
            console.error('Errore nella richiesta API:', error);
        });
    }, []);


    if (! Object.keys(userDetails).length) return;

    const handleUpdate = () => {
        const { id, name, surname, email } = userDetails;
        const dataToSave = { id, name, surname, email, updated_at : new Date() }

        axios.patch(`http://localhost:3000/users/${userDetails.id}`, dataToSave)
        .then(response => {
            setUserDetails(response.data);
            navigate('/');
            new Notification("Utente aggiornato con successo!")
        })
        .catch(error => {
            console.error('Errore nella richiesta API:', error);
        });
    }

    const handleDelete = () => {
        navigate('/');
        axios.delete(`http://localhost:3000/users/${userDetails.id}`)
        .then(response => {
            console.log(response);
            navigate('/');
        })
        .catch(error => {
            console.error('Errore nella richiesta API:', error);
        });
    }
    

  return (
    <div className='detail-user bg'>
        <Stack
            direction="column"
            spacing={4}
            className='glass-card'
            sx={{
                justifyContent: "center",
                alignItems: "center",
                minWidth:"50vw",
                padding:"20px",
                border:"2px, solid, rgb(34, 34, 119)",
            }}
        >
            <img width={100} src={image} alt='user'></img>

            <Stack 
                direction="row"
                spacing={4}
                sx={{
                justifyContent: "center",
                alignItems: "center",
                }}
            >

              <TextField
                    id="name"
                    label="Nome"
                    required
                    defaultValue={userDetails.name}
                    onChange={(e)=>userDetails.name = e.target.value}
                    variant="standard"
                    sx={{width:"15vw"}}
                />
                <TextField
                    id="surname"
                    label="Cognome"
                    required
                    defaultValue={userDetails.surname}
                    onChange={(e)=>userDetails.surname = e.target.value}
                    variant="standard"
                    sx={{width:"15vw"}}
                />
            </Stack>

            <Stack direction="row"
                spacing={4}
                sx={{
                justifyContent: "center",
                alignItems: "center"}}
            >
                <TextField
                    id="email"
                    label="Email"
                    required
                    defaultValue={userDetails.email}
                    onChange={(e)=>userDetails.email = e.target.value}
                    variant="standard"
                    sx={{width:"32vw"}}
                />
            </Stack>        

            <Stack 
                direction="row"
                spacing={4}
                sx={{
                justifyContent: "center",
                alignItems: "center"}}
            >
                <TextField
                    id="created_at"
                    label="Inserito il"
                    disabled
                    defaultValue={formatter.format(new Date(userDetails.created_at))}
                    variant="standard"
                    sx={{width:"15vw"}}
                />
    
                <TextField
                    id="updated_at"
                    label="Modificato il"
                    disabled
                    defaultValue={formatter.format(new Date(userDetails.updated_at))}
                    variant="standard"
                    sx={{width:"15vw"}}
                />
            </Stack>
                
            <Stack 
                direction="row"
                spacing={4}
                sx={{
                width:"100%",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop:"10px"}}
            >
                <IconButton aria-label="delete" onClick={() => navigate('/')}>
                    <ArrowBackIcon />
                </IconButton>
                <div>
                    <IconButton aria-label="delete" color="primary" onClick={handleUpdate}>
                        <UpgradeIcon fontSize="medium" />
                    </IconButton>
                    <IconButton aria-label="delete" color="error" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            </Stack>
        </Stack>
    </div>
    );
}
