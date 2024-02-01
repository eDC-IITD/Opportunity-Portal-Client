import React from "react";
import { useMediaQuery,Box, Typography, Button, Grid, Card, CardContent, CardMedia, Container } from "@mui/material";
import InternshipTable from '../../components/table';


const approvalStatusColor = (approvalStatus) => {
  if (approvalStatus === 'approved') {
    return '#00ffd1';
  } else if (approvalStatus === 'disapproved') {
    return '#d32f2f';
  } else if (approvalStatus === 'pending') {
    return 'primary';
  } else {
    return 'none';
  }
};


function JobListing({ salary, deadline, type, detailsButtonClick , designation,studentsApplied , approval, jobId}) {
  return (
    <Card sx={{ borderRadius: "20px", boxShadow: "0px 3px 20px 0px rgba(0, 0, 0, 0.25)" }}>
      <Grid container alignItems="center" justifyContent="space-between" gap={2} sx={{ paddingBlock:"1vh", paddingInline:"2vw", "@media (max-width: 768px)": { gap:"0" } }}>
      
        <Grid item xs={12} md={8} lg={4} display="flex" flexDirection="column">
          <CardContent sx={{ color: "#fff"}}>
            <Typography variant="h6" component="div" fontWeight="bold"> {designation}</Typography>
            
            <Grid container alignItems="flex-start" justifyContent="flex-start" gap={1} >
              <Grid item>
                <Typography variant="h6" component="div" color={approvalStatusColor(approval)}>Approval: {approval}</Typography>
              </Grid>
              
              <Grid item xs={12} maxWidth="100%">
                <Typography variant="body1" component="div" sx={{ fontFamily: "Poppins, sans-serif", alignSelf: "start" }}>Full Time | Remote {type}</Typography>
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
        <Grid item sx={{margin:"auto"}}>
          
          <Grid container flexDirection="column" gap={1} alignItems="center" sx={{"@media (max-width: 768px)":{flexDirection:"row"}}}>
            <Grid item sx={{width:"100%"}}>
              <Button onClick={detailsButtonClick}   sx={{  borderRadius: "6px", width:"100%", backgroundColor:"#00FFD1;",padding: "1vh 2vw", color:"black",  "@media (max-width: 768px)":{paddingBlock :"1.5vh"} }}>
                Details
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={detailsButtonClick}   sx={{  borderRadius: "6px", width:"100%", backgroundColor:"#00FFD1;",padding: "1vh 2vw", color:"black",  "@media (max-width: 768px)":{paddingBlock :"1.5vh"} }}>
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