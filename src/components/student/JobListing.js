import React from "react";
import { useMediaQuery,Box, Typography, Button, Grid, Card, CardContent, CardMedia } from "@mui/material";


function JobListing({ logo, companyName, mission, role, salary, deadline, type, detailsButtonClick, applyButtonClick }) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  return (
    <Card sx={{ borderRadius: "20px", boxShadow: "0px 3px 20px 0px rgba(0, 0, 0, 0.25)" }}>
      <Grid container alignItems="center" justifyContent="space-between" gap={2} sx={{ paddingBlock:"1vh", paddingInline:"2vw", "@media (max-width: 768px)": { gap:"0" } }}>
      {!isMobile && (
          <Grid item>
            <CardMedia component="img" src={logo} loading="lazy" alt="Company Logo" sx={{ aspectRatio: "0.94", objectFit: "contain", objectPosition: "center", width: "7vw", overflow: "hidden" }} />
          </Grid>
        )}
        <Grid item xs={12} md={8} lg={7} display="flex" flexDirection="column">
          <CardContent sx={{ color: "#fff"}}>
            <Typography variant="h6" component="div" fontWeight="bold">{companyName}</Typography>
            {!isMobile && (
            <Typography variant="body1" sx={{ color: "#d0cccc" }}>Our mission is to create a world where everyone has access to the food they love{mission}</Typography>
            )}
            <Grid container alignItems="flex-start" justifyContent="space-between" gap={1} >
              <Grid item>
                <Typography variant="h6" component="div" color="#00ffd1"> Role: {role}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="div">Salary:{salary}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" component="div">Deadline:{deadline}</Typography>
              </Grid>
              <Grid item xs={12} maxWidth="100%">
                <Typography variant="body1" component="div" sx={{ fontFamily: "Poppins, sans-serif", alignSelf: "start" }}>{type}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Grid>
        <Grid item sx={{margin:"auto"}}>
          <Grid container flexDirection="column" gap={1} alignItems="center" sx={{"@media (max-width: 768px)":{flexDirection:"row"}}}>
            <Grid item sx={{margin:"auto"}}>
              <Button onClick={applyButtonClick}   sx={{  borderRadius: "6px", backgroundColor:"#00FFD1;",padding: "1vh 2.2vw", color:"black",  "@media (max-width: 768px)":{paddingBlock :"1.1vh"} }}>
                Apply Now
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={detailsButtonClick}  sx={{ border: "1px solid #00FFD1", color:"#00FFD1", padding: "1vh 3vw", "@media (max-width: 768px)":{paddingBlock :"1.5 vh"} }}>
                Details
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default JobListing;