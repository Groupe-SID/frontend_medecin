import React from 'react'
import "../css/visits.css"
import {ImStatsBars} from "react-icons/im"
import {FaUserMd} from "react-icons/fa"
import {HiUserGroup} from "react-icons/hi"
import {BsCalendarPlus} from "react-icons/bs"
import { Link } from 'react-router-dom';
import logo_mc from "../images/Logo_mc.png"
import Header from '../components/Header';

const Visits = () => {
  return (
    <div className='content_accueil'>
    <div className='menu_verticale'>
      <div className='haut_verticale'>
        <img src={logo_mc} alt="Logo Medical Care" className='logo_mc'/>
        MEDICAL CARE
      </div>
      <Link  id="link"  to="/accueil">
        <div className='middle_menu' >
              <div className='icon_menu'>
                <ImStatsBars size={20} color="rgb(214, 212, 212)"/>
              </div>
              Dashboard
        </div>
      </Link>

      <Link  id="link"  to="/doctors">
        <div className='middle_menu'>
          <div className='icon_menu'>
            <FaUserMd size={18} color="rgb(214, 212, 212)"/>
          </div>
          Doctors
        </div>
      </Link>

      <Link  id="link"  to="/patients">
        <div className='middle_menu'>
          <div className='icon_menu'>
            <HiUserGroup size={20} color="rgb(214, 212, 212)"/>
          </div>
          Patients
        </div>
      </Link>

      <Link  id="link"  to="/visits">
        <div className='middle_menu' id='active_menu'>
          <div className='icon_menu'>
            <BsCalendarPlus size={18} color="black"/>
          </div>
          Visits
        </div>
      </Link>
      

    </div>
    <div className='body_accueil'>
      <Header/>
    </div>
  </div>
  )
}

export default Visits
