import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

export default function CardUser(props) {
  const formatter = new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  return (
      <Stack spacing={2}>
        {
          props.user.length > 0 ? ( 
          props.user.map(user => (
            <Link key={user.id} to={`/user-details/${user.id}`}>
              <Card sx={{ minWidth: 400 }} className='card' key={user.id}>
                
                    <CardActionArea>
                      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', textTransform: 'capitalize'}}>
                        <Typography gutterBottom variant="h5" component="div">
                          {user.name} {user.surname}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                          {formatter.format(new Date(user.updated_at))}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
        
              </Card>
              </Link>
          ))) : <span>Non ci sono utenti</span>
        }
    </Stack>     
  );
}