import React from 'react'
import '../css/dashboard.css'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import BarChart from '../components/BarChart'
import LineChart from '../components/LineChart'
import {FaUserMd, FaUsers, FaUserInjured, FaCalendar} from 'react-icons/fa'



const dashboard = () => {
  return (
    <div className='dashboard-container'>
        <Sidebar/>
        <div className='dashboard-content'>
          <Topbar/>
          <div className='dashboard-body'>
            <div className='dashboard-header'>
              <h2>Dashboard</h2>
            </div>
            <div className='dashboard-middle'>
              <div className='dashboard-card'>
                <div className='dashboard-card-content'>
                  <div className='card-title'>
                    <h4>Users</h4>
                    <FaUsers size={23} className="dash-icon"/>
                  </div>
                  <div className='card-number'>
                    <h4>50</h4>
                  </div>
                </div>
                <div className='dashboard-card-content'>
                  <div className='card-title'>
                    <h4>Doctors</h4>
                    <FaUserMd size={18} className="dash-icon"/>
                  </div>
                  <div className='card-number'>
                    <h4>10</h4>
                  </div>
                </div>
                <div className='dashboard-card-content'>
                  <div className='card-title'>
                    <h4>Patients</h4>
                    <FaUserInjured size={18} className="dash-icon"/>
                  </div>
                  <div className='card-number'>
                    <h4>40</h4>
                  </div>
                </div>
                <div className='dashboard-card-content'>
                  <div className='card-title'>
                    <h4>Visits</h4>
                    <FaCalendar size={18} className="dash-icon"/>
                  </div>
                  <div className='card-number'>
                    <h4>40</h4>
                  </div>
                </div>
              </div>
              <div className='dashboard-chart'>
                  <div className='chart-content'>
                    <BarChart className='barchart'/>
                  </div>
                  <div className='chart-content'>
                    <LineChart/>
                  </div>
              </div>
            </div>
          </div>
        </div>
        
    </div>
    
  )
}

export default dashboard