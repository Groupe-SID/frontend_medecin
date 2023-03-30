import React from 'react'
import "../css/doctors.css"
import Header from '../components/Header'
import {ImStatsBars} from "react-icons/im"
import {FaUserMd} from "react-icons/fa"
import {HiUserGroup} from "react-icons/hi"
import {BsCalendarPlus} from "react-icons/bs"
import { Link } from 'react-router-dom';
import logo_mc from "../images/Logo_mc.png"
import {IoAddOutline} from "react-icons/io5"


const Doctors = () => {
  return (
    <div className='content_accueil'>
      <div className='menu_verticale'>
        <div className='haut_verticale'>
            <img src={logo_mc} alt="Logo Medical Care" className='logo_mc'/>
          {/* <GiTreeBranch size={35} color="green"/> */}
          MEDICAL CARE
        </div>
        <Link  id="link"  to="/accueil">
          <div className='middle_menu'>
                <div className='icon_menu'>
                  <ImStatsBars size={20} color="rgb(214, 212, 212)"/>
                </div>
                Dashboard
          </div>
        </Link>

        <Link  id="link"  to="/doctors">
          <div className='middle_menu' id='active_menu'>
            <div className='icon_menu'>
              <FaUserMd size={18} color="black"/>
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
          <div className='middle_menu'>
            <div className='icon_menu'>
              <BsCalendarPlus size={18} color="rgb(214, 212, 212)"/>
            </div>
            Visits
          </div>
        </Link>
        

      </div>
      <div className='body_accueil'>
        <Header/>
        <div className='content_doctors'>
            <div className='titre_doctors'>
                <div className='texte_doctors'>
                    Doctors
                </div>
                <div className='add_doctors'>
                    <IoAddOutline size={28} id="icon_add" color='white' fill='white'/>
                </div>
            </div>
            <div className='liste_doctors'>
                
            </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors
