import React,{useState} from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Navbar/Nav';
import {useNavigate} from 'react-router-dom'

const Layout = ({children}) => {

  return (
    <>
   <Nav />
   {children}
   <Footer />
    </>
  )
}

export default Layout