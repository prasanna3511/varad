import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';

import Navbar from '../../components/Navbar'
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
} from '@mui/x-data-grid-generator';
import { display } from '@mui/system';
import AddRetail from '../../components/Managment/AddRetail'
import { Table, TableBody, TableCell,Paper, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { ReportGmailerrorred } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



export default function FullFeaturedCrudGrid() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const tableRef = useRef();

  const [rowModesModel, setRowModesModel] = useState({});
  const [open, setOpen] = useState(false)
  const [forUpdate, setForUpdate] = useState(false)

  useEffect(() => {

    async function fetchData() {

      try {

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getallbills`)
console.log("all invoice : ",response.data.data)
        if (response.data.status) {
        //   console.log(response.data.data)
          setData(response.data.data)
          console.log(response.data.data[3].id)
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

  const [forRow , setForRow]=useState({})
  const handleRowClick = (row) => {
    // console.log(row)
    setForRow(row)
    // setOpen(!open)
    setForUpdate(true)
    navigate('/completebill',{state :{hello:true,row}})

  }
  return (
    <Box
      sx={{
        height: 600,
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
      }}
    >

      <Box sx={{ width: '100%', height: '100%', }} >
        <Navbar name={'Bill Book'} />
        <Box sx={{ width: '100%', height: '100%', my:2 , display:'flex' , justifyContent:'center' , alignItems:'center'}} >
<Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            width: "80%",
            my: 2,
            height: 550,
            overflowY: "scroll",
            minWidth: 400,
          }}
        >
          <Table ref={tableRef}>
            <TableHead>
              <TableRow>
                <TableCell>Bill ID</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Total Amount</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>Billing Date</TableCell>



            
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={index} onClick={()=>{handleRowClick(row)}} >
                  <TableCell   >
                    <Typography>{row.id}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.billing_amnt}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.mbl_number}</Typography>
                  </TableCell>
                  <TableCell>
                  {new Date(row.invoice_date).toISOString().slice(0, 10)}
                  </TableCell>
               
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        
      </Box>
       
        </Box>
        {open && <AddRetail open={open} setOpen={setOpen} update={forUpdate} forRow={forRow} />}

      </Box>

    </Box>
  );
}