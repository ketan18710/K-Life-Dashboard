import React from 'react'
import CloseIcon from '../../images/icons/close.svg'
import EditIcon from '../../images/icons/edit.svg'
import './style.scss'
function editImage(props) {
  const {src,close,edit} = props
  return (
    <div className="editableImage">
      <img className="hero" src={src}/>
      <div className="actions">
        {
          edit &&
          <img className="edit" onClick={()=>edit()} src={EditIcon}/>
        }
        {
          close &&
          <img className="close" onClick={()=>close()}  src={CloseIcon}/>
        }
      </div>
    </div>
  )
}

export default editImage
