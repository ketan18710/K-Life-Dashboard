import React from 'react'
import ErrorGIF from '../../images/404.gif'
import { redirectToUrl } from '../../utils/common'
import { APP_ROUTES } from '../../utils/constants'
import './style.scss'
function Error404() {
  return (
    <div className="error404">
      <div className="container">
        <img src={ErrorGIF} alt="error404 gif"/>
        <div className="actions">
          <button onClick={()=>window.location.reload()} className="btn1__primary">Reload</button>
          <button onClick={()=>redirectToUrl(APP_ROUTES.DASHBOARD)} className="btn1__primary">Back to Home</button>
        </div>
      </div>
    </div>
  )
}

export default Error404
