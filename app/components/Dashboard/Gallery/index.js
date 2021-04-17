import React,{useState,useEffect} from 'react'
import './style.scss'
import EditImage from '../../Image/editImage'
import AddIcon from '../../../images/icons/add.svg'
import Loader from '../../Loader'
import FileUpload from '../../FileUpload/index'
function Gallery(props) {
  const [media, setMedia] = useState(null)
  console.log(props,'galleryProps')
  const {config,setConfig,saveData, saveBtnLoader,save,loader,setLoader,uploadImage,uploadImageData,triggers,setTriggers,saving,setSaving} = props
  const {gallery} = config && config
  const deleteImage = (index) => {
    let temp = gallery
    temp.splice(index,1)
    let temp_config = {...config,gallery : temp}
    // debugger
    // setConfig(temp_config)
    // setLoader({...loader,gallery : true})
    saveData(temp_config)
  }
  const onChangeMediaFunc = (e)=>{
    const selectedFile = e.target.files[0];
    setMedia({"image" : selectedFile});
  }
  const submitMediaFormFunc = ()=>{
    const formData = new FormData()
    formData.append('image',media.image)
    uploadImage(formData)
  }
  // useEffect(() => {
  //   if(saving){
  //     debugger
  //   }
  // }, [saving])
  useEffect(() => {
    const {status,data} = save
    if(status ===1){
      // debugger
      setLoader(false)
      setSaving(false)
    }
  }, [save.status])
  useEffect(() => {
    if(triggers.uploadMedia){
      let temp = config
      temp['gallery'].push(uploadImageData.data)
      saveData(temp)
      setTriggers({...triggers,uploadMedia : false,fileModal : false})
    }
  }, [triggers.uploadMedia])
  return (
    <>
    {
      saveBtnLoader ?
      <Loader />
      :
      <>
      <FileUpload open={triggers.fileModal} close={()=>setTriggers({...triggers,fileModal : false})}   onChangeMediaFunc={(e)=>onChangeMediaFunc(e)} submitMediaFormFunc={()=>submitMediaFormFunc()} />
      <div className="Gallery">
        {
          gallery && gallery.map((image,index)=><EditImage src={image}  edit={false} close={()=>deleteImage(index)}/>)
        }
        <div  onClick={()=>setTriggers({...triggers,fileModal : true})} className="editableImage editableImageAdd">
          <img className="addIcon" src={AddIcon} alt="Add Icon"/>
        </div>
      </div>
      </>
    }
    </>
  )
}

export default Gallery
