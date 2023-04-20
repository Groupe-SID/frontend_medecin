import React,{useEffect,useState} from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import '../css/users.css'
import axios from 'axios'
import {FiTrash} from 'react-icons/fi'

const initialUser ={
  id_user: "",
  username: "",
  email: "",
  nom_complet:"",
  is_admin: false,
  imageUrl: ""
}

const Users = () => {
  const [listUser,setListUser] = useState([])
  const [accesToken,setAccessToken] = useState(localStorage.getItem('accessToken'))
  const [stateUser,setStateUser] = useState(initialUser)
  const {num_user,username,email,nom_complet,is_admin} = stateUser
  const [showList,setShowList] =useState(true)


  const loadData = async()=>{
    const response = await axios.get("http://localhost:3001/api/users",{headers:{
      'Authorization':'Bearer '+ accesToken
    }});
    setListUser(response.data);

  }

  useEffect(() => {
    getAllUsers();
    loadData();
 }, []);

 const getAllUsers = () => {
  console.log(accesToken)
  try
  {
    axios.get("http://localhost:3001/api/users",{
      headers :{
        'Authorization':'Bearer '+ accesToken
      }
    }).then(function (response) {
      if(response.status === 200){
          console.log(response.data)
          setListUser(response.data)
      }
    }).catch((error) => { // error is handled in catch block
      console.log(error)
    })  
  }
  catch(e){
    console.log(e)
  }
}

const deleteUser = (id_user) =>{
  if (window.confirm("Are you sur you want to delete this item?")) {
    try
    {
      axios.delete("http://localhost:3001/api/users/"+id_user,{
        headers :{
          'Authorization':'Bearer '+ accesToken
        }
      }).then(function (response) {
        if(response.status === 200){
            loadData()
        }
      }).catch((error) => { // error is handled in catch block
        console.log(error)
      })  
    }
    catch(e){
      console.log(e)
    }
  }
}


  return (
    <div className='user-container'>
        <Sidebar/>
        <div className='user-content'>
          <Topbar/>
          <div className='user-body'>
            <div className='user-header'>
              <h2>Users</h2>
            </div>
            {
              showList && (
                <div className='liste_users'>
                <div className='table_header_users'>
                  <div className='td_users'>
                    N°
                  </div>
                  <div className='td_users'>
                    Username
                  </div>
                  <div className='td_users'>
                    Email
                  </div>
                  <div className='td_users'>
                    Name
                  </div>
                  <div className='td_users'>
                    Type
                  </div>
                  <div className='td_users'>
                    Action
                  </div>
                </div>
                {
                  listUser.length != 0 && listUser.map((user,index)=>(
                    <div className='table_item_users'>
                      <div className='item_users'>
                        {user.id}
                      </div>
                      <div className='item_users'>
                        {user.username}
                      </div>
                      <div className='item_users'>
                        {user.email}
                      </div>
                      <div className='item_users'>
                        {user.nom_complet}
                      </div>
                      <div className='item_users'>
                        {user.is_admin == true ? "Admin" : "user"}
                      </div>
                      <div className='item_users'>
                        {
                          user.is_admin && (
                            <div>
                              ADMIN
                            </div>
                          )
                        }
                        {
                          !user.is_admin && (
                            <div className='action_delete' onClick={()=>deleteUser(user.id)}>
                              <p>Delete</p>
                              <FiTrash
                                className='actions_icon' 
                                size={15} 
                                color="#ffffff"/>
                            </div>
                          )
                        }
                        
                      </div>
                    </div>
                  ))
                }
              </div>
              )
            }
          </div>
        </div>
    </div>
  )
}

export default Users