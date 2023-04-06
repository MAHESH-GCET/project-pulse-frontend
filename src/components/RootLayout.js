import React from 'react'
import { Outlet } from 'react-router-dom'
import  Navbar  from '../components/NavBar/Navbar'
function RootLayout() {
  return (
    <div>
      <div>
        <Navbar/>
      </div>
      <div>
      <Outlet />
      </div> 
    </div>
  )
}

export default RootLayout