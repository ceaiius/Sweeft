
import axios from 'axios';
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Users from "./pages/Users.jsx"
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/users/:id" element={<Users/>}/>
      </Routes>
    </Router>
  
  );
}

export default App;
