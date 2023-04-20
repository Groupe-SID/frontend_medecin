import React,{useEffect,useState} from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import '../css/activity.css'
import axios from 'axios'

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
    <div className='activity-container'>
        <Sidebar/>
        <div className='activity-content'>
          <Topbar/>
          <div className='activity-body'>
            <div className='activity-header'>
              <h2>Users Activity</h2>
            </div>
            {
              showList && (
                <div className='liste_activity'>
                <div className='table_header_activity'>
                  <div className='td_activity'>
                    N°
                  </div>
                  <div className='td_activity'>
                    Username
                  </div>
                  <div className='td_activity'>
                    Opération
                  </div>
                  <div className='td_activity' id='table'>
                    Table
                  </div>
                  <div className='td_activity' id='detail'>
                    Détails
                  </div>
                  <div className='td_activity'>
                    Date
                  </div>
                </div>
                <div className='Misy_activity'>
                {
                  listActivity.length != 0 && listActivity.map((act,index)=>(
                    <div className='table_item_activity'>
                      <div className='item_activity'>
                        {act.id}
                      </div>
                      <div className='item_activity'>
                        {act.achieved_by}
                      </div>
                      <div className='item_activity'>
                        {act.operation}
                      </div>
                      <div className='item_activity' >
                        {act.activity_on}
                      </div>
                      <div className='item_activity' id='description'>
                        {act.description}
                      </div>
                      <div className='item_activity'>
                        {act.achieved_at.slice(0, 10)}
                      </div>
                    </div>
                  ))
                }
              </div>
              </div>
              )
            }
          </div>
        </div>
    </div>
  )
}

export default Activity