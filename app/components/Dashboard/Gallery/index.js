import React,{useState,useEffect} from 'react'
import './style.scss'
import EditImage from '../../Image/editImage'
import AddIcon from '../../../images/icons/add.svg'
import Loader from '../../Loader'
function Gallery(props) {
  console.log(props,'galleryProps')
  const {config,setConfig,saveData, save,loader,setLoader,saving,setSaving} = props
  const {gallery} = config && config
  const deleteImage = (index) => {
    let temp = gallery
    temp.splice(index,1)
    let temp_config = {...config,gallery : temp}
    debugger
    setConfig(temp_config)
    setLoader({...loader,gallery : true})
    saveData(temp_config)
  }
  // useEffect(() => {
  //   if(saving){
  //     debugger
  //   }
  // }, [saving])
  useEffect(() => {
    const {status,data} = save
    if(status ===1){
      debugger
      setLoader(false)
      setSaving(false)
    }
  }, [save])
  
  return (
    <>
    {
      loader.gallery ?
      <Loader />
      :
      <div className="Gallery">
        {
          gallery && gallery.map((image,index)=><EditImage src={image}  edit={false} close={()=>deleteImage(index)}/>)
        }
      </div>
    }
    </>
  )
}

export default Gallery
