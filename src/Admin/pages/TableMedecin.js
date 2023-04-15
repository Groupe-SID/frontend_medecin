import React,{useState,useEffect} from 'react'
import '../css/tablemedecin.css'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import axios from 'axios'
import { MdOutlineModeEdit } from 'react-icons/md'
import { IoTrashSharp } from 'react-icons/io5'

const TableMedecin = () => {
    const [listUser,setListUser] = useState([])
    const [accesToken,setAccessToken] = useState(localStorage.getItem('accessToken'))

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
    

  return (
    <div className='medecins-container'>
        <Sidebar/>
        <div className='medecins-content'>
            <Topbar/>
            <div className='medecins-body'>
                <div className='medecins-header'>
                    <h3>Opération sur la table Medecins</h3>
                </div>
                <div className='medecins-tableau'>
                    <div className='medecins-liste'>
                        <div className='medecins-table_header'>
                            <div className='medecins-td'>
                                Users
                            </div>
                            <div className='medecins-td'>
                                INSERT
                            </div>
                            <div className='medecins-td'>
                                UPDATE
                            </div>
                            <div className='medecins-td'>
                                DELETE
                            </div>
                            <div className='medecins-td'>
                                Actions
                            </div>
                        </div>
                        {
                        listUser.length != 0 && listUser.map((user,index)=>(
                            <div className='medecins-table_item'>
                            <div className='medecins-item'>
                                {user.username}
                            </div>
                            <div className='medecins-item'>
                                {user.privileges.medecins.includes('INSERT')?"True":"False"}
                            </div>
                            <div className='medecins-item'>
                                {user.privileges.medecins.includes('UPDATE')?"True":"False"}
                            </div>
                            <div className='medecins-item'>
                                {user.privileges.medecins.includes('DELETE')?"True":"False"}
                            </div>
                            <div className='medecins-item'>
                                <MdOutlineModeEdit 
                                className='actions_icon' 
                                // onClick={()=>showEditForm(doc.id,doc.num_medecin,doc.nom,doc.prenoms,doc.tj)}
                                size={20} 
                                color="rgb(30, 30, 30)"/>
                            </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TableMedecin
