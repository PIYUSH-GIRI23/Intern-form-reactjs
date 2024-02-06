import React,{useState,useEffect} from 'react'
import '../index.css'
const Form = () => {
  const [showform1,setshowform1] = useState(true);
  const [error,seterror]=useState({
    message:'Please enter corect mail address',
    visible:false
  })
  const [formdata,setFormdata] = useState({
    email:'',
    name:'',
    phone:'',
    age:'',
    specialization:'',
    days:'',
    Details:'',
  })
  const defaultdata={
    email:'Enter your email',
    name:'Enter your name',
    phone:'Enter your contact number',
    age:'Enter your age',
    specialization:'Enter your specialization',
    days:'From how many days you are suffering',
    Details:'Describe your problem'
  }
  const senddata=async()=>{
    // const url=process.env.REACT_APP_BACKEND_API;
    // console.log(url)
    if(showform1){
      const payload={
        formid:1,
        email:formdata.email,
        name:formdata.name,
        phone_number:formdata.phone,
        age:formdata.age,
      }
      console.log(payload)
    }
    else{
      const payload={
        formid:2,
        email:formdata.email,
        name:formdata.name,
        phone_number:formdata.phone,
        age:formdata.age,
        specialization:formdata.specialization,
        days:formdata.days,
        details:formdata.Details
      }
      console.log(payload)
    }
  }
  const handlesubmit=async()=>{
    seterror({...error,visible:false})

    //verifying the user details
    const emailRegex = /^[^\d][a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneRegex = /^\d{10}$/;
    const ageRegex = /^\d+$/;
    const daysRegex = /^\d+$/;

    const phoneAsInt = parseInt(formdata.phone, 10);
    const ageAsInt = parseInt(formdata.age, 10);

    const isvalidmail = emailRegex.test(formdata.email);
    const isvalidphone = phoneRegex.test(formdata.phone);
    const isvalidage = ageRegex.test(formdata.age);
    const isvaliddays = daysRegex.test(formdata.days);

    if(!isvalidmail){
      seterror({...error,visible:true,message:'Please enter corect mail address'})
      return;
    }
    if(!isvalidphone){
      seterror({...error,visible:true,message:'Please enter valid contact number'})
      return;
    }
    if(!isvalidage){
      seterror({...error,visible:true,message:'Please enter valid age'})
      return;
    }
    if(!isvaliddays && !showform1){
      seterror({...error,visible:true,message:'Please enter valid days'})
      return;
    }
    if(formdata.name===''){
      seterror({...error,visible:true,message:'Please enter your name'})
      return;
    }
    if(formdata.Details===''){
      seterror({...error,visible:true,message:'Please Describe your problem'})
      return;
    }
    if(formdata.specialization===''){
      seterror({...error,visible:true,message:'Please enter your specialization'})
      return;
    }
    
    const res=await senddata();
  }
  return (
    <div>
      <div className="form-button-container">
        <button type="button" className="btn btn-dark" onClick={()=>setshowform1(true)}>Doctor</button>
        <button type="button" className="btn btn-dark" onClick={()=>setshowform1(false)}>Specialist</button>
      </div>
      <div className="form-container">
        <input className='formdata' placeholder={defaultdata.email} onChange={(e)=>setFormdata({...formdata,email:e.target.value})}/>
        <input className='formdata' placeholder={defaultdata.name} onChange={(e)=>setFormdata({...formdata,name:e.target.value})}/>
        <input className='formdata' placeholder={defaultdata.phone} onChange={(e)=>setFormdata({...formdata,phone:e.target.value})}/>
        <input className='formdata' placeholder={defaultdata.age} onChange={(e)=>setFormdata({...formdata,age:e.target.value})}/>
        {/* <input className={!showform1?'formdata':'formdata-hide'} placeholder={defaultdata.specialization} onChange={(e)=>setFormdata({...formdata,specialization:e.target.value})}/> */}
        <select
              className={!showform1?'formdata formdata-specialist':'formdata-hide'}
              value={formdata.specialization}
              onChange={(e) => setFormdata({ ...formdata, specialization: e.target.value })}
            >
              <option value="">Select specialization</option>
              <option value="Neurospecialist">Neurospecialist</option>
              <option value="Cardiospecialist">Cardiospecialist</option>
              <option value="Dermatologist">Dermatologist</option>
            </select>
        <input className={!showform1?'formdata':'formdata-hide'} placeholder={defaultdata.days} onChange={(e)=>setFormdata({...formdata,days:e.target.value})}/>
        <input className={!showform1?'formdata':'formdata-hide'} placeholder={defaultdata.Details} onChange={(e)=>setFormdata({...formdata,Details:e.target.value})} rows={100}/>
      </div>
      <p className='warning'>
        {error.visible?error.message:''}
      </p>
      <button type="button" className="btn btn-primary form-submit-button" onClick={handlesubmit}>Submit</button>
    </div>
  )
}

export default Form
