import React,{useState} from 'react'
import { Spinner } from 'react-bootstrap';
import '../css/Loguser.css';
import { Link, useNavigate } from 'react-router-dom';
import fond_login_user from "../images/fond_login_user.png"
import axios from 'axios'

const initialState = {
    username:"",
    password:""
}

const Loguser = () => {
    const [state,setState]= useState(initialState);
    const {username,password} =state;
    const [loading, setLoading] = useState(false);
    const [validatedusername,setValidatedusername] = useState(true)
    const [validatedPassword, setValidatedPassword] = useState(true);
    const [showPass,setShowPass] = useState(false)
    const [errorPassword,setErrorPass] = useState(false)
    const [errorUsername,setErrorUsername] = useState(false)

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setState({...state, [name]:value});
    }

    // const loginUser = () =>{

    // }

    const validateLogin = () => {
        setLoading(true);
        if(!username) {
            setValidatedusername(false);
            setLoading(false);
            return null;
        };
        if(!password) {
            setValidatedPassword(false);
            setLoading(false);
            return null;
        };
       
        setTimeout(() => {
            axios.post("http://waiz-in-back-alb-124347689.us-west-2.elb.amazonaws.com:3000/api/login",{
                username: username,
                password: password,
            }).then(function (response) {
                console.log("STATUS CODE")
                console.log(response.status)
                if(response.status === 200){
                    localStorage.setItem('isSignedIn', true);
                    console.log(response.data)
                    localStorage.clear()
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('utilisateur',response.data.username);
                    localStorage.setItem('user_id',response.data.user_id);
                    localStorage.setItem('isSignedIn', true);
                    console.log(localStorage.getItem('isSignedIn'))
                    localStorage.setItem('isSignedIn', true);
                    console.log("Here")
                    navigate('/doctors');
                    console.log("Here againa")
                    setLoading(false);
                }
                
            })
            .catch((error) => { // error is handled in catch block
                var mes =error.message
                var newMes = mes.substr(-3)
                console.log(newMes)
                if(parseInt(newMes) == 400){
                    console.log("Miditra anaty 400")
                    setErrorUsername(false)
                    setErrorPass(true)
                    setLoading(false)
                }
                if(parseInt(newMes)  == 404){
                    console.log("Miditra anaty 404")
                    setErrorPass(false)
                    setErrorUsername(true)
                    setLoading(false)
                }
            })  
    }, 200);
    }

    return (
    <div className='container'>
        <div className='content_loguser'>
            <div className='left_content_lu'>
                <img src={fond_login_user} alt="Medical care"/>
            </div>
            <div className='right_content_lu'>
                <div className='texte_hello'>
                    Hello, you
                </div>
                <form className='form_login'>
                    <div className='input_login'>
                    
                    <label  style={{ 
                              color: !validatedusername && '#D32F2F',
                              fontWeight: !validatedusername && 'bold',
                      }}>Username</label>
                      {errorUsername &&
                          <p 
                            id="EmailHelpBlock" 
                            muted
                            style={{
                              fontSize: "10px",
                              color: "#D32F2F",
                              fontWeight: "bold"
                            }}
                            >
                              Username not found
                            </p>                                        
                      }
                        <input 
                            type="text" 
                            placeholder="Enter your username"
                            id="username"
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                            required 
                             style={{ 
                              border:!validatedusername && '1px solid #D32F2F'
                            }}
                            />
                    </div>
                            
                    <div className='input_login'>
                    
                    <label 
                      style={{ 
                              color: !validatedPassword && '#D32F2F',
                              fontWeight: !validatedPassword && 'bold',
                      }}>Password</label>
                      {errorPassword &&
                          <p 
                            id="EmailHelpBlock" 
                            muted
                            style={{
                              fontSize: "10px",
                              color: "#D32F2F",
                              fontWeight: "bold"
                            }}
                            >
                              Please verify your password
                            </p>                                        
                      }
                      
                      <input 
                          type= {showPass ? "text" : "password"}    
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
                    <div className='check'>
                        <input 
                            type = "checkbox"
                            checked = {showPass}
                            onChange={(e)=>{
                                if(showPass){
                                    setShowPass(false)
                                }
                                if(!showPass){
                                    setShowPass(true)
                                }
                            }}
                        />
                        <label>Show password</label>
                    </div>

                </form>
                <div 
                    className='bouton_login'
                    onClick={validateLogin}
                    >
                        {loading ?
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                                :
                                <div className='login_btn'>
                                    Sign in
                                </div>
                                
                        }
                    </div>
                            
                    <div className='signup_login'>
                        <p>New user ? </p>
                                
                        <Link id="link" to="/register">
                            <p id='creer_compte_login'>Create account</p>
                        </Link>
                    </div>
            </div>
            
        </div>
    </div>
  )
}

export default Loguser
