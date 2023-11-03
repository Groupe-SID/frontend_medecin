import React,{useState,useEffect} from 'react'
import '../css/tablemedecin.css'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import axios from 'axios'
import { MdOutlineModeEdit } from 'react-icons/md'
import { BiCheck,BiX } from 'react-icons/bi'
import ReactSwitch from 'react-switch';


const TableMedecin = () => {
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
        const response = await axios.get("http://waiz-in-back-alb-124347689.us-west-2.elb.amazonaws.com:3000/api/users",{headers:{
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
            axios.get("http://waiz-in-back-alb-124347689.us-west-2.elb.amazonaws.com:3000/api/users",{
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
            axios.post("http://waiz-in-back-alb-124347689.us-west-2.elb.amazonaws.com:3000/api/users/privilege",{
                username: usernameUser,
                is_granted: toggleInsert,
                privilege_on: "medecins",
                privilege_type: "INSERT"
            }).then(function (response) {
                if(response.status === 200){
                    axios.post("http://waiz-in-back-alb-124347689.us-west-2.elb.amazonaws.com:3000/api/users/privilege",{
                        username: usernameUser,
                        is_granted: toggleUpdate,
                        privilege_on: "medecins",
                        privilege_type: "UPDATE"
                    }).then(function (response) {
                        if(response.status === 200){
                            axios.post("http://waiz-in-back-alb-124347689.us-west-2.elb.amazonaws.com:3000/api/users/privilege",{
                                username: usernameUser,
                                is_granted: toggleDelete,
                                privilege_on: "medecins",
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
    <div className='medecins-container'>
        <Sidebar/>
        <div className='medecins-content'>
            <Topbar/>
            <div className='medecins-body'>
                <div className='medecins-header'>
                    <h3>TABLE : <b>MEDECINS</b></h3>
                </div>
                {
                    showListU && (
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
                                            {user.privileges.medecins.includes('INSERT') ? 
                                            (
                                                <BiCheck size={17} color="green" />
                                            ):(
                                                <BiX size={17} color="grey" />
                                            )}
                                        </div>
                                        <div className='medecins-item'>
                                            {user.privileges.medecins.includes('UPDATE') ? 
                                            (
                                                <BiCheck size={17} color="green" />
                                            ):(
                                                <BiX size={17} color="grey" />
                                            )}
                                        </div>
                                        <div className='medecins-item'>
                                            {user.privileges.medecins.includes('DELETE') ? 
                                            (
                                                <BiCheck size={17} color="green" />
                                            ):(
                                                <BiX size={17} color="grey" />
                                            )}
                                        </div>
                                        <div className='medecins-item'>
                                            {
                                                user.username == "postgres" ? "ADMIN" :(
                                                    <MdOutlineModeEdit 
                                                        className='actions_icon' 
                                                        onClick={()=>showEUForm(user.id,user.username,user.privileges.medecins)}
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
                        <div className='medecins-content-edit'>
                            <div className='medecins-edit_header'>
                                Modifier les privilèges de : <b> {usernameUser} </b>
                            </div>
                            <div className='medecins-content-ligne'>
                                {/* {JSON.stringify(privUser)} */}
                                <div className='medecins-ligne-edit'>
                                    <div className='medecins-texte-edit'>
                                        <b>OPERATIONS</b>
                                    </div>
                                    <div className='medecins-texte-edit'>
                                        <b>PRIVILEGES</b>
                                    </div>
                                </div>
                                <div className='medecins-ligne-edit'>
                                    <div className='medecins-texte-edit'>
                                        INSERT
                                    </div>
                                    <div className='medecins-texte-edit'>
                                        <ReactSwitch
                                            checked={toggleInsert}
                                            onChange={handleChangeInsert}
                                        />
                                    </div>
                                    
                                </div>
                                <div className='medecins-ligne-edit'>
                                    <div className='medecins-texte-edit'>
                                        UPDATE
                                    </div>
                                    <div className='medecins-texte-edit'>
                                        <ReactSwitch
                                            checked={toggleUpdate}
                                            onChange={handleChangeUpdate}
                                        />
                                    </div>
                                </div>
                                <div className='medecins-ligne-edit'>
                                    <div className='medecins-texte-edit'>
                                        DELETE
                                    </div>
                                    <div className='medecins-texte-edit'>
                                        <ReactSwitch
                                            checked={toggleDelete}
                                            onChange={handleChangeDelete}
                                        />
                                    </div>
                                </div>
                                <div className='medecins-btn-edit'>
                                    <div 
                                        className='medecins-btnsave-edit'
                                        onClick={saveChangePrivilege}>
                                        SAVE CHANGES
                                    </div>
                                    <div 
                                        className='medecins-btncancel-edit'
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

export default TableMedecin
