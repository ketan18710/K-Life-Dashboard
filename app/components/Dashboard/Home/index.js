import React, { useState, useEffect } from 'react';
import './style.scss';
import { Card3 as Card } from 'components/Cards/index';
import { redirectToUrl, compressFile } from 'utils/common';
import EditImage from '../../Image/editImage';
import AddIcon from '../../../images/icons/add.svg';
import CloseIcon from '../../../images/icons/close.svg';
import EditIcon from '../../../images/icons/edit.svg';
import FileUpload from '../../FileUpload/index';
import Loader from '../../Loader/index';
import { APP_ROUTES, NO_IMAGE } from 'utils/constants';
import { add } from 'lodash';
import { toast } from 'react-toastify';
import { handleImageUpload } from '../../../utils/common';

function DashboardHome(props) {
  const {
    config,
    uploadImage,
    uploadImageData,
    triggers,
    setTriggers,
    activeType,
    setactiveType,
    saveData,
    saveBtnLoader,
    setConfig,
    resetUploadImage,
  } = props;
  const [configTemp, setConfigTemp] = useState('');
  console.log(configTemp, 'configTemp');
  const type_confs = {
    carrousel: 'carrousel',
    KLifeInfo: 'KLifeInfo',
    margueeProducts: 'margueeProducts',
    latest: '',
  };
  const setactiveTypeFunc = (type, index, add = null) => {
    let temp = {
      carrousel: {
        bool: false,
        index: null,
        add,
      },
      KLifeInfo: {
        bool: false,
        index: null,
      },
      margueeProducts: {
        bool: false,
        index: null,
      },
      latest: {
        bool: false,
        index: null,
      },
    };
    // debugger
    temp = { ...temp, [type]: { bool: true, index, add } };
    setactiveType(temp);
  };
  const [addLatestValues, setAddLatestValues] = useState({
    title: '',
    image: null,
    category_slug: '',
    description: '',
    sub_category_slug: '',
    model_id: '',
  });
  const [addMarqueeValues, setAddMarqueeValues] = useState({
    title: '',
    category_slug: '',
    products: [],
    image: '',
    marquee: false,
  });
  console.log(addMarqueeValues, 'addMarqueeValues');
  const category =
    configTemp &&
    configTemp.categories &&
    configTemp.categories.find(
      category => category.category_slug === addLatestValues.category_slug,
    );
  const [media, setMedia] = useState(null);
  const onChangeMediaFunc = e => {
    const selectedFile = e.target.files[0];
    setMedia({ image: selectedFile });
  };
  const submitMediaFormFunc = () => {
    const formData = new FormData();
    formData.append('image', media.image);
    // console.log(formData)
    // debugger
    uploadImage(formData);
    setConfig(configTemp);
  };

  useEffect(() => {
    if (addLatestValues.category_slug && addLatestValues.category_slug.length) {
      setAddLatestValues({ ...addLatestValues, sub_category_slug: '' });
    }
  }, [addLatestValues.category_slug]);
  useEffect(() => {
    if (
      addMarqueeValues.category_slug &&
      addMarqueeValues.category_slug.length
    ) {
      const cat = configTemp.categories.find(
        cat => cat.category_slug === addMarqueeValues.category_slug,
      );
      if (cat) {
        setAddMarqueeValues(cat);
      }
    }
  }, [addMarqueeValues.category_slug]);
  useEffect(() => {
    setConfigTemp(config);
  }, []);
  // const {carrousel,KLifeInfo} = configTemp
  const updateConfig = (type, value) => {
    setConfigTemp({ ...configTemp, [type]: value });
  };

  const editKLifeInfo = (index, label) => {
    const temp = configTemp.KLifeInfo;
    temp[index].label = label;
    console.log({ temp, x: typeof temp });
    updateConfig('KLifeInfo', temp);
  };
  const editMarqueeTitle = (index, title) => {
    const temp = configTemp.margueeProducts;
    temp[index].title = title;
    console.log({ temp, x: typeof temp });
    updateConfig('margueeProducts', temp);
  };
  const addNewLatestProd = (del, delIndex, prod) => {
    if (
      addLatestValues.category_slug.length <= 0 ||
      addLatestValues.model_id.length <= 0
    ) {
      return;
    }
    const temp = configTemp.categories;
    const productVals = del ? prod : addLatestValues;
    const categoryIndex = temp.findIndex(
      category => category.category_slug === productVals.category_slug,
    );
    const product = temp[categoryIndex].products.find(
      product => product.model_id === productVals.model_id,
    );
    const productIndex = temp[categoryIndex].products.findIndex(
      product => product.model_id === productVals.model_id,
    );
    product.latest = !del;
    temp[categoryIndex].products[productIndex] = product;
    const temp_latest = configTemp.latest;
    if (del) {
      temp_latest.splice(delIndex, 1);
    } else {
      temp_latest.push(productVals);
    }
    setConfigTemp({ ...configTemp, latest: temp_latest });
    setTriggers({ ...triggers, addLatest: false });
  };

  const setUploadedMediaFunc = link => {
    const keys = Object.keys(activeType);
    const key = keys && keys.find(key => activeType[key].bool === true);
    const { index } = activeType[key];
    // debugger
    let temp = config;
    const obj = temp[key];
    if (key === type_confs.carrousel) {
      // debugger
      if (activeType[key].add) {
        obj.push(link);
      } else {
        obj[index] = link;
      }
    } else if (key === type_confs.KLifeInfo) {
      obj[index].image = link;
    } else if (key === type_confs.margueeProducts) {
      obj[index].image = link;
    }
    temp = { ...config, [key]: obj };
    // debugger
    setConfig(temp);
    setTriggers({ ...triggers, fileModal: false, uploadMedia: false });
  };

  const deleteMarqueeCat = index => {
    const temp = configTemp.marqueeCat;
    const toDelCat = temp[index];
    const tempCategories = configTemp.categories;
    const catIndex =
      tempCategories &&
      tempCategories.findIndex(
        cat => cat.category_slug === toDelCat.category_slug,
      );
    if (typeof catIndex === 'number' && catIndex >= 0) {
      tempCategories[catIndex].marquee = false;
    }
    console.log(tempCategories);
    temp.splice(index, 1);
    setConfig({ ...config, marqueeCat: temp });
    setConfig({ ...config, categories: tempCategories });
  };

  useEffect(() => {
    if (triggers.uploadMedia) {
      setUploadedMediaFunc(uploadImageData.data.link);
    }
  }, [triggers.uploadMedia]);

  const saveContent = () => {
    saveData(configTemp);
  };

  return (
    <div className="Dashboard__home">
      {saveBtnLoader ? (
        <Loader />
      ) : (
        <>
          (
          <FileUpload
            open={triggers.fileModal}
            close={() => setTriggers({ ...triggers, fileModal: false })}
            onChangeMediaFunc={e => onChangeMediaFunc(e)}
            submitMediaFormFunc={() => submitMediaFormFunc()}
          />
          <div className="header">
            <h3 className="title">HOME PAGE : </h3>
            <button className="btn2__primary" onClick={() => saveContent()}>
              SAVE
            </button>
          </div>
          <div className="marquee">
            <h3 className="title">MARQUEE CATEGORIES</h3>
            {triggers.addMarquee && (
              <div className="add">
                <select
                  onChange={e => {
                    setAddMarqueeValues({
                      ...addMarqueeValues,
                      category_slug: e.target.value,
                    });
                  }}
                  name="categories"
                >
                  <option
                    selected={addMarqueeValues.category_slug === ''}
                    value=""
                  >
                    Select a Category
                  </option>
                  {configTemp &&
                    configTemp.categories &&
                    configTemp.categories.map(category => (
                      <option
                        selected={
                          addLatestValues.category_slug ===
                          category.category_slug
                        }
                        value={category.category_slug}
                      >
                        {category.title}
                      </option>
                    ))}
                </select>
                {addMarqueeValues.category_slug && (
                  <button
                    className="markLatest btn1__primary"
                    onClick={() => addNewLatestProd()}
                  >
                    Add to Marquee Product
                  </button>
                )}
              </div>
            )}
            <div className="products">
              {configTemp &&
                configTemp.marqueeCat &&
                configTemp.marqueeCat.map((product, index) => (
                  <div className="card">
                    <img src={product.image} alt="" />
                    <div className="content">
                      <h3>{product.title}</h3>
                      <p
                        onClick={() =>
                          redirectToUrl(
                            APP_ROUTES.CATEGORY_ALIAS(product.category_slug),
                          )
                        }
                      >
                        {' '}
                        {`See Full Range   >`}
                      </p>
                    </div>
                    <img
                      onClick={() => deleteMarqueeCat(index)}
                      src={CloseIcon}
                      alt="delete marquee category icon"
                      className="closeIcon"
                    />
                  </div>
                ))}
              <div
                className="Card3 Card3Add"
                onClick={() => setTriggers({ ...triggers, addMarquee: true })}
              >
                <div className="image">
                  <img className="hero" src={AddIcon} />
                </div>
              </div>
            </div>
          </div>
          <div className="latestProducts">
            <h3 className="title">LATEST PRODUCTS</h3>
            {triggers.addLatest && (
              <div className="add">
                <select
                  onChange={e => {
                    setAddLatestValues({
                      ...addLatestValues,
                      category_slug: e.target.value,
                    });
                  }}
                  name="categories"
                >
                  <option
                    selected={addLatestValues.category_slug === ''}
                    value=""
                  >
                    Select a Category
                  </option>
                  {configTemp &&
                    configTemp.categories &&
                    configTemp.categories.map(category => (
                      <option
                        selected={
                          addLatestValues.category_slug ===
                          category.category_slug
                        }
                        value={category.category_slug}
                      >
                        {category.title}
                      </option>
                    ))}
                </select>
                {/* {
                    addLatestValues.category_slug && addLatestValues.category_slug.length && category &&
                    <select name="sub_category" id="sub_category" onChange={(e)=>{setAddLatestValues({...addLatestValues,sub_category_slug : e.target.value})}} >
                      <option  selected={addLatestValues.sub_category_slug === "" }  value="" >Select a Sub-category</option>
                      {
                        category && category.subCategories.map(subCategory=><option selected={addLatestValues.sub_category_slug === subCategory.sub_category_slug }  value={subCategory.sub_category_slug}>{subCategory.title}</option>)
                      }
                    </select>
                  } */}
                {addLatestValues.category_slug &&
                  addLatestValues.category_slug.length &&
                  category && (
                    <select
                      name="model_id"
                      id="model_id"
                      onChange={e => {
                        const prod = JSON.parse(e.target.value);
                        prod.model_id &&
                          prod.model_id.length > 0 &&
                          setAddLatestValues({
                            ...addLatestValues,
                            model_id: prod.model_id,
                            description: prod.description,
                            title: prod.title,
                            image: prod.image,
                          });
                      }}
                    >
                      <option
                        selected={addLatestValues.sub_category_slug === ''}
                        value={JSON.stringify({ model_id: '' })}
                      >
                        Select a Product
                      </option>
                      {category &&
                        category.products.map(product => (
                          <option
                            selected={
                              addLatestValues.model_id === product.model_id
                            }
                            value={JSON.stringify({
                              model_id: product.model_id,
                              title: product.title,
                              description: product.description,
                              image: product.images[0],
                            })}
                          >
                            {product.title}
                          </option>
                        ))}
                    </select>
                  )}
                {addLatestValues.category_slug && addLatestValues.model_id && (
                  <button
                    className="markLatest btn1__primary"
                    onClick={() => addNewLatestProd()}
                  >
                    Add to Latest Product
                  </button>
                )}
              </div>
            )}
            <div className="products">
              {configTemp &&
                configTemp.latest &&
                configTemp.latest.map((product, index) => (
                  <div className="product">
                    <Card
                      title={product.title}
                      image={product.image ? product.image : NO_IMAGE}
                      description={product.description}
                      action={() =>
                        redirectToUrl(
                          APP_ROUTES.PRODUCT_ALIAS(
                            product.category_slug,
                            product.model_id,
                          ),
                        )
                      }
                      actionText="Edit"
                      close={() => {
                        setAddLatestValues(product);
                        addNewLatestProd(true, index, product);
                      }}
                    />
                  </div>
                ))}
              <div className="product">
                <div
                  className="Card3 Card3Add"
                  onClick={() => setTriggers({ ...triggers, addLatest: true })}
                >
                  <div className="image">
                    <img className="hero" src={AddIcon} />
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
      )}
    </div>
  );
}

export default DashboardHome;
//
