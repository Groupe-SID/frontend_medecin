import React,{useEffect,useState} from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import '../css/users.css'
import axios from 'axios'
import {FiTrash} from 'react-icons/fi'

const initialActivity ={
    id: "",
    nom_table: "",
    operation: "",
    description: "",
    username: "",
    full_name: "",
    date_activity: ""
}

const Activity = () => {
  const [listActivity,setListActivity] = useState([])
  const [accesToken,setAccessToken] = useState(localStorage.getItem('accessToken'))
  const [stateActivity,setStateActivity] = useState(initialActivity)
  const {id,nom_table,operation,description,username,full_name,date_activity} = stateActivity
  const [showList,setShowList] =useState(true)


  const loadData = async()=>{
    const response = await axios.get("http://localhost:3001/api/users_activities",{headers:{
      'Authorization':'Bearer '+ accesToken
    }});
    setListActivity(response.data);

  }

  useEffect(() => {
    getAllActivity();
    loadData();
 }, []);

 const getAllActivity = () => {
  console.log(accesToken)
  try
  {
    axios.get("http://localhost:3001/api/users_activities",{
      headers :{
        'Authorization':'Bearer '+ accesToken
      }
    }).then(function (response) {
      if(response.status === 200){
          console.log(response.data)
          setListActivity(response.data)
      }
    }).catch((error) => { // error is handled in catch block
      console.log(error)
    })  
  }
  catch(e){
    console.log(e)
  }
}


  return (
    <div className='user-container'>
        <Sidebar/>
        <div className='user-content'>
          <Topbar/>
          <div className='user-body'>
            <div className='user-header'>
              <h2>Users Activity</h2>
            </div>
            {
              showList && (
                <div className='liste_users'>
                <div className='table_header_users'>
                  <div className='td_users'>
                    N°
                  </div>
                  <div className='td_users'>
                    Table
                  </div>
                  <div className='td_users'>
                    Opération
                  </div>
                  <div className='td_users'>
                    Description
                  </div>
                  <div className='td_users'>
                    Username
                  </div>
                  <div className='td_users'>
                    Full Name
                  </div>
                  <div className='td_users'>
                    Date
                  </div>
                </div>
                {
                  listActivity.length != 0 && listActivity.map((act,index)=>(
                    <div className='table_item_users'>
                      <div className='item_users'>
                        {act.id}
                      </div>
                      <div className='item_users'>
                        {act.nom_table}
                      </div>
                      <div className='item_users'>
                        {act.operation}
                      </div>
                      <div className='item_users'>
                        {act.description}
                      </div>
                      <div className='item_users'>
                        {act.username}
                      </div>
                      <div className='item_users'>
                        {act.full_name}
                      </div>
                      <div className='item_users'>
                        {act.date_activity}
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

export default Activity