import React from 'react'
import '../css/topbar.css'
import {FiSearch, FiUser, FiSettings} from 'react-icons/fi'
import {IoMdNotificationsOutline} from 'react-icons/io'

const topbar = () => {
  return (
    <div className='topbar-container'>
        <div className='topbar-search'>
          <FiSearch className='fi-icon-search' size={30}/>
          <input 
                  type="text" 
                  placeholder="Search"
                  id="search"
                  name="search"
          />
        </div>
        <div className='topbar-icon'>
            <div className='notif-icon'>
              <IoMdNotificationsOutline className='fi-icon'/>
            </div>
            <div className='user-icon'>
              <FiUser className='fi-icon'/>
            </div>
            <div className='set-icon'>
              <FiSettings className='fi-icon' size={18}/>
            </div>
            
        </div>
    </div>
  )
}

export default topbar