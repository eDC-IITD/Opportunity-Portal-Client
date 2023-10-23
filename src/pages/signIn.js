import { Card, CardContent, CardHeader, Container, Typography, TextField, CardActions, Button, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

export default function SignIn({ BASE_URL, setShowAlert, setAlertMessage, setAlertSeverity }) {
  const { user } = useLocation().state;
  const [email, setEmail] = useState('');
  const [adminCode, setAdminCode] = useState('')
  const [adminUsername, setAdminUsername] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loginAdminJWT = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = { username: adminUsername, password: adminPassword }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", },
      body: JSON.stringify(formData),
    }
    const url = `http://localhost:3000/auth/login`
    try {
      const data = await fetch(url, requestOptions)
      const data1 = await data.json()
      if (data.status === 200) {
        setAlertMessage("Approved")
        setAlertSeverity("success")
        setShowAlert(true)
        setAdminCode(data1.token)
        localStorage.adminCode = data1.token
        localStorage.userID = data1.userID
        navigate("../admin/dashboard", { state: { user: "Admin", signInOrSignUp: "SignIn" } })
      }
      else if (data.status === 401) {
        setAlertMessage("Wrong code, please try again");
        setAlertSeverity("info");
        setShowAlert(true);
      }
      else console.log(data);
    }
  catch (error) {
    console.log("nkxnkdx")
    console.log(error)
  }
}

  

  const loginAdmin = async (e) => {
    e.preventDefault()
    setLoading(true)
    // check admin code
    const formData = {code : adminCode}
    const requestOptions = {
      method : "POST", 
      headers : {"Content-Type": "application/json",},
      body : JSON.stringify(formData),
    }
    const url = `http://localhost:3000/auth`
    try{
      await fetch(url, requestOptions)
        .then((data) => {
          setLoading(false)
          if (data.status === 200) {
            setAlertMessage("Approved")
            setAlertSeverity("success")
            setShowAlert(true)
            localStorage.adminCode = adminCode

            navigate("../admin/dashboard", { state: { user: "Admin", signInOrSignUp: "SignIn"}})
          }
          
          else if (data.status === 403) {
            setAlertMessage("Wrong code, please try again");
            setAlertSeverity("info");
            setShowAlert(true);
          }

          else console.log(data);

        })
    }
    catch (error) {
      console.log(error)
    }

    // if correct save the admin code in the localstorage
    // and than navigate to homepage containing the table
  }

  const loginStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (email.substring(email.length - 10, email.length) !== "iitd.ac.in") {
      setAlertMessage("Please enter IIT Delhi email ID.");
      setAlertSeverity("info");
      setShowAlert(true);
      setLoading(false);
      return
    }
    const formData = {
      email: email,
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }
    const url = `${BASE_URL}/api/student/login`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setLoading(false);
            navigate('../otpVerify', { state: { user: "Student", signInOrSignUp: "SignIn", email: data.studentDetails.email, name: data.studentDetails.name } });
          }
          else if (data.status === 401) {
            setLoading(false);
            setAlertMessage("Account doesn't exist. Please signup.");
            setAlertSeverity("info");
            setShowAlert(true);
          }
          else {
            console.log(data);
          }
        })
    }
    catch (error) {
      console.log(error)
    }
  }

  const loginStartUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      email: email,
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }
    const url = `${BASE_URL}/api/startUp/login`;
    try {
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setLoading(false);
            navigate('../otpVerify', { state: { user: "Startup", signInOrSignUp: "SignIn", email: data.startUpDetails.email, name: data.startUpDetails.companyName } });
          }
          else if (data.status === 401) {
            setLoading(false);
            setAlertMessage("Account doesn't exist. Please signup.");
            setAlertSeverity("info");
            setShowAlert(true);
          }
          else {
            console.log(data);
          }
        })
    }
    catch (error) {
      console.log(error)
    }
  }

  if (user === "Admin") 
    return (
      <Container maxWidth="sm" sx={{ py: 2, mt: 9 }}>
      <form onSubmit={loginAdminJWT}>
        <Card>
          <CardHeader title={user + " Sign In"} subheader="Kindly enter the code" />
          <CardContent>
            <TextField type="text" label={"Username"} variant="outlined" value={adminUsername} onChange={(e) => setAdminUsername(e.target.value)} fullWidth required />
          </CardContent>
          <CardContent>
            <TextField type="password" label={"Password"} variant="outlined" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} fullWidth required />
          </CardContent>
          <CardActions sx={{ ml: 1 }}>
            <Button type="submit" variant="contained" sx={{ width: 120, height: 40 }}>
              {
                loading ? <CircularProgress sx={{ color: "white" }} size={25} /> : <Typography>Sign In</Typography>
              }
            </Button>
          </CardActions>
        </Card>
      </form>
    </Container>
  )

  return (
    <Container maxWidth="sm" sx={{ py: 2, mt: 9 }}>
      <form onSubmit={(user === "Student" ? loginStudent : loginStartUp)}>
        <Card>
          <CardHeader title={user + " Sign In"} subheader="Enter your email ID to sign in" />
          <CardContent>
            <TextField type="email" label={user === "Student" ? "IITD Email" : "Email"} variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required />
          </CardContent>
          <CardActions sx={{ ml: 1 }}>
            <Button type="submit" variant="contained" sx={{ width: 120, height: 40 }}>
              {
                loading ? <CircularProgress sx={{ color: "white" }} size={25} /> : <Typography>Sign In</Typography>
              }
            </Button>
          </CardActions>
          <CardActions sx={{ ml: 1, mb: 1 }}>
            <Typography>
              Don't have an Account?{" "}
              <Typography color="primary" display="inline" sx={{ cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 2 }} onClick={() => { navigate('../signUp', { state: { user: user } }) }}>Sign Up</Typography>
            </Typography>
          </CardActions>
        </Card>
      </form>
    </Container>
  )
}