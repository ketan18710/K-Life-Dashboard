import React,{useState,useEffect} from 'react'
import './style.scss'
import Loader from '../Loader/index'
import { user } from '../../utils/constants'
import { toast } from 'react-toastify'
import { parseJwt } from '../../utils/common'
function ResetPassword(props) {
  const {resetPasswordData,reset} = props
  const [loading, setLoading] = useState(null)
  const [form, setForm] = useState({
    new : '',
    again : ''
  })
  console.log(user,'user')
  const getUsername = () => {
    const {user} = parseJwt()
    return user && user
  }
  
  const [passwordMismatcch, setPasswordMismatcch] = useState(false)
  const resetPasswordFunc = () => {
    // const { } = user
    if(form.new === form.again){
      reset({newPassword : form.new, username : getUsername()})
      setPasswordMismatcch(false)
    }else{
      setPasswordMismatcch(true)
    }
  }
  useEffect(() => {
    const {status,data} = resetPasswordData
    if(status === 0){
      setLoading(true)
    }
    if(status === 1){
      setLoading(false)
      toast.success('Password updated successfully')
    }else if(status === -1){
      setLoading(false)
      toast.error(data)

    }
  }, [resetPasswordData])
  
  return (
    <div className="resetPassword">
        <h3 className="title">Reset Password</h3>
        <div className="formInput">
          <label htmlFor="New Password">New Password</label>
          <input type="password" placeholder="New Password" value={form.new} onChange={(e)=>setForm({...form,new : e.target.value})}/>
        </div>
        <div className="formInput">
          <label htmlFor="New Password">Type Password Again</label>
          <input type="password" placeholder="re-enter New Password" value={form.again} onChange={(e)=>setForm({...form,again : e.target.value})}/>
        </div>
        <div className="formInput">
          {
            passwordMismatcch && <p className="mismatchError">Passwords Don't match</p>
          }
          <button disabled={loading ? true : false} className="btn1__primary" onClick={()=>resetPasswordFunc()}>{loading ? <Loader btnLoader={true}/> : 'Reset Password'}</button>  
        </div>
    </div>
  )
}

export default ResetPassword
