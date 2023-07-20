import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import Navbar from '../../components/Navbar'
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
} from '@mui/x-data-grid-generator';
import { display } from '@mui/system';
import AddStokcist from '../../components/Managment/AddStokcist'
import { Typography } from '@mui/material';
import axios from 'axios';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  const randomIndex = Math.floor(Math.random() * roles.length);
  return roles[randomIndex];
};

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const [open, setOpen] = useState(false)

  return (
    <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} >
      {/* <Button color="primary" startIcon={<AddIcon />} onClick={handleClick} sx={{border:1 , backgroundColor:'#3457D5' , color:'white', fontSize:12 , mx:2,my:1}} >
        Add Product
      </Button> */}
      {open && <AddStokcist open={open} setOpen={setOpen} />}

    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {

  const [rowModesModel, setRowModesModel] = React.useState({});
  const [open, setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(!open)
  };

  const [data, setData] = useState([]);

  useEffect(() => {

    async function getProducts() {
      try {

        let response = await axios.get(`${process.env.REACT_APP_API_URL}/getstockist`)

        if (response.data.status) {
          setData(response.data.data)
        }

      } catch (err) {
        console.log(err)
      }
    }
    getProducts()
  }, [])

  const [uprow , setUpRow] = useState({})
  const handleRowClick = (row) => {
    console.log("row data is",row)
    setOpen(!open)
    setUpRow(row)

  }

  const columns = [
    {
      field: 'id',
      headerName: 'Product Id',
      type: 'number',
      width: 210,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      renderCell: (params) => {
        return <>
          <Typography
            sx={{}}
            onClick={() => {
              handleRowClick(params.row)
            }}>{params.row.id}</Typography>
        </>
      },
    },
    {
      field: 'name',
      headerName: 'Product Name',
      width: 210,
      editable: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return <>
          <Typography
            sx={{}}
            onClick={() => {
              handleRowClick(params.row)
            }}>{params.row.name}</Typography>
        </>
      },
    },
    {
      field: 'address',
      headerName: 'Address',
      //   type: 'date',
      width: 210,
      editable: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return <>
          <Typography
            sx={{}}
            onClick={() => {
              handleRowClick(params.row)
            }}>{params.row.address}</Typography>
        </>
      },
    },
   
    {
      field: 'gst_number',
      headerName: 'GST',
      // type: 'number',
      width: 210, align: 'center',
      headerAlign: 'center',
      editable: true,
      renderCell: (params) => {
        return <>

          <Typography
            sx={{}}
            onClick={() => {
              handleRowClick(params.row)
            }}>{params.row.gst_number}</Typography>
        </>
      },
    },

  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
        '& .element.style': {
          color: 'white',
          backgroundColor: 'green'
        },
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        //    my:0.1
      }}
    >

      <Box sx={{ width: '100%', height: '100%', }} >
        <Navbar name={' Stokist '} />
        <Box sx={{ width: '60%', height: '100%', mx: '20%' }} >


          <Box sx={{ width: '100%', display: 'flex', justifyContent: "flex-end" }} >
            <Button color="primary" startIcon={<AddIcon />} onClick={handleRowClick} sx={{ border: 1, backgroundColor: '#3457D5', color: 'white', fontSize: 12, mx: 2, my: 1 }} >
              Add Product
            </Button>
          </Box>

          <DataGrid
            rows={data}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            // onRowModesModelChange={handleRowModesModelChange}
            // onRowEditStop={handleRowEditStop}
            // processRowUpdate={processRowUpdate}
            slots={{
              toolbar: EditToolbar,
            }}
            sx={
              {
                '& .element.style': {
                  color: 'white',
                  backgroundColor: 'green'
                },
                display: 'flex', width: '100%', boxShadow: 5,

              }
            }
          />
        </Box>
        {open && <AddStokcist open={open} setOpen={setOpen} update="update" row={uprow}  />}

      </Box>

    </Box>
  );
}