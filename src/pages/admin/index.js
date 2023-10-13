// import { Card, CardContent, CardHeader, Container, Typography, TextField, CardActions, Button, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react'
import { useNavigate} from 'react-router-dom';


export default function AdminSignIn({ BASE_URL, setShowAlert, setAlertMessage, setAlertSeverity }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.adminCode === undefined){
            navigate('../signIn', { state: { user: 'Admin' } })
        }
        else navigate("./dashboard", { state: { user: 'Admin' } })
    }, [])
    return <></>
}