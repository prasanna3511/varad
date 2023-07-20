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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    props.setOpen(true);
  };


  const addProducts = async () => {

    try {

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/addproduct`, data,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )

      console.log(response.data)

      if(response.data.status){
        window.location.reload()
        // handleClose()
      }

    } catch (e) {
      console.log(e)
    }

  }

  const handleClose = () => {
    props.setOpen(false);
  };

  const [data, setData] = React.useState({})
  const handleChange = (key, value) => {
    setData({
      ...data,
      [key]: value,
    });
  };
  return (
    <Box sx={{ width: '100%' }} >

      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      // sx={{width:600}}
      >
        <Box sx={{ width: 550, height: 500, display: 'flex' }} >
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
            <Box sx={{ width: '80%', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
              <Box sx={{ width: '90%' }} >
                <Typography sx={{ my: 0.5, }} >Product Name</Typography>

              </Box>
              <TextField
                //   fullWidth
                size="small"
                placeholder="name"
                value={data.name}
                onChange={(e) => {
                  handleChange("name", e.target.value);
                }}
                sx={{ width: '90%', align: 'center', mx: 0.5 }}
              />
            </Box>
            <Box sx={{ width: '80%', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
              <Box sx={{ width: '90%' }} >
                <Typography sx={{ my: 0.5, }} >Quantity</Typography>
              </Box>
              <TextField
                //   fullWidth
                size="small"
                placeholder="Quantity"
                value={data.quantity}
                onChange={(e) => {
                  handleChange("quantity", e.target.value);
                }}
                sx={{ width: '90%', align: 'center', mx: 0.5 }}
              />
            </Box>
            <Box sx={{ width: '80%', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
              <Box sx={{ width: '90%' }} >
                <Typography sx={{ my: 0.5, }} >Unit</Typography>
              </Box>
              <TextField
                //   fullWidth
                size="small"
                placeholder="Unit"
                value={data.unit}
                onChange={(e) => {
                  handleChange("unit", e.target.value);
                }}
                sx={{ width: '90%', align: 'center', mx: 0.5 }}
              />
            </Box>
            {/* <Box sx={{ width: '80%', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
              <Box sx={{ width: '90%' }} >
                <Typography sx={{ my: 0.5, }} >Product Id</Typography>
              </Box>
              <TextField
                //   fullWidth
                size="small"
                placeholder="Product Id"
                value={data.id}
                onChange={(e) => {
                  handleChange("id", e.target.value);
                }}
                sx={{ width: '90%', align: 'center', mx: 0.5 }}
              />
            </Box> */}
            <Box sx={{ width: '80%', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
              <Box sx={{ width: '90%' }} >
                <Typography sx={{ my: 0.5, }} >HSN Number</Typography>
              </Box>
              <TextField
                //   fullWidth
                size="small"
                placeholder="HSN Number"
                value={data.hsn}
                onChange={(e) => {
                  handleChange("hsn", e.target.value);
                }}
                sx={{ width: '90%', align: 'center', mx: 0.5 }}
              />
            </Box>
            <Box sx={{ width: '80%', display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} >
              <Box sx={{ width: '90%' }} >
                <Typography sx={{ my: 0.5, }} >GST</Typography>
              </Box>
              <TextField
                //   fullWidth
                size="small"
                placeholder="GST"
                value={data.gst}
                onChange={(e) => {
                  handleChange("gst", e.target.value);
                }}
                sx={{ width: '90%', align: 'center', mx: 0.5 }}
              />
            </Box>

          </Box>

        </Box>
        <DialogActions sx={{ width: '97%', display: 'flex', justifyContent: 'space-around' }} >
          <Button sx={{ width: '30%', border: 1, backgroundColor: '#3457D5', color: 'white', mx: 1 }} onClick={addProducts}>Submit</Button>
          <Button sx={{ width: '30%', border: 1, backgroundColor: '#3457D5', color: 'white', mx: 1 }} onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}