import React from "react";
import { useMediaQuery,Box, Typography, Button, Grid, Card, CardContent, CardMedia, Container } from "@mui/material";


function JobListing({ salary, deadline, type, detailsButtonClick , designation,studentsAppliedClick , approval}) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  
  return (
    <Card sx={{ borderRadius: "20px", boxShadow: "0px 3px 20px 0px rgba(0, 0, 0, 0.25)" }}>
      <Grid container alignItems="center" justifyContent="space-between"  gap={2} sx={{ paddingBlock:"1vh", paddingInline:"2vw", "@media (max-width: 768px)": { gap:"0", flexWrap:"nowrap" }, "@media (max-width: 1024px)": {  flexWrap:"nowrap" },"@media (max-width: 468px)": {  flexWrap:"wrap" } }}>
      
        <Grid item xs={12} md={8} lg={4} display="flex" flexDirection="column">
          <CardContent sx={{ color: "#fff"}}>
            <Typography variant="h6" component="div" fontWeight="bold"> {designation}</Typography>
            
            <Grid container alignItems="flex-start" justifyContent="flex-start" gap={1} >
              <Grid item>
                <Typography variant="h6" component="div" color="#00ffd1">Approval: {approval}</Typography>
              </Grid>
              
              <Grid item xs={12} maxWidth="100%">
                <Typography variant="body1" component="div" sx={{ fontFamily: "Poppins, sans-serif", alignSelf: "start" }}>{type}</Typography>
              </Grid>
              
            </Grid>
          </CardContent>

        </Grid>
        <Grid item>
                <Container variant="body1" component="div" sx={{display:"flex" , flexDirection:"column"}}>
                  <Typography variant="body1" component="div">Salary:</Typography>
                  <Typography variant="body1" component="div">{salary}</Typography>
                </Container>
              </Grid>
              <Grid item>
                <Container variant="body1"  component="div" sx={{display:"flex" , flexDirection:"column"}}>
                  <Typography variant="body1" component="div">Deadline:</Typography>
                  <Typography variant="body1" component="div">{deadline}</Typography>
                </Container>
              </Grid>
        <Grid item sx={{margin:"auto", "@media (max-width: 468px)":{ paddingBlock:"5%"}}}>
          
          <Grid container flexDirection="column" gap={1} alignItems="center" sx={{"@media (max-width: 768px)":{flexDirection:"row"}}}>
            <Grid item sx={{width:"100%" , "@media (max-width: 425px)":{width:"auto"}}}>
              <Button onClick={detailsButtonClick}   sx={{  borderRadius: "6px", width:"100%", backgroundColor:"#00FFD1;",padding: "1vh 2vw", color:"black",  "@media (max-width: 768px)":{paddingBlock :"1.2vh" } , "@media (max-width: 425px)":{width:"auto"} }}>
                Details
              </Button>
            </Grid>
            <Grid item sx={{"@media (max-width: 468px)":{  margin:"auto"} }}>
              <Button onClick={studentsAppliedClick} sx={{ border: "1px solid #00FFD1", color:"#00FFD1", padding: "1vh 3vw", fontSize:"100%", "@media (max-width: 768px)":{paddingBlock :"1.5 vh" , width:"max-content"} , "@media (max-width: 1024px)":{ width:"max-content"}, "@media (max-width: 468px)":{ fontSize:"100%"} }}>
                Student Applied
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

export default JobListing;