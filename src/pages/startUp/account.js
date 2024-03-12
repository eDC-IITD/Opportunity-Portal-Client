import { Container, Typography, Card, CardContent, TextField, Grid, Button, CircularProgress, Box, MenuItem, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { useNavigate } from 'react-router-dom';

const sectorItems = ['SAAS', 'Fin-Tech', 'Ed-Tech', 'Health-Tech', 'E-Commerce', 'Logistics', 'Other'];
const isIITDstartup = ['Yes', 'No'];

export default function Account({ BASE_URL, startUpDetails, setStartUpDetails, setShowAlert, setAlertMessage, setAlertSeverity }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [linkedIn, setLinkedIn] = useState(startUpDetails.linkedIn);
  const [website, setWebsite] = useState(startUpDetails.website);
  const [tracxn, setTracxn] = useState(startUpDetails.tracxn);
  const [social, setSocial] = useState(startUpDetails.social);
  const [cruchbase, setCruchbase] = useState(startUpDetails.cruchbase);
  const [sector, setSector] = useState(startUpDetails.sector);
  const [isiitdStartup, setIsiitdStartup] = useState(startUpDetails.isIITDstartup);
  const [noOfEmployees, setNoOfEmployees] = useState(startUpDetails.noOfEmployees);
  const companyName = startUpDetails.companyName;
  const companyEmail = startUpDetails.email;
  const [companyVision, setCompanyVision] = useState(startUpDetails.companyVision);
  const [founder, setFounder] = useState(startUpDetails.founder);
  const [hrName, setHrName] = useState(startUpDetails.hrName);
  const [hrEmail, setHrEmail] = useState(startUpDetails.hrEmail);
  const [hrDesignation, setHrDesignation] = useState(startUpDetails.hrDesignation);
  const updateOrSave = startUpDetails.location === '' || startUpDetails.location === undefined ? 'Save' : 'Update';

  const updateAccountDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      linkedIn: linkedIn,
      website: website,
      tracxn: tracxn,
      sector: sector,
      noOfEmployees: noOfEmployees,
      companyVision: companyVision,
      founder: founder,
      hrName: hrName,
      hrEmail: hrEmail,
      hrDesignation: hrDesignation,
      social: social,
      cruchbase: cruchbase,
      iitdStartup: (isiitdStartup === "Yes")? true : false,
    };
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.localStorageStartUpToken,
      },
      body: JSON.stringify(formData),
    };
    const url = `${BASE_URL}/api/startUp/register/${startUpDetails.id}`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setStartUpDetails(data.startUpDetails);
            setLoading(false);
            setAlertMessage(`Account details ${updateOrSave + 'd'} successfully.`);
            setAlertSeverity('success');
            setShowAlert(true);
            navigate('../internship', { state: { type: 'Internship' } });
          } else {
            console.log(data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const addFounder = () => {
    setFounder((current) => [...current, { id: current.length + 1, name: '', bio: '' }]);
  };

  const removeFounder = () => {
    setFounder(founder.slice(0, -1));
  };

  const updateFounderName = (value, id) => {
    const newState = founder.map((obj) => {
      return obj.id === id ? { ...obj, name: value } : obj;
    });
    setFounder(newState);
  };

  const updateFounderBio = (value, id) => {
    const newState = founder.map((obj) => {
      return obj.id === id ? { ...obj, bio: value } : obj;
    });
    setFounder(newState);
  };
  const updateFounderLinkedIn = (value, id) => {
    const newState = founder.map((obj) => {
      return obj.id === id ? { ...obj, linkedIn: value } : obj;
    });
    setFounder(newState);
  };
  useEffect(() => {
    if (founder.length === 0) addFounder();
  }, []);
  return (
    <Container sx={{ py: 2, mt: 9 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Account Details
      </Typography>
      <form onSubmit={updateAccountDetails}>
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Company Overview
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="Company Name"
                  placeholder="XYZ"
                  fullWidth
                  value={companyName}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="Email"
                  placeholder="xyz@gmail.com"
                  fullWidth
                  value={companyEmail}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="LinkedIn"
                  placeholder="https://www.linkedin.com/in/xyz/"
                  fullWidth
                  value={linkedIn}
                  onChange={(e) => {
                    setLinkedIn(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="Website"
                  placeholder="https://www.startup.com/in"
                  fullWidth
                  value={website}
                  onChange={(e) => {
                    setWebsite(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="Tracxn"
                  placeholder="https://tracxn.com/"
                  fullWidth
                  value={tracxn}
                  onChange={(e) => {
                    setTracxn(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="Social"
                  placeholder=""
                  fullWidth
                  value={social}
                  onChange={(e) => {
                    setSocial(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="Cruchbase"
                  placeholder="https://www.crunchbase.com/"
                  fullWidth
                  value={cruchbase}
                  onChange={(e) => {
                    setCruchbase(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  required
                  select
                  label="Sector"
                  value={sector}
                  onChange={(e) => {
                    setSector(e.target.value);
                  }}
                >
                  {sectorItems.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  fullWidth
                  required
                  select
                  label="Are you an IITD Startup?"
                  value={isiitdStartup}
                  onChange={(e) => {
                    setIsiitdStartup(e.target.value);
                  }}
                >
                  {isIITDstartup.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="No Of Employees"
                  placeholder="10"
                  fullWidth
                  value={noOfEmployees}
                  onChange={(e) => {
                    setNoOfEmployees(e.target.value);
                  }}
                  required
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  label="Company Vision"
                  multiline
                  minRows={2}
                  fullWidth
                  value={companyVision}
                  placeholder="Explain company vision and what it aim to solve."
                  onChange={(e) => {
                    setCompanyVision(e.target.value);
                  }}
                  required
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ my: 2 }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h5">Founder</Typography>
              <Box sx={{ gap: 2 }}>
                <IconButton size="small" onClick={addFounder} color="success">
                  <AddIcon />
                </IconButton>
                <IconButton size="small" onClick={removeFounder} color="error" disabled={founder.length === 1}>
                  <RemoveRoundedIcon />
                </IconButton>
              </Box>
            </Box>
            {founder.map((value, key) => {
              return (
                <Card variant="outlined" sx={{ mt: 2 }}>
                  <CardContent
                    sx={{
                      display: { xs: 'block', md: 'flex' },
                      gap: 2,
                      alignItems: 'end',
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          variant="standard"
                          label="Founder Name"
                          placeholder="Steve Jobs"
                          sx={{ mb: { xs: 2, md: 0 } }}
                          fullWidth
                          value={value.name}
                          onChange={(e) => {
                            updateFounderName(e.target.value, value.id);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          variant="standard"
                          label="Founder LinkedIn"
                          placeholder="linkedin.com/in/steve-jobs/"
                          fullWidth
                          multiline
                          value={value.linkedIn}
                          onChange={(e) => {
                            updateFounderLinkedIn(e.target.value, value.id);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          variant="standard"
                          label="Founder Bio"
                          placeholder="Explain founder's professional and educational background."
                          fullWidth
                          multiline
                          value={value.bio}
                          onChange={(e) => {
                            updateFounderBio(e.target.value, value.id);
                          }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
        <Card sx={{ my: 2 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              HR/POC Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="Name"
                  placeholder=""
                  fullWidth
                  value={hrName}
                  onChange={(e) => {
                    setHrName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="Personal Email"
                  placeholder=""
                  fullWidth
                  value={hrEmail}
                  onChange={(e) => {
                    setHrEmail(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="Designation"
                  placeholder=""
                  fullWidth
                  value={hrDesignation}
                  onChange={(e) => {
                    setHrDesignation(e.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              {updateOrSave} Account
            </Typography>
            <Button type="submit" variant="contained" sx={{ width: 120, height: 40 }}>
              {loading ? <CircularProgress sx={{ color: 'white' }} size={25} /> : <Typography>{updateOrSave}</Typography>}
            </Button>
          </CardContent>
        </Card>
      </form>
    </Container>
  );
}
