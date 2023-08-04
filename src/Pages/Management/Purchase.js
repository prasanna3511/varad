import React, { useState, useRef, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  TextField,
  Autocomplete,
} from "@mui/material";
import html2pdf from "html2pdf.js";
import Navbar from "../../components/Navbar";
import axios from "axios";

const ProductTable = () => {
  const [rows, setRows] = useState([]);

  const tableRef = useRef();
  const [productName, setProductName] = useState("");
  const [quantity, setquantity] = useState("");
  const [size, setsize] = useState("");

  const [dropDown, setDropDown] = useState([]);
  const [retailers, setRetailers] = useState([]);

  const [product, setProduct] = useState({});

  const [rowData, setRowData] = useState({});

  const [data, setData] = useState({});

  const handleDataChange = (key, value) => {
    setData((prevData) => {
      return {
        ...prevData,
        [key]: value
      }
    })
  }

  const [retailerRowData, setRetailerRowData] = useState({});

  const setProductData = (product) => {
    setRowData(product);
  }

  const setRetailerData = (retailer) => {
    setRetailerRowData(retailer);
    console.log("data of mew",retailer);
  }

  const [productDataArray, setProductDataArray] = useState([]);
  useEffect(() => {

    async function getProducts() {
      try {

        let response = await axios.get(`${process.env.REACT_APP_API_URL}/getpurchase`)


        console.log('all purchase requests : ', response.data.data)
        if (response.data.status) {
          setRows(response.data.data)
        }

      } catch (err) {
        console.log("error fetching data",err)
      }
    }
    getProducts()
  }, [])

  // Get all products
  useEffect(() => {

    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getproducts`);

        if (response.data.status) {
          console.log(response.data.data);
          setDropDown(response.data.data);
        }

      } catch (error) {
        console.log(error)
      }
    }

    fetchData();

  }, [])

  // Get all retailers
  useEffect(() => {

    async function fetchData() {

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getstockist`)
        if (response.data.status) {
          console.log(response.data.data)
          setRetailers(response.data.data)
        }
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();

  }, [])

  const [bname ,setBname] = useState([])
  const handleAddRow = async () => {

    console.log(data)

    let rate_per_unit = parseFloat((parseInt(data.purchase_amount) / (parseInt(data.qty) )).toFixed(2));
    // let tax_amount = parseFloat(rate_per_unit * parseInt(data.quantity));
    // let cgst = parseFloat(((parseInt(data.rate_per_unit) - rate_per_unit) / 2).toFixed(2));
    // let sgst = parseFloat(((parseInt(data.rate_per_unit) - rate_per_unit) / 2).toFixed(2));
    // let total = (tax_amount + cgst + sgst).toFixed(2);
    let temp = { ...rowData, qty: data.qty,name:data.name, rate_per_unit, purchase_amount:data.purchase_amount };

    setRows([...rows, temp]);
    // setRows(data);

    console.log("rows are",rows)
    let purchasedata = {
      purchase_date: (new Date()).toISOString().split('T')[0],
      stockist_id: retailerRowData.id,
      purchase_amount: data.purchase_amount,
      products:rows,
      qty:data.qty,
      rate_per_unit:rate_per_unit
    }
    console.log("this data for purchasing",purchasedata)
    // api
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/makepurchase`, purchasedata,
         
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
      //api
    setBname([...bname , rowData])
console.log("data to print",rows)
  };

  // useState(()=>{

  // }, [rowData])

  



  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Navbar name={"Purchase"} />
      </Box>
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
            width: "60%",
            my: 2,
            height: 400,
            overflowY: "scroll",
            minWidth: 400,
          }}
        >
          <Table ref={tableRef}>
            <TableHead>
              <TableRow>
                <TableCell>Retailer Name</TableCell>
             
                <TableCell>QTY Nos</TableCell>
                <TableCell>Rate Per Unit</TableCell>

              
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography>{row.name}</Typography>
                  </TableCell>
        
                  <TableCell>
                    <Typography>{row.qty}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.rate_per_unit}</Typography>
                  </TableCell>
               
                  <TableCell>
                    <Typography>{row.purchase_amount}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box
          sx={{
            width: "20%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
        >
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={retailers.map((option) => option.name)}
            sx={{ width: 300 }}
            value={data.retailer_name}
            onChange={(e) => {
              handleDataChange("retailer_name", e.target.innerText)
              setRetailerData(retailers.find((option) => option.name === e.target.innerText))
            }}
            renderInput={(params) => <TextField {...params} label="Retailer" />}
          />

          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={dropDown.map((option) => option.name)}
            sx={{ width: 300 }}
            value={data.name}
            onChange={(e) => {
              handleDataChange("name", e.target.innerText)
              setProductData(dropDown.find((option) => option.name === e.target.innerText))
            }}
            renderInput={(params) => <TextField {...params} label="Product" />}
          />
          <TextField
            placeholder="Quantity"
            size="small"
            sx={{ width: 300 }}
            value={data.qty}
            onChange={(e) => handleDataChange("qty", e.target.value)}
          />
          <TextField
            placeholder="Price"
            size="small"
            sx={{ width: 300 }}
            value={data.purchase_amount}
            onChange={(e) => handleDataChange("purchase_amount", e.target.value)}
          />
          <Button variant="contained" onClick={handleAddRow}>
            Add Product
          </Button>
       
        </Box>
      </Box>
        {/* take code till here  */}
    </Box>
  );
};

export default ProductTable;
