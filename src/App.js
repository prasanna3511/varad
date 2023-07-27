import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard/Dashboard';
import Inventory from './Pages/Management/Inventory';
import Retail from './Pages/Management/Retail';
import Bill from '../src/components/bill/Bill'
import Stockist from './Pages/Management/Stockist'
import Purchase from './Pages/Management/Purchase'
import BillBook from './Pages/Management/BillBook'
import CompleteBill from './components/CompleteBill/CompleteBill';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={  <Login/>} />
    <Route path="/dashboard" element={  <Dashboard/>} />
    <Route path="/inventory" element={  <Inventory/>} />
    <Route path="/retail" element={  <Retail/>} />
    <Route path="/bill" element={  <Bill/>} />
    <Route path="/stockist" element={  <Stockist/>} />
    <Route path="/purchase" element={  <Purchase/>} />
    <Route path="/billbook" element={  <BillBook/>} />
    <Route path="/completebill" element={  <CompleteBill/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
