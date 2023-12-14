import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, CircularProgress, TextField, Typography } from '@mui/material';
import { display } from '@mui/system';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  
  const addProducts = async () => {
    setLoading(true);

    try {

      if (props?.update) {
        const response = await axios.patch(
          `${process.env.REACT_APP_API_URL}/updateproduct`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.status) {
          props.setRefetchedData(response.data.data);
          // window.location.reload();
          props.setOpen(false);
          setLoading(false);
        }
      } else {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/addproduct`,data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.data.status) {
          props.setRefetchedData(response.data.data);
          // window.location.reload();
          props.setOpen(false);
          setLoading(false);
        }
      }
    } catch (e) {
      console.error(e);
    } 
  };


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
  return (
    <Box sx={{ width: '100%' }} >
  <Box sx={{ position: 'relative' }}>
      {/* Dim overlay when loading is true */}
      {loading && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress size={34} />
        </Box>
      )}
      </Box>
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