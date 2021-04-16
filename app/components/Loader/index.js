import React from 'react'
import './style.scss'
function Loader(props) {
  const {btnLoader} = props
  return (
    <div className={btnLoader ? 'Loader btnLoader' : "Loader"}>
      <div class="bt-spinner"></div>
    </div>
  )
}

export default Loader
