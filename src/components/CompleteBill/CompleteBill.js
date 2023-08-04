import React, { useEffect, useRef, useState } from 'react'
import {useLocation} from 'react-router-dom';
import axios from 'axios';
import { Box } from '@mui/system';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


export default function CompleteBill() {
    const location = useLocation();
    console.log(location.state)
  const tableRef = useRef();

    const [data , setData] = useState([])
    const [forProduct , setForProduct] = useState([])
    useEffect(() => {
        async function fetchData() {
          try {
            let response = await axios(
              `${process.env.REACT_APP_API_URL}/getInvoice?id=${location.state.row.id}`,
              {
                method: "GET",
                "Content-Type": "application/json",
              }
            );
    console.log("response of the all data is here" , response)
    setData(response.data.data)
    setForProduct(response.data.data.products)
          } catch (e) {
            console.log("Error : " + e);
          }
        }
    
        fetchData();
      }, [location.state]);
      
  const taxableamnttotal = forProduct.reduce((accumulator, item) => accumulator + item.taxable_amount, 0);
  const cgsttotal = forProduct.reduce((accumulator, item) => accumulator + item.cgst, 0);
  const sgsttotal = forProduct.reduce((accumulator, item) => accumulator + item.sgst, 0);
  const finaltotal = forProduct.reduce((accumulator, item) => accumulator + item.total, 0);

  function isValidDate(dateString) {
    const dateObj = new Date(dateString);
    return !isNaN(dateObj);
  }
  
  
  
  
  
  
  

      
  return (
    <Box sx={{width:'100%' , height:'100%'}} >
        {/* upper columnsstarts here */}
        <Box sx={{width:'100%' , height:60  , display:'flex' , justifyContent:'center' , alignItems:'center',mt:2}} >
            <Box sx={{width:'80%' , height:'100%' , border:1 , display:'flex' , flexDirection:'row' , justifyContent:'space-between'}} >
               {/* left side columns */}
                <Box sx={{width:'60%' , height:'100%',display:'flex' , flexDirection:'column',mx:1}} >
                <Typography sx={{ fontSize:14}} >Near S.T. stand, SANGLI-416416 , Maharashtra</Typography>
                <Typography sx={{ fontSize:14}}>Contact : 0233-2332553 E-Mail:bhideautostores@gmail.com</Typography>
                <Typography sx={{fontWeight:'bold', fontSize:14 }} >GSTIN: 27ABFPB8614D1Z1</Typography>
                </Box>
                {/* right side columns */}
                <Box sx={{width:'20%' , height:'100%', display:'flex' , flexDirection:'column',justifyContent:'center', alignItems:'flex-end',mx:1}} >
                <Typography>No: {data.invoice_number}</Typography>
                <Typography>Date: {isValidDate(data.invoice_date) ? new Date(data.invoice_date).toISOString().slice(0, 10) : "Invalid Date"}</Typography>
                </Box>
            </Box>
        </Box>
        {/* upper columns ends here */}
        <Box sx={{width:'100%' , height:70 , display:'flex' , flexDirection:'column' , justifyContent:'center' , alignItems:'center'}} >
            <Box sx={{width:'80%' , height:'100%' , border:1}} >
            <Typography sx={{fontWeight:'bold' ,mx:1}} >Bill To : {data.name}</Typography>
                <Typography sx={{fontWeight:'bold' ,mx:1}}>State : {data.state}</Typography>
                <Typography sx={{fontWeight:'bold' ,mx:1}}>GSTIN : {data.gst_number}</Typography>
            </Box>
         </Box>
{/* table code  */}
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
            my: 0.5,
            height: 400,
            overflowY: "scroll",
            minWidth: 400,
          }}
        >
          <Table ref={tableRef}>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>HSN Code</TableCell>
                <TableCell>GST</TableCell>
                <TableCell>QTY No</TableCell>
                <TableCell>Rate Per Unit</TableCell>
                <TableCell>Taxable Amount</TableCell>
                <TableCell>Cgst</TableCell>
                <TableCell>Sgst</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {forProduct?.map((row, index) => (
                <TableRow key={index}  >
                  <TableCell   ><Typography>{row.name}</Typography></TableCell>
                  <TableCell><Typography>{row.hsn}</Typography></TableCell>
                  <TableCell><Typography>{row.gst}</Typography></TableCell>
                  <TableCell><Typography>{row.quantity}</Typography></TableCell>
                  <TableCell><Typography>{row.selling_price}</Typography></TableCell>
                  <TableCell>{row.taxable_amount.toFixed(2)}</TableCell>   
                  <TableCell> {row.cgst}</TableCell>
                  <TableCell>{row.sgst}</TableCell>
                  <TableCell>{row.total.toFixed(2)}</TableCell>
               
               
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        
      </Box>
{/* table code */}
{/* tax and all amount code  below */}
         <Box
        sx={{
          width: "100%",
          height: '100%',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // overflowY:'auto',
        }}
      >
        {/* take code from here  */}
        <Box
          sx={{
            height: "100%",
            width: "80%",
            display: "flex",
            flexDirection: "row",
            boxShadow: 2
          }}
        >
          <Box
            sx={{
              width: "45%",
              height: "100%",
              border: 1,
              display: "flex",
              flexDirection: "row",
              borderColor: 'grey'
              //   borderBottom: 1,
              //   borderRight:1
            }}
          >
            <Box sx={{ width: "50%", height: "100%", borderRight: 1 }}>
              <Box
                sx={{
                  width: "100%",
                  height: 43,
                  borderBottom: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb:1
                }}
              >
                <Typography>HSN Code</Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "60%",
                  display: "flex",
                  flexDirection: "column",
                  overflowY:'auto',
                }}
              >
                   {forProduct.map((item) => (
                  <Typography sx={{ fontSize: 15, m: 0.5 }}>{item.name}</Typography>
                 ))} 
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "20%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTop: 1,
                  mt:2,
                }}
              >
                <Typography>Total Amount</Typography>
              </Box>
            </Box>
            {/* taxable amount */}
            <Box sx={{ width: "50%", height: "100%" }}>
              <Box
                sx={{
                  width: "100%",
                  height: 43,
                  borderBottom: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mb:1
                }}
              >
                <Typography>Taxable Amount</Typography>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "60%",
                  display: "flex",
                  flexDirection: "column",
                  display: "flex",
                  alignItems: "center",
                  overflowY:'auto',

                }}
              >
                {forProduct.map((item) => (
                  <Typography sx={{ fontSize: 15, m: 0.5 }}>{item.taxable_amount.toFixed(2)}</Typography>
                 ))} 
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "20%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderTop: 1,
                  mt:2
                }}
              >
                <Typography>{taxableamnttotal.toFixed(2)}</Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: "55%",
              height: "100%",
              // borderBottom: 1,
              borderTop: 1,
              borderRight: 1,
              display: "flex",
              flexDirection: "row",
            }}
          >
            {/* GST */}
            <Box sx={{ width: "33.3%", height: "100%", borderRight: 1 }}>
              <Box
                sx={{
                  width: "100%",
                  height: "20%",
                  borderBottom: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb:1
                }}
              >
                <Typography sx={{ fontSize: 14 }}>CGst</Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: "40%",
                    display: "flex",
                    justifyContent: "space-around",
                    borderTop: 1,
                   
                  }}
                >
                  <Typography sx={{ fontSize: 14 }}>Rate</Typography>
                  <Typography sx={{ fontSize: 14 }}>Amount</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "60%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Box sx={{ width: '50%', height: '100%', borderRight: 1, display: 'flex', flexDirection: 'column' }} >
                  {/* {['14%'].map((item) => (
                    <Typography sx={{ fontSize: 15, m: 0.5 }}>{item}</Typography>
                  ))} */}
                </Box>
                <Box sx={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', }} >
                {forProduct.map((item) => (
                  <Typography sx={{ fontSize: 15, m: 0.5 }}>{item.cgst.toFixed(2)}</Typography>
                 ))} 
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "20%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderBottom: 1,
                  borderTop: 1,
                  mt:2
                }}
              >
                <Typography sx={{ mx: 1 }} >{cgsttotal.toFixed(2)}</Typography>
              </Box>
            </Box>
            {/* CGST */}
            <Box sx={{ width: "33.3%", height: "100%", borderRight: 1 }}>
              <Box
                sx={{
                  width: "100%",
                  height: "20%",
                  borderBottom: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb:1
                }}
              >
                <Typography sx={{ fontSize: 14 }}>Sgst</Typography>
                <Box
                  sx={{
                    width: "100%",
                    height: "40%",
                    display: "flex",
                    justifyContent: "space-around",
                    borderTop: 1,
                  }}
                >
                  <Typography sx={{ fontSize: 14 }}>Rate</Typography>
                  <Typography sx={{ fontSize: 14 }}>Amount</Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "60%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Box sx={{ width: '50%', height: '100%', borderRight: 1, display: 'flex', flexDirection: 'column' }} >
                  {/* {rows.map((item) => ( */}
                    <Typography sx={{ fontSize: 15, m: 0.5 }}></Typography>
                  {/* ))} */}
                </Box>
                <Box sx={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', overflowY: 'auto' }} >
                {forProduct.map((item) => (
                  <Typography sx={{ fontSize: 15, m: 0.5 }}>{item.sgst.toFixed(2)}</Typography>
                 ))} 
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "20%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderTop: 1,
                  borderBottom: 1,
                  mt:2
                }}
              >
                <Typography sx={{ mx: 1 }} >{sgsttotal.toFixed(2)}</Typography>
              </Box>
            </Box>
            {/* Totalamount */}
            <Box sx={{ width: "33.3%", height: "100%", }}>
              <Box
                sx={{
                  width: "100%",
                  height: 43,
                  borderBottom: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb:1
                }}
              >
                <Typography sx={{ fontSize: 14 }}>Total Taxable Amount</Typography>

              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "60%",
                  display: "flex",
                  flexDirection: "row",
                }}
              >

                <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', overflowY: 'scroll' }} >
                {forProduct.map((item) => (
                  <Typography sx={{ fontSize: 15, m: 0.5 }}>{item.total.toFixed(2)}</Typography>
                 ))} 
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  height: "20%",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  borderTop: 1,
                  borderBottom: 1,
                  mt:2
                }}
              >
                <Typography sx={{ mx: 1 }} >{finaltotal.toFixed(2)}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>


      
    </Box>
  )
}
