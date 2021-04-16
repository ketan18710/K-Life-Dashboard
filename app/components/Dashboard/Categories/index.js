import React,{useState} from 'react'
import {APP_ROUTES} from 'utils/constants'
import {redirectToUrl} from 'utils/common'
import Loader from 'components/Loader'  
import ADD_ICON from '../../../images/icons/add.svg'
import './style.scss'
function Categories(props) {
  console.log(props,'categoryProps')
  const newCategory = {
    title : 'Category Title',
    category_slug : 'Category Slug',
    subCategories : [],
  }
  const newSubCategory = {
    title : 'SubCategory Title',
    sub_category_slug : 'SubCategory Slug',
    description : 'description',
    products : [],
  }
  const [category, setCategory] = useState(null)
  const [subcategory, setSubCategory] = useState(null)
  const [categoryIndex, setCategoryIndex] = useState(null)
  const [newCategoryTrigger, setNewCategoryTrigger] = useState(null)
  const [newSubCategoryTrigger, setNewSubCategoryTrigger] = useState(null)
  const {config,setConfig,saveData,saveBtnLoader} = props
  let config_temp = config
  const {categories} = config_temp && config_temp
  const addNewCategory = () => {
    let config_temp = config.categories
    config_temp.push(category)
    setConfig({...config,categories : config_temp})
  }
  console.log({category,subcategory})
  const addNewSubCategory = () => {
    let temp = category.subCategories
    temp.push(subcategory)
    setCategory({...category,subCategories : temp})
    setNewSubCategoryTrigger(false)
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
            <div className="formInput">
              <button onClick={()=>saveCategoryChanges()} className="saveContent btn2__secondary">Save Changes</button>
            </div>
            <div className="formInput">
              <label htmlFor="category Title">Category Title  :   </label>
              <input onChange={(e)=>editCategory('title',e.target.value)} value={category.title} type="text"/> 
            </div>
            <div className="formInput">
              <label htmlFor="category Title">Category Slug   :   </label>
              <input  onChange={(e)=>editCategory('category_slug',e.target.value)} value={category.category_slug} type="text"/> 
            </div>
            <div className="formInput">
              <label htmlFor="category Title">SubCategories   :    </label>
            </div>
            <div className="subCategories">
              {
                category  && Object.keys(category).length > 0 && category.subCategories  &&
                category.subCategories.map(item=>
                  <div className="subCategory">
                    <h4 className="title">{item.title}</h4>
                    <p className="description">{item.description}</p>
                    <h2>{ }</h2>
                    <h5 className="btn2__primary" onClick={()=>redirectToUrl(APP_ROUTES.SUB_CATEGORIES_ALIAS(category.category_slug,item.sub_category_slug))}>Edit</h5>
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
                  <input  onChange={(e)=>editSubCategory('title',e.target.value)}  value={subcategory.title} type="text"/> 
                </div>
                <div className="formInput">
                  <label htmlFor="category Title">Sub-Category Slug   :   </label>
                  <input onChange={(e)=>editSubCategory('sub_category_slug',e.target.value)}  value={subcategory.sub_category_slug} type="text"/> 
                </div>
                <div className="formInput">
                  <label htmlFor="category Title">Sub-Category Description   :   </label>
                  <input  onChange={(e)=>editSubCategory('description',e.target.value)}  value={subcategory.description} type="text"/> 
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
              <input value={category.title} onChange={(e)=>editCategory('title',e.target.value)} type="text"/> 
            </div>
            <div className="formInput">
              <label htmlFor="category Title">Category Slug   :   </label>
              <input value={category.category_slug} onChange={(e)=>editCategory('category_slug',e.target.value)}  type="text"/> 
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
