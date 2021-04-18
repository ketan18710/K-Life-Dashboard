import React,{useState} from 'react'
import {APP_ROUTES} from 'utils/constants'
import {redirectToUrl} from 'utils/common'
import Loader from 'components/Loader'  
import ADD_ICON from '../../../images/icons/add.svg'
import CLOSE_ICON from '../../../images/icons/close.svg'
import './style.scss'
import Error404 from '../../Error404'
function Categories(props) {
  console.log(props,'categoryProps')
  const newCategory = {
    title : '',
    category_slug : '',
    subCategories : [],
  }
  const newSubCategory = {
    title : '',
    sub_category_slug : '',
    description : '',
    products : [],
  }
  const [category, setCategory] = useState(null)
  const [subcategory, setSubCategory] = useState(null)
  const [categoryIndex, setCategoryIndex] = useState(null)
  const [newCategoryTrigger, setNewCategoryTrigger] = useState(null)
  const [newSubCategoryTrigger, setNewSubCategoryTrigger] = useState(null)
  const [newCategValidate, setnewCategValidate] = useState({title : null,slug : null})
  const [newSubCategValidate, setnewSubCategValidate] = useState({title : null,slug : null})
  const {config,setConfig,saveData,saveBtnLoader} = props
  let config_temp = config
  const {categories} = config_temp && config_temp
  const addNewCategory = () => {
    let validate = newCategValidate
    if(!category.title || category.title.length<=0){
      validate.title = 'Add a Title for Product'
    }else{
      validate.title = null
    }
    if(config.categories.find(cat=>cat.category_slug === category.category_slug)){
      validate.slug = 'Category slug should be unique'
    }else if(!category.category_slug || category.category_slug.length<=0){
      validate.slug = 'Category slug required'
    }else{
      validate.slug = null
    }
    setnewCategValidate({...newCategValidate,title : validate.title, slug : validate.slug})
    if(!validate.slug && !validate.title){
      let config_temp = config.categories
      config_temp.push(category)
      setConfig({...config,categories : config_temp})
    }
  }
  console.log({newCategValidate})
  const addNewSubCategory = () => {
    let validate = newSubCategValidate
    if(!subcategory.title || subcategory.title.length<=0){
      validate.title = 'Add a Title for Product'
    }else{
      validate.title = null
    }
    if(category.subCategories.find(sub=>sub.sub_category_slug === subcategory.sub_category_slug)){
      validate.slug = 'Sub-category slug should be unique'
    }else if(!category.category_slug || category.category_slug.length<=0){
      validate.slug = 'Sub-category slug required'
    }else{
      validate.slug = null
    }
    setnewSubCategValidate({...newSubCategValidate,title : validate.title, slug : validate.slug})
    if(!validate.slug && !validate.title){
      let temp = category.subCategories
      temp.push(subcategory)
      setCategory({...category,subCategories : temp})
      setNewSubCategoryTrigger(false)

    }
  }
  const editCategory = (type,val) => {
    setCategory({...category,[type] : val})
  }
  const editSubCategory = (type,val) => {
    setSubCategory({...subcategory,[type] : val})
  }
  const saveCategoryChanges = () => {
    let config_temp = config
    config_temp['categories'][categoryIndex] = category
    // setConfig({...config,categories : config_temp})
    saveData(config_temp)

  }
  const deleteSubCat = (index) => {
    let temp = category['subCategories']
    temp.splice(index,1)
    setCategory({...category,subCategories : temp})
  }
  const deleteCategory = () => {
    let temp = config
    temp['categories'].splice(categoryIndex,1)
    saveData(temp)
  }
  
  return (
    <>
    {
      saveBtnLoader ? 
      <Loader />
      :
      <div className="Categories">
        <div className="header">
          <h3 className="title">Product Categories</h3>
          <div className="action">
            <button className="btn1__secondary" onClick={()=>{setCategory(newCategory);setNewCategoryTrigger(true)}}>Add New Category</button>
          </div>
        </div>
        <select className="selectCategory" name="categories" onChange={(e)=>{ let x = JSON.parse(e.target.value); setCategoryIndex(x.index) ;setCategory(x.category) ;setNewCategoryTrigger(false) }}>
          <option value={JSON.stringify({})}>Select Category</option>
          {
            categories && categories.map((category,index)=><option value={JSON.stringify({category: category,index : index})}>{category.title}</option>)
          }
        </select>
        {
          category  && Object.keys(category).length > 0 && !newCategoryTrigger &&
          <div className="categoryForm">
            <div className="formGroup">
              <div className="formInput">
                <button onClick={()=>saveCategoryChanges()} className="saveContent btn2__primary">Save Changes</button>
              </div>
              <div className="formInput">
                <button onClick={()=>deleteCategory()} className="saveContent btn2__secondary">Delete Category</button>
              </div>
            </div>
            <div className="formInput">
              <label htmlFor="category Title">Category Title  :   </label>
              <input placeholder="Category Title" onChange={(e)=>editCategory('title',e.target.value)} value={category.title} type="text"/> 
            </div>
            <div className="formInput">
              <label htmlFor="category slug">Category Slug   :   </label>
              <input disabled placeholder="Category Slug"  onChange={(e)=>editCategory('category_slug',e.target.value)} value={category.category_slug} type="text"/> 
            </div>
            <div className="formInput">
              <label htmlFor="category subcaegories">SubCategories   :    </label>
            </div>
            <div className="subCategories">
              {
                category  && Object.keys(category).length > 0 && category.subCategories  &&
                category.subCategories.map((item,index)=>
                  <div className="subCategory">
                    <h4 className="title">{item.title}</h4>
                    <p className="description">{item.description}</p>
                    <h2>{ }</h2>
                    <h5 className="btn2__primary" onClick={()=>redirectToUrl(APP_ROUTES.SUB_CATEGORIES_ALIAS(category.category_slug,item.sub_category_slug))}>Edit</h5>
                    <img onClick={()=>deleteSubCat(index)} src={CLOSE_ICON} alt="" className="closeIcon"/>
                  </div>
                )
              }
              <div onClick={()=>{setSubCategory(newSubCategory);setNewSubCategoryTrigger(true)}} className="subCategory subCategoryAdd">
                <img src={ADD_ICON} alt=""/>
              </div>
            </div>
            {
              newSubCategoryTrigger &&
              <div className="addNewCategory">
                <h3 className="title">Add New Sub-Category</h3>
                <div className="formInput">
                  <label htmlFor="category Title">Sub-Category Title  :   </label>
                  <input  placeholder="Sub-Category Title"  onChange={(e)=>editSubCategory('title',e.target.value)}  value={subcategory.title} type="text"/> 
                  { newSubCategValidate.title && <p className="formErrorMsg">{newSubCategValidate.title}</p> }         
                </div>
                <div className="formInput">
                  <label htmlFor="category Title">Sub-Category Slug   :   </label>
                  <input  placeholder="Sub-Category Slug"  onChange={(e)=>editSubCategory('sub_category_slug',e.target.value)}  value={subcategory.sub_category_slug} type="text"/> 
                  { newSubCategValidate.slug && <p className="formErrorMsg">{newSubCategValidate.slug}</p> }               
                  </div>
                <div className="formInput">
                  <label htmlFor="category Title">Sub-Category Description   :   </label>
                  <textarea   cols="30" rows="3" placeholder="Sub-Category Description" onChange={(e)=>editSubCategory('description',e.target.value)}  value={subcategory.description} type="text"></textarea> 
                </div>
                <button className="btn2__primary" onClick={()=>addNewSubCategory()}>Add SubCategory</button>
              
            </div>
            }
          </div>
        }
        {
          newCategoryTrigger &&
          <div className="addNewCategory">
            <h3 className="title">Add New Category</h3>
            <div className="formInput">
              <label htmlFor="category Title">Category Title  :   </label>
              <input placeholder="Category Title" value={category.title} onChange={(e)=>editCategory('title',e.target.value)} type="text"/> 
              { newCategValidate.title && <p className="formErrorMsg">{newCategValidate.title}</p> }               
            </div>
            <div className="formInput">
              <label htmlFor="category Slug">Category Slug   :   </label>
              <input placeholder="Category Slug"  value={category.category_slug} onChange={(e)=>editCategory('category_slug',e.target.value)}  type="text"/> 
              { newCategValidate.slug && <p className="formErrorMsg">{newCategValidate.slug}</p> }               
            </div>
            <button className="btn2__primary"  onClick={()=>addNewCategory()}>ADD</button>
          </div>
        }
      </div>
    }
    </>
  )
}

export default Categories
