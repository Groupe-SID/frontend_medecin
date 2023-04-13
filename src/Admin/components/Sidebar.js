import React from 'react'
import '../css/sidebar.css'
import logo from '../images/Logo_mc.png'
import {AiOutlineDashboard} from 'react-icons/ai'
import {FiUsers, FiActivity, FiLogOut, FiPieChart} from 'react-icons/fi'
import { Link } from 'react-router-dom'


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
                <Link  id="link"  to="/admin/dashboard">
                  <a href="" className='menuLink'>
                      <AiOutlineDashboard className='icon'/>
                      <span className='menu-text'>
                        Dashboard
                      </span>
                  </a>
                </Link>
              </li>

              <li className='list-item'>
                <Link  id="link"  to="/admin/users">
                  <a href="" className='menuLink'>
                      <FiUsers className='icon'/>
                      <span className='menu-text'>
                        Users
                      </span>
                  </a>
                </Link>
              </li>

              <li className='list-item'>
                <Link  id="link"  to="/admin/users">
                  <a href="" className='menuLink'>
                      <FiActivity className='icon'/>
                      <span className='menu-text'>
                        Activity
                      </span>
                  </a>
                </Link>
              </li>

              <li className='list-item'>
                <Link  id="link"  to="/admin/users">
                  <a href="" className='menuLink'>
                      <FiUsers className='icon'/>
                      <span className='menu-text'>
                        Medecins
                      </span>
                  </a>
                </Link>
              </li>

              <li className='list-item'>
                <Link  id="link"  to="/admin/users">
                  <a href="" className='menuLink'>
                      <FiUsers className='icon'/>
                      <span className='menu-text'>
                        Patients
                      </span>
                  </a>
                </Link>
              </li>

              <li className='list-item'>
                <Link  id="link"  to="/admin/users">
                  <a href="" className='menuLink'>
                      <FiUsers className='icon'/>
                      <span className='menu-text'>
                        Traitements
                      </span>
                  </a>
                </Link>
              </li>

              
            </ul>
        </div>
        <div className='sidebar-footer'>
            <a href="" className='menuLink'>
                <FiLogOut className='icon'/>
                <span className='menu-text'>
                  Log out
                </span>
            </a>
        </div>
    </div>
  )
}

export default sidebar