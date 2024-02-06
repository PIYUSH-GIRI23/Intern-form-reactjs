import React,{useState,useEffect} from 'react'
import '../index.css'
const [formdata,setFormdata] = useState({
  email:'',
  name:'',
  phone:'',
  age:'',
  specialization:'',
  days:'',
  Details:'',
})

const Form = () => {
  return (
    <div>
      <div className="form-button-container">
        <button type="button" className="btn btn-dark">Form 1</button>
        <button type="button" className="btn btn-dark">Form 2</button>
      </div>
      <div className="form-container">
        <input className='formdata'/>
        <input className='formdata'/>
        <input className='formdata'/>
        <input className='formdata'/>
        <input className='formdata'/>
        <input className='formdata'/>
      </div>
      <button type="button" className="btn btn-primary form-submit-button">Submit</button>
    </div>
  )
}

export default Form
