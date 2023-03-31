import React,{useEffect,useState} from 'react'
import "../css/patients.css"
import {ImStatsBars} from "react-icons/im"
import {FaUserMd} from "react-icons/fa"
import {HiUserGroup} from "react-icons/hi"
import {BsCalendarPlus} from "react-icons/bs"
import { Link } from 'react-router-dom';
import logo_mc from "../images/Logo_mc.png"
import Header from '../components/Header';
import axios from 'axios'
import {IoAddOutline,IoTrashSharp} from "react-icons/io5"
import {MdOutlineModeEdit} from "react-icons/md"

const initialPatient ={
  nom: "",
  prenoms: "",
  genre:"M",
  adresse: ""
}

const Patients = () => {
  const [listPatient,setListPatient] = useState([])
  const [accesToken,setAccessToken] = useState(localStorage.getItem('accessToken'))
  const [statePatient,setStatePatient] = useState(initialPatient)
  const {nom,prenoms,genre,adresse} = statePatient
  // const [rn,setRn] = useState(Math.floor(1000 + Math.random() * 9000))
  const [showAddForm,setShowAddForm] = useState(false)
  const [showEdit,setShowEdit] = useState(false)
  const [showList,setShowList] =useState(true)
  const [idModif,setIdModif] = useState()

  const loadData = async()=>{
    const response = await axios.get("http://localhost:3001/api/patients",{headers:{
      'Authorization':'Bearer '+ accesToken
    }});
    setListPatient(response.data);
  }

  
  const handleInputChange = (e) => {
    const {name,value} = e.target;
    setStatePatient({...statePatient, [name]:value});
  }

  useEffect(() => {
    getAllPatients();
    loadData();
 }, []);

  const getAllPatients = () => {
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
            setListPatient(response.data)
        }
      }).catch((error) => { // error is handled in catch block
        console.log(error)
      })  
    }
    catch(e){
      console.log(e)
    }
  }

  const savePatient = () =>{
    try
    {
      axios.post("http://localhost:3001/api/patients",{
        nom:nom,
        prenoms:prenoms,
        genre:genre,
        adresse:adresse
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

  const deletePatient = (id_doc) =>{
    if (window.confirm("Are you sur you want to delete this item?")) {
      try
      {
        axios.delete("http://localhost:3001/api/patients/"+id_doc,{
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

  const showEditForm = (id,nom,prenoms,genre,adresse) =>{
    // console.log(tarif)
    setStatePatient({
      nom:nom,
      prenoms:prenoms,
      genre:genre,
      adresse:adresse
    })
    setIdModif(id)
    setShowEdit(true)
    setShowAddForm(false)
    setShowList(false)
  }

  const editPatient = () =>{
    try
    {
      console.log(nom) 
      console.log(prenoms)  
      console.log(genre)  
      console.log(adresse )      
      axios.put("http://localhost:3001/api/patients/"+idModif,{
        nom:nom,
        prenoms:prenoms,
        // genre:genre,
        // adresse:adresse
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
            // setListPatient(response.data)
        }
      }).catch((error) => {
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
          <div className='middle_menu'>
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
          <div className='middle_menu' id='active_menu'>
            <div className='icon_menu'>
              <HiUserGroup size={20} color="black"/>
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
        <Header />
        <div className='content_patients'>
            <div className='titre_patients'>
                <div className='texte_patients'>
                    Patients
                </div>
                <div className='add_patients' onClick={()=>{
                  setStatePatient(initialPatient)
                  setShowAddForm(true)
                  setShowEdit(false)
                  setShowList(false)
                 
                  }}>
                    <IoAddOutline size={28} id="icon_add" color='white' fill='white'/>
                </div>
            </div>
            {
              showList && (
                <div className='liste_patients'>
                <div className='table_header_patients'>
                  <div className='td_patients'>
                    N°
                  </div>
                  <div className='td_patients'>
                    First Name
                  </div>
                  <div className='td_patients'>
                    Last Name
                  </div>
                  <div className='td_patients'>
                    Sexe
                  </div>
                  <div className='td_patients'>
                    Adresse
                  </div>
                  <div className='td_patients'>
                    Actions
                  </div>
                </div>
                {
                  listPatient.length != 0 && listPatient.map((doc,index)=>(
                    <div className='table_item_patients'>
                      <div className='item_patients'>
                        {doc.id}
                      </div>
                      <div className='item_patients'>
                        {doc.nom}
                      </div>
                      <div className='item_patients'>
                        {doc.prenoms}
                      </div>
                      <div className='item_patients'>
                        {doc.genre}
                      </div>
                      <div className='item_patients'>
                        {doc.adresse}
                      </div>
                      {/* <div className='item_patients'>
                        {doc.createdAt.slice(0, 10)}
                      </div> */}
                      <div className='item_patients'>
                        <MdOutlineModeEdit 
                          className='actions_icon' 
                          onClick={()=>showEditForm(doc.id,doc.nom,doc.prenoms,doc.genre,doc.adresse)}
                          size={20} 
                          color="rgb(30, 30, 30)"/>
                        <IoTrashSharp 
                          className='actions_icon' 
                          size={20} 
                          onClick={()=>deletePatient(doc.id)}
                          color="rgb(30, 30, 30)"/>
                      </div>
                    </div>
                  ))
                }
              </div>
              )
            }

            {
              showAddForm && (
                <div className='form_add_patients'>
                  <div className='texte_add_patient'>
                    Add patient
                  </div>
                  <form className='form_patients'>
                      <div className='input_patients'>
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
                      <div className='input_patients'>
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
                      <div className='input_patients'>
                          <label>Adresse</label>
                          <input 
                            type="text" 
                            placeholder="Adresse"
                            id="adresse"
                            name="adresse"
                            value={adresse}
                            onChange={handleInputChange}
                            required 
                          />
                      </div>
                      {/* <div className='input_patients'>
                        <label>Genre</label>
                        <input 
                          type="text" 
                          placeholder="Daily rate"
                          id="tarif"
                          name="tarif"
                          value={genre}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>   */}
                      <div className='btn_save_cancel'>
                        <div className='btn_save_patients' onClick={savePatient}>
                          Add
                        </div>
                        <div className='btn_cancel_patients' onClick={()=>{
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
                <div className='form_add_patients'>
                  <div className='texte_add_patient'>
                    Edit patient
                  </div>
                  <form className='form_patients'>
                      <div className='input_patients'>
                          <label>N° Patient :  <b> {idModif}</b></label>
                      </div>
                      <div className='input_patients'>
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
                      <div className='input_patients'>
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
                      {/* <div className='input_patients'>
                          <label>Adresse</label>
                          <input 
                            type="text" 
                            placeholder="Adresse"
                            id="adresse"
                            name="adresse"
                            value={adresse}
                            onChange={handleInputChange}
                            required 
                          />
                      </div> */}
                      <div className='btn_save_cancel'>
                        <div className='btn_save_patients' onClick={editPatient}>
                          Save
                        </div>
                        <div className='btn_cancel_patients' onClick={()=>{
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

export default Patients
