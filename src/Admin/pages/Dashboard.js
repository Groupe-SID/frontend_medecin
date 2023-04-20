import React, {useState, useEffect} from 'react'
import '../css/dashboard.css'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import BarChart from '../components/BarChart'
import LineChart from '../components/LineChart'
import axios from 'axios'
import {FaUserMd, FaUsers, FaUserInjured, FaCalendar} from 'react-icons/fa'

const initialValue = {
  nb_user:"",
  nb_med:"",
  nb_pat:"",
  nb_vis:""
}

const Dashboard = () => {
  const [listUser, setListUser] = useState([]);
  const [accesToken,setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [listMed, setListMed] = useState([]);
  const [listPat, setListPat] = useState([]);
  const [listVis, setListVis] = useState([]);


  const loadData = async()=>{
    const response = await axios.get("http://localhost:3001/api/users",{headers:{
      'Authorization':'Bearer '+ accesToken
    }});
    setListUser(response.data);

  }
  const loadDataMed = async()=>{
    const response = await axios.get("http://localhost:3001/api/medecins",{headers:{
      'Authorization':'Bearer '+ accesToken
    }});
    setListMed(response.data);
  }
  const loadDataPat = async()=>{
    const response = await axios.get("http://localhost:3001/api/patients",{headers:{
      'Authorization':'Bearer '+ accesToken
    }});
    setListPat(response.data);
  }
  const loadDataVis = async()=>{
    const response = await axios.get("http://localhost:3001/api/traitements",{headers:{
      'Authorization':'Bearer '+ accesToken
    }});
    setListVis(response.data);

  }

  useEffect(() => {
    getAllUsers();
    getAllMed();
    getAllPat();
    getAllVis();
    loadData();
    loadDataMed();
    loadDataPat();
    loadDataVis();
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

const getAllMed = () => {
  console.log(accesToken)
  try
  {
    axios.get("http://localhost:3001/api/medecins",{
      headers :{
        'Authorization':'Bearer '+ accesToken
      }
    }).then(function (response) {
      if(response.status === 200){
          console.log(response.data)
          setListMed(response.data)
      }
    }).catch((error) => { // error is handled in catch block
      console.log(error)
    })  
  }
  catch(e){
    console.log(e)
  }
}

const getAllPat = () => {
  console.log(accesToken)
  try
  {
    axios.get("http://localhost:3001/api/patients",{
      headers :{
        'Authorization':'Bearer '+ accesToken
      }
    }).then(function (response) {
      if(response.status === 200){
          console.log(response.data)
          setListPat(response.data)
      }
    }).catch((error) => { // error is handled in catch block
      console.log(error)
    })  
  }
  catch(e){
    console.log(e)
  }
}

const getAllVis = () => {
  console.log(accesToken)
  try
  {
    axios.get("http://localhost:3001/api/traitements",{
      headers :{
        'Authorization':'Bearer '+ accesToken
      }
    }).then(function (response) {
      if(response.status === 200){
          console.log(response.data)
          setListVis(response.data)
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
    <div className='dashboard-container'>
        <Sidebar/>
        <div className='dashboard-content'>
          <Topbar/>
          <div className='dashboard-body'>
            <div className='dashboard-header'>
              <h2>Dashboard</h2>
            </div>
            <div className='dashboard-middle'>
              <div className='dashboard-card'>
                <div className='dashboard-card-content'>
                  <div className='card-title'>
                    <h4>Users</h4>
                    <FaUsers size={23} className="dash-icon"/>
                  </div>
                  <div className='card-number'>
                    <h4>{listUser.length}</h4>
                  </div>
                </div>
                <div className='dashboard-card-content'>
                  <div className='card-title'>
                    <h4>Doctors</h4>
                    <FaUserMd size={18} className="dash-icon"/>
                  </div>
                  <div className='card-number'>
                    <h4>{listMed.length}</h4>
                  </div>
                </div>
                <div className='dashboard-card-content'>
                  <div className='card-title'>
                    <h4>Patients</h4>
                    <FaUserInjured size={18} className="dash-icon"/>
                  </div>
                  <div className='card-number'>
                    <h4>{listPat.length}</h4>
                  </div>
                </div>
                <div className='dashboard-card-content'>
                  <div className='card-title'>
                    <h4>Visits</h4>
                    <FaCalendar size={18} className="dash-icon"/>
                  </div>
                  <div className='card-number'>
                    <h4>{listVis.length}</h4>
                  </div>
                </div>
              </div>
              <div className='dashboard-chart'>
                  <div className='chart-content'>
                    <BarChart className='barchart'/>
                  </div>
                  <div className='chart-content'>
                    <LineChart/>
                  </div>
              </div>
            </div>
          </div>
        </div>
        
    </div>
    
  )
}

export default Dashboard