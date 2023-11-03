import React,{useEffect,useState} from 'react'
import "../css/doctors.css"
import Header from '../components/Header'
import {ImStatsBars} from "react-icons/im"
import {FaUserMd} from "react-icons/fa"
import {HiUserGroup} from "react-icons/hi"
import {BsCalendarPlus} from "react-icons/bs"
import { Link } from 'react-router-dom';
import logo_mc from "../images/Logo_mc.png"
import {IoAddOutline,IoTrashSharp} from "react-icons/io5"
import {MdOutlineModeEdit} from "react-icons/md"

import axios from 'axios'

const initialDoctor ={
  num_medecin: "",
  nom: "",
  prenoms: "",
  tarif:0,
  imageUrl: ""
}


const Doctors = () => {
  const [listDoc,setListDoc] = useState([])
  const [accesToken,setAccessToken] = useState(localStorage.getItem('accessToken'))
  const [stateDoctor,setStateDoctor] = useState(initialDoctor)
  const {num_medecin,nom,prenoms,tarif} = stateDoctor
  const [rn,setRn] = useState(Math.floor(1000 + Math.random() * 9000))
  const [showAddForm,setShowAddForm] = useState(false)
  const [showEdit,setShowEdit] = useState(false)
  const [showList,setShowList] =useState(true)
  const [idModif,setIdModif] = useState()
  const [UUsername,setUUsername] = useState(localStorage.getItem('utilisateur'))
  const [user_id,setUser_id] = useState(localStorage.getItem('user_id'))
  const [userInfo,setUserInfo] =useState()
  const [privMedecins,setPrivMedecins] = useState([])
  const [privPatients,setPrivPatients] = useState([])


  const loadData = async() => {
    const response = await axios.get("http://waiz-in-back-alb-124347689.us-west-2.elb.amazonaws.com:3000/api/medecins",{headers:{
      'Authorization':'Bearer '+ accesToken
    }});
    setListDoc(response.data);

    const response1 = await axios.get("http://waiz-in-back-alb-124347689.us-west-2.elb.amazonaws.com:3000/api/users/"+user_id,{headers:{
      'Authorization':'Bearer '+ accesToken
    }});
    setUserInfo(response1.data);
  }

  
  const handleInputChange = (e) => {
    const {name,value} = e.target;
    setStateDoctor({...stateDoctor, [name]:value});
  }

  useEffect(() => {
    getAllDoctors();
    getUserById();
    loadData();
 }, []);

  const getUserById = () =>{
    try
    {
      axios.get("http://waiz-in-back-alb-124347689.us-west-2.elb.amazonaws.com:3000/api/users/"+user_id,{
        headers :{
          'Authorization':'Bearer '+ accesToken
        }
      }).then(function (response) {
        if(response.status === 200){
            console.log(response.data)
            setUserInfo(response.data)
            setPrivMedecins(response.data.privileges.medecins)
            setPrivPatients(response.data.privileges.patients)
        }
      }).catch((error) => { // error is handled in catch block
        console.log(error)
      })  
    }
    catch(e){
      console.log(e)
    }

  }

  const getAllDoctors = () => {
    console.log(accesToken)
    try
    {
      axios.get("http://waiz-in-back-alb-124347689.us-west-2.elb.amazonaws.com:3000/api/medecins",{
        headers :{
          'Authorization':'Bearer '+ accesToken
        }
      }).then(function (response) {
        if(response.status === 200){
            console.log(response.data)
            setListDoc(response.data)
        }
      }).catch((error) => { // error is handled in catch block
        console.log(error)
      })  
    }
    catch(e){
      console.log(e)
    }
  }

  const saveDoctor = () =>{
    try
    {
      axios.post("http://waiz-in-back-alb-124347689.us-west-2.elb.amazonaws.com:3000/api/medecins",{
        num_medecin : rn,
        nom:nom,
        prenoms:prenoms,
        imageUrl:"imageUrl",
        tarif:tarif
      },{
        headers :{
          'Authorization':'Bearer '+ accesToken
        }
      }).then(function (response) {
        if(response.status === 201){
          setShowAddForm(false)
          setShowList(true)
          setShowEdit(false)
            loadData()
            console.log(response.data)
            // setListDoc(response.data)
        }
      }).catch((error) => { // error is handled in catch block
        console.log(error)
      })  
    }
    catch(e){
      console.log(e)
    }

  }

  const deleteDoctor = (id_doc) =>{
    if (window.confirm("Are you sure you want to delete this item?")) {
      try
      {
        axios.delete("http://waiz-in-back-alb-124347689.us-west-2.elb.amazonaws.com:3000/api/medecins/"+id_doc,{
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

  const showEditForm = (id,num_medecin,nom,prenoms,tarif) =>{
    console.log(tarif)
    setStateDoctor({
      nom:nom,
      prenoms:prenoms,
      tarif:parseInt(tarif),
      num_medecin:num_medecin
    })
    setIdModif(id)
    setShowEdit(true)
    setShowAddForm(false)
    setShowList(false)
  }

  const editDoctor = () =>{
    try
    {
      axios.put("http://waiz-in-back-alb-124347689.us-west-2.elb.amazonaws.com:3000/api/medecins/"+idModif,{
        num_medecin:num_medecin,
        nom:nom,
        prenoms:prenoms,
        tarif:tarif,
        imageUrl:"imageURL"
      },{
        headers :{
          'Authorization':'Bearer '+ accesToken
        }
      }).then(function (response) {
        if(response.status === 200){
            setIdModif(null)
            setShowEdit(false)
            setShowAddForm(false)
            setShowList(true)
            loadData()
            console.log(response.data)
            // setListDoc(response.data)
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
          {/* <GiTreeBranch size={35} color="green"/> */}
          MEDICAL CARE
        </div>
        {/* <Link  id="link"  to="/accueil">
          <div className='middle_menu'>
                <div className='icon_menu'>
                  <ImStatsBars size={20} color="rgb(214, 212, 212)"/>
                </div>
                Dashboard
          </div>
        </Link> */}

        <Link  id="link"  to="/doctors">
          <div className='middle_menu' id='active_menu'>
            <div className='icon_menu'>
              <FaUserMd size={18} color="black"/>
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
          <div className='middle_menu'>
            <div className='icon_menu'>
              <BsCalendarPlus size={18} color="rgb(214, 212, 212)"/>
            </div>
            Visits
          </div>
        </Link>
        

      </div>
      <div className='body_accueil'>
        <Header/>
        <div className='content_doctors'>
            <div className='titre_doctors'>
                <div className='texte_doctors'>
                    Doctors
                </div>

                {
                  privMedecins.includes('INSERT') && (
                    <div className='add_doctors' onClick={()=>{
                      setStateDoctor(initialDoctor)
                      setShowAddForm(true)
                      setShowEdit(false)
                      setShowList(false)
                     
                      }}>
                        <IoAddOutline size={28} id="icon_add" color='white' fill='white'/>
                    </div>
                  )
                }
                {
                  !privMedecins.includes('INSERT') && (
                    <div className='no_add_doctors'>
                        UNAUTHORIZED
                    </div>
                  )
                }
               
            </div>
            {
              showList && (
                <div className='liste_doctors'>
                <div className='table_header_doctors'>
                  <div className='td_doctors'>
                    N°
                  </div>
                  <div className='td_doctors'>
                    N° Registation
                  </div>
                  <div className='td_doctors'>
                    First Name
                  </div>
                  <div className='td_doctors'>
                    Last Name
                  </div>
                  <div className='td_doctors'>
                    Creation date
                  </div>
                  <div className='td_doctors'>
                    Actions
                  </div>
                </div>
                {
                  listDoc.length != 0 && listDoc.map((doc,index)=>(
                    <div className='table_item_doctors'>
                      <div className='item_doctors'>
                        {doc.id}
                      </div>
                      <div className='item_doctors'>
                        {doc.num_medecin}
                      </div>
                      <div className='item_doctors'>
                        {doc.nom}
                      </div>
                      <div className='item_doctors'>
                        {doc.prenoms}
                      </div>
                      <div className='item_doctors'>
                        {doc.createdAt.slice(0, 10)}
                      </div>
                      <div className='item_doctors'>
                        {
                          privMedecins.includes('UPDATE') &&(
                            <MdOutlineModeEdit 
                            className='actions_icon' 
                            onClick={()=>showEditForm(doc.id,doc.num_medecin,doc.nom,doc.prenoms,doc.tj)}
                            size={20} 
                            color="rgb(30, 30, 30)"/>
                          )
                        }
                        {
                          !privMedecins.includes('UPDATE') &&(
                            <div className='no_actions_icon'>
                              N/A
                            </div>
                          )
                        }

                        {
                          privMedecins.includes('DELETE') &&(
                            <IoTrashSharp 
                            className='actions_icon' 
                            size={20} 
                            onClick={()=>deleteDoctor(doc.id)}
                            color="rgb(30, 30, 30)"/>
                          )
                        }
                        {
                          !privMedecins.includes('DELETE') &&(
                            <div className='no_actions_icon'>
                              N/A
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

            {
              showAddForm && (
                <div className='form_add_doctors'>
                  <div className='texte_add_doctor'>
                    Add doctor
                  </div>
                  <form className='form_doctors'>
                      <div className='input_doctors'>
                          <label>N° registration :  <b> {rn}</b></label>

                          {/* <input 
                            type="text" 
                            // placeholder="First Name"
                            id="num_medecin"
                            name="num_medecin"
                            value={rn}
                            onChange={handleInputChange}
                            required 
                            disabled
                          /> */}
                      </div>
                      <div className='input_doctors'>
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
                      <div className='input_doctors'>
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
                      <div className='input_doctors'>
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
                        <div className='btn_save_doctors' onClick={saveDoctor}>
                          Add
                        </div>
                        <div className='btn_cancel_doctors' onClick={()=>{
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
                <div className='form_add_doctors'>
                  <div className='texte_add_doctor'>
                    Edit doctor
                  </div>
                  <form className='form_doctors'>
                      <div className='input_doctors'>
                          <label>N° registration :  <b> {num_medecin}</b></label>

                          {/* <input 
                            type="text" 
                            // placeholder="First Name"
                            id="num_medecin"
                            name="num_medecin"
                            value={rn}
                            onChange={handleInputChange}
                            required 
                            disabled
                          /> */}
                      </div>
                      <div className='input_doctors'>
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
                      <div className='input_doctors'>
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
                      <div className='input_doctors'>
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
                        <div className='btn_save_doctors' onClick={editDoctor}>
                          Save
                        </div>
                        <div className='btn_cancel_doctors' onClick={()=>{
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
            }

            
        </div>
      </div>
    </div>
  )
}

export default Doctors
