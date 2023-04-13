import React,{useState} from 'react';
import '../css/Logadmin.css';
import logo from "../images/Logo_mc.png"
import bg from "../images/medical.svg"
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

import {FaRegEyeSlash,FaRegEye} from "react-icons/fa"

const initialState = {
  username:"",
  password:""
}

const Logadmin = () => {
  const [state,setState]= useState(initialState);
  const {username,password} =state;
  const [showPassword,setSP] = useState(false)

  const navigate = useNavigate();

  const handleInputChange = (e) => {
        const {name,value} = e.target;
        setState({...state, [name]:value});
  }

  const logasAdmin = () =>{
    setTimeout(() => {
      if(username == "postgres"){
        axios.post("http://localhost:3001/api/login",{
          username: username,
          password: password,
      }).then(function (response) {
          if(response.status === 200){
              localStorage.setItem('isSignedAdmin', true);
              console.log(response.data)
              localStorage.clear()
              localStorage.setItem('accessToken', response.data.accessToken);
              localStorage.setItem('isSignedAdmin', true);
              // console.log(localStorage.getItem('isSignedIn'))
              localStorage.setItem('isSignedAdmin', true);
              console.log("Here")
              navigate('dashboard');
          }
      })
      .catch((error) => { // error is handled in catch block
          console.log(error)
      }) 

      }
     
}, 200);
  }


  return (
    <div className='container'>
      <div className='container-content'>
        <div className='left-content'>
          <div className='logo'>
            <img src={logo} alt="Medical care"/>
            <h5>MEDICAL CARE</h5>
          </div>
          <form className='form-content'>
            <div className='form-input'>
              <label>Username</label>
              <input 
                type="text" 
                placeholder="Enter your username"
                id="username"
                name="username"
                onChange = {handleInputChange}
                required 
              />
            </div>        
            <div className='form-input'>
              <label >Password</label>
                      {/* <div className='logo-password'> */}
                        <input  
                            placeholder="Enter your password"
                            id="password"
                            name="password"
                            type = {showPassword ? "text" : "password"}
                            onChange = {handleInputChange}
                            required />
                            {
                              showPassword && (
                                <FaRegEyeSlash id="icon-eye" onClick={()=>setSP(!showPassword)} />
                              )
                            }
                            {
                              !showPassword && (
                                <FaRegEye id="icon-eye" onClick={()=>setSP(!showPassword)} />
                              )
                            }
                        
                      {/* </div> */}
                     
                    </div>
                </form>
                <div className='form-btn'>
                      <div className='log-btn' onClick = {logasAdmin}>
                                    Sign in
                      </div>
                </div>
        </div>
        <div className='right-content'>
          <div className='bg-content'>
              <img src={bg} alt="medical"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logadmin
