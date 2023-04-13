import React,{useEffect,useState} from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import '../css/users.css'
import axios from 'axios'

const initialUser ={
  num_user: "",
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
  const [rn,setRn] = useState(Math.floor(1000 + Math.random() * 9000))
  const [showEdit,setShowEdit] = useState(false)
  const [showList,setShowList] =useState(true)
  const [idModif,setIdModif] = useState()


  const loadData = async()=>{
    const response = await axios.get("http://localhost:3001/api/users",{headers:{
      'Authorization':'Bearer '+ accesToken
    }});
    setListUser(response.data);

  }

  
  const handleInputChange = (e) => {
    const {name,value} = e.target;
    setStateUser({...stateUser, [name]:value});
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
                <div className='liste_doctors'>
                <div className='table_header_doctors'>
                  <div className='td_doctors'>
                    N°
                  </div>
                  <div className='td_doctors'>
                    Username
                  </div>
                  <div className='td_doctors'>
                    Email
                  </div>
                  <div className='td_doctors'>
                    Name
                  </div>
                  <div className='td_doctors'>
                    Type
                  </div>
                </div>
                {
                  listUser.length != 0 && listUser.map((user,index)=>(
                    <div className='table_item_doctors'>
                      <div className='item_doctors'>
                        {user.id}
                      </div>
                      <div className='item_doctors'>
                        {user.username}
                      </div>
                      <div className='item_doctors'>
                        {user.email}
                      </div>
                      <div className='item_doctors'>
                        {user.nom_complet}
                      </div>
                      <div className='item_doctors'>
                        {user.is_admin}
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