import * as React from 'react';
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

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  const randomIndex = Math.floor(Math.random() * roles.length);
  return roles[randomIndex];
};


const initialRows = [
  {
    id: randomId(),
    name: 'prasanna',
    product_id: 25,
    joinDate: 55,
    role: randomRole(),
    hsn_number:20,
    unit:40,
    gst:121225
  },
  {
    id: randomId(),
    name: randomTraderName(),
    product_id: 36,
    joinDate: 55,
    role: randomRole(),
    hsn_number:20,
    unit:40,
    gst:121225

  },
  {
    id: randomId(),
    name: randomTraderName(),
    product_id: 19,
    joinDate: 55,
    role: randomRole(),
    hsn_number:20,
    unit:40,
    gst:121225

  },
  {
    id: randomId(),
    name: randomTraderName(),
    product_id: 28,
    joinDate: 55,
    role: randomRole(),
    hsn_number:20,
    unit:40,
    gst:121225

  },
  {
    id: randomId(),
    name: randomTraderName(),
    product_id: 23,
    joinDate: 55,
    role: randomRole(),
    hsn_number:20,
    unit:40,
    gst:121225

  },
  {
    id: randomId(),
    name: randomTraderName(),
    product_id: 23,
    joinDate: 55,
    role: randomRole(),
    hsn_number:20,
    unit:40,
    gst:121225

  },
  {
    id: randomId(),
    name: randomTraderName(),
    product_id: 23,
    joinDate: 55,
    role: randomRole(),
    hsn_number:20,
    unit:40,
    gst:121225

  },{
    id: randomId(),
    name: randomTraderName(),
    product_id: 23,
    joinDate: 55,
    role: randomRole(),
    hsn_number:20,
    unit:40,
    gst:121225

  },{
    id: randomId(),
    name: randomTraderName(),
    product_id: 23,
    joinDate: 55,
    role: randomRole(),
    hsn_number:20,
    unit:40,
    gst:121225

  },{
    id: randomId(),
    name: randomTraderName(),
    product_id: 23,
    joinDate: 55,
    role: randomRole(),
    hsn_number:20,
    unit:40,
    gst:121225

  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const [open , setOpen] = React.useState(false)
  const handleClick = () => {
  setOpen(!open)
  };

  return (
    <GridToolbarContainer sx={{display:'flex' , justifyContent:'flex-end' , alignItems:'center'}} >
      {/* <Button color="primary" startIcon={<AddIcon />} onClick={handleClick} sx={{border:1 , backgroundColor:'#3457D5' , color:'white', fontSize:12 , mx:2,my:1}} >
        Add Product
      </Button> */}
      {        open && <AddInventory open={open} setOpen={setOpen}  />}

    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [open , setOpen] = React.useState(false)
  const handleClick = () => {
  setOpen(!open)
  };

const handleRowClick=(row)=>{
    console.log(row)
  setOpen(!open)

}

  const columns = [
    { field: 'name',
     headerName: 'Product Name',
      width: 180,
       editable: true,
         align: 'center',
    headerAlign: 'center',
    renderCell: (params)=>{
        return<> 
        <Typography
        sx={{}}
         onClick={()=>{
          handleRowClick(params.row)
        }}>{params.row.name}</Typography>
        </>      
      }, 
},
    {
      field: 'product_id',
      headerName: 'Product Id',
      type: 'number',
      width: 180,
      align: 'center',
      headerAlign: 'center',
      editable: true,
      renderCell: (params)=>{
        return<> 
        <Typography
        sx={{}}
         onClick={()=>{
          handleRowClick(params.row)
        }}>{params.row.product_id}</Typography>
        </>      
      },
    },
    {
      field: 'joinDate',
      headerName: 'Quantity',
    //   type: 'date',
      width: 180,
      editable: true,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params)=>{
        return<> 
        <Typography
        sx={{}}
         onClick={()=>{
          handleRowClick(params.row)
        }}>{params.row.joinDate}</Typography>
        </>      
      },
    },
    {
      field: 'unit',
      headerName: 'Unit Of Measurement',
    //   type: 'number',
      align: 'center',
      headerAlign: 'center',
      width: 220,
      editable: true,
      renderCell: (params)=>{
        return<> 
        <Typography
        sx={{}}
         onClick={()=>{
          handleRowClick(params.row)
        }}>{params.row.unit}</Typography>
        </>      
      },

    },
    {
        field: 'hsn_number',
        headerName: 'HSN number',
        // type: 'number',
        width: 180,  align: 'center',
        headerAlign: 'center',
        editable: true,
        renderCell: (params)=>{
            return<> 
            <Typography
            sx={{}}
             onClick={()=>{
              handleRowClick(params.row)
            }}>{params.row.hsn_number}</Typography>
            </>      
          },
      },
      {
        field: 'gst',
        headerName: 'GST',
        // type: 'number',
        width: 180,  align: 'center',
        headerAlign: 'center',
        editable: true,
        renderCell: (params)=>{
            return<>
            
            <Typography
            sx={{}}
             onClick={()=>{
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
            color:'white',
            backgroundColor:'green'
        },
       display:'flex',
       justifyContent: 'center',
       flexDirection:'column',
       alignItems: 'center',
    //    my:0.1
      }}
    >
      
        <Box sx={{width:'100%' , height:'100%',}} >
        <Navbar name={' Retail Management'} />
        <Box sx={{width:'80%' , height:'100%', mx:'10%' }} >


      <Box sx={{width:'100%' ,display:'flex' , justifyContent:"flex-end" }} >
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick} sx={{border:1 , backgroundColor:'#3457D5' , color:'white', fontSize:12 , mx:2,my:1}} >
        Add Product
      </Button>
      </Box>

      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        // onRowModesModelChange={handleRowModesModelChange}
        // onRowEditStop={handleRowEditStop}
        // processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        sx={
            {
                '& .element.style': {
                    color:'white',
                    backgroundColor:'green'
                } ,
                display:'flex', width:'100%',boxShadow:5,
               
            }
        }
      />
        </Box>
        {        open && <AddInventory open={open} setOpen={setOpen}  />}

        </Box>

    </Box>
  );
}