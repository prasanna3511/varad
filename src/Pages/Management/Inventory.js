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
import AddInventory from '../../components/Managment/AddInventory'
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
      {open && <AddInventory open={open} setOpen={setOpen} />}

    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {

  const [rowModesModel, setRowModesModel] = React.useState({});
  const [open, setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(!open)
  };
  const [loading, setLoading] = useState(true); 
  const [data, setData] = useState([]);
const [forupdate , setForUpdate]=useState(false)
const [rowdata , setRowData]=useState({})
const [refetchedData, setRefetchedData] = useState([]);
  useEffect(() => {

    async function getProducts() {
      try {

        let response = await axios.get(`${process.env.REACT_APP_API_URL}/getproducts`)

        if (response.data.status) {
          setData(response.data.data)
          setLoading(false);
        }

      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }

    getProducts()

  }, [])

  useEffect(() => {
    async function getProducts() {
      try {
        let response = await axios.get(`${process.env.REACT_APP_API_URL}/getproducts`);
  
        if (response.data.status) {
          setData(response.data.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  
    getProducts();
  }, [refetchedData]); 
 
  const handleRowClick = (row) => {
    console.log(row)
    setOpen(!open)
    setRowData(row)
    setForUpdate(true)
  }

  const columns = [
    {
      field: 'id',
      headerName: 'Product Id',
      type: 'number',
      width: 180,
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
      width: 180,
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
      field: 'quantity',
      headerName: 'Quantity',
      //   type: 'date',
      width: 180,
      editable: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return <>
          <Typography
            sx={{}}
            onClick={() => {
              handleRowClick(params.row)
            }}>{params.row.quantity}</Typography>
        </>
      },
    },
    {
      field: 'unit',
      headerName: 'Unit Of Measurement',
      align: 'center',
      headerAlign: 'center',
      width: 220,
      editable: true,
      renderCell: (params) => {
        return <>
          <Typography
            sx={{}}
            onClick={() => {
              handleRowClick(params.row)
            }}>{params.row.unit}</Typography>
        </>
      },
    },
    {
      field: 'hsn',
      headerName: 'HSN number',
      // type: 'number',
      width: 180, align: 'center',
      headerAlign: 'center',
      editable: true,
      renderCell: (params) => {
        return <>
          <Typography
            sx={{}}
            onClick={() => {
              handleRowClick(params.row)
            }}>{params.row.hsn}</Typography>
        </>
      },
    },
    {
      field: 'gst',
      headerName: 'GST',
      // type: 'number',
      width: 180, align: 'center',
      headerAlign: 'center',
      editable: true,
      renderCell: (params) => {
        return <>

          <Typography
            sx={{}}
            onClick={() => {
              handleRowClick(params.row)
            }}>{params.row.gst}</Typography>
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
        <Navbar name={' Inventory'} />
        <Box sx={{ width: '80%', height: '100%', mx: '10%' }} >


          <Box sx={{ width: '100%', display: 'flex', justifyContent: "flex-end" }} >
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick} sx={{ border: 1, backgroundColor: '#3457D5', color: 'white', fontSize: 12, mx: 2, my: 1 }} >
              Add Product
            </Button>
          </Box>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : (

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
          )}

        </Box>
        {open && <AddInventory open={open} setOpen={setOpen} setRefetchedData={setRefetchedData} update={forupdate} rowdata={rowdata}/>}

      </Box>

    </Box>
  );
}