import React, { useState, useEffect } from 'react';
import { APP_ROUTES } from 'utils/constants';
import {
  redirectToUrl,
  getUrlParam,
  setUrlParam,
  removeUrlParam,
} from 'utils/common';
import Loader from 'components/Loader';
import { toast } from 'react-toastify';
import ADD_ICON from '../../../images/icons/add.svg';
import EditIcon from '../../../images/icons/edit.svg'
import CLOSE_ICON from '../../../images/icons/close.svg';
import FileUpload from '../../FileUpload/index';
import './style.scss';
import Error404 from '../../Error404';
function Categories(props) {
  console.log(props, 'categoryProps');
  const newCategory = {
    title: '',
    category_slug: '',
    products: [],
    image: '',
    marquee: false,
  };
  const newSubCategory = {
    title: '',
    sub_category_slug: '',
    description: '',
    products: [],
  };
  const newProdVals = {
    title: '',
    isNew: false,
    latest: false,
    model_id: '',
    images: [],
    description: [],
    manuals: null,
    features: [],
    video: '',
    specs: [],
  };
  const [category, setCategory] = useState(null);
  const [newProdData, setNewProdData] = useState(newProdVals);
  const [subcategory, setSubCategory] = useState(null);
  const [categoryIndex, setCategoryIndex] = useState(null);
  const [media, setMedia] = useState(null);
  const [newCategoryTrigger, setNewCategoryTrigger] = useState(null);
  const [newSubCategoryTrigger, setNewSubCategoryTrigger] = useState(null);
  const CATEGORY = 'category';
  console.log(category, 'category');
  const [newCategValidate, setnewCategValidate] = useState({
    title: null,
    slug: null,
  });
  const [newSubCategValidate, setnewSubCategValidate] = useState({
    title: null,
    slug: null,
  });
  const [prodValidation, setProdValidation] = useState({
    title: null,
    model_id: null,
  });
  const {
    config,
    setConfig,
    saveData,
    saveBtnLoader,
    triggers,
    setTriggers,
    uploadImage,
    uploadImageData,
  } = props;
  const config_temp = config;
  const { categories } = config_temp && config_temp;
  const addNewCategory = () => {
    const validate = newCategValidate;
    if (!category.title || category.title.length <= 0) {
      validate.title = 'Add a Title for Product';
    } else {
      validate.title = null;
    }
    if (
      config.categories.find(
        cat => cat.category_slug === category.category_slug,
      )
    ) {
      validate.slug = 'Category slug should be unique';
    } else if (!category.category_slug || category.category_slug.length <= 0) {
      validate.slug = 'Category slug required';
    } else {
      validate.slug = null;
    }
    setnewCategValidate({
      ...newCategValidate,
      title: validate.title,
      slug: validate.slug,
    });
    if (!validate.slug && !validate.title) {
      const config_temp = config.categories;
      config_temp.push(category);
      setConfig({ ...config, categories: config_temp });
    }
  };
  const addNewSubCategory = () => {
    const validate = newSubCategValidate;
    if (!subcategory.title || subcategory.title.length <= 0) {
      validate.title = 'Add a Title for Product';
    } else {
      validate.title = null;
    }
    if (
      category.subCategories.find(
        sub => sub.sub_category_slug === subcategory.sub_category_slug,
      )
    ) {
      validate.slug = 'Sub-category slug should be unique';
    } else if (!category.category_slug || category.category_slug.length <= 0) {
      validate.slug = 'Sub-category slug required';
    } else {
      validate.slug = null;
    }
    setnewSubCategValidate({
      ...newSubCategValidate,
      title: validate.title,
      slug: validate.slug,
    });
    if (!validate.slug && !validate.title) {
      const temp = category.subCategories;
      temp.push(subcategory);
      setCategory({ ...category, subCategories: temp });
      setNewSubCategoryTrigger(false);
    }
  };
  const onChangeMediaFunc = e => {
    const selectedFile = e.target.files[0];
    setMedia({ image: selectedFile });
  };
  const submitMediaFormFunc = () => {
    const formData = new FormData();
    formData.append('image', media.image);
    uploadImage(formData);
    // let x = setTimeout(() => {
    //   clearTimeout(x)
    // }, 800);
  };
  const setUploadedMediaFunc = link => {
    // debugger;
    // category.image = link.link
    console.log(props, 'props');
    // debugger
    setTriggers({ ...triggers, uploadMedia: false, fileModal: false });
    const temp = config.categories
    toast.success('Uploaded successfully');
    const param = getUrlParam(CATEGORY);
    let categoryIndex = null;
    let cat = null;
    if (param) {
      cat = categories && categories.find(cat => cat.category_slug === param);
      categoryIndex =
        categories && categories.findIndex(cat => cat.category_slug === param);
      cat.image = link.link;
      setCategory(cat);
      setCategoryIndex(categoryIndex);
    }
    temp[categoryIndex] = cat;
    setConfig({ ...config, categories: temp });
  };
  const editCategory = (type, val) => {
    setCategory({ ...category, [type]: val });
  };
  const editSubCategory = (type, val) => {
    setSubCategory({ ...subcategory, [type]: val });
  };
  const saveCategoryChanges = () => {
    config_temp.categories[categoryIndex] = category;
    const prod =
      config_temp.marqueeCat &&
      config_temp.marqueeCat.find(
        prod => prod.category_slug === category.category_slug,
      );
    const prodIndex =
      config_temp.marqueeCat &&
      config_temp.marqueeCat.findIndex(
        prod => prod.category_slug === category.category_slug,
      );
    if (category.marquee && !prod) {
      config_temp.marqueeCat.push(category);
    } else if (category.marquee && prod) {
      config_temp.marqueeCat[prodIndex] = category;
    } else if (!category.marquee && prod) {
      config_temp.marqueeCat.splice(prodIndex, 1);
    }
    saveData(config_temp);
  };
  const deleteProduc = index => {
    const temp = category.products;
    const prod = temp[index];
    if (
      config_temp.latest &&
      config_temp.latest.find(
        latestProd => latestProd.model_id === prod.model_id,
      )
    ) {
      const latIndex =
        config_temp.latest &&
        config_temp.latest.findIndex(
          latestProd => latestProd.model_id === prod.model_id,
        );
      config_temp.latest.splice(latIndex, 1);
    }
    temp.splice(index, 1);
    setCategory({ ...category, products: temp });
  };
  const deleteCategory = () => {
    const temp = config;
    temp.categories.splice(categoryIndex, 1);
    const prod = temp.marqueeCat.find(
      prod => prod.category_slug === category.category_slug,
    );
    const prodIndex = temp.marqueeCat.findIndex(
      prod => prod.category_slug === category.category_slug,
    );
    if (prod) {
      temp.marqueeCat.splice(prodIndex, 1);
      const {latest} = temp
      temp.latest = latest.filter(
        item => item.category_slug !== prod.category_slug,
      );
    }
    saveData(temp);
  };
  const addProd = () => {
    const newProd = newProdData;
    const validate = prodValidation;
    if (!newProd.title || newProd.title.length <= 0) {
      validate.title = 'Add a Title for Product';
    } else {
      validate.title = null;
    }
    if (
      category.products &&
      category.products.find(prod => prod.model_id === newProd.model_id)
    ) {
      validate.model_id = 'Model Id should be unique';
    } else if (newProd.model_id.length <= 0 || !newProd.model_id) {
      validate.model_id = 'Model Id required';
    } else {
      validate.model_id = null;
    }
    setProdValidation({
      ...prodValidation,
      title: validate.title,
      model_id: validate.model_id,
    });
    if (!validate.title && !validate.model_id) {
      const temp = category.products;
      temp.push(newProd);
      setCategory({ ...category, products: temp });
      setNewSubCategoryTrigger(false);
      // setAddProdTrigger(false)
    }
  };
  useEffect(() => {
    if (!newSubCategoryTrigger) {
      setNewProdData(newProdVals);
    }
  }, [newSubCategoryTrigger]);
  useEffect(() => {
    if (triggers.uploadMedia) {
      setUploadedMediaFunc(uploadImageData.data);
    }
  }, [triggers.uploadMedia]);
  useEffect(() => {
    if (category) {
      setUrlParam(CATEGORY, category.category_slug);
    }
  }, [category]);
  useEffect(() => {
    const param = getUrlParam(CATEGORY);
    if (param) {
      const cat =
        categories && categories.find(cat => cat.category_slug === param);
      const catIndex =
        categories && categories.findIndex(cat => cat.category_slug === param);
      setCategory(cat);
      setCategoryIndex(catIndex);
    }
  }, []);
  return (
    <>
      <FileUpload
        uploadDoc={false}
        open={triggers.fileModal}
        close={() => setTriggers({ ...triggers, fileModal: false })}
        onChangeMediaFunc={e => onChangeMediaFunc(e)}
        submitMediaFormFunc={() => submitMediaFormFunc()}
      />
      {saveBtnLoader ? (
        <Loader />
      ) : (
        <div className="Categories">
          <div className="header">
            <h3 className="title">Product Categories</h3>
            <div className="action">
              <button
                className="btn1__secondary"
                onClick={() => {
                  setCategory(newCategory);
                  setNewCategoryTrigger(true);
                  removeUrlParam(CATEGORY);
                }}
              >
                Add New Category
              </button>
            </div>
          </div>
          <select
            value={category}
            className="selectCategory"
            name="categories"
            onChange={e => {
              const x = JSON.parse(e.target.value);
              setCategoryIndex(x.index);
              setCategory(x.category);
              setNewCategoryTrigger(false);
            }}
          >
            <option value={JSON.stringify({})}>Select Category</option>
            {categories &&
              categories.map((category, index) => (
                <option value={JSON.stringify({ category, index })}>
                  {category.title}
                </option>
              ))}
          </select>
          {category && Object.keys(category).length > 0 && !newCategoryTrigger && (
            <div className="categoryForm">
              <div className="formGroup">
                <div className="formInput">
                  <button
                    onClick={() => saveCategoryChanges()}
                    className="saveContent btn2__primary"
                  >
                    Save Changes
                  </button>
                </div>
                <div className="formInput">
                  <button
                    onClick={() => deleteCategory()}
                    className="saveContent btn2__secondary"
                  >
                    Delete Category
                  </button>
                </div>
              </div>
              <div className="formInput">
                <label htmlFor="category Title">Category Title : </label>
                <input
                  placeholder="Category Title"
                  onChange={e => editCategory('title', e.target.value)}
                  value={category.title}
                  type="text"
                />
              </div>
              <div className="formInput">
                <label htmlFor="category slug">Category Slug : </label>
                <input
                  disabled
                  placeholder="Category Slug"
                  onChange={e => editCategory('category_slug', e.target.value)}
                  value={category.category_slug}
                  type="text"
                />
              </div>
              <div className="formInput formInputSingleRow formInputChoiceTick">
                <label htmlFor="Mark Latest"> Mark as Marquee Category</label>
                <input
                  onChange={e => {
                    editCategory('marquee', e.target.checked);
                  }}
                  checked={category && category.marquee && category.marquee}
                  type="checkbox"
                  name="mark marquee"
                  id=""
                />
              </div>
              <div className="formInput">
                <label htmlFor=""> Category Image</label>
              </div>
              <div className="image formInput">
                {category && category.image ? (
                    <div className="mainImage">
                      <img
                      src={category && category.image}
                      className="main"
                      alt=""
                    />
                      <div className="editWrapper">
                        <img
                          className="edit"
                          onClick={() => {
                            let temp = config.categories;
                            temp[categoryIndex] = category;
                            setConfig({ ...config, categories: temp });
                            setTriggers({ ...triggers, fileModal: true });
                          }}
                          src={EditIcon}
                        />
                      </div>
                    </div>
                    :
                    <div
                      onClick={() => {
                        let temp = config.categories;
                        temp[categoryIndex] = category;
                        setConfig({ ...config, categories: temp });
                        setTriggers({ ...triggers, fileModal: true });
                      }}
                      className="editableImage editableImageAdd"
                    >
                      <img className="addIcon" src={ADD_ICON} alt="add icon" />
                    </div>
                )}
              </div>
              <div className="formInput">
                <label htmlFor="category subcaegories">Products : </label>
              </div>
              <div className="subCategories">
                {category &&
                  Object.keys(category).length > 0 &&
                  category.products &&
                  category.products.map((item, index) => (
                    <div className="subCategory">
                      <h4 className="title">{item.title}</h4>
                      <p className="description">{item.description}</p>
                      <h2>{}</h2>
                      <h5
                        className="btn2__primary"
                        onClick={() =>
                          redirectToUrl(
                            APP_ROUTES.PRODUCT_ALIAS(
                              category.category_slug,
                              item.model_id,
                            ),
                          )
                        }
                      >
                        Edit
                      </h5>
                      <img
                        onClick={() => deleteProduc(index)}
                        src={CLOSE_ICON}
                        alt=""
                        className="closeIcon"
                      />
                    </div>
                  ))}
                <div
                  onClick={() => {
                    setSubCategory(newSubCategory);
                    setNewSubCategoryTrigger(true);
                  }}
                  className="subCategory subCategoryAdd"
                >
                  <img src={ADD_ICON} alt="" />
                </div>
              </div>
              {newSubCategoryTrigger && (
                <div className="addProd">
                  <h3 className="title">Add New Product</h3>
                  <div className="formInput">
                    <label htmlFor="Product Title">Product Title</label>
                    <input
                      placeholder="Prodcut Name"
                      onChange={e =>
                        setNewProdData({
                          ...newProdData,
                          title: e.target.value,
                        })
                      }
                      type="text"
                      value={newProdData.title}
                    />
                    {prodValidation.title && (
                      <p className="formErrorMsg">{prodValidation.title}</p>
                    )}
                  </div>
                  <div className="formInput">
                    <label htmlFor="Model Id">Model Id:</label>
                    <input
                      placeholder="Model id"
                      onChange={e =>
                        setNewProdData({
                          ...newProdData,
                          model_id: e.target.value,
                        })
                      }
                      type="text"
                      value={newProdData.model_id}
                    />
                    {prodValidation.model_id && (
                      <p className="formErrorMsg">{prodValidation.model_id}</p>
                    )}
                  </div>
                  <div className="formInput">
                    <label htmlFor="Product Description">
                      Product Description :
                    </label>
                    {/* <textarea onChange={(e)=>setNewProdData({...newProdData,description : e.target.value})} type="text"  value={newProdData.description}></textarea> */}
                    <textarea
                      name="description"
                      placeholder="Product Description"
                      onChange={e =>
                        setNewProdData({
                          ...newProdData,
                          description: e.target.value.split('\n'),
                        })
                      }
                      value={newProdData.description.join('\n')}
                      id=""
                      cols="30"
                      rows="10"
                    />
                  </div>
                  <div className="formInput">
                    <button
                      onClick={() => {
                        addProd();
                      }}
                      className="btn2__primary"
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {newCategoryTrigger && (
            <div className="addNewCategory">
              <h3 className="title">Add New Category</h3>
              <div className="formInput">
                <label htmlFor="category Title">Category Title : </label>
                <input
                  placeholder="Category Title"
                  value={category.title}
                  onChange={e => editCategory('title', e.target.value)}
                  type="text"
                />
                {newCategValidate.title && (
                  <p className="formErrorMsg">{newCategValidate.title}</p>
                )}
              </div>
              <div className="formInput">
                <label htmlFor="category Slug">Category Slug : </label>
                <input
                  placeholder="Category Slug"
                  value={category.category_slug}
                  onChange={e => editCategory('category_slug', e.target.value)}
                  type="text"
                />
                {newCategValidate.slug && (
                  <p className="formErrorMsg">{newCategValidate.slug}</p>
                )}
              </div>
              <button
                className="btn2__primary"
                onClick={() => addNewCategory()}
              >
                ADD
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Categories;
