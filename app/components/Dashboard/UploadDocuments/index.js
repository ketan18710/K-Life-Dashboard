import React, { useState, useEffect, useRef } from 'react';
import './style.scss';
import { APP_ROUTES, EMAIL_EDITOR_API_KEY, NO_IMAGE } from "utils/constants";
import FileUpload from "../../FileUpload/index";
import { API_CONSTANTS } from '../../../utils/constants';
import { toast } from 'react-toastify';
import CloseIcon from '../../../images/icons/close.svg';
function UploadDocuments(props) {
  const {
    triggers,
    setTriggers,
    saveBtnLoader,
    loader,
    setLoader,
    saving,
    setSaving,
    uploadImage,
    saveData,
    save,
    setConfig,
    uploadImageData,
    config,
    resetUploadImage
  } = props
  const {catalogues} = config && config
  const [media, setMedia] = useState(null);
  console.log(catalogues,'catalogues')
  const createSaveData = () => {
        
  }
  const deleteCatalogue = (index) => {
    let temp = config.catalogues
    temp.splice(index, 1);
    setConfig({...config,catalogues :temp})
  }
    

  const onChangeMediaFunc = (e) => {
    const selectedFile = e.target.files[0];
    setMedia({ image: selectedFile });
  };
  const submitMediaFormFunc = () => {
    const formData = new FormData();
    formData.append("image", media.image);
    uploadImage(formData);
    // let x = setTimeout(() => {
    //   clearTimeout(x)
    // }, 800);
  };
  return (
    <>
      <FileUpload
        uploadDoc
        open={triggers.uploadingDocument}
        close={() => setTriggers({ ...triggers, uploadingDocument: false })}
              onChangeMediaFunc={(e) => onChangeMediaFunc(e)}
        submitMediaFormFunc={() => submitMediaFormFunc()}
      />
      <div className="UploadDocuments">
        <div className="header">
          <h3>Upload User Manuals</h3>
                <button
                  onClick={() => saveData(config)}
                  className="btn2__primary"
                >
            Save
          </button>
        </div>
        <div className="addNewDocument">
          <button
                  onClick={() => setTriggers({...triggers,uploadingDocument : true})}
                  className="btn1__secondary"
                >
            Select Document
          </button>
        </div>
        <div className="displayDocuments">
                {
                  catalogues && catalogues.map((catalogue,index)=>(
              <div className="wrapper">
                      <a
                        download
                        href={catalogue.link}
                        className="btn1__primary"
                      >
                  {catalogue.title}
                </a>
                      <img src={CloseIcon} onClick={()=>deleteCatalogue(index)} alt="" />

                    </div>

                  ))
            ))}
        </div>
      </div>
    </>
  )
}

export default UploadDocuments;
