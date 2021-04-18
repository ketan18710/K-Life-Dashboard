import React,{useEffect} from 'react'
import './style.scss'
function Loader(props) {
  const {btnLoader} = props
  useEffect(() => {
    // debugger
  }, [])
  return (
    <div className={btnLoader ? 'Loader btnLoader' : "Loader"}>
      <div class="bt-spinner"></div>
    </div>
  )
}

export default Loader
