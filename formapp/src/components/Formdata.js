import React,{useState,useEffect,useRef} from 'react'
import '../index.css'
const Form = () => {
  const modalref=useRef(null);
  const [showform1,setshowform1] = useState(true);
  const [showmodal,setshowmodal] = useState(false);
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
    const url=process.env.REACT_APP_BACKEND_API;
    // console.log(url)
    if(showform1){
      const payload={
        formid:1,
        email:formdata.email,
        name:formdata.name,
        phone_number:formdata.phone,
        age:formdata.age,
      }
      // console.log(payload)
      try{
        let res=await fetch(
          url+'/api/form/submitform',
          {
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(payload)
          }
        )
        res=await res.json();
        // console.log(res)
        return res;
      }
      catch(err){
        return {status:500}
      }
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
        Details:formdata.Details
      }
      // console.log(payload)
      try{
        let res=await fetch(
          url+'/api/form/submitform',
          {
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(payload)
          }
        )
        res=await res.json();
        return res;
      }
      catch(err){
        return {status:500}
      }
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
    if(formdata.Details==='' && !showform1){
      seterror({...error,visible:true,message:'Please Describe your problem'})
      return;
    }
    if(formdata.specialization==='' && !showform1){
      seterror({...error,visible:true,message:'Please enter your specialization'})
      return;
    }
    setshowmodal(true);
    const res=await senddata();
    if(res.status===200){
      modalref.current.classList.add('form-success');
      modalref.current.innerHTML='Form submitted successfully';
    }
    else if(res.status===401){
      modalref.current.classList.add('form-failed');
      modalref.current.innerHTML="Error while submitting the form .. Please Try again ..."
    }
    else if(res.status===410){
      modalref.current.classList.add('form-failed');
      modalref.current.innerHTML="Email Already exists .. Please Try again ..."
    }
    else if(res.status===411){
      modalref.current.classList.add('form-failed');
      modalref.current.innerHTML="Contact number Already exists .. Please Try again ..."
    }
    else{
      modalref.current.classList.add('form-failed');
      modalref.current.innerHTML="Internal server error .. Please Try again ..."
    }
    // console.log("response : ",res)
  }
  return (
    <div>
      <div className={showmodal?'showmodal':'hidemodal'} ref={modalref}>
        Please wait ...
      </div>
      <div className={!showmodal?'form-button-container':'hide-form-button-container'}>
        <button type="button" className="btn btn-dark" onClick={()=>setshowform1(true)}>Doctor</button>
        <button type="button" className="btn btn-dark" onClick={()=>setshowform1(false)}>Specialist</button>
      </div>
      <div className={!showmodal?'form-container':'hide-form-container'}>
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
        <input className={!showform1?'formdata':'formdata-hide'} placeholder={defaultdata.Details} onChange={(e)=>setFormdata({...formdata,Details:e.target.value})} rows={100} maxLength={30}/>
      </div>
      <p className='warning'>
        {error.visible?error.message:''}
      </p>
      <button type="button" className={!showmodal?'btn btn-primary form-submit-button':'hide-form-submit-button'} onClick={handlesubmit}>Submit</button>
    </div>
  )
}

export default Form
