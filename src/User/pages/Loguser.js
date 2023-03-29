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
            axios.post("http://localhost:3001/api/login",{
                username: username,
                password: password,
            }).then(function (response) {
                if(response.status === 200){
                    setLoading(false);
                    console.log(response.data)
                    localStorage.clear()
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('isSignedIn', true);
                    navigate('/accueil');
                }
            })
            .catch((error) => { // error is handled in catch block
                console.log(error)
            })  
    }, 500);
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
