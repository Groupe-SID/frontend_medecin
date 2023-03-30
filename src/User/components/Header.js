import React from 'react'
import "../css/header.css"
import {AiOutlineLogout} from "react-icons/ai"
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    if (window.confirm("Do you really want to leave?")) {
      localStorage.clear();
      navigate("/")
    }
  }
  return (
    <div className='header_content'>
      <AiOutlineLogout 
        onClick={logout}
        size={25} 
        id="compte_header" 
        color="rgba(30,30,30,0.7)"
        title='Log out'
        />
    </div>
  )
}

export default Header
