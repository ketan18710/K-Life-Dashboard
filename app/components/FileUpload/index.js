import React,{useState,useEffect} from 'react'
import ADD_ICON from '../../images/icons/add.svg'
import './style.scss'
function index(props) {
  const [open, setOpen] = useState(null)
  const [media, setMedia] = useState(null)
  const {onChangeMediaFunc,submitMediaFormFunc,close} = props
  useEffect(() => {
    setOpen(props.open)
  }, [props.open])

//   const onChangeMediaFunc = (e)=>{
//     const selectedFile = e.target.files[0];
//     setMedia({"image" : selectedFile});
//   }
//   const submitMediaFormFunc = ()=>{
//     const formData = new FormData()
//     formData.append('image',media.image)
//     formData.append('group',PREVIEW_DESIGN)
//     console.log(formData)
//     props.storeMedia(dataToSend)
// }
  return (
    open &&
    <div className="fileUploadWrapper">
      <div className="modal">
        <div className="uploadImage">
          <input type="file" onChange={(e)=>onChangeMediaFunc(e)} name="input_file" id="fileInput"/>
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
