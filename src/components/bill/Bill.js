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
import Navbar from "../Navbar";
import axios from "axios";

const ProductTable = () => {
  const [rows, setRows] = useState([]);

  const tableRef = useRef();


  const [dropDown, setDropDown] = useState([]);
  const [retailers, setRetailers] = useState([]);
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
    console.log(retailer);
  }

  const [productDataArray, setProductDataArray] = useState([]);

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
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/getretailers`)
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
  let total
  const handleAddRow = () => {

    console.log(data.rate_per_unit)

    let rate_per_unit = parseFloat((parseInt(data.rate_per_unit) / (parseInt(rowData.gst) / 100 + 1)).toFixed(2));
    let tax_amount = parseFloat(rate_per_unit * parseInt(data.quantity));
    let cgst = parseFloat(((parseInt(data.rate_per_unit) - rate_per_unit) / 2).toFixed(2));
    let sgst = parseFloat(((parseInt(data.rate_per_unit) - rate_per_unit) / 2).toFixed(2));
     total = (tax_amount + cgst + sgst).toFixed(2);
    let temp = { ...rowData, qty: data.quantity, rate_per_unit, tax_amount, cgst, sgst, total };
    setRows([...rows, temp]);
    console.log("rows are",rowData)
    setBname([...bname , rowData])
console.log("data to print",bname)
  };

  // useState(()=>{

  // }, [rowData])
  const taxamnt = rows.reduce((accumulator, item) => accumulator + item.tax_amount, 0);
  const cgsttotal = rows.reduce((accumulator, item) => accumulator + item.cgst, 0);
  const sgsttotal = rows.reduce((accumulator, item) => accumulator + item.sgst, 0);
  const totalamnt = rows.reduce((accumulator, item) => accumulator + parseFloat(item.total), 0);

  const handleDownloadPDF = () => {


    let dataForRequest = {
      invoiceDate: (new Date()).toISOString().split('T')[0],
      retailerId: retailerRowData.retailer_id,
      products: rows,
      billing_amnt: totalamnt
    }

    console.log(dataForRequest);


    try{

      const response = axios.post(`${process.env.REACT_APP_API_URL}/createinvoice`, dataForRequest);

      console.log(response.data);


    }catch(e){
      console.log(e);
    }


    const element = tableRef.current.cloneNode(true);
    // const rows = element.querySelectorAll("tr");

    const companyName = "Bhide Works";
    const companyAddress = "Abhaynagr sangali";
    const phoneNumber = "Phone Number";
    const thankYouText = "Thank you!";
    const contentDiv = document.createElement("div");
    contentDiv.style.display = "flex";
    contentDiv.style.flexDirection = "column";
    contentDiv.style.justifyContent = "center";
  contentDiv.style.alignItems = "center";

    const headerDiv = document.createElement("div");
    headerDiv.style.width = '800px';
    headerDiv.style.height = 400;
    headerDiv.style.textAlign = "center";
    headerDiv.style.display = "flex";
    headerDiv.style.flexDirection = "column";
    // headerDiv.style.alignItems = "center";
    // headerDiv.style.justifyContent = "center";
    
    // this code for new box
    const additionalContentDiv = document.createElement("div");
    additionalContentDiv.style.width = '100%';
    additionalContentDiv.style.display = "flex";
    additionalContentDiv.style.flexDirection = "row";
    additionalContentDiv.style.justifyContent = "space-between";
    additionalContentDiv.style.marginTop = "20px";
  
    // HSN code
    const hsnDiv = document.createElement("div");
    hsnDiv.style.width = "20%";
    hsnDiv.style.border = "1px solid black";

    const hsnTitle = document.createElement("div");
    hsnTitle.textContent = "HSN Code";
    hsnDiv.appendChild(hsnTitle);
    rows.forEach((item) => {
      const hsnItem = document.createElement("div");
      hsnItem.textContent = item.hsn;
      hsnDiv.appendChild(hsnItem);
    });
    additionalContentDiv.appendChild(hsnDiv);
  
    // Taxable amount
    const taxableAmountDiv = document.createElement("div");
    taxableAmountDiv.style.width = "20%";
    const taxableAmountTitle = document.createElement("div");
    taxableAmountTitle.textContent = "Taxable Amount";
    taxableAmountDiv.appendChild(taxableAmountTitle);
    rows.forEach((item) => {
      const taxableAmountItem = document.createElement("div");
      const formattedTaxableAmount = item.tax_amount.toFixed(3);

      taxableAmountItem.textContent = formattedTaxableAmount;
      taxableAmountDiv.appendChild(taxableAmountItem);
    });
    additionalContentDiv.appendChild(taxableAmountDiv);
  
    // SGST
    const sgstDiv = document.createElement("div");
    sgstDiv.style.width = "20%";
    const sgstTitle = document.createElement("div");
    sgstTitle.textContent = "SGST";
    sgstDiv.appendChild(sgstTitle);
    rows.forEach((item) => {
      const sgstItem = document.createElement("div");
      sgstItem.textContent = item.sgst;
      sgstDiv.appendChild(sgstItem);
    });
    additionalContentDiv.appendChild(sgstDiv);
  
    // CGST
    const cgstDiv = document.createElement("div");
    cgstDiv.style.width = "20%";
    const cgstTitle = document.createElement("div");
    cgstTitle.textContent = "CGST";
    cgstDiv.appendChild(cgstTitle);
    rows.forEach((item) => {
      const cgstItem = document.createElement("div");
      cgstItem.textContent = item.cgst;
      cgstDiv.appendChild(cgstItem);
    });
    additionalContentDiv.appendChild(cgstDiv);
  
    // Total taxable amount
    const totalTaxableAmountDiv = document.createElement("div");
    totalTaxableAmountDiv.style.width = "20%";
    const totalTaxableAmountTitle = document.createElement("div");
    totalTaxableAmountTitle.textContent = "Total Taxable Amount";
    totalTaxableAmountDiv.appendChild(totalTaxableAmountTitle);
    rows.forEach((item) => {
      const totalTaxableAmountItem = document.createElement("div");
      totalTaxableAmountItem.textContent = item.total;
      totalTaxableAmountDiv.appendChild(totalTaxableAmountItem);
    });
    additionalContentDiv.appendChild(totalTaxableAmountDiv);
  
    contentDiv.appendChild(additionalContentDiv);
    //new box code ends here


    const companyNameElement = document.createElement("div");
    companyNameElement.textContent = companyName;

    const companyAddressElement = document.createElement("div");
    companyAddressElement.textContent = companyAddress;

    const billToDiv = document.createElement("div");
    billToDiv.style.border = "1px solid black";
    billToDiv.style.padding = "10px";
    billToDiv.style.marginTop = "10px";

    const billToLine = document.createElement("div");
    billToLine.textContent = "Bill to: prasanna joshi";

    const stateLine = document.createElement("div");
    stateLine.textContent = "State: maharashtra";

    const gstInLine = document.createElement("div");
    gstInLine.textContent = "GstIn: 2722828282";

    billToDiv.appendChild(billToLine);
    billToDiv.appendChild(stateLine);
    billToDiv.appendChild(gstInLine);

    headerDiv.appendChild(companyNameElement);
    headerDiv.appendChild(companyAddressElement);
    headerDiv.appendChild(billToDiv);

    const tableDiv = document.createElement("div");
    tableDiv.style.width = '100%';
    // tableDiv.style.border = "1px solid black";

    tableDiv.appendChild(element);

    const footerDiv = document.createElement("div");
    footerDiv.style.width = "100%";
    footerDiv.style.textAlign = "center";
    footerDiv.textContent = `${phoneNumber}\n${thankYouText}`;

    contentDiv.appendChild(headerDiv);
    contentDiv.appendChild(tableDiv);
    contentDiv.appendChild(additionalContentDiv);
    contentDiv.appendChild(footerDiv);

    const opt = {
      margin: 1,
      filename: "product_table.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 , width:800 , display:'flex' , justifyContent:'center', alignItems: 'center'},
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(contentDiv).save();  
  };
  



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
        <Navbar name={" Billing"} />
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
                <TableCell>Product Name</TableCell>
                <TableCell>HSN Code</TableCell>
                <TableCell>GST</TableCell>
                <TableCell>QTY Nos</TableCell>
                <TableCell>Rate per Unit</TableCell>
                <TableCell>Taxable Amount</TableCell>
                <TableCell>CGST</TableCell>
                <TableCell>SGST</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography>{row.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.hsn}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.gst}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.qty}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.rate_per_unit}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.tax_amount}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.cgst}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.sgst}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>{row.total}</Typography>
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
            value={data.quantity}
            onChange={(e) => handleDataChange("quantity", e.target.value)}
          />
          <TextField
            placeholder="Price"
            size="small"
            sx={{ width: 300 }}
            value={data.rate_per_unit}
            onChange={(e) => handleDataChange("rate_per_unit", e.target.value)}
          />
          <Button variant="contained" onClick={handleAddRow}>
            Add Product
          </Button>
          <Button variant="contained" onClick={handleDownloadPDF}>
            Generate Bill
          </Button>
        </Box>
      </Box>
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
            width: "90%",
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
                {bname.map((item) => (
                  <Typography sx={{ fontSize: 15, m: 0.5 }}>{item.hsn}</Typography>
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
                {rows.map((item) => (
                  <Typography sx={{ fontSize: 15, m: 0.5 }}>{item.tax_amount}</Typography>
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
                <Typography>{taxamnt}</Typography>
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
                  {rows.map((item) => (
                    <Typography sx={{ fontSize: 15, m: 0.5 }}>{item.cgst}</Typography>
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
                <Typography sx={{ mx: 1 }} >{cgsttotal}</Typography>
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
                  {rows.map((item) => (
                    <Typography sx={{ fontSize: 15, m: 0.5 }}></Typography>
                  ))}
                </Box>
                <Box sx={{ width: '50%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', overflowY: 'auto' }} >
                {rows.map((item) => (
                    <Typography sx={{ fontSize: 15, m: 0.5 }}>{item.sgst}</Typography>
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
                <Typography sx={{ mx: 1 }} >{sgsttotal}</Typography>
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
                {rows.map((item) => (
                    <Typography sx={{ fontSize: 15, m: 0.5 }}>{item.total}</Typography>
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
                <Typography sx={{ mx: 1 }} >{totalamnt}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* take code till here  */}
    </Box>
  );
};

export default ProductTable;
