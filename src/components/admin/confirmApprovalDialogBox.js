import { Rowing } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { LoadingButton } from '@mui/lab'
import { useState } from 'react';

const putApprovalStatus = async (id, approval) => {
  const formData = {
    code : localStorage.adminCode,
    approval : approval,
    userID : localStorage.userID
  }
  const requestOptions = {
    method : "PUT", 
    headers : {"Content-Type": "application/json",
    "Authorization" : localStorage.adminCode},
    body : JSON.stringify(formData),
  }
  const url = `http://localhost:3000/job/${id}/approval`;
  return fetch(url, requestOptions)
  .then(response => {
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return false
    }
    return true
  })
  .catch(error => {
    console.error("Fetch error: ", error);
    return false
  });
}

export default function ConfirmApprovalDialogBox({row, setShowAlert, setAlertMessage, setAlertSeverity, internshipTableRow, setInternshipTableRow}) {

  const jobDbId = row.update
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [approval, setApproval] = useState(row.approval);
  const [fixedApproval, setFixedApproval] = useState(row.approval)

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setApproval(row.approval)
  }

  const handleApprovalChange = (event) => {
    setApproval(event.target.value)
  };


  const handleConfirm = (event) => {
    setOpen(false);
    putApprovalStatus(jobDbId, approval)
    .then((isSuccessful) => {
      if (isSuccessful) setFixedApproval(approval)
      else console.log("error")
    })
    .catch((err) => {console.log("error1", err)})
    .finally(() => setLoading(false))

  };


  return (
    <>
    <LoadingButton size="small" onClick={handleClickOpen} loading={loading} variant="outlined">
      <span>{fixedApproval}</span> {/* removing the span tag causes problems in google translate */}
    </LoadingButton>

    {/* <Button variant="contained" size="small" onClick={handleClickOpen}>
        {row.approval}
      </Button> */}
      <Dialog fullWidth={true} maxWidth={"xs"} open={open} onClose={handleClose}>
        <DialogTitle>Approval Status</DialogTitle>
        <DialogContent>
          <DialogContentText>Choose The Approval Status of This Post</DialogContentText>
          <Box noValidate component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="approval">Approval</InputLabel>
              <Select autoFocus value={approval} onChange={handleApprovalChange} label="approval"
                inputProps={{name: 'approval', id: 'approval',}}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="disapproved">Disapproved</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}