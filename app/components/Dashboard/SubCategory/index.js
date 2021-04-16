import React,{useState,useEffect,useRef} from 'react'
import './style.scss'
import { useParams } from 'react-router-dom';
import {Card4 as Card} from 'components/Cards/index'
import { Editor } from '@tinymce/tinymce-react';  
import {APP_ROUTES,EMAIL_EDITOR_API_KEY,NO_IMAGE} from 'utils/constants'
import {redirectToUrl} from 'utils/common'
import ADD_ICON from '../../../images/icons/add.svg'

function SubCategory(props) {
  const {config,setConfig,saveData} = props
  const {category_slug,sub_category_slug} = useParams();
  const [subcategory, setSubcategory] = useState(null)
  const [subcategoryIndex, setSubcategoryIndex] = useState(null)
  const [addProdTrigger, setAddProdTrigger] = useState(null)
  const tinymce1 = useRef(null)
  const newProdVals = {
    title : 'Prodcut Name',
    isNew : false,
    latest : false,
    model_id : 'model_Id',
    images : [],
    description : ``,
    features : '',
    video : '',
    manuals : '',
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
  useEffect(() => {
    console.log(subcategory,'subcategory')
  }, [subcategory])
  const removeProd = (index) => {
    let temp = subcategory.products
    temp.splice(index,1)
    setSubcategory({...subcategory,products : temp})
  }
  const saveSubCategoryChanges = () => {
    let config_temp = config
    config_temp['categories'][categoryIndex]['subCategories'][subcategoryIndex] = subcategory
    // setConfig({...config,categories : config_temp})
    saveData(config_temp)

  }

  // console.log({subcategory})
  const addProd = () => {
    // subcategory.products.push(newProd)
    // let categ_new = categories
    // categ_new[categoryIndex].subCategories[subcategoryIndex] = subcategory 
    // setConfig({...config,categories : categ_new})
    let newProd = newProdData
    // newProd.description = tinymce1.current.editor.getContent()
    // debugger
    let temp = subcategory.products
    temp.push(newProd)
    setSubcategory({...subcategory,products : temp})
    setAddProdTrigger(false)
  }
  
  return (
    <div className="SubCategory">
      <div className="header">
        <div className="formInput">
          <input onChange={(e)=>editSubCategory('title',e.target.value)} className="title" type="text"  value={subcategory && subcategory.title}/>
        </div>
        <button onClick={()=>saveSubCategoryChanges()} className="btn1__primary">Save</button>
      </div>
      <div className="formInput">
        <label htmlFor="slug">Slug</label>
        <input onChange={(e)=>editSubCategory('sub_category_slug',e.target.value)} type="text"  value={subcategory && subcategory.sub_category_slug}/>
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
            <input onChange={(e)=>setNewProdData({...newProdData,title : e.target.value})} type="text"  value={newProdData.title}/>
          </div>
          <div className="formInput">
            <label htmlFor="Model Id">Model Id:</label>
            <input onChange={(e)=>setNewProdData({...newProdData,model_id : e.target.value})} type="text"  value={newProdData.model_id}/>
          </div>
          <div className="formInput">
            <label htmlFor="Product Description">Product Description</label>
            {/* <textarea onChange={(e)=>setNewProdData({...newProdData,description : e.target.value})} type="text"  value={newProdData.description}></textarea> */}
            <textarea name="description"  onChange={(e)=>setNewProdData({...newProdData,description : e.target.value})}  value={newProdData.description} id="" cols="30" rows="10"></textarea>
            {/* <Editor
              initialValue={newProdData.description} 
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
              // onChange={(e)=>{setHtml(e.target.getContent());}}
            /> */}
          </div>
          <div className="formInput">
            <button onClick={()=>{addProd();}} className="btn2__primary">Add Product</button>
          </div>
          
        </div>
      }
    </div>
  )
}

export default SubCategory
