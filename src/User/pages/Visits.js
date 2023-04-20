import React, { useState,useEffect,useRef } from 'react'
import "../css/visits.css"
import {ImStatsBars} from "react-icons/im"
import {FaUserMd} from "react-icons/fa"
import {HiUserGroup} from "react-icons/hi"
import {BsCalendarPlus} from "react-icons/bs"
import { Link } from 'react-router-dom';
import logo_mc from "../images/Logo_mc.png"
import Header from '../components/Header';
import {IoAddOutline,IoTrashSharp} from "react-icons/io5"
import {MdOutlineModeEdit} from "react-icons/md"
import axios from 'axios'


const initialVisit = {
  id:null,
  medecin_id:"",
  patient_id:"",
  datecons:"",
  nbjour:"1"
}

const Visits = () => {
  const [accesToken,setAccessToken] = useState(localStorage.getItem('accessToken'))
  const [showList,setShowList] = useState(true)
  const [listVisit,setListVisit] = useState([])
  const [editVF,setEditVF] = useState(false)
  const [stateV,setStateV] = useState(initialVisit)
  const {id,medecin_id,patient_id,datecons,nbjour} = stateV
  const [listMed,setListMed] = useState([])
  const [nomP,setNomP] =useState()
  const [id_doc,setIdDoc] =useState()

  const [date, setDate] = useState();
  const dateInputRef = useRef(null);

  const handleChange = (e) => {
    setDate(e.target.value);
    };

  const loadData = async()=>{
    const response = await axios.get("http://localhost:3001/api/traitements",{headers:{
      'Authorization':'Bearer '+ accesToken
    }});
    setListVisit(response.data);
  }

  
  // const handleInputChange = (e) => {
  //   const {name,value} = e.target;
  //   setStateDoctor({...stateDoctor, [name]:value});
  // }

  useEffect(() => {
    getAllVisits();
    getAllDoctors();
    loadData();
 }, []);

  const getAllVisits = () => {
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
            setListVisit(response.data)
        }
      }).catch((error) => { // error is handled in catch block
        console.log(error)
      })  
    }
    catch(e){
      console.log(e)
    }
  }

  // const getMedecinById = (id) =>{
  //   try
  //   {
  //     axios.get("http://localhost:3001/api/medecins/"+id,{
  //       headers :{
  //         'Authorization':'Bearer '+ accesToken
  //       }
  //     }).then(function (response) {
  //       if(response.status === 200){
  //          return response.data.nom
  //       }
  //     }).catch((error) => { // error is handled in catch block
  //       console.log(error)
  //     })  
  //   }
  //   catch(e){
  //     console.log(e)
  //   }
  // }

  // const getPatientById = (id) =>{
  //   try
  //   {
  //     axios.get("http://localhost:3001/api/patients/"+id,{
  //       headers :{
  //         'Authorization':'Bearer '+ accesToken
  //       }
  //     }).then(function (response) {
  //       if(response.status === 200){
  //          setNomP(response.data.nom)
  //       }
  //     }).catch((error) => { // error is handled in catch block
  //       console.log(error)
  //     })  
  //   }
  //   catch(e){
  //     console.log(e)
  //   }
  // }

  

  const getAllDoctors = () => {
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


  const getAllMed = () =>{
    return listMed.map((med) => {
      return <option value={med.id} selected={med.id == medecin_id ? true:false}>{med.nom} 
             </option>;
    });
  }

  const deleteVisits = (id) =>{
    if (window.confirm("Are you sure you want to delete this consultation?")) {
      try
      {
        axios.delete("http://localhost:3001/api/traitements/"+id,{
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

  const handleSelect = (e) =>{
    setIdDoc(e.target.value)
  }

  const showEditVF = (id,medecin_id,patient_id,datecons) =>{
    setStateV({
      id:id,
      medecin_id:medecin_id,
      patient_id:patient_id,
      datecons:datecons
    })

    setDate(datecons.slice(0, 10))

    try
    {
      axios.get("http://localhost:3001/api/patients/"+patient_id,{
        headers :{
          'Authorization':'Bearer '+ accesToken
        }
      }).then(function (response) {
        if(response.status === 200){
          setNomP(response.data.nom + " " + response.data.prenoms)
          setEditVF(true)
          setShowList(false)

        }
      }).catch((error) => { // error is handled in catch block
        console.log(error)
      })  
    }
    catch(e){
      console.log(e)
    }

  } 

  const saveVisit = (id) =>{
    try
    {
      axios.put("http://localhost:3001/api/traitements/"+id,{
        patient_id:patient_id,
        medecin_id:id_doc,
        datecons:date,
        nbjour:nbjour
      },{
        headers :{
          'Authorization':'Bearer '+ accesToken
        }
      }).then(function (response) {
        if(response.status === 200){
            setShowList(true)
            setEditVF(false)
            setStateV(initialVisit)
            setDate(null)
            loadData()
            console.log(response.data)
            // setListPatient(response.data)
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
    <div className='content_accueil'>
    <div className='menu_verticale'>
      <div className='haut_verticale'>
        <img src={logo_mc} alt="Logo Medical Care" className='logo_mc'/>
        MEDICAL CARE
      </div>
      {/* <Link  id="link"  to="/accueil">
        <div className='middle_menu' >
              <div className='icon_menu'>
                <ImStatsBars size={20} color="rgb(214, 212, 212)"/>
              </div>
              Dashboard
        </div>
      </Link> */}

      <Link  id="link"  to="/doctors">
        <div className='middle_menu'>
          <div className='icon_menu'>
            <FaUserMd size={18} color="rgb(214, 212, 212)"/>
          </div>
          Doctors
        </div>
      </Link>

      <Link  id="link"  to="/patients">
        <div className='middle_menu'>
          <div className='icon_menu'>
            <HiUserGroup size={20} color="rgb(214, 212, 212)"/>
          </div>
          Patients
        </div>
      </Link>

      <Link  id="link"  to="/visits">
        <div className='middle_menu' id='active_menu'>
          <div className='icon_menu'>
            <BsCalendarPlus size={18} color="black"/>
          </div>
          Visits
        </div>
      </Link>
      

    </div>
    <div className='body_accueil'>
      <Header/>
      <div className='content_visits'>
            <div className='titre_visits'>
                <div className='texte_visits'>
                    Medical consultations
                </div>
                <div className='add_visits' onClick={()=>{
                  // setStateDoctor(initialDoctor)
                  // setShowAddForm(true)
                  // setShowEdit(false)
                  setShowList(false)
                 
                  }}>
                    <IoAddOutline size={28} id="icon_add" color='white' fill='white'/>
                </div>
            </div>
            {
              showList && (
                <div className='liste_visits'>
                <div className='table_header_visits'>
                  <div className='td_visits'>
                    N° 
                  </div>
                  <div className='td_visits'>
                    N° Doctor
                  </div>
                  <div className='td_visits'>
                    N° Patient
                  </div>
                  <div className='td_visits'>
                    Date
                  </div>
                  <div className='td_visits'>
                    Actions
                  </div>
                </div>
                {
                  listVisit.length != 0 && listVisit.map((doc,index)=>(
                    <div className='table_item_visits'>
                      <div className='item_visits'>
                        {doc.id}
                      </div>
                      <div className='item_visits'>
                        {doc.medecin_id}
                      </div>
                      <div className='item_visits'>
                        {doc.patient_id}
                      </div>
                      <div className='item_visits'>
                        {doc.datecons.slice(0, 10)}
                      </div>
                      <div className='item_visits'>
                        <MdOutlineModeEdit 
                          className='actions_icon' 
                          onClick={()=>showEditVF(doc.id,doc.medecin_id,doc.patient_id,doc.datecons)}
                          size={20} 
                          color="rgb(30, 30, 30)"/>
                        <IoTrashSharp 
                          className='actions_icon' 
                          size={20} 
                           onClick={()=>deleteVisits(doc.id)}
                          color="rgb(30, 30, 30)"/>
                      </div>
                    </div>
                  ))
                }
              </div>
              )
            }

            {
              editVF && (
                <div className='form_add_visits'>
                <div className='texte_add_visit'>
                  Edit consultation
                </div>
                <form className='form_visits'>
                    <div className='input_visits'>
                        <label>N° Patient :  <b> {patient_id}</b></label>
                        <input 
                        type="text" 
                        placeholder="First Name"
                        id="nom"
                        name="nom"
                        value={nomP}
                        disabled
                      />
                    </div>

                   <div className='input_visits'>
                      <label>N° Doctor : <b>{medecin_id}</b></label>
                      <select
                        className="form-control"
                        onChange={handleSelect}
                        >
                        {getAllMed()}
                      </select>
                    </div>
                    <div className='input_visits'>
                      <label>Pick a date</label>
                      <input
                        type="date"
                        value={date}
                        onChange={handleChange}
                        ref={dateInputRef}
                      />
                    </div>
                    <div className='btn_save_cancel'>
                      <div className='btn_save_visits' onClick={()=>
                        {
                          if(id != null && medecin_id != null && patient_id != null){
                            saveVisit(id)
                          }
                        }
                      
                      }>
                        Save
                      </div>
                      <div className='btn_cancel_visits' onClick={()=>{
                        setShowList(true)
                        setEditVF(false)
                        setStateV(initialVisit)                       
                        }}>
                        Cancel
                      </div>
                    </div>     
                </form>
              </div> 
              )
            } 

            
        </div>
    </div>
  </div>
  )
}

export default Visits
