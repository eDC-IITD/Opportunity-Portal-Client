import React from 'react';
import { Card, CardContent, Container, Grid, Typography, Box } from '@mui/material';
import StartUpImage from '../assets/startUpImage.svg';
import StudentImage from '../assets/studentImage.svg';
import { useNavigate } from 'react-router-dom';

export default function StudentOrStartUp({ BASE_URL, setShowAlert, setAlertMessage, setAlertSeverity }) {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 2, mt: 9 }}>
      <Typography variant='h5' sx={{ mb: 2 }}>
        Welcome to the{' '}
        <Typography display='inline' variant='h5' color='primary'>
          Opportunity Portal
        </Typography>{' '}
        of eDC IITD
      </Typography>
      <Card>
        <CardContent>
          <Typography sx={{ mb: 2 }} variant='h5'>
            Select user type
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card
                variant='outlined'
                sx={{ 'height': '100%', 'cursor': 'pointer', '&:hover': { border: 1, borderColor: 'primary.main' } }}
                onClick={() => {
                  navigate('signUp', { state: { user: 'Startup' } });
                }}
              >
                <CardContent align='center'>
                  <Typography variant='h5'>Start Up</Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      my: 2,
                    }}
                  >
                    <img src={StartUpImage} alt='StartUp' loading='lazy' width={120} height={120} />
                  </Box>
                  <Typography>
                    Are you a founder or a HR looking for Interns, Employees or a Co-founder for your startup.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card
                variant='outlined'
                sx={{ 'height': '100%', 'cursor': 'pointer', '&:hover': { border: 1, borderColor: 'primary.main' } }}
                onClick={() => {
                  navigate('signUp', { state: { user: 'Student' } });
                }}
              >
                <CardContent align='center'>
                  <Typography variant='h5'>Student</Typography>
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      my: 2,
                    }}
                  >
                    <img src={StudentImage} alt='Student' loading='lazy' width={120} height={120} />
                  </Box>
                  <Typography>Are you a Student who wants to work in an early stage startup.</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
