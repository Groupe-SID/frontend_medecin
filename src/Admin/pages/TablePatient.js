import React,{useEffect,useState} from 'react'
import '../css/tablepatient.css'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import axios from 'axios'
import { MdOutlineModeEdit } from 'react-icons/md'
import { BiCheck,BiX } from 'react-icons/bi'
import ReactSwitch from 'react-switch';

const TablePatient = () => {
    const [listUser,setListUser] = useState([])
    const [accesToken,setAccessToken] = useState(localStorage.getItem('accessToken'))
    const [showListU,setShowListU] = useState(true)
    const [showEditU,setShowEditU] = useState(false)
    const [idUser,setIdUser] = useState()
    const [usernameUser,setUsernameUser] = useState()
    const [privUser,setPrivUser] = useState([])
    const [toggleInsert,setTinsert] = useState(false)
    const [toggleUpdate,setTupdate] = useState(false)
    const [toggleDelete,setTdelete] = useState(false)

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

    const handleChangeInsert = val => {
        setTinsert(val)
    }
    const handleChangeUpdate = val => {
        setTupdate(val)
    }
    const handleChangeDelete = val => {
        setTdelete(val)
    }

    const showEUForm = (id,username,privilege) =>{
        setIdUser(id)
        setUsernameUser(username)
        setPrivUser(privilege)
        if(privilege.includes('INSERT')){
            setTinsert(true)
        }
        if(privilege.includes('UPDATE')){
            setTupdate(true)
        }
        if(privilege.includes('DELETE')){
            setTdelete(true)
        }

        setShowEditU(true)
        setShowListU(false)
    }

    const saveChangePrivilege = ()=>{
        try{
            axios.post("http://localhost:3001/api/users/privilege",{
                username: usernameUser,
                is_granted: toggleInsert,
                privilege_on: "patients",
                privilege_type: "INSERT"
            }).then(function (response) {
                if(response.status === 200){
                    axios.post("http://localhost:3001/api/users/privilege",{
                        username: usernameUser,
                        is_granted: toggleUpdate,
                        privilege_on: "patients",
                        privilege_type: "UPDATE"
                    }).then(function (response) {
                        if(response.status === 200){
                            axios.post("http://localhost:3001/api/users/privilege",{
                                username: usernameUser,
                                is_granted: toggleDelete,
                                privilege_on: "patients",
                                privilege_type: "DELETE"
                            }).then(function (response) {
                                if(response.status === 200){
                                    setTinsert(false)
                                    setTdelete(false)
                                    setTupdate(false)
                                    setIdUser(null)
                                    setUsernameUser(null)
                                    setPrivUser([])
                                    setShowEditU(false)
                                    setShowListU(true)
                                    loadData()
                                    
                                }
                            }).catch((error) => { // error is handled in catch block
                                console.log(error)
                            })
                        }
                    }).catch((error) => { // error is handled in catch block
                        console.log(error)
                    })
                }
            }).catch((error) => { // error is handled in catch block
                console.log(error)
            })

        }
        catch(e)
        {
            console.log(e)
        }
    }
  return (
       <div className='patients-container'>
        <Sidebar/>
        <div className='patients-content'>
            <Topbar/>
            <div className='patients-body'>
                <div className='patients-header'>
                    <h3>TABLE :<b>PATIENTS</b></h3>
                </div>
                {
                    showListU && (
                        <div className='patients-tableau'>
                            <div className='patients-liste'>
                                <div className='patients-table_header'>
                                    <div className='patients-td'>
                                        Users
                                    </div>
                                    <div className='patients-td'>
                                        INSERT
                                    </div>
                                    <div className='patients-td'>
                                        UPDATE
                                    </div>
                                    <div className='patients-td'>
                                        DELETE
                                    </div>
                                    <div className='patients-td'>
                                        Actions
                                    </div>
                                </div>
                                    {
                                    listUser.length != 0 && listUser.map((user,index)=>(
                                        <div className='patients-table_item'>
                                            <div className='patients-item'>
                                                {user.username}
                                            </div>
                                            <div className='patients-item'>
                                                {user.privileges.patients.includes('INSERT') ? 
                                                (
                                                    <BiCheck size={17} color="green" />
                                                ):(
                                                    <BiX size={17} color="grey" />
                                                )}
                                            </div>
                                            <div className='patients-item'>
                                                {user.privileges.patients.includes('UPDATE') ? 
                                                (
                                                    <BiCheck size={17} color="green" />
                                                ):(
                                                    <BiX size={17} color="grey" />
                                                )}
                                            </div>
                                            <div className='patients-item'>
                                                {user.privileges.patients.includes('DELETE') ? 
                                                (
                                                    <BiCheck size={17} color="green" />
                                                ):(
                                                    <BiX size={17} color="grey" />
                                                )}
                                            </div>
                                            <div className='patients-item'>
                                                {
                                                    user.username == "postgres" ? "ADMIN" :(
                                                        <MdOutlineModeEdit 
                                                            className='actions_icon' 
                                                            onClick={()=>showEUForm(user.id,user.username,user.privileges.patients)}
                                                            size={20} 
                                                            color="rgb(30, 30, 30)"/>
                                                    )      
                                                }
                                                
                                            </div>
                                        </div>
                                    ))
                                    }
                            </div>
                        </div>
                    )
                }

                {
                    showEditU && (
                        <div className='patients-content-edit'>
                            <div className='patients-edit_header'>
                                Modifier les privilèges de : <b> {usernameUser} </b>
                            </div>
                            <div className='patients-content-ligne'>
                                {/* {JSON.stringify(privUser)} */}
                                <div className='patients-ligne-edit'>
                                    <div className='patients-texte-edit'>
                                        <b>OPERATIONS</b>
                                    </div>
                                    <div className='patients-texte-edit'>
                                        <b>PRIVILEGES</b>
                                    </div>
                                </div>
                                <div className='patients-ligne-edit'>
                                    <div className='patients-texte-edit'>
                                        INSERT
                                    </div>
                                    <div className='patients-texte-edit'>
                                        <ReactSwitch
                                            checked={toggleInsert}
                                            onChange={handleChangeInsert}
                                        />
                                    </div>
                                    
                                </div>
                                <div className='patients-ligne-edit'>
                                    <div className='patients-texte-edit'>
                                        UPDATE
                                    </div>
                                    <div className='patients-texte-edit'>
                                        <ReactSwitch
                                            checked={toggleUpdate}
                                            onChange={handleChangeUpdate}
                                        />
                                    </div>
                                </div>
                                <div className='patients-ligne-edit'>
                                    <div className='patients-texte-edit'>
                                        DELETE
                                    </div>
                                    <div className='patients-texte-edit'>
                                        <ReactSwitch
                                            checked={toggleDelete}
                                            onChange={handleChangeDelete}
                                        />
                                    </div>
                                </div>
                                <div className='patients-btn-edit'>
                                    <div 
                                        className='patients-btnsave-edit'
                                        onClick={saveChangePrivilege}>
                                        SAVE CHANGES
                                    </div>
                                    <div 
                                        className='patients-btncancel-edit'
                                        onClick={()=>{
                                            setTinsert(false)
                                            setTdelete(false)
                                            setTupdate(false)
                                            setIdUser(null)
                                            setUsernameUser(null)
                                            setPrivUser([])
                                            setShowEditU(false)
                                            setShowListU(true)
                                        }}>
                                       CANCEL
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default TablePatient
