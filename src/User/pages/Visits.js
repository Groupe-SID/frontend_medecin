import React, { useState,useEffect } from 'react'
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

const Visits = () => {
  const [accesToken,setAccessToken] = useState(localStorage.getItem('accessToken'))
  const [showList,setShowList] = useState(true)
  const [listVisit,setListVisit] = useState([])

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

  const getMedecinById = (id) =>{
    try
    {
      axios.get("http://localhost:3001/api/medecins/"+id,{
        headers :{
          'Authorization':'Bearer '+ accesToken
        }
      }).then(function (response) {
        if(response.status === 200){
           return response.data.nom
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
      <Link  id="link"  to="/accueil">
        <div className='middle_menu' >
              <div className='icon_menu'>
                <ImStatsBars size={20} color="rgb(214, 212, 212)"/>
              </div>
              Dashboard
        </div>
      </Link>

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
                          // onClick={()=>showEditForm(doc.id,doc.num_medecin,doc.nom,doc.prenoms,doc.tj)}
                          size={20} 
                          color="rgb(30, 30, 30)"/>
                        <IoTrashSharp 
                          className='actions_icon' 
                          size={20} 
                          // onClick={()=>deleteDoctor(doc.id)}
                          color="rgb(30, 30, 30)"/>
                      </div>
                    </div>
                  ))
                }
              </div>
              )
            }

            {/* {
              showAddForm && (
                <div className='form_add_visits'>
                  <div className='texte_add_doctor'>
                    Add doctor
                  </div>
                  <form className='form_visits'>
                      <div className='input_visits'>
                          <label>N° registration :  <b> {rn}</b></label>
                      </div>
                      <div className='input_visits'>
                        <label>First Name</label>
                        <input 
                          type="text" 
                          placeholder="First Name"
                          id="nom"
                          name="nom"
                          value={nom}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      <div className='input_visits'>
                        <label>Last Name</label>
                        <input 
                          type="text" 
                          placeholder="Last Name"
                          id="prenoms"
                          name="prenoms"
                          value={prenoms}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>  
                      <div className='input_visits'>
                        <label>tarif</label>
                        <input 
                          type="number" 
                          placeholder="Daily rate"
                          id="tarif"
                          name="tarif"
                          value={parseInt(tarif)}
                          onChange={handleInputChange}
                          required 
                        />
              
                      </div>  
                      <div className='btn_save_cancel'>
                        <div className='btn_save_visits' onClick={saveDoctor}>
                          Add
                        </div>
                        <div className='btn_cancel_visits' onClick={()=>{
                          setShowAddForm(false)
                          setShowEdit(false)
                          setShowList(true)
                          }}>
                          Cancel
                        </div>
                      </div>     
                  </form>
                </div>  
              )
            }

            {
              showEdit && (
                <div className='form_add_visits'>
                  <div className='texte_add_doctor'>
                    Edit doctor
                  </div>
                  <form className='form_visits'>
                      <div className='input_visits'>
                          <label>N° registration :  <b> {num_medecin}</b></label>
                      </div>
                      <div className='input_visits'>
                        <label>First Name</label>
                        <input 
                          type="text" 
                          placeholder="First Name"
                          id="nom"
                          name="nom"
                          value={nom}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                      <div className='input_visits'>
                        <label>Last Name</label>
                        <input 
                          type="text" 
                          placeholder="Last Name"
                          id="prenoms"
                          name="prenoms"
                          value={prenoms}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>  
                      <div className='input_visits'>
                        <label>tarif</label>
                        <input 
                          type="number" 
                          placeholder="Daily rate"
                          id="tarif"
                          name="tarif"
                          value={tarif}
                          onChange={handleInputChange}
                          required 
                        />
              
                      </div>  
                      <div className='btn_save_cancel'>
                        <div className='btn_save_visits' onClick={editDoctor}>
                          Save
                        </div>
                        <div className='btn_cancel_visits' onClick={()=>{
                          setShowList(true)
                          setShowAddForm(false)
                          setShowEdit(false)
                         
                          }}>
                          Cancel
                        </div>
                      </div>     
                  </form>
                </div>  
              )
            } */}

            
        </div>
    </div>
  </div>
  )
}

export default Visits
