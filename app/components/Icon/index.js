import React from 'react'
import './style.scss'
function index(props) {
  const{mainIcon,hoverIcon,alt ,action} = props
  return (
    <div onClick={()=>{action ? action() : null}} className="icon">
      <img className="main" src={mainIcon} alt={alt ? alt : 'icon'}/>
      <img className="hover" src={hoverIcon} alt={alt ? alt : 'icon'}/>
    </div>
  )
}

export default index
