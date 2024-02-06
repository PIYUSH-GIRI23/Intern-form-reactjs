import React,{useState,useEffect,useRef} from 'react'
import '../Admin.css'
import { Link,useNavigate } from 'react-router-dom'
const Admin = () => {
    const navigate=useNavigate()
    const [doctor,setDoctor]=useState(true)
    const [patientdata,setPatientdata]=useState([])
    const [logindetails,setLogindetails] = useState({
        admin_id:'',
        admin_password:''
    })
    const [isloggedin,setisloggedin]=useState(false) // interntoken=.....
    const [wrong,setwrong]=useState({
        message:'',
        visibility:false,
    })
    const defaultfeild={
        loginid:'Enter your id',
        loginpassword:'Enter your password'
    }
    useEffect(() => {
        const token=localStorage.getItem('interntoken')
        if(token){
            setisloggedin(true)
        }
        else {
            setisloggedin(false)
        }
    }, [patientdata])
    const handlelogin=async()=>{
        setwrong({message:'',visibility:false})
        const url=process.env.REACT_APP_BACKEND_API+'/api/admin/credentials'
        let res=await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(logindetails)
        })
        res=await res.json()
        if(res.status===200){
            localStorage.setItem('interntoken',res.token)
            setisloggedin(true)
            handlesearch();

        }
        if(res.status===400){
            setwrong({message:'Wrong credentials',visibility:true})
        }
        else{
            setwrong({message:'Server error',visibility:true})
        }
    }
    const handlelogout=()=>{
        localStorage.removeItem('interntoken')
        setisloggedin(false)
        navigate('/')
    }
    const handlesearch=async()=>{
        // console.log("clicked")
        const url=process.env.REACT_APP_BACKEND_API+'/api/admin/details'
        // console.log(url)
        let res=await fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'token':localStorage.getItem('interntoken')
            },
            body:JSON.stringify(doctor?{detailsid:1}:{detailsid:2})
        })
        res=await res.json()
        // console.log(res)
        if(res.status===200){
            // console.log(res);
            setPatientdata(res.details)
        }
    }
    useEffect(() => {
        handlesearch();
    },[doctor])
  return (
    <div>
      { !isloggedin && <div className='login-container'>
      <Link type="button" className="btn btn-danger homebutton" to="/">Home</Link>
        <div className='loginheader'>Login .. </div>
        <input className='loginid loginchild' placeholder={defaultfeild.loginid} onChange={(e)=>setLogindetails({...logindetails,admin_id:e.target.value})}/>
        <input className='loginpassword loginchild' placeholder={defaultfeild.loginpassword} onChange={(e)=>setLogindetails({...logindetails,admin_password:e.target.value})}/>
        <div className='wrongcred'>{wrong.visibility?wrong.message:''}</div>
        <button type="button" className="btn btn-primary loginbutton" onClick={handlelogin}>Login</button>
      </div>}
      { isloggedin && 
      <div className='patient-container'>
        <Link className='btn btn-danger patient-homebutton' to="/">Home</Link>
        <div className='btn btn-info patient-logout' onClick={handlelogout}>Logout</div>
        <div className="radio-container">
            <div className="radiooption">
                <input type="radio" className='radiobuttoninner' id="doctorRadio" name="userType" checked={doctor} onChange={() => setDoctor(true)} />
                <label className='radiobuttonlabel' htmlFor="doctorRadio">Doctor</label>
            </div>
            <div className="radiooption">
                <input type="radio" className='radiobuttoninner' id="specialistRadio" name="userType" checked={!doctor} onChange={() => setDoctor(false)} />
                <label className='radiobuttonlabel' htmlFor="specialistRadio">Specialist</label>
            </div>
        </div>
        <div className="patient-details">
        {patientdata.map((patient, index) => (
            <div key={index} className='dynamicdata'>
                <p className='dynamicdatachild'>Email: {patient.email}</p>
                <p className='dynamicdatachild'>Name: {patient.name}</p>
                <p className='dynamicdatachild'>Contact: {patient.phone_number}</p>
                <p className='dynamicdatachild'>Age: {patient.age}</p>
                {!doctor && <p className='dynamicdatachild'>Specialization: {patient.specialization}</p>}
                {!doctor && <p className='dynamicdatachild'>Days: {patient.days}</p>}
                {!doctor && <p className='dynamicdatachild'>Details: {patient.Details}</p>}
           </div>
         ))}
        </div>
      </div>
      }
    </div>
  )
}

export default Admin
