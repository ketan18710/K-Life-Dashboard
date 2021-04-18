import React,{useState,useEffect,useRef} from 'react'
import './style.scss'
import { Editor } from '@tinymce/tinymce-react';  
import {APP_ROUTES,EMAIL_EDITOR_API_KEY,NO_IMAGE} from 'utils/constants'
import EditImage from '../../Image/editImage'
import EditIcon from '../../../images/icons/edit.svg'
import AddIcon from '../../../images/icons/add.svg'
import { useParams } from 'react-router-dom';
import FileUpload from '../../FileUpload/index'
import Loader from '../../Loader';
import { toast } from 'react-toastify';
import Error404 from '../../Error404';
function Product(props) {
  const {config,setConfig,saveData,uploadImage,uploadImageData,triggers,setTriggers,productImageType,setProductImageType,saveBtnLoader} = props
  const {category_slug,sub_category_slug,model_id} = useParams();
  const [product, setProduct] = useState(null)
  const [fileModalTrigger, setFileModalTrigger] = useState(null)
  const [productIndex, setProductIndex] = useState(null)
  const [media, setMedia] = useState(null)
  const [imageType, setImageType] = useState({
    carrousel : false,
    accessorries : false,
    doc : false
  })
  const tinymce1 = useRef(null)
  const tinymce2 = useRef(null)
  const onChangeMediaFunc = (e)=>{
    const selectedFile = e.target.files[0];
    setMedia({"image" : selectedFile});
  }
  const setUploadedMediaFunc = (link) => {
    console.log({productImageType,product})
    let {prod,prodIndex} =  getProduct()
    console.log(config,'config')
    if(productImageType.carrousel){
      prod.images.push(link.link)  
    }else if(productImageType.accessories){
      prod.accessories = {image : link,data : prod.accessories.data}
    }else if(productImageType.file){
      if(typeof(prod.manuals) === "string"){
        prod.manuals =[link]
      }else{
        prod.manuals.push(link)
      }
    }
    toast.success('Uploaded successfully')
    setProduct(prod)
    setTriggers({...triggers,uploadMedia : false ,fileModal : false})
  }
  console.log(product)
  useEffect(() => {
    if(triggers.uploadMedia){
      setUploadedMediaFunc(uploadImageData.data)
    }
  }, [triggers.uploadMedia])

  const createSaveData = () => {
    let config_temp  = config
    let prod = product
    console.table(prod,'prod_New')
    let latest = config.latest.find(item=>item.model_id === model_id)
    let latestIndex = config.latest.findIndex(item=>item.model_id === model_id)
    if(product.latest){
      let temp = {
        "title": product.title,
        "image" : product.images.length ? product.images[0] : NO_IMAGE,
        "category_slug" : category_slug,
        "description":product.description,        
        "sub_category_slug": sub_category_slug,
        "model_id": model_id
      }
      if(!latest){
        config_temp.latest.push(temp)
      }else{
        config_temp.latest[latestIndex] = temp
      }
    }else{
      if(latest){
        config_temp.latest.splice(latestIndex,1)
      }
    }
    prod.features = tinymce1.current.editor.getContent()
    prod.accessories =  {data : tinymce1.current.editor.getContent() , image : prod.accessories.image  ? prod.accessories.image : NO_IMAGE}
    config_temp['categories'][categoryIndex]['subCategories'][subCategoryIndex]['products'][productIndex] = prod
    return config_temp
  }

  useEffect(() => {
    if(product){
      // console.table(product)
    }
  }, [product])
  const submitMediaFormFunc = ()=>{
    const formData = new FormData()
    formData.append('image',media.image)
    uploadImage(formData)
    // let x = setTimeout(() => {
    //   clearTimeout(x)
    // }, 800);
  }
  let config_temp = config
  const {categories} = config_temp && config_temp
  const category = categories && categories.find(item=>item.category_slug === category_slug)
  const categoryIndex = categories && categories.findIndex(item=>item.category_slug === category_slug)
  const subCategory = category && category.subCategories.find(item=>item.sub_category_slug === sub_category_slug)
  const subCategoryIndex = category && category.subCategories.findIndex(item=>item.sub_category_slug === sub_category_slug)
  useEffect(() => {
    if(subCategory){
      const {prod,prodIndex} =  getProduct()
      setProduct(prod)
      setProductIndex(prodIndex)
    }
  }, [subCategory])
  const getProduct = () => {
    const prod = subCategory.products.find(item=>item.model_id === model_id)
    const prodIndex = subCategory.products.findIndex(item=>item.model_id === model_id)
    return {prod : prod, prodIndex : prodIndex}
    
  }
  
  const deleteImage = (index) => {
    let temp = product.images
    temp.splice(index,1)
    setProduct({...product,images : temp})
  }
  const markLatest = (val) => {
    if(!val){
      let latest = config.latest.find(item=>item.model_id === model_id)
      let latestIndex = config.latest.findIndex(item=>item.model_id === model_id)
      if(latest){
        lat
      }
    }
  }
  return (
    <>
      <FileUpload uploadDoc={productImageType.file ? true : false} open={triggers.fileModal} close={()=>setTriggers({...triggers,fileModal : false})}   onChangeMediaFunc={(e)=>onChangeMediaFunc(e)} submitMediaFormFunc={()=>submitMediaFormFunc()} />
        {
          saveBtnLoader || triggers.fileModal
          ?
          <Loader />
          :
          !product ?
          <Error404 /> :
          <div className="Product">
            <div className="header">
              <div className="formInput">
                <input onChange={(e)=>setProduct({...product,title: e.target.value})} className="title" type="text"  value={product && product.title}/>
              </div>
              <button onClick={()=>saveData(createSaveData())} className="btn1__primary">Save</button>
            </div>
            <div className="formInput formInputSingleRow">
              <label htmlFor="slug">Model Id : </label>
              <input disabled onChange={(e)=>setProduct({...product,model_id: e.target.value})} type="text"  value={product && product.model_id}/>
            </div>
            <div className="formInput">
              <label htmlFor="Product Description">Product Description</label>
              <textarea name="description"  value={product && product.description}  onChange={(e)=>setProduct({...product,description: e.target.value})}  cols="30" rows="10"></textarea>
            </div>
            <div className="formInput">
              <label htmlFor="Product Description">Product Features</label>
              <Editor
                initialValue={product && product.features ? product.features : ''} 
                apiKey={EMAIL_EDITOR_API_KEY}
                ref = {tinymce1}
                init={{
                  height: 200,
                  menubar: false,
                  selector : 'h1',
                  forced_root_block : "", 
                  force_br_newlines : true,
                  force_p_newlines : false,
                  // onchange_callback : onChangeFunc,
                  plugins: [
                    'advlist autolink lists link ',
                    'searchreplace  code',
                    'paste'
                  ],
                  noneditable_editable_class: 'mceEditable',
                  noneditable_noneditable_class: 'mceNonEditable',
                  fontsize_formats:"1pt 2pt 3pt 4pt 5pt 6pt 7pt 8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
                  toolbar1:'fontsizeselect| bold italic | undo redo | bullist numlist outdent indent ',
                  
                }}
              />
            </div>
            <div className="formInput formInputSingleRow">
              <label htmlFor="slug">Product Video Link  </label>
              <input placeholder="Video URL (Youtube)" onChange={(e)=>setProduct({...product,video: e.target.value})} type="text"  value={product && product.video}/>
            </div>
            <div className="manuals">
              <div className="formInput ">
                <label htmlFor="slug">Manuals </label>
                <div className="content">
                  {
                    product && product.manuals && (typeof(product.manuals) !== 'string') && product.manuals.map(product=><a download href={product.link} className="btn1__primary">{product.title}</a>)
                  }
                  <a   onClick={()=>{ setProductImageType({...productImageType,file : true}) ;setTriggers({...triggers,fileModal : true})}} className="btn1__primary"> Add more</a>
                </div>
                {/* <img  onClick={()=>{ setProductImageType({...productImageType,file : true}) ;setTriggers({...triggers,fileModal : true})}} src={EditIcon} alt="edit icon" className="icon"/> */}
              </div>
            </div>
            <div className="images">
              <div className="formInput">
                <label htmlFor="Product images">Product images</label>
              </div>
              <div className="products">
                {
                  product && product.images.map((image,index)=><EditImage src={image}  edit={false} close={()=>deleteImage(index)}/>)
                }
                <div onClick={()=>{ const temp = createSaveData();setConfig({...config,categories : temp['categories']}); setProductImageType({...productImageType,carrousel : true,file : false}) ;setTriggers({...triggers,fileModal : true})}} className="editableImage editableImageAdd">
                  <img className="addIcon" src={AddIcon} alt="add icon"/>
                </div>
              </div>
            </div>
            <div className="formInput formInputSingleRow formInputChoiceTick">
              <label htmlFor="Mark Latest"> Mark as Latest Product</label>
              <input onChange={(e)=>{setProduct({...product,'latest': e.target.checked})}} checked={product && product.latest} type="checkbox" name="mark latest" id=""/>
            </div>
            <div className="accessories">
              <div className="formInput">
                <label htmlFor="ACCESSORIES">ACCESSORIES</label>
              </div>
              <div className="content">
                <div className="image">
                  <img className="hero" src={product && product.accessories.image ?product.accessories.image : NO_IMAGE } alt="accessories image"/>
                  <img  onClick={()=>{ setProductImageType({...productImageType,accessories : true}) ;setTriggers({...triggers,fileModal : true})}} src={EditIcon} alt="edit icon" className="icon"/>
                </div>
                <div className="editor">
                  <Editor
                    initialValue={product && product.accessories.data ? product.accessories.data : ''} 
                    apiKey={EMAIL_EDITOR_API_KEY}
                    ref = {tinymce2}
                    init={{
                      height: 200,
                      menubar: false,
                      selector : 'h1',
                      forced_root_block : "", 
                      force_br_newlines : true,
                      force_p_newlines : false,
                      // onchange_callback : onChangeFunc,
                      plugins: [
                        'advlist autolink lists link ',
                        'searchreplace  code',
                        'paste'
                      ],
                      noneditable_editable_class: 'mceEditable',
                      noneditable_noneditable_class: 'mceNonEditable',
                      fontsize_formats:"1pt 2pt 3pt 4pt 5pt 6pt 7pt 8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt",
                      toolbar1:'fontsizeselect| bold italic | undo redo | bullist numlist outdent indent ',
                      
                    }}
                  />
                </div>

              </div>
            </div>
          </div>
        }
    </>
  )
}

export default Product
