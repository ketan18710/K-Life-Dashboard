import React,{useState} from 'react'
import './style.scss'
function ContactUs(props) {
  const {open,close,CloseIcon} = props
  const initialState= {
    name : '',
    email : '',
    phone_no : '',
    message : ''
  }
  const [form, setForm] = useState(initialState)
  const handleInputChange = (key,val) => {
    setForm(
      {...form,
        [key]:val
      }
    )
  }
  
  return (
    open &&
    <div className="contactUsWrapper">
      <div className="modal">
        <h3 className="title">Send us a message</h3>
        <div className="field">
          <label htmlFor="Input Name ">Name</label>
          <input value={form.name} onChange={(e)=>handleInputChange('name',e.target.value)} type="text" placeholder="Enter your name"/>
        </div>
        <div className="field">
          <label htmlFor="Input Email">Email</label>
          <input value={form.email} onChange={(e)=>handleInputChange('email',e.target.value)}  type="email" placeholder="Enter your email Id"/>
        </div>
        <div className="field">
          <label htmlFor="Input Number">Phone Number</label>
          <input value={form.phone_no} onChange={(e)=>handleInputChange('phone_no',e.target.value)}  type="text" placeholder="Enter your phone number"/>
        </div>
        <div className="field">
          <label htmlFor="Input Number">Your Message</label>
          <textarea value={form.message} onChange={(e)=>handleInputChange('message',e.target.value)}  rows="4"></textarea>
        </div>
        <div className="field">
          <button className="btn1__primary">Submit</button>
        </div>
        <img onClick={()=>close()} src={CloseIcon} alt="close icon"/>
      </div>
    </div>
  )
}

export default ContactUs
