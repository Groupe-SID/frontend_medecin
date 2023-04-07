import React from 'react'
import '../css/dashboard.css'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'



const dashboard = () => {
  return (
    <div className='dashboard-container'>
        <Sidebar/>
        <Topbar/>
        Dashboard
    </div>
    
  )
}

export default dashboard