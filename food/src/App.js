import './App.css';
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import MyOrder from "./screens/MyOrder";

import {CartProvider} from "./Components/ContextReducer";
import React from "react"; 
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
        <CartProvider>
    <Router>
      <Routes>
        
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/createUser" element={<SignUp/>}/>
        <Route exact path="/MyOrder" element={<MyOrder/>}/>
        
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
