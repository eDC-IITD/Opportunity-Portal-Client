import { Card, CardContent, Container, Grid, Typography, TextField, Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { openLink } from '../utils.js';

export default function Details({ BASE_URL, startUpDetails }) {
  const { jobId } = useLocation().state;
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [jobDetails, setJobDetails] = useState([]);
  const [jobStartUpDetails, setJobStartUpDetails] = useState(startUpDetails);
  const [isadmin, setisadmin] = useState(false);
  const checkadmin = async () => {
    const adminCode = localStorage.getItem('adminCode');
    if (adminCode) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: adminCode }),
      };
      const url = `${process.env.REACT_APP_ADMIN_URL}/auth`;
      try {
        await fetch(url, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            if (data.message === 'approved') {
              setisadmin(true);
            } else {
              console.log(data);
            }
          });
      } catch (error) {
        console.log('error');
      }
    }
  };
  const getStartUpDetails = async (startUpId) => {
    setLoading2(true);
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const url = `${BASE_URL}/api/startUp/register/${startUpId}`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setJobStartUpDetails(data.startUpDetails);
            setLoading2(false);
          } else {
            console.log(data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getJobDetails = async (e) => {
    setLoading(true);
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const url = `${BASE_URL}/api/student/jobs/${jobId}`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            if (jobStartUpDetails === null) {
              getStartUpDetails(data.jobDetails.startUpId);
            }
            setJobDetails(data.jobDetails);
            setLoading(false);
          } else {
            console.log(data);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobDetails();
    checkadmin();
  }, []);

  return (
    <Container sx={{ py: 2, mt: 9 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Details
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Company Overview
          </Typography>
          {loading || loading2 ? (
            <Box
              sx={{
                height: 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="Company Name"
                  fullWidth
                  value={jobStartUpDetails.companyName}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
              {!isadmin && (
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="standard"
                    label="Email"
                    fullWidth
                    value={jobStartUpDetails.email}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                  />
                </Grid>
              )}
              {isadmin && jobStartUpDetails.linkedIn !== '' && jobStartUpDetails.linkedIn !== undefined ? (
                <Grid item xs={12} md={6}>
                  <div
                    onClick={() => {
                      openLink(jobStartUpDetails.linkedIn);
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecorationColor: '#1976d2',
                      textUnderlineOffset: 2,
                    }}
                  >
                    <TextField
                      color="primary"
                      variant="standard"
                      label="LinkedIn"
                      fullWidth
                      value={jobStartUpDetails.linkedIn}
                      InputProps={{ disableUnderline: true, readOnly: true }}
                      sx={{ input: { cursor: 'pointer', color: '#1976d2' } }}
                    />
                  </div>
                </Grid>
              ) : (
                <></>
              )}
              {isadmin && jobStartUpDetails.website !== '' && jobStartUpDetails.website !== undefined ? (
                <Grid item xs={12} md={6}>
                  <div
                    onClick={() => {
                      openLink(jobStartUpDetails.website);
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecorationColor: '#1976d2',
                      textUnderlineOffset: 2,
                    }}
                  >
                    <TextField
                      color="primary"
                      variant="standard"
                      label="Website"
                      fullWidth
                      value={jobStartUpDetails.website}
                      InputProps={{ disableUnderline: true, readOnly: true }}
                      sx={{ input: { cursor: 'pointer', color: '#1976d2' } }}
                    />
                  </div>
                </Grid>
              ) : (
                <></>
              )}
              {isadmin && jobStartUpDetails.tracxn !== '' && jobStartUpDetails.tracxn !== undefined ? (
                <Grid item xs={12} md={6}>
                  <div
                    onClick={() => {
                      openLink(jobStartUpDetails.tracxn);
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecorationColor: '#1976d2',
                      textUnderlineOffset: 2,
                    }}
                  >
                    <TextField
                      color="primary"
                      variant="standard"
                      label="Tracxn"
                      fullWidth
                      value={jobStartUpDetails.tracxn}
                      InputProps={{ disableUnderline: true, readOnly: true }}
                      sx={{ input: { cursor: 'pointer', color: '#1976d2' } }}
                    />
                  </div>
                </Grid>
              ) : (
                <></>
              )}
              {isadmin && jobStartUpDetails.social !== '' && jobStartUpDetails.social !== undefined ? (
                <Grid item xs={12} md={6}>
                  <div
                    onClick={() => {
                      openLink(jobStartUpDetails.social);
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecorationColor: '#1976d2',
                      textUnderlineOffset: 2,
                    }}
                  >
                    <TextField
                      color="primary"
                      variant="standard"
                      label="Social"
                      fullWidth
                      value={jobStartUpDetails.social}
                      InputProps={{ disableUnderline: true, readOnly: true }}
                      sx={{ input: { cursor: 'pointer', color: '#1976d2' } }}
                    />
                  </div>
                </Grid>
              ) : (
                <></>
              )}
              {isadmin && jobStartUpDetails.cruchbase !== '' && jobStartUpDetails.cruchbase !== undefined ? (
                <Grid item xs={12} md={6}>
                  <div
                    onClick={() => {
                      openLink(jobStartUpDetails.cruchbase);
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecorationColor: '#1976d2',
                      textUnderlineOffset: 2,
                    }}
                  >
                    <TextField
                      color="primary"
                      variant="standard"
                      label="Crunchbase"
                      fullWidth
                      value={jobStartUpDetails.cruchbase}
                      InputProps={{ disableUnderline: true, readOnly: true }}
                      sx={{ input: { cursor: 'pointer', color: '#1976d2' } }}
                    />
                  </div>
                </Grid>
              ) : (
                <></>
              )}
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="Sector"
                  fullWidth
                  value={jobStartUpDetails.sector}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
              {/* <Grid item xs={12} md={6}>
                                    <TextField variant="standard" label="Company Location" fullWidth value={jobStartUpDetails.location} InputProps={{ disableUnderline: true, readOnly: true }} />
                                </Grid> */}
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="No Of Employees"
                  fullWidth
                  value={jobStartUpDetails.noOfEmployees}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="Company Vision"
                  multiline
                  fullWidth
                  value={jobStartUpDetails.companyVision}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
      <Card sx={{ my: 2 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Founders
          </Typography>
          {loading || loading2 ? (
            <Box
              sx={{
                height: 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              {jobStartUpDetails.founder.map((value, key) => {
                return (
                  value.name !== '' &&
                  value.name !== undefined && (
                    <Card variant="outlined" sx={{ mt: 2 }} key={key}>
                      <CardContent sx={{ display: { xs: 'block', md: 'flex' }, gap: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <TextField
                              variant="standard"
                              label="Founder Name"
                              sx={{ mb: { xs: 2, md: 0 } }}
                              fullWidth
                              value={value.name}
                              InputProps={{
                                disableUnderline: true,
                                readOnly: true,
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <TextField
                              variant="standard"
                              label="Founder LinkedIn"
                              sx={{ mb: { xs: 2, md: 0 } }}
                              fullWidth
                              multiline
                              value={value.linkedIn || '-'}
                              InputProps={{
                                disableUnderline: true,
                                readOnly: true,
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              variant="standard"
                              label="Founder Bio"
                              sx={{ mb: { xs: 2, md: 0 } }}
                              fullWidth
                              multiline
                              value={value.bio}
                              InputProps={{
                                disableUnderline: true,
                                readOnly: true,
                              }}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  )
                );
              })}
            </Box>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Project Details
          </Typography>
          {loading || loading2 ? (
            <Box
              sx={{
                height: 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="Designation"
                  fullWidth
                  value={jobDetails.designation}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
              {jobDetails.type === 'Internship' ? (
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="standard"
                    label="Internship Duration"
                    fullWidth
                    value={jobDetails.duration}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                  />
                </Grid>
              ) : (
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="standard"
                    label="Type"
                    fullWidth
                    value={jobDetails.type}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                  />
                </Grid>
              )}
              {jobDetails.type !== 'Cofounder' && jobDetails.type !== 'Project' && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="standard"
                      label="Stipend"
                      fullWidth
                      value={jobDetails.stipend}
                      InputProps={{ disableUnderline: true, readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="standard"
                      label="No of Offers"
                      fullWidth
                      value={jobDetails.noOfOffers}
                      InputProps={{ disableUnderline: true, readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="standard"
                      label="Skills Required"
                      multiline
                      fullWidth
                      value={jobDetails.skillsRequired}
                      InputProps={{ disableUnderline: true, readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="standard"
                      label="Job Location"
                      multiline
                      fullWidth
                      value={jobDetails.jobLocation}
                      InputProps={{ disableUnderline: true, readOnly: true }}
                    />
                  </Grid>
                </>
              )}
              {jobDetails.type !== 'Project' && (
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="standard"
                    label="Responsibilities"
                    multiline
                    fullWidth
                    value={jobDetails.responsibilities}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                  />
                </Grid>
              )}
              {jobDetails.type === 'Internship' && (
                <Grid item xs={12} md={6}>
                  <TextField
                    variant="standard"
                    label="Part/FullTime"
                    multiline
                    fullWidth
                    value={jobDetails.hoursType || 'PartTime'}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                  />
                </Grid>
              )}
              {jobDetails.type === 'Project' && (
                <>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="standard"
                      label="Skills Required"
                      multiline
                      fullWidth
                      value={jobDetails.skillsRequired}
                      InputProps={{ disableUnderline: true, readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      label="Project Description"
                      multiline
                      fullWidth
                      value={jobDetails.responsibilities}
                      InputProps={{ disableUnderline: true, readOnly: true }}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          )}
        </CardContent>
      </Card>
      {jobDetails.type !== 'Cofounder' && (
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Deadline and Selection Process
            </Typography>
            {loading || loading2 ? (
              <Box
                sx={{
                  height: 300,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box>
                {jobDetails.assignment !== '' && jobDetails.assignment !== undefined && (
                  <TextField
                    variant="standard"
                    sx={{ mb: 2 }}
                    label="Assignment"
                    fullWidth
                    value={jobDetails.assignment}
                    InputProps={{ disableUnderline: true, readOnly: true }}
                  />
                )}
                <TextField
                  variant="standard"
                  sx={{ mb: 2 }}
                  label="Application Deadline"
                  fullWidth
                  value={moment(jobDetails.deadline).format('MMMM Do YYYY, h:mm:ss a')}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
                <TextField
                  variant="standard"
                  label="Selection Process"
                  multiline
                  fullWidth
                  value={jobDetails.selectionProcess}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Box>
            )}
          </CardContent>
        </Card>
      )}
      <Card sx={{ my: 2 }}>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            HR/POC Details
          </Typography>
          {loading || loading2 ? (
            <Box
              sx={{
                height: 300,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="Name"
                  fullWidth
                  value={jobStartUpDetails.hrName}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="Personal Email"
                  fullWidth
                  value={jobStartUpDetails.hrEmail}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  variant="standard"
                  label="Designation"
                  fullWidth
                  value={jobStartUpDetails.hrDesignation}
                  InputProps={{ disableUnderline: true, readOnly: true }}
                />
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
