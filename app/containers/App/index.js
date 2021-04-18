/**
 *
 * App
 *
 */

import React, { memo , useEffect,useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectApp,{makeSelectConfig, makeSelectImageUpload, makeSelectLogin, makeSelectResetPassword, makeSelectSave} from './selectors';
import { getData,saveData, saveImage,getLgin, getResetPAssword, resetUploadImage, defaultAction} from './actions'
import reducer from './reducer';
import saga from './saga';
import { Switch, Route } from 'react-router-dom';
import './style.scss';
import {DEFAULT_IMAGE_1 as IMG1,DEFAULT_IMAGE_2 as IMG2,API_CONSTANTS,APP_ROUTES,redirectFor,user} from 'utils/constants'
import {AuthHelper,redirectToUrl} from 'utils/common'
import Sidebar from 'components/Sidebar';
import Loader from 'components/Loader'
import Login from 'components/Login'
import ResetPassword from 'components/ResetPassword'
import Home from 'components/Dashboard/Home'
import AboutUs from 'components/Dashboard/AboutUs'
import Gallery from 'components/Dashboard/Gallery'
import Categories from 'components/Dashboard/Categories'
import SubCategory from 'components/Dashboard/SubCategory'
import Product from 'components/Dashboard/Product'
import Error404 from '../../components/Error404';
export function App(props) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });
  
  const [config, setConfig] = useState({
    'carrousel' : ['http://www.klifecare.com//upload/data/productimg/9835Three-Channel-ECG.jpg','https://image.freepik.com/free-vector/certificate-icon-with-ribbon-medal-flat-design_115464-65.jpg'],
    'KLifeInfo' : [
      {
        image : 'https://image.freepik.com/free-vector/certificate-icon-with-ribbon-medal-flat-design_115464-65.jpg',
        label : 'Certified Products'
      },
      {
        image : 'https://image.freepik.com/free-vector/certificate-icon-with-ribbon-medal-flat-design_115464-65.jpg',
        label : 'Experienced Products'
      },
      {
        image : 'https://image.freepik.com/free-vector/certificate-icon-with-ribbon-medal-flat-design_115464-65.jpg',
        label : 'Latest Prodcuts in healthcare'
      },
    ],
    'margueeProducts' : [
      {
        image : 'https://image.freepik.com/free-vector/certificate-icon-with-ribbon-medal-flat-design_115464-65.jpg',
        title :"Analysers"
      },
      {
        image : 'https://image.freepik.com/free-vector/certificate-icon-with-ribbon-medal-flat-design_115464-65.jpg',
        title :"Home Healthcare Devices"
      },
      {
        image : 'https://image.freepik.com/free-vector/certificate-icon-with-ribbon-medal-flat-design_115464-65.jpg',
        title :"Medical Equipment"
      },
    ],
    'latest' : [],
    'socialLinks' : [],
    'aboutUS' : {'description' : ''},
    'gallery' : ['https://image.freepik.com/free-vector/certificate-icon-with-ribbon-medal-flat-design_115464-65.jpg','https://image.freepik.com/free-vector/certificate-icon-with-ribbon-medal-flat-design_115464-65.jpg','https://image.freepik.com/free-vector/certificate-icon-with-ribbon-medal-flat-design_115464-65.jpg','https://image.freepik.com/free-vector/certificate-icon-with-ribbon-medal-flat-design_115464-65.jpg'],
    'categories' : []
  })
  const [appLoader, setAppLoader] = useState({val : null})
  const [loggedIn, setLoggedIn] = useState(null)
  const [saving, setSaving] = useState(null)
  const [loader, setLoader] = useState({
    gallery : null,
    aboutUs : null,
    subCategory : null,
    login : null
  })
  const [productImageType, setProductImageType] = useState({
    carrousel : false,
    accessories : false,
    file : false,
  })
  const [triggers, setTriggers] = useState({
    addLatest : false,
    fileModal : false,
    uploadMedia : false
  })
  const [activeType, setactiveType] = useState({
    carrousel : {
      bool : false,
      index : null,
      add : null,
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
  })
  const [saveBtnLoader, setSaveBtnLoader] = useState(null)
  const {userConfig,fetchData,save,saveData,uploadImage,uploadImageData,defaultAction,login,loginData,resetPasswordData,reset} = props
  useEffect(() => {
    if(AuthHelper.isAuthenticated()){
      fetchData()
      setLoggedIn(true)
      setAppLoader({...appLoader, val : true})
    }else{
      // toast.error('login first')
      redirectToUrl(APP_ROUTES.LOGIN)
      setLoggedIn(false)
    }
  }, [])
  useEffect(() => {
    const {status,data} = uploadImageData
    if(status === 1 ){
      setTriggers({...triggers,uploadMedia : true})
    }
  }, [uploadImageData.status])
  useEffect(() => {
    const {status,data} = userConfig
    if(status === 1){
      let parsed = JSON.parse(data)
      setConfig(parsed)
      setAppLoader({...appLoader, val : false})
    }else if(status === -1){
      toast.error(data)
      setAppLoader({...appLoader, val : false})
      redirectToUrl('/error')
    }
  }, [userConfig.status])
  
  console.table(loginData)
  useEffect(() => {
    const {status,data} = save
    if(status === 0){
      setAppLoader({...appLoader, val : true})
    }else if(status === 1){
      setConfig(data)
      setAppLoader({...appLoader, val : false})
      toast.success('Saved successfully')
    }else{
      setAppLoader({...appLoader, val : false})
      toast.error(data)
    }
  }, [save.status])
  const mainBodyObserverCallback = () => {
    const mainBodyInnerWrapper = document.getElementById('mainBodyInnerWrapper')
    const innerHtml = mainBodyInnerWrapper.innerHTML
    const loader  = document.getElementById('K_LIFE_loader')
    if(!innerHtml){
      loader.style.display = "flex"
    }else{  
      loader.style.display = "none"
    }
  }
  useEffect(() => {
    const targetNode = document.getElementById('mainBodyInnerWrapper');
    if(targetNode){
      const observerConfig = { attributes:false, childList:true, subtree: true };
      const observer = new MutationObserver(mainBodyObserverCallback);
      observer.observe(targetNode, observerConfig);
    }
  }, [document.getElementById('mainBodyInnerWrapper')])



  return (
    <>
      {
        appLoader.val? 
        <Loader />
        :
        <div id="AppContainer">
          <Helmet
            titleTemplate="%s - K-Life"
            defaultTitle="K-Life"
          >
            <meta name="description" content="K-Life" />
          </Helmet> 
          <ToastContainer
              position="top-right"
              hideProgressBar
              autoClose={1000}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
              {
                loggedIn && <Sidebar />
              }
              <div id={!loggedIn ? 'mainBodyLogin' :"mainBody"}>
                <div id="K_LIFE_loader">
                  <div class="loader"></div>
                </div>
                <div id="mainBodyInnerWrapper">
                  <Switch>
                    <Route exact path={APP_ROUTES.DASHBOARD} component={()=><Home saveBtnLoader={saveBtnLoader} uploadImage={(data)=>uploadImage(data)} activeType={activeType} resetUploadImage={()=>resetUploadImage()} setactiveType={(data)=>setactiveType(data)} triggers={triggers} setTriggers={(data)=>setTriggers(data)} saveData={(data)=>saveData(data)} save={save}   uploadImageData={uploadImageData} redirectFor={redirectFor.DASHBOARD} config={config} setConfig={(data)=>setConfig(data)}  />} />
                    <Route exact path={APP_ROUTES.LOGIN} component={()=><Login defaultAction={()=>defaultAction()} setLoggedIn={(val)=>setLoggedIn(val)} login={(data)=>login(data)} loginData={loginData}   loader={loader} setLoader={(data)=>setLoader(data)}  />} />
                    <Route exact path={APP_ROUTES.RESET_PASSWORD} component={()=><ResetPassword resetPasswordData={resetPasswordData}  reset={(data)=>reset(data)}/>} />
                    <Route exact path={APP_ROUTES.DASHBOARD_GALLERY} component={()=><Gallery saveBtnLoader={saveBtnLoader}  triggers={triggers} setTriggers={(data)=>setTriggers(data)} loader={loader} setLoader={(data)=>setLoader(data)}  saving={saving} setSaving={(data)=>setSaving(data)} uploadImage={(data)=>uploadImage(data)} saveData={(data)=>saveData(data)} save={save} setConfig={(data)=>setConfig(data)}  uploadImageData={uploadImageData} redirectFor={redirectFor.DASHBOARD_GALLERY} config={config} />} />
                    <Route exact path={APP_ROUTES.CATEGORIES} component={()=><Categories  saveBtnLoader={saveBtnLoader} loader={loader} setLoader={(data)=>setLoader(data)}  saving={saving} setSaving={(data)=>setSaving(data)} uploadImage={(data)=>uploadImage(data)} saveData={(data)=>saveData(data)} save={save} setConfig={(data)=>setConfig(data)}  uploadImageData={uploadImageData} redirectFor={redirectFor.DASHBOARD_GALLERY} config={config} />} />
                    <Route exact path={APP_ROUTES.DASHBOARD_ABOUTUS} component={()=><AboutUs  saveBtnLoader={saveBtnLoader} loader={loader} setLoader={(data)=>setLoader(data)}  saving={saving} setSaving={(data)=>setSaving(data)} uploadImage={(data)=>uploadImage(data)} saveData={(data)=>saveData(data)} save={save} setConfig={(data)=>setConfig(data)}  uploadImageData={uploadImageData} redirectFor={redirectFor.DASHBOARD_GALLERY} config={config} />} />
                    <Route exact path={APP_ROUTES.SUB_CATEGORIES} component={()=><SubCategory  saveBtnLoader={saveBtnLoader} loader={loader} setLoader={(data)=>setLoader(data)}  saving={saving} setSaving={(data)=>setSaving(data)} uploadImage={(data)=>uploadImage(data)} saveData={(data)=>saveData(data)} save={save} setConfig={(data)=>setConfig(data)}  uploadImageData={uploadImageData} redirectFor={redirectFor.DASHBOARD_GALLERY} config={config} />} />
                    <Route exact path={APP_ROUTES.PRODUCT} component={()=><Product productImageType={productImageType} setProductImageType={(data)=>setProductImageType(data)}  triggers={triggers} setTriggers={(data)=>setTriggers(data)}  saveBtnLoader={saveBtnLoader} loader={loader} setLoader={(data)=>setLoader(data)}  saving={saving} setSaving={(data)=>setSaving(data)} uploadImage={(data)=>uploadImage(data)} saveData={(data)=>saveData(data)} save={save} setConfig={(data)=>setConfig(data)}  uploadImageData={uploadImageData} redirectFor={redirectFor.DASHBOARD_GALLERY} config={config} />} />
                    <Route component={Error404} />
                  </Switch>
                </div>
              </div> 
          <ToastContainer />
        </div>     
      }
    </>     
  );
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
  userConfig: makeSelectConfig(),
  save: makeSelectSave(),
  uploadImageData: makeSelectImageUpload(),
  loginData: makeSelectLogin(),
  resetPasswordData: makeSelectResetPassword(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchData: () => dispatch(getData()),
    defaultAction: () => dispatch(defaultAction()),
    resetUploadImage: () => dispatch(resetUploadImage()),
    saveData: (data) => dispatch(saveData(data)),
    uploadImage: (data) => dispatch(saveImage(data)),
    login : (data) => dispatch(getLgin(data)),
    reset : (data) => dispatch(getResetPAssword(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(App);
