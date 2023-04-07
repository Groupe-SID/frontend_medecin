import React from 'react'
import '../css/sidebar.css'
import logo from '../images/Logo_mc.png'
import {AiOutlineDashboard} from 'react-icons/ai'
import {FiUsers, FiActivity, FiLogOut, FiPieChart} from 'react-icons/fi'


const sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='sidebar-logo'>
            <img src={logo} alt="Logo feuille"/>
            <h5>MEDICAL CARE</h5>
        </div>
        <div className='sidebar-menu'>
            <ul className='menu-list'>
              <li className='list-item'>
                  <a href="" className='menuLink'>
                      <AiOutlineDashboard/>
                      <span className='menu-text'>
                        Dashboard
                      </span>
                  </a>
              </li>

              <li className='list-item'>
                  <a href="" className='menuLink'>
                      <FiUsers/>
                      <span className='menu-text'>
                        Users
                      </span>
                  </a>
              </li>

              <li className='list-item'>
                  <a href="" className='menuLink'>
                      <FiActivity/>
                      <span className='menu-text'>
                        Activity
                      </span>
                  </a>
              </li>

              <li className='list-item'>
                  <a href="" className='menuLink'>
                      <FiPieChart/>
                      <span className='menu-text'>
                        Statistics
                      </span>
                  </a>
              </li>

              <li className='list-item'>
                  <a href="" className='menuLink'>
                      <FiLogOut/>
                      <span className='menu-text'>
                        Log out
                      </span>
                  </a>
              </li>
            </ul>
        </div>
    </div>
  )
}

export default sidebar