import React from 'react'
import styles from '../css/style.module.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import NavbarDefault from '../components/NavbarDefault'
import Home from '../pages/Home'
import About from '../pages/About'
import Services from '../pages/Services'
import Contacts from '../pages/Contacts'
import Register from '../pages/Register'
import SignIn from '../pages/SignIn'
import Logout from '../pages/Logout'
import Masterplan from '../pages/Masterplan'
import UserDetails from '../pages/UserDetails'

import Project from '../pages/Project'

function Navbar() {




   return (
      <Router>
         <NavbarDefault />
         <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/services" element={<Services/>} />
            <Route path="/contacts" element={<Contacts/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/signIn" element={<SignIn/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/masterplan" element={<Masterplan/>} />
            <Route path="/userdetails" element={<UserDetails/>} />

            <Route path="/project" element={<Project/>} />
         </Routes>
      </Router>
   );
}

export default Navbar;

