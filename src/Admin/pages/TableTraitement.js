import React,{useState,useEffect} from 'react'
import '../css/tabletraitement.css'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import axios from 'axios'
import { MdOutlineModeEdit } from 'react-icons/md'
import { BiCheck,BiX } from 'react-icons/bi'
import ReactSwitch from 'react-switch';

const TableTraitement = () => {
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
                privilege_on: "traitements",
                privilege_type: "INSERT"
            }).then(function (response) {
                if(response.status === 200){
                    axios.post("http://localhost:3001/api/users/privilege",{
                        username: usernameUser,
                        is_granted: toggleUpdate,
                        privilege_on: "traitements",
                        privilege_type: "UPDATE"
                    }).then(function (response) {
                        if(response.status === 200){
                            axios.post("http://localhost:3001/api/users/privilege",{
                                username: usernameUser,
                                is_granted: toggleDelete,
                                privilege_on: "traitements",
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
    <div className='traitements-container'>
    <Sidebar/>
    <div className='traitements-content'>
        <Topbar/>
        <div className='traitements-body'>
            <div className='traitements-header'>
                <h3>TABLE : <b>traitements</b></h3>
            </div>
            {
                showListU && (
                    <div className='traitements-tableau'>
                        <div className='traitements-liste'>
                            <div className='traitements-table_header'>
                                <div className='traitements-td'>
                                    Users
                                </div>
                                <div className='traitements-td'>
                                    INSERT
                                </div>
                                <div className='traitements-td'>
                                    UPDATE
                                </div>
                                <div className='traitements-td'>
                                    DELETE
                                </div>
                                <div className='traitements-td'>
                                    Actions
                                </div>
                            </div>
                                {
                                listUser.length !== 0 && listUser.map((user,index)=>(
                                    <div className='traitements-table_item'>
                                    <div className='traitements-item'>
                                        {user.username}
                                    </div>
                                    <div className='traitements-item'>
                                        {user.privileges.traitements.includes('INSERT') ? 
                                        (
                                            <BiCheck size={17} color="green" />
                                        ):(
                                            <BiX size={17} color="grey" />
                                        )}
                                    </div>
                                    <div className='traitements-item'>
                                        {user.privileges.traitements.includes('UPDATE') ? 
                                        (
                                            <BiCheck size={17} color="green" />
                                        ):(
                                            <BiX size={17} color="grey" />
                                        )}
                                    </div>
                                    <div className='traitements-item'>
                                        {user.privileges.traitements.includes('DELETE') ? 
                                        (
                                            <BiCheck size={17} color="green" />
                                        ):(
                                            <BiX size={17} color="grey" />
                                        )}
                                    </div>
                                    <div className='traitements-item'>
                                        {
                                            user.username === "postgres" ? "ADMIN" :(
                                                <MdOutlineModeEdit 
                                                    className='actions_icon' 
                                                    onClick={()=>showEUForm(user.id,user.username,user.privileges.traitements)}
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
                    <div className='traitements-content-edit'>
                        <div className='traitements-edit_header'>
                            Modifier les privilèges de : <b> {usernameUser} </b>
                        </div>
                        <div className='traitements-content-ligne'>
                            {/* {JSON.stringify(privUser)} */}
                            <div className='traitements-ligne-edit'>
                                <div className='traitements-texte-edit'>
                                    <b>OPERATIONS</b>
                                </div>
                                <div className='traitements-texte-edit'>
                                    <b>PRIVILEGES</b>
                                </div>
                            </div>
                            <div className='traitements-ligne-edit'>
                                <div className='traitements-texte-edit'>
                                    INSERT
                                </div>
                                <div className='traitements-texte-edit'>
                                    <ReactSwitch
                                        checked={toggleInsert}
                                        onChange={handleChangeInsert}
                                    />
                                </div>
                                
                            </div>
                            <div className='traitements-ligne-edit'>
                                <div className='traitements-texte-edit'>
                                    UPDATE
                                </div>
                                <div className='traitements-texte-edit'>
                                    <ReactSwitch
                                        checked={toggleUpdate}
                                        onChange={handleChangeUpdate}
                                    />
                                </div>
                            </div>
                            <div className='traitements-ligne-edit'>
                                <div className='traitements-texte-edit'>
                                    DELETE
                                </div>
                                <div className='traitements-texte-edit'>
                                    <ReactSwitch
                                        checked={toggleDelete}
                                        onChange={handleChangeDelete}
                                    />
                                </div>
                            </div>
                            <div className='traitements-btn-edit'>
                                <div 
                                    className='traitements-btnsave-edit'
                                    onClick={saveChangePrivilege}>
                                    SAVE CHANGES
                                </div>
                                <div 
                                    className='traitements-btncancel-edit'
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

export default TableTraitement
