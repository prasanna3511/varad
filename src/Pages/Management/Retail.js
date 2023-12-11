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
import AddRetail from '../../components/Managment/AddRetail'
import { Typography } from '@mui/material';
import { ReportGmailerrorred } from '@mui/icons-material';
import axios from 'axios';


const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  const randomIndex = Math.floor(Math.random() * roles.length);
  return roles[randomIndex];
};


function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const [open, setOpen] = React.useState(false)
  const handleClick = () => {
    setOpen(!open)
  };

  return (
    <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} >
      {/* <Button color="primary" startIcon={<AddIcon />} onClick={handleClick} sx={{border:1 , backgroundColor:'#3457D5' , color:'white', fontSize:12 , mx:2,my:1}} >
        Add Product
      </Button> */}
      {/* {        open && <AddInventory open={open} setOpen={setOpen}  />} */}

    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [data, setData] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [open, setOpen] = useState(false)
  const [forUpdate, setForUpdate] = useState(false)

  useEffect(() => {

    async function fetchData() {

      try {

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getretailers`)

        if (response.data.status) {
          console.log(response.data.data)
          setData(response.data.data)
        }

      } catch (e) {

        console.log(e);

      }
    }

    fetchData();

  }, [])



  const handleClick = () => {
    setOpen(!open)
  };
const [rowdata , setRowData]=useState({})
  const handleRowClick = (row) => {
    console.log(row)
    setRowData(row)
    setOpen(!open)
    setForUpdate(true)

  }

  const columns = [
    {
      field: 'id',
      headerName: 'Retailer Id',
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
            }}>{params.row.retailer_id}</Typography>
        </>
      },
    },
    {
      field: 'name',
      headerName: 'Retailer Name',
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
      field: 'mbl_number',
      headerName: 'Mobile Number',
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
            }}>{params.row.mbl_number}</Typography>
        </>
      },
    },
    {
      field: 'email',
      headerName: 'Email ',
      //   type: 'number',
      align: 'center',
      headerAlign: 'center',
      width: 220,
      editable: true,
      renderCell: (params) => {
        return <>
          <Typography
            sx={{ overflow: 'hidden' }}
            onClick={() => {
              handleRowClick(params.row, 'update')
            }}>{params.row.email}</Typography>
        </>
      },

    },
    {
      field: 'route_name',
      headerName: 'Route Name',
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
            }}>{params.row.route_name}</Typography>
        </>
      },
    },
    {
      field: 'gst_number',
      headerName: 'GST Number',
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
        <Navbar name={' Retail Management'} />
        <Box sx={{ width: '80%', height: '100%', mx: '10%' }} >


          <Box sx={{ width: '100%', display: 'flex', justifyContent: "flex-end" }} >
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick} sx={{ border: 1, backgroundColor: '#3457D5', color: 'white', fontSize: 12, mx: 2, my: 1 }} >
              Add Product
            </Button>
          </Box>

          <DataGrid
            rows={data}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            getRowId={(row) => row.retailer_id}
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
        {open && <AddRetail open={open} setOpen={setOpen} update={forUpdate} rowdata={rowdata} />}

      </Box>

    </Box>
  );
}