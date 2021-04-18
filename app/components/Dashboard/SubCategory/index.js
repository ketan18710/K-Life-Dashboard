import React,{useState,useEffect,useRef} from 'react'
import './style.scss'
import { useParams } from 'react-router-dom';
import {Card4 as Card} from 'components/Cards/index'
import { Editor } from '@tinymce/tinymce-react';  
import {APP_ROUTES,EMAIL_EDITOR_API_KEY,NO_IMAGE} from 'utils/constants'
import {redirectToUrl} from 'utils/common'
import ADD_ICON from '../../../images/icons/add.svg'
import Loader from '../../Loader';
import Error404 from '../../Error404';

function SubCategory(props) {
  const {config,setConfig,saveData,saveBtnLoader} = props
  const {category_slug,sub_category_slug} = useParams();
  const [subcategory, setSubcategory] = useState(null)
  const [subcategoryIndex, setSubcategoryIndex] = useState(null)
  const [addProdTrigger, setAddProdTrigger] = useState(null)
  const [prodValidation, setProdValidation] = useState({title : null, model_id : null})
  const [subValidation, setsubValidation] = useState({title : null, slug : null})
  const tinymce1 = useRef(null)
  const newProdVals = {
    title : '',
    isNew : false,
    latest : false,
    model_id : '',
    images : [],
    description : ``,
    features : '',
    video : '',
    manuals : [],
    accessories : {image : '',data : ''},
  }
  const [newProdData, setNewProdData] = useState(newProdVals)
  let config_temp = config
  const {categories} = config_temp && config_temp
  const category = categories && categories.find(item=>item.category_slug === category_slug)
  const categoryIndex = categories && categories.findIndex(item=>item.category_slug === category_slug)
  useEffect(() => {
    if(category){
      const subCategory_temp = category && category.subCategories.find(item=>item.sub_category_slug === sub_category_slug)
      setSubcategory(subCategory_temp)
      const subCategoryIndex_temp = category && category.subCategories.findIndex(item=>item.sub_category_slug === sub_category_slug)
      setSubcategoryIndex(subCategoryIndex_temp)
    }
  }, [category])
  const editSubCategory = (type,val) => {
    setSubcategory({...subcategory,[type] : val})
  }
  const removeProd = (index) => {
    let temp = subcategory.products
    temp.splice(index,1)
    setSubcategory({...subcategory,products : temp})
  }
  const saveSubCategoryChanges = () => {
    let validate = subValidation
    if(!subcategory.title || subcategory.title.length<=0){
      validate.title = 'Add a Title for Sub-Category'
    }else{
      validate.title = null
    }
    if(!subcategory.sub_category_slug || subcategory.sub_category_slug.length<=0){
      validate.slug = 'Add a Slug for Sub-Category'
    }else{
      validate.slug = null
    }
    setsubValidation({...subValidation,title : validate.title, slug : validate.slug})
    if(!subValidation.title && !subValidation.slug){
      let config_temp = config
      config_temp['categories'][categoryIndex]['subCategories'][subcategoryIndex] = subcategory
      saveData(config_temp)
    }

  }

  // console.log({subcategory})
  const addProd = () => {
    let newProd = newProdData
    let validate = prodValidation
    if(!newProd.title || newProd.title.length<=0){
      validate.title = 'Add a Title for Product'
    }else{
      validate.title = null
    }
    if(subcategory.products.find(prod=>prod.model_id === newProd.model_id)){
      validate.model_id = 'Model Id should be unique'
    }else if(newProd.model_id.length<=0 || !newProd.model_id){
      validate.model_id = 'Model Id required'
    }else{
      validate.model_id = null
    }
    setProdValidation({...prodValidation,title : validate.title, model_id : validate.model_id})
    if(!validate.title && !validate.model_id){
      let temp = subcategory.products
      temp.push(newProd)
      setSubcategory({...subcategory,products : temp})
      setAddProdTrigger(false)
    }
  }
  
  return (
    <>
    {
      saveBtnLoader
      ?
      <Loader />
      :!subcategory ?
      <Error404 /> :
      <div className="SubCategory">
        <div className="header">
          <div className="formInput">
            <input placeholder="Subcategory title" onChange={(e)=>editSubCategory('title',e.target.value)} className="title" type="text"  value={subcategory && subcategory.title}/>
            { subValidation.title && <p className="formErrorMsg">{subValidation.title}</p> }
          </div>
          <button onClick={()=>saveSubCategoryChanges()} className="btn1__primary">Save</button>
        </div>
        <div className="formInput">
          <label htmlFor="slug">Slug</label>
          <input disabled placeholder="Subcategory slug"  onChange={(e)=>editSubCategory('sub_category_slug',e.target.value)} type="text"  value={subcategory && subcategory.sub_category_slug}/>
          { subValidation.slug && <p className="formErrorMsg">{subValidation.slug}</p> }
        </div>
        <div className="formInput">
          <label htmlFor="description">Description</label>
          <textarea name="" id="" cols="30" rows="5" onChange={(e)=>editSubCategory('description',e.target.value)} value={subcategory && subcategory.description}></textarea>
        </div>
        <div className="formInput">
          <label htmlFor="Products">Products</label>
        </div>
        <div className="products">
        {
            subcategory && subcategory.products.map((product,index)=>
              <div className="product">
                <Card
                  image={product.images.length>0 ?  product.images[0] : NO_IMAGE}
                  title={product.title}
                  actionText="Edit"
                  close={()=>removeProd(index)}
                  model={product.model_id ? product.model_id : 'model_id'}
                  action={()=>redirectToUrl(APP_ROUTES.PRODUCT_ALIAS(category_slug,sub_category_slug,product.model_id))}
                />
              </div>
            )
          }
          <div className="product">
            <div className="Card4 Card4Add" onClick={()=>{setAddProdTrigger(true);setNewProdData(newProdVals)}}>
                <img src={ADD_ICON} alt="add icon" className="addIcon"/>
            </div>
          </div>
        </div>
        {
          addProdTrigger &&
          <div className="addProd">
            <div className="formInput">
              <label htmlFor="Product Title">Product Title</label>
              <input placeholder="Prodcut Name"  onChange={(e)=>setNewProdData({...newProdData,title : e.target.value})} type="text"  value={newProdData.title}/>
              { prodValidation.title && <p className="formErrorMsg">{prodValidation.title}</p> }
            </div>
            <div className="formInput">
              <label htmlFor="Model Id">Model Id:</label>
              <input placeholder="Model id"  onChange={(e)=>setNewProdData({...newProdData,model_id : e.target.value})} type="text"  value={newProdData.model_id}/>
              { prodValidation.model_id && <p className="formErrorMsg">{prodValidation.model_id}</p> }
            </div>
            <div className="formInput">
              <label htmlFor="Product Description">Product Description :</label>
              {/* <textarea onChange={(e)=>setNewProdData({...newProdData,description : e.target.value})} type="text"  value={newProdData.description}></textarea> */}
              <textarea name="description" placeholder="Product Description"  onChange={(e)=>setNewProdData({...newProdData,description : e.target.value})}  value={newProdData.description} id="" cols="30" rows="10"></textarea>
            </div>
            <div className="formInput">
              <button  onClick={()=>{addProd();}} className="btn2__primary">Add Product</button>
            </div>
            
          </div>
        }
      </div>
    }
    </>
  )
}

export default SubCategory
