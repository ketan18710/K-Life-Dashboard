import React,{useState,useEffect} from 'react'
import './style.scss'
import EditImage from '../../Image/editImage'
import AddIcon from '../../../images/icons/add.svg'
import EditIcon from '../../../images/icons/edit.svg'
import {Card3 as Card} from 'components/Cards/index'
import FileUpload from '../../FileUpload/index'
import Loader from '../../Loader/index'
import {redirectToUrl} from 'utils/common'
import {APP_ROUTES} from 'utils/constants'
import { add } from 'lodash'
function DashboardHome(props) {
  const {config,uploadImage,uploadImageData,triggers ,setTriggers, activeType, setactiveType,saveData,saveBtnLoader ,setConfig,resetUploadImage} = props
  const [configTemp, setConfigTemp] = useState('')
  const type_confs = {
    carrousel : 'carrousel',
    KLifeInfo : 'KLifeInfo',
    margueeProducts : 'margueeProducts',
    latest : '',
  }
  const setactiveTypeFunc = (type,index,add = null) => {
    let temp = {
      carrousel : {
        bool : false,
        index : null,
        add : add
      },
      KLifeInfo : {
        bool : false,
        index : null
      },
      margueeProducts : {
        bool : false,
        index : null
      },
      latest : {
        bool : false,
        index : null
      },
    }
    // debugger
    temp = {...temp,[type] : {bool : true, index : index,add : add}}
    setactiveType(temp)
  }
  const [addLatestValues, setAddLatestValues] = useState(
    {
      "title": "",
      "image" : null,
      "category_slug" : '',
      "description":"",        
      "sub_category_slug": "",
      "model_id": ""
    },
  )
  const category = configTemp && configTemp.categories && configTemp.categories.find(category=>category.category_slug === addLatestValues.category_slug) 
  const subCategory = category && category.subCategories.find(subCategory=>subCategory.sub_category_slug === addLatestValues.sub_category_slug) 
  const [media, setMedia] = useState(null)
  const onChangeMediaFunc = (e)=>{
    const selectedFile = e.target.files[0];
    setMedia({"image" : selectedFile});
  }
  const submitMediaFormFunc = ()=>{
    const formData = new FormData()
    formData.append('image',media.image)
    // console.log(formData)
    // debugger
    uploadImage(formData)
    setConfig(configTemp)
  }

  useEffect(() => {
    if(addLatestValues.category_slug && addLatestValues.category_slug.length){
      setAddLatestValues({...addLatestValues,sub_category_slug : ''})
    }
  }, [addLatestValues.category_slug])
  useEffect(() => {
    // console.log(addLatestValues.category_slug)
  }, [addLatestValues.category_slug])
  useEffect(() => {
    setConfigTemp(config)
  }, [])
  // const {carrousel,KLifeInfo} = configTemp
  const updateConfig = (type,value) => {
    setConfigTemp({...configTemp,[type] : value})
    
  }
  
  const editKLifeInfo = (index,label) => {
    let temp = configTemp['KLifeInfo']
    temp[index].label = label
    console.log({temp,x : typeof(temp)})
    updateConfig('KLifeInfo',temp)
  }
  const editMarqueeTitle = (index,title) => {
    let temp = configTemp['margueeProducts']
    temp[index].title = title
    console.log({temp,x : typeof(temp)})
    updateConfig('margueeProducts',temp)
  }
  const addNewLatestProd = (del,delIndex,prod) => {
    if(addLatestValues.category_slug.length <=0 || 
      addLatestValues.sub_category_slug.length <=0 || 
      addLatestValues.model_id.length <=0 ){
        return
      }
    let temp = configTemp.categories
    const productVals = del ? prod : addLatestValues
    const categoryIndex = temp.findIndex(category=>category.category_slug === productVals.category_slug) 
    const subCategory = temp[categoryIndex].subCategories.find(subCategory=>subCategory.sub_category_slug === productVals.sub_category_slug) 
    const subCategoryIndex = temp[categoryIndex].subCategories.findIndex(subCategory=>subCategory.sub_category_slug === productVals.sub_category_slug) 
    let product = subCategory.products.find(product=>product.model_id === productVals.model_id)
    const productIndex = subCategory.products.findIndex(product=>product.model_id === productVals.model_id)
    product.latest = del ?  false : true  
    temp[categoryIndex].subCategories[subCategoryIndex].products[productIndex] = product
    let temp_latest = configTemp.latest
    if(del){
      temp_latest.splice(delIndex,1)
    }else{
      temp_latest.push(productVals)
    }
    setConfigTemp({...configTemp,latest : temp_latest,categories : temp})
    setTriggers({...triggers,addLatest : false})
  }

  const setUploadedMediaFunc = (link) => {
    const keys = Object.keys(activeType)
    let key = keys && keys.find(key =>activeType[key].bool === true)
    let index = activeType[key].index
    // debugger
    let temp = config
    let obj = temp[key]
    if(key === type_confs.carrousel){
      // debugger
      if(activeType[key].add){
        obj.push(link)
      }else{
        obj[index] = link
      }
    }else if(key === type_confs.KLifeInfo ){
      obj[index]['image'] = link
    }else if(key === type_confs.margueeProducts ){
      obj[index]['image'] = link
    }
    temp = {...config,[key] : obj}
    // debugger
    setConfig(temp)
    setTriggers({...triggers,fileModal : false,uploadMedia : false})
  }
  
  const deleteCarrauselImage = (index) => {
    let temp = configTemp['carrousel']
    temp.splice(index,1)
    setConfig({...config,carrousel : temp})
  }
  

  useEffect(() => {
    if(triggers.uploadMedia){
      setUploadedMediaFunc(uploadImageData.data.link)
    }
  }, [triggers.uploadMedia])

  const saveContent = () => {
    saveData(configTemp)
  }
  console.log({saveBtnLoader})

  return (
    <div className="Dashboard__home">
      {
        saveBtnLoader ? 
        <Loader />
        :
        <>
          <FileUpload open={triggers.fileModal} close={()=>setTriggers({...triggers,fileModal : false})}  onChangeMediaFunc={(e)=>onChangeMediaFunc(e)} submitMediaFormFunc={()=>submitMediaFormFunc()} />
          <div className="header">
            <h3 className="title">HOME PAGE : </h3>
            <button className="btn2__primary" onClick={()=>saveContent()}>SAVE</button>
          </div>
          <div className="carrauselImages">
            <h3 className="title">Carrausel</h3>
            <div className="content">
              {
                configTemp && configTemp.carrousel && configTemp.carrousel.length>0 && configTemp.carrousel.map((image,index)=><EditImage src={image}  edit={()=>{setactiveTypeFunc('carrousel',index);setTriggers({...triggers,fileModal : true})}} close={()=>deleteCarrauselImage(index)}/>)
              }
              <div onClick={()=>{setactiveTypeFunc('carrousel',null,true);setTriggers({...triggers,fileModal : true})}} className="addCarraudelImage">
                <img src={AddIcon} alt="add carrausel image"/>
              </div>
            </div>
          </div>
          <div className="KLifeInfo">
            <h3 className="title">K-Life Info</h3>
            <div className="content">
              {
                configTemp && configTemp.KLifeInfo  && configTemp.KLifeInfo.map(((item,index)=>
                  <div className="point">
                    <div className="image">
                      <img className="hero" src={item.image}/>
                      <img className="icon"  onClick={()=>{setactiveTypeFunc('KLifeInfo',index);setTriggers({...triggers,fileModal : true})}} src={EditIcon}/>
                    </div>
                    <input className="label"  onChange={(e)=>editKLifeInfo(index,e.target.value)} value={item.label}/>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="marquee">
            <h3 className="title">MARQUEE PRODUCTS</h3>
            <div className="products">
              {
                configTemp && configTemp.margueeProducts &&configTemp.margueeProducts.length && configTemp.margueeProducts.map(((product,index)=>
                  <div className="product">
                    <div className="image">
                      <img className="hero" src={product.image} alt={product.title + '  image'}/>
                      <img className="icon"  onClick={()=>{setactiveTypeFunc('margueeProducts',index);setTriggers({...triggers,fileModal : true})}}   src={EditIcon}/>
                    </div>
                    <input onChange={(e)=>editMarqueeTitle(index,e.target.value)}  className="title" type="text" value={product.title}/>
                    {/* <h3 className="title">{product.title}</h3> */}
                  </div>  
                ))
              }
            </div>
          </div>
          <div className="latestProducts">
              <h3 className="title">LATEST PRODUCTS</h3>
              {
                triggers.addLatest &&
                <div className="add">
                  <select onChange={(e)=>{ setAddLatestValues({...addLatestValues,category_slug : e.target.value})}} name="categories">
                    <option  selected={addLatestValues.category_slug === "" }  value="" >Select a Category</option>
                    {
                      configTemp && configTemp.categories && configTemp.categories.map(category=><option selected={addLatestValues.category_slug === category.category_slug } value={category.category_slug}>{category.title}</option>)
                    }
                  </select>
                  {
                    addLatestValues.category_slug && addLatestValues.category_slug.length && category &&
                    <select name="sub_category" id="sub_category" onChange={(e)=>{setAddLatestValues({...addLatestValues,sub_category_slug : e.target.value})}} >
                      <option  selected={addLatestValues.sub_category_slug === "" }  value="" >Select a Sub-category</option>
                      {
                        category && category.subCategories.map(subCategory=><option selected={addLatestValues.sub_category_slug === subCategory.sub_category_slug }  value={subCategory.sub_category_slug}>{subCategory.title}</option>)
                      }
                    </select>
                  }
                  {
                    addLatestValues.sub_category_slug && addLatestValues.sub_category_slug.length && subCategory &&
                    <select name="model_id" id="model_id" onChange={(e)=>{let prod =  JSON.parse(e.target.value); prod.model_id && prod.model_id.length && setAddLatestValues({...addLatestValues,model_id : prod.model_id,description : prod.description,title : prod.title,image : prod.image})}} >
                      <option  selected={addLatestValues.sub_category_slug === "" }  value={JSON.stringify({model_id : ""})} >Select a Product</option>
                      {
                        subCategory && subCategory.products.map(product=><option selected={addLatestValues.model_id === product.model_id }  value={JSON.stringify({model_id : product.model_id, title : product.title , description : product.description,image : product.images[0]})}>{product.title}</option>)
                      }
                    </select>
                  }
                  {
                    addLatestValues.category_slug && addLatestValues.sub_category_slug && addLatestValues.model_id &&
                    <button className="markLatest btn1__primary" onClick={()=>addNewLatestProd()}>Add to Latest Product</button>
                  }
                </div>
              }
              <div className="products">
                {
                  configTemp && configTemp.latest  && configTemp.latest.map((product,index)=>(
                    <div className="product">
                      <Card 
                        title={product.title}
                        image={product.image}
                        description={product.description}
                        action={()=>redirectToUrl(APP_ROUTES.PRODUCT_ALIAS(product.category_slug,product.sub_category_slug,product.model_id))}
                        actionText="Edit"
                        close={()=>{setAddLatestValues(product);addNewLatestProd(true,index,product)}}
                      />
                    </div>
                  ))
                }
                <div className="product">
                  <div className="Card3 Card3Add" onClick={()=>setTriggers({...triggers,addLatest : true})} >
                    <div className="image">
                      <img className="hero" src={AddIcon}/>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="uploadImage">
                <input type="file" onChange={(e)=>onChangeMediaFunc(e)} name="input_file" id="fileInput"/>
                <button onClick={()=>submitMediaFormFunc()}>Upload</button>
              </div> */}
          </div>
        </>
      }
    </div>
  )
}

export default DashboardHome
// 