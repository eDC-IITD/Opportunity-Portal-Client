import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import ResponsiveAppBar from '../../components/admin/responsiveAppBar';
import { Box, CircularProgress } from "@mui/material";

export default function Index({ mode, setMode}) {
  const adminCode = localStorage.adminCode
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (adminCode === null) {
      navigate('/');
    }
    else {
      setLoading(false);
    }
  }, [])

  return (
    <>
      <ResponsiveAppBar mode={mode} setMode={setMode} />
      <div style={{ overflowY: "auto", position: 'absolute', width: "100%", height: "100%" }}>
        {
          loading ? <Box sx={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}><CircularProgress /></Box> :
            <Outlet />
        }
      </div>
    </>
  )
}
