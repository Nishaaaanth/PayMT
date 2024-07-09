import { BrowserRouter, Route, Routes } from "react-router-dom"
// import {lazy} from "react";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";

// const Dashboard = lazy(()=>import("./pages/Dashboard"));
// const SendMoney = lazy(()=>import("./pages/SendMoney"));

function App() {
  return (
      <BrowserRouter>
            <Routes>
                <Route path='/' element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/sendmoney" element={<SendMoney />} />
            </Routes>
      </BrowserRouter> 
  )
}

export default App
