import React from 'react'
import Home from '../pages/Home'
import Users from '../pages/Users'
import {Routes, Route, useLocation} from "react-router-dom"
import {AnimatePresence} from "framer-motion"

function Animated() {

const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home/>}/>
            <Route path="/users/:id" element={<Users/>}/>
        </Routes>
    </AnimatePresence>
    
  )
}

export default Animated