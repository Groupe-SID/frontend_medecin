import React from 'react'
import '../css/sidebar.css'
import logo from '../images/Logo_mc.png'
import {AiOutlineDashboard} from 'react-icons/ai'
import {FiUsers, FiActivity, FiLogOut} from 'react-icons/fi'
import {BsCalendarPlus} from 'react-icons/bs'
import { FaUserMd } from 'react-icons/fa'
import { HiUserGroup } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {
   const navigate = useNavigate();
  const logoutAdmin = () => {
    if (window.confirm("Do you really want to leave?")) {
      localStorage.clear();
      navigate("/admin")
    }
  }
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
                  <div  className='menuLink'>
                      <AiOutlineDashboard className='icon'/>
                      <span className='menu-text'>
                        Dashboard
                      </span>
                  </div>
                </Link>
              </li>

              <li className='list-item'>
                <Link  id="link"  to="/admin/users">
                  <div  className='menuLink'>
                      <FiUsers className='icon'/>
                      <span className='menu-text'>
                        Users
                      </span>
                  </div>
                </Link>
              </li>

              <li className='list-item'>
                <Link  id="link"  to="/admin/activity">
                  <div  className='menuLink'>
                      <FiActivity className='icon'/>
                      <span className='menu-text'>
                        Activity
                      </span>
                  </div>
                </Link>
              </li>

              <li className='list-item'>
                <Link  id="link"  to="/admin/medecins">
                  <div  className='menuLink'>
                      <FaUserMd size={18} className="icon"/>
                      <span className='menu-text'>
                        Medecins
                      </span>
                  </div>
                </Link>
              </li>

              <li className='list-item'>
                <Link  id="link"  to="/admin/patients">
                  <div  className='menuLink'>
                      <HiUserGroup  className='icon'/>
                      <span className='menu-text'>
                        Patients
                      </span>
                  </div>
                </Link>
              </li>

              <li className='list-item'>
                <Link  id="link"  to="/admin/traitements">
                  <div  className='menuLink'>
                      <BsCalendarPlus className="icon" size={18} />
                      <span className='menu-text'>
                        Traitements
                      </span>
                  </div>
                </Link>
              </li>

              
            </ul>
        </div>
        <div className='sidebar-footer' onClick={logoutAdmin}>
            <FiLogOut className='icon'/>
            Log out
        </div>
    </div>
  )
}

export default Sidebar