import React,{useState,useEffect} from 'react'
import TextEditor from 'components/TextEditor/index'
import './style.scss'
import Loader from '../../Loader'
function AboutUs(props) {
  const {config,setConfig,save,saveData,saveBtnLoader} = props
  const aboutUS = config && config.aboutUS
  const description = aboutUS &&  aboutUS.description 
  console.log(aboutUS,'aboutUsdescription')
  const [saveContentTrigger, setSaveContentTrigger] = useState(null)
  const [loader, setLoader] = useState(null)
  const setAboutUs = (val) => {
    setConfig({...config,aboutUS : {description : val}})
    window.localStorage.setItem('saveContent',true)
  }
  useEffect(() => {
    setLoader(true)
    let x = setTimeout(() => {
      setLoader(false)
      clearTimeout(x)
    }, 3000);
  }, [])
  useEffect(() => {
    if(window.localStorage.getItem('saveContent')){
      saveData(config)
      window.localStorage.removeItem('saveContent')
    }
  }, [config])
  // useEffect(() => {
  //  alert(1)
  // }, [config])
  return (
    <div  className="Dashboard__aboutUs">
      {
        saveBtnLoader || loader ? 
        <Loader />
        :
        <>
          <div className="actions">
            <button className="btn1__primary" onClick={()=>setSaveContentTrigger(true)}> Save</button>
          </div>
          <TextEditor 
            content={description}
            setHtml = {(html)=>setAboutUs(html)}
            saveContentTrigger={saveContentTrigger}
          />
        </>
        
      }
    </div>
  )
}

export default AboutUs
