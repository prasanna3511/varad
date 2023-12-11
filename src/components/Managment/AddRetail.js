import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, TextField, Typography } from '@mui/material';
import { display } from '@mui/system';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  console.log("this values from props" , props.update)

  const handleClose = () => {
    props.setOpen(false);
  };

  const [data, setData] = React.useState(props.rowdata)

  const handleChange = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };

  const addProduct = async () => {

    try{

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/addretailer`, data,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )

      if(response.data.status){
        window.location.reload();
      }

    }catch(err){
      console.log(err);
    }

  }

  return (
    <Box sx={{ width: '100%' }} >
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box sx={{ width: 550, height: 550, display: 'flex' }} >
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
            <Box sx={{ width: '80%', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
              <Box sx={{ width: '90%' }} >
                <Typography sx={{ my: 0.5, }} >Name</Typography>

              </Box>
              <TextField
                //   fullWidth
                size="small"
                placeholder="Name"
                value={data.name}
                onChange={(e) => {
                  handleChange("name", e.target.value);
                }}
                sx={{ width: '90%', align: 'center', mx: 0.5 }}
              />
            </Box>
            <Box sx={{ width: '80%', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
              <Box sx={{ width: '90%' }} >
                <Typography sx={{ my: 0.5, }} >Mobile Number</Typography>

              </Box>
              <TextField
                //   fullWidth
                size="small"
                placeholder="Mobile Number"
                value={data.mbl_number}
                onChange={(e) => {
                  handleChange("mbl_number", e.target.value);
                }}
                sx={{ width: '90%', align: 'center', mx: 0.5 }}
              />
            </Box>
            <Box sx={{ width: '80%', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
              <Box sx={{ width: '90%' }} >
                <Typography sx={{ my: 0.5, }} >Email</Typography>
              </Box>
              <TextField
                //   fullWidth
                size="small"
                placeholder="Email"
                value={data.email}
                onChange={(e) => {
                  handleChange("email", e.target.value);
                }}
                sx={{ width: '90%', align: 'center', mx: 0.5 }}
              />
            </Box>
            
            <Box sx={{ width: '80%', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
              <Box sx={{ width: '90%' }} >
                <Typography sx={{ my: 0.5, }} >Address</Typography>
              </Box>
              <TextField
                //   fullWidth
                size="small"
                placeholder="Address"
                value={data.address}
                onChange={(e) => {
                  handleChange("address", e.target.value);
                }}
                sx={{ width: '90%', align: 'center', mx: 0.5 }}
              />
            </Box>

            <Box sx={{ width: '80%', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
              <Box sx={{ width: '90%' }} >
                <Typography sx={{ my: 0.5, }} >Route Name</Typography>
              </Box>
              <TextField
                //   fullWidth
                size="small"
                placeholder="Route Name"
                value={data.route_id}
                onChange={(e) => {
                  handleChange("route_id", e.target.value);
                }}
                sx={{ width: '90%', align: 'center', mx: 0.5 }}
              />
            </Box>
            <Box sx={{ width: '80%', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
              <Box sx={{ width: '90%' }} >
                <Typography sx={{ my: 0.5, }} >GST Number</Typography>
              </Box>
              <TextField
                //   fullWidth
                size="small"
                placeholder="GST Number"
                value={data.gst_number}
                onChange={(e) => {
                  handleChange("gst_number", e.target.value);
                }}
                sx={{ width: '90%', align: 'center', mx: 0.5 }}
              />
            </Box>

            <Box sx={{ width: '80%', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
              <Box sx={{ width: '90%' }} >
                <Typography sx={{ my: 0.5, }} >State</Typography>
              </Box>
              <TextField
                //   fullWidth
                size="small"
                placeholder="State"
                value={data.state}
                onChange={(e) => {
                  handleChange("state", e.target.value);
                }}
                sx={{ width: '90%', align: 'center', mx: 0.5 }}
              />
            </Box>

          </Box>

        </Box>
        <DialogActions sx={{ width: '97%', display: 'flex', justifyContent: 'space-around' }} >
          <Button sx={{ width: '30%', border: 1, backgroundColor: '#3457D5', color: 'white', mx: 1 }} onClick={addProduct}>Submit</Button>
          <Button sx={{ width: '30%', border: 1, backgroundColor: '#3457D5', color: 'white', mx: 1 }} onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}