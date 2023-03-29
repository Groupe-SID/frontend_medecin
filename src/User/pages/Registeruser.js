import React,{useState} from 'react'
import { Spinner } from 'react-bootstrap';
import '../css/Registeruser.css';
import { Link, useNavigate } from 'react-router-dom';
import fond_login_user from "../images/fond_login_user.png"
import axios from 'axios'
import { GiCheckMark } from "react-icons/gi";

const initialState = {
  username: "",
  nom: "",
  prenoms: "",
  email: "",
  password: "",
  passwordConfirmation: "",
}

const Registeruser = () => {
  const [state,setState]= useState(initialState);
  const {username,password,nom,prenoms,email,passwordConfirmation} =state;
  const [errorMail, setErrorMail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form1, setForm1] = useState(true);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);
  const [form4, setForm4] = useState(false);

  const [validatednom, setValidatednom] = useState(true);
  const [validatedprenoms, setValidatedprenoms] = useState(true);
  const [validatedEmail, setValidatedEmail] = useState(true);
  const [validatedusername,setValidatedusername] = useState(true)
  const [validatedPassword, setValidatedPassword] = useState(true);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
      const {name,value} = e.target;
      setState({...state, [name]:value});
  }

  const validEmail = () => {
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    console.log(regex.test(email) === false)
    if(regex.test(email) === false){
        setErrorMail(true);
        return false;
    }
    return true;
}

const validateFirstForm = () => {
  setLoading(true);
  if(!nom) {
    setValidatednom(false);
    setLoading(false);
    return null;
  };
  if(!prenoms) {
  setValidatedprenoms(false);
    setLoading(false);
    return null;
  };
 
  setTimeout(() => {
      setLoading(false);
      setForm1(false);
      setForm2(true);  
      setForm3(false);    
      setForm4(false);     
  }, 500);
}

const validateSecondForm = () => {
  setLoading(true);
  validEmail();
  if(!email) {
      setValidatedEmail(false);
      setLoading(false);
      return null;
  }
  if(!username) {
      setValidatedusername(false);
      setLoading(false);
      return null;
  };

  setTimeout(() => {
    setLoading(false);
    setForm1(false);
    setForm2(false);  
    setForm3(true);
    setForm4(false);          
}, 500);
  
}

const validateLastForm = () => {
  setLoading(true);

  if(!password || !passwordConfirmation) {
      setValidatedPassword(false);
      setLoading(false);
      return null;
  };
  if(password !== passwordConfirmation) {
      setValidatedPassword(false);
      setLoading(false);
      setErrorPassword(true);
      return null;
  };

  axios.post("http://localhost:3001/api/register",{
    username: username,
    nom: nom,
    prenoms: prenoms,
    email: email,
    password: password,
    
  }).then(function (response) {
    if(response.status === 201){
      setLoading(false);
      setForm1(false);
      setForm2(false);
      setForm3(false); 
      setForm4(true);
    }
    })
    .catch((error) => { // error is handled in catch block
      console.log(error)
    })
  

}


  return (
    <div className='container'>
    <div className='content_loguser'>
        <div className='left_content_lu'>
            <img src={fond_login_user} alt="Medical care"/>
        </div>
        <div className='right_content_lu'>
            <div className='texte_hello'>
                Welcome...
            </div>
            <form className='form_login'>
              {
                form1 && (
                  <div>
                    <div className='input_login'>
                      <label 
                      style={{ 
                              color: !validatednom && '#D32F2F',
                              fontWeight: !validatednom && 'bold',
                      }}>First name</label>
                      <input 
                          type="text" 
                          placeholder="Enter your first name"
                          id="nom"
                          name="nom"
                          value={nom}
                          onChange={handleInputChange}
                          style={{ 
                            border:!validatednom && '1px solid #D32F2F'
                          }}
                          required />
                    </div>
                        
                    <div className='input_login'>
                        <label  style={{ 
                              color: !validatedprenoms && '#D32F2F',
                              fontWeight: !validatedprenoms && 'bold',
                      }}>Last name</label>
                        <input 
                            type="text" 
                            placeholder='Enter your last name'
                            id="prenoms"
                            name="prenoms"
                            value={prenoms}
                            onChange={handleInputChange}
                            style={{ 
                              border:!validatedprenoms && '1px solid #D32F2F'
                            }}
                            required/>
                    </div>
                    <div 
                      className='bouton_login1'
                      onClick={validateFirstForm}
                      >
                      {loading ?
                          <Spinner animation="border" role="status">
                              <span className="visually-hidden">Loading...</span>
                          </Spinner>
                              :
                              <div className='login_btn1'>
                                  Next
                              </div>
                              
                      }
                </div>
                    
                </div>
                )
              }
              {
                form2 && (
                  <div>
                    <div className='input_login'>
                      <label 
                      style={{ 
                              color: !validatedEmail && '#D32F2F',
                              fontWeight: !validatedEmail && 'bold',
                      }}>Email</label>
                      {errorMail &&
                          <p 
                            id="EmailHelpBlock" 
                            muted
                            style={{
                              fontSize: "10px",
                              color: "#D32F2F",
                              fontWeight: "bold"
                            }}
                            >
                              Please enter a valid email address
                            </p>                                        
                      }
                      <input 
                          type="text" 
                          placeholder="Enter your email"
                          id="email"
                          name="email"
                          value={email}
                          onChange={handleInputChange}
                          style={{ 
                            border:!validatedEmail && '1px solid #D32F2F'
                          }}
                          required />
                    </div>
                        
                    <div className='input_login'>
                        <label  style={{ 
                              color: !validatedusername && '#D32F2F',
                              fontWeight: !validatedusername && 'bold',
                      }}>Username</label>
                        <input 
                            type="text" 
                            placeholder='Enter your username'
                            id="username"
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                            style={{ 
                              border:!validatedusername && '1px solid #D32F2F'
                            }}
                            required/>
                    </div>
                    <div 
                      className='bouton_login1'
                      onClick={validateSecondForm}
                      >
                      {loading ?
                          <Spinner animation="border" role="status">
                              <span className="visually-hidden">Loading...</span>
                          </Spinner>
                              :
                              <div className='login_btn1'>
                                  Next
                              </div>
                              
                      }
                </div>
                    
                </div>
                )
              }

              {
                form3 && (
                  <div>
                    <div className='input_login'>
                      <label 
                      style={{ 
                              color: !validatedPassword && '#D32F2F',
                              fontWeight: !validatedPassword && 'bold',
                      }}>Password</label>
                      
                      <input 
                          type="password" 
                          placeholder="Enter your password"
                          id="password"
                          name="password"
                          value={password}
                          onChange={handleInputChange}
                          style={{ 
                            border:!validatedPassword && '1px solid #D32F2F'
                          }}
                          required />
                    </div>
                        
                    <div className='input_login'>
                    <label 
                      style={{ 
                        color: !validatedPassword && '#D32F2F',
                        fontWeight: !validatedPassword && 'bold',
                      }}
                    >
                    Confirm your password
                    </label>
                   {errorPassword &&
                      <p 
                        id="passwordHelpBlock" 
                        muted
                        style={{
                          fontSize: "10px",
                          color: "#D32F2F",
                          fontWeight: "bold"
                        }}
                        >
                          Please enter the same password
                        </p>                                        
                    }
                        <input 
                            type="password" 
                            placeholder='Confirm your password'
                            id="passwordConfirmation"
                            name="passwordConfirmation"
                            value={passwordConfirmation}
                            onChange={handleInputChange}
                            required
                            style={{ 
                                backgroundColor: !validatedPassword && '#D32F2F'
                            }}
                            />
                    </div>
                    <div 
                      className='bouton_login1'
                      onClick={validateLastForm}
                      >
                      {loading ?
                          <Spinner animation="border" role="status">
                              <span className="visually-hidden">Loading...</span>
                          </Spinner>
                              :
                              <div className='login_btn2'>
                                  Finish
                              </div>
                              
                      }
                </div>
                    
                </div>
                )
              }

              {
                form4 && (
                  <div className='success_notif'>
                    <GiCheckMark size={35} color="green" className='iconcheck'/>
                    User created successfully 
                  </div>
                )
              }
            </form>

                        
                <div className='signup_login'>
                    <p>Already have an account ? </p>
                            
                    <Link id="link" to="/">
                        <p id='creer_compte_login'>Sign in</p>
                    </Link>
                </div>
        </div>
        
    </div>
</div>
  )
}

export default Registeruser
