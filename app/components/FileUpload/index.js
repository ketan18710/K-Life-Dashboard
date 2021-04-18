import React,{useState,useEffect} from 'react'
import ADD_ICON from '../../images/icons/add.svg'
import './style.scss'
function index(props) {
  const [open, setOpen] = useState(null)
  const [media, setMedia] = useState(null)
  const {onChangeMediaFunc,submitMediaFormFunc,close,uploadDoc} = props
  useEffect(() => {
    setOpen(props.open)
  }, [props.open])
  return (
    open &&
    <div className="fileUploadWrapper">
      <div className="modal">
        <h3 className="title">Upload {!uploadDoc ? '   Image' : '   Document'}</h3>
        <p>Types allowed  :  {!uploadDoc ? "   .jpeg,.png": '   .pdf'}  </p>
        <div className="uploadImage">
          <input type="file" accept={!uploadDoc ? ".jpeg,.png": '.pdf'} onChange={(e)=>onChangeMediaFunc(e)} name="input_file" id="fileInput"/>
        </div>
        <div className="actions">
          <button className="btn1__secondary" onClick={()=>close()}>Cancel</button>
          <button className="btn1__primary" onClick={()=>submitMediaFormFunc()}>Upload</button>
        </div>
      </div>
    </div>
  )
}
export default index
