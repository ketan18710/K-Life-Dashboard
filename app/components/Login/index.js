import React,{useState,useEffect} from 'react'
import './style.scss'
import Logo from '../../images/logo.png'
import {AuthHelper,redirectToUrl} from 'utils/common'
import {APP_ROUTES} from 'utils/constants'
import { toast } from 'react-toastify';
import Loader from '../Loader'
function Login(props) {
  const {login,loginData,setLoggedIn,defaultAction,loader, setLoader} = props
  const [loginForm, setLoginForm] = useState({
    username : '',
    password : ''
  })
  useEffect(() => {
    if(AuthHelper.isAuthenticated()){
      redirectToUrl(APP_ROUTES.DASHBOARD)
      setLoggedIn(true)
    }else{
      setLoggedIn(false)
    }
    defaultAction()
    return () => {
      defaultAction()
    }
  }, [])
  useEffect(() => {
    const {status,data} = loginData
    // debugger  
    if(status === 0){
      setLoader({...loader , login : true})
    }else if(status === 1){
      setLoggedIn(true)
      setLoader({...loader , login : false})
      AuthHelper.login(data)
      toast.success('Logged In Successfully')
      redirectToUrl(APP_ROUTES.DASHBOARD)
    }else if(status === -1){
      setLoader({...loader , login : false})
      toast.error(data)
    }
  }, [loginData])
  return (
    <div className="Login">
      <div className="innerContainer">
        <div className="image">
          <img src={Logo} alt="" className="logo"/>
        </div>
        <div className="formInput">
          <label htmlFor="Username">Username</label>
          <input type="text" placeholder="Username" value={loginForm.username} onChange={(e)=>setLoginForm({...loginForm,username : e.target.value})}/>
        </div>
        <div className="formInput">
          <label htmlFor="Password">Password</label>
          <input type="password" placeholder="Password"  value={loginForm.password} onChange={(e)=>setLoginForm({...loginForm,password : e.target.value})}/>
        </div>
        <div className="formInput">
          <button className="btn1__primary" onClick={()=>login(loginForm)}>{loader.login ? <Loader btnLoader={true}/> :'Submit'}</button>
        </div>
      </div>
    </div>
  )
}

export default Login
