import { Box, Typography } from "@mui/material";
import React from "react";
import inventory from "../../Images/inventory.png";
import retail from "../../Images/retail.png";
import bill from "../../Images/bill.png";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const navigate = useNavigate();
const handleinventory=()=>{
    navigate('/inventory')
}
const handleretail=()=>{
    navigate('/retail')
}
const handlebill=()=>{
  navigate('/bill')

}
const handleStockist=()=>{
  navigate('/stockist')
}
const handlepurchase =()=>{
  navigate('/purchase')
}
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      {/* box 1 */}
      <Box
        sx={{
          width: "40%",
          height: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 500,
          ml: 1,
        }}
      >
        <Box
          sx={{
            width: "90%",
            height: "29%",
            backgroundColor: "#FF6B35",
            borderRadius: 3,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            // mr: -2,
          }}
          onClick={handleinventory}
        >
          <Box
            sx={{
              width: "40%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ color: "white", alignSelf: "center", fontSize: 20 , fontWeight:600}}
            >
              INVENTORY
            </Typography>
            <Typography
              sx={{ color: "white", alignSelf: "center", fontSize: 20 , fontWeight:600}}
            >
              MANAGEMENT
            </Typography>
          </Box>
          <Box
            sx={{
              width: "60%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={inventory} style={{ width: "80%", height: "80%" }} />
          </Box>
        </Box>
        <Box
          sx={{
            width: "90%",
            height: "29%",
            backgroundColor: "#FF6B35",
            borderRadius: 3,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            // mr: -2,
          }}
          onClick={handleretail}

        >
          <Box
            sx={{
              width: "40%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ color: "white", alignSelf: "center", fontSize: 20, fontWeight:600 }}
            >
              RETAILER
            </Typography>
            <Typography
              sx={{ color: "white", alignSelf: "center", fontSize: 20 , fontWeight:600 }}
            >
              MANAGEMENT
            </Typography>
          </Box>
          <Box
            sx={{
              width: "60%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={retail} style={{ width: "80%", height: "80%" }} />
          </Box>
        </Box>
        {/* third one */}
        <Box
          sx={{
            width: "90%",
            height: "29%",
            backgroundColor: "#FF6B35",
            borderRadius: 3,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            // mr: -2,
          }}
          onClick={handlepurchase}

        >
          <Box
            sx={{
              width: "40%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ color: "white", alignSelf: "center", fontSize: 20, fontWeight:600 }}
            >
              PURCHASE
            </Typography>
            <Typography
              sx={{ color: "white", alignSelf: "center", fontSize: 20 , fontWeight:600 }}
            >
              MANAGEMENT
            </Typography>
          </Box>
          <Box
            sx={{
              width: "60%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={retail} style={{ width: "80%", height: "80%" }} />
          </Box>
        </Box>


        
      </Box>
      {/* box 1 */}
      {/* box 2 */}

      <Box
        sx={{
          width: "40%",
          height: "100%",
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 500,
          ml: 1,
        }}
      >
        <Box
          sx={{
            width: "90%",
            height: "29%",
            backgroundColor: "#FF6B35",
            borderRadius: 3,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            // mr: -2,
          }}
          onClick={handlebill}
        >
          <Box
            sx={{
              width: "40%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ color: "white", alignSelf: "center", fontSize: 20 , fontWeight:600}}
            >
              BILLING
            </Typography>
            <Typography
              sx={{ color: "white", alignSelf: "center", fontSize: 20 , fontWeight:600}}
            >
              SYSTEM
            </Typography>
          </Box>
          <Box
            sx={{
              width: "60%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={inventory} style={{ width: "80%", height: "80%" }} />
          </Box>
        </Box>


        <Box
          sx={{
            width: "90%",
            height: "29%",
            backgroundColor: "#FF6B35",
            borderRadius: 3,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            // mr: -2,
          }}
          onClick={handleretail}

        >
          <Box
            sx={{
              width: "40%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ color: "white", alignSelf: "center", fontSize: 20, fontWeight:600 }}
            >
              BILL
            </Typography>
            <Typography
              sx={{ color: "white", alignSelf: "center", fontSize: 20 , fontWeight:600 }}
            >
              BOOK
            </Typography>
          </Box>
          <Box
            sx={{
              width: "60%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={retail} style={{ width: "80%", height: "80%" }} />
          </Box>
        </Box>
        {/* last box */}
        <Box
          sx={{
            width: "90%",
            height: "29%",
            backgroundColor: "#FF6B35",
            borderRadius: 3,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            // mr: -2,
          }}
          onClick={handleStockist}

        >
          <Box
            sx={{
              width: "40%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ color: "white", alignSelf: "center", fontSize: 20, fontWeight:600 }}
            >
              Stockist
            </Typography>
            <Typography
              sx={{ color: "white", alignSelf: "center", fontSize: 20 , fontWeight:600 }}
            >
              BOOK
            </Typography>
          </Box>
          <Box
            sx={{
              width: "60%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={retail} style={{ width: "80%", height: "80%" }} />
          </Box>
        </Box>


        
      </Box>

      {/* <Box
        sx={{
          width: "40%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          ml: 4,
        }}
      >
        <Box
          sx={{
            width: "90%",
            height: "86%",
            borderRadius: 5,
            backgroundColor: "#F7C59F",
            display:'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          onClick={handlebill}
        > 
        <img src={bill} style={{width:'60%', height:'60%'}}/>
        <Typography sx={{ color: "#555555", alignSelf: "center", fontSize: 20 , fontWeight:600  }}>BILLING SYSTEM</Typography>
         </Box>
      </Box> */}
      {/* box 2 */}
    </Box>
  );
}
