import { Button, Container, Typography, Card, CardHeader, CardActions } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Error404() {
  const navigate = useNavigate();

  return (
    <Container maxWidth='md' sx={{ py: 2 }}>
      <Card>
        <CardHeader
          title={
            <Typography variant='h4' color='error.light'>
              404 Not Found
            </Typography>
          }
          subheader={<Typography sx={{ mt: 2 }}>Page not found. Please check if the URL is correct. </Typography>}
        />
        <CardActions sx={{ ml: 1, mb: 1 }}>
          <Button
            variant='contained'
            onClick={() => {
              navigate('/');
            }}
          >
            <Typography>Go Home</Typography>
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}
