import React from 'react'
import './style.scss'
import Logo from '../../images/logo_white.png'
import {APP_ROUTES} from 'utils/constants'
import {redirectToUrl,AuthHelper} from 'utils/common'
function Sidebar() {
  return (
    <div className="Sidebar">
      <img src={Logo} alt="K-Life Logo"/>
      <p className="menuItem" onClick={()=>redirectToUrl(APP_ROUTES.DASHBOARD)} >HOME</p>
      <p className="menuItem" onClick={()=>redirectToUrl(APP_ROUTES.DASHBOARD_ABOUTUS)} >ABOUT US</p>
      <p className="menuItem" onClick={()=>redirectToUrl(APP_ROUTES.DASHBOARD_GALLERY)} >GALLERY</p>
      <p className="menuItem" onClick={()=>redirectToUrl(APP_ROUTES.CATEGORIES)} >PRODUCTS</p>
      <p className="menuItem" onClick={()=>redirectToUrl(APP_ROUTES.RESET_PASSWORD)} >RESET_PASSWORD</p>
      <p className="menuItem last" onClick={()=>AuthHelper.logout()} >LOGOUT</p>
    </div>
  )
}

export default Sidebar
