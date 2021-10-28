import React, { useState, useEffect, useRef } from 'react';
import './style.scss';
import { APP_ROUTES, EMAIL_EDITOR_API_KEY, NO_IMAGE } from 'utils/constants';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import EditImage from '../../Image/editImage';
import EditIcon from '../../../images/icons/edit.svg';
import AddIcon from '../../../images/icons/add.svg';
import FileUpload from '../../FileUpload/index';
import Loader from '../../Loader';
import Error404 from '../../Error404';
function Product(props) {
  const {
    config,
    setConfig,
    saveData,
    uploadImage,
    uploadImageData,
    triggers,
    setTriggers,
    productImageType,
    setProductImageType,
    saveBtnLoader,
  } = props;
  const { category_slug, sub_category_slug, model_id } = useParams();
  const [product, setProduct] = useState(null);
  const [fileModalTrigger, setFileModalTrigger] = useState(null);
  // const [productIndex, setProductIndex] = useState(null)
  const [media, setMedia] = useState(null);
  const [videoURLholder, setVideoURLholder] = useState('');
  const [initIndex, setInitIndex] = useState(null);
  const [imageType, setImageType] = useState({
    carrousel: false,
    accessorries: false,
    doc: false,
  });
  const tinymce1 = useRef(null);
  const onChangeMediaFunc = e => {
    const selectedFile = e.target.files[0];
    setMedia({ image: selectedFile });
  };
  const setUploadedMediaFunc = link => {
    console.log({ productImageType, product });
    const { prod, prodIndex } = getProduct();
    console.log(config, 'config');
    if (productImageType.carrousel) {
      prod.images.push(link.link);
    } else if (productImageType.accessories) {
      prod.accessories = { image: link, data: prod.accessories.data };
    } else if (productImageType.file) {
      prod.manuals = link;
      // if (typeof prod.manuals === "string") {
      // } else {
      //   prod.manuals = link;
      // }
    }
    toast.success('Uploaded successfully');
    setProduct(prod);
    setTriggers({ ...triggers, uploadMedia: false, fileModal: false });
  };
  console.log(product);
  useEffect(() => {
    if (triggers.uploadMedia) {
      setUploadedMediaFunc(uploadImageData.data);
    }
  }, [triggers.uploadMedia]);

  const createSaveData = () => {
    const config_temp = config;
    const prod = product;
    const latest = config.latest.find(item => item.model_id === model_id);
    const latestIndex = config.latest.findIndex(
      item => item.model_id === model_id,
    );
    if (product.latest) {
      const temp = {
        title: product.title,
        image: product.images.length ? product.images[0] : NO_IMAGE,
        category_slug,
        description: product.description,
        sub_category_slug,
        model_id,
      };
      if (!latest) {
        config_temp.latest.push(temp);
      } else {
        config_temp.latest[latestIndex] = temp;
      }
    } else if (latest) {
      config_temp.latest.splice(latestIndex, 1);
    }
    // prod.features = tinymce1.current.editor.getContent()
    // prod.accessories =  {data : tinymce1.current.editor.getContent() , image : prod.accessories.image  ? prod.accessories.image : NO_IMAGE}
    config_temp.categories[categoryIndex].products[productIndex] = prod;
    console.log(config_temp);
    return config_temp;
  };

  const submitMediaFormFunc = () => {
    const formData = new FormData();
    formData.append('image', media.image);
    uploadImage(formData);
    // let x = setTimeout(() => {
    //   clearTimeout(x)
    // }, 800);
  };
  const config_temp = config;
  const { categories } = config_temp && config_temp;
  const category =
    categories && categories.find(item => item.category_slug === category_slug);
  const categoryIndex =
    categories &&
    categories.findIndex(item => item.category_slug === category_slug);
  const prod =
    category &&
    category.products &&
    category.products.find(item => item.model_id === model_id);
  const productIndex =
    category &&
    category.products &&
    category.products.findIndex(item => item.model_id === model_id);
  useEffect(() => {
    if (prod) {
      setProduct(prod);
      if (prod.video) {
        setVideoURLholder(`https://www.youtube.com/watch?v=${  prod.video}`);
      }
    }
  }, [prod]);
  const getProduct = () => {
    const prod = category.products.find(item => item.model_id === model_id);
    const prodIndex = category.products.findIndex(
      item => item.model_id === model_id,
    );
    return { prod, prodIndex };
  };

  const deleteImage = index => {
    const temp = product.images;
    temp.splice(index, 1);
    setProduct({ ...product, images: temp });
  };
  const handleDrop = (e, newIndex) => {
    const prevIndex = e.dataTransfer.getData('prevIndex');
    const images = product && product.images;
    const temp = images[prevIndex];
    images[prevIndex] = images[newIndex];
    images[newIndex] = temp;
    setProduct({ ...product, images });
  };
  const editPlusPoints = (index, text) => {
    const temp = product.plusPoints;
    temp[index] = text;
    setProduct({ ...product, plusPoints: temp });
  };

  const editFeatures = (index, text) => {
    const temp = product.features;
    temp[index] = text;
    setProduct({ ...product, features: temp });
  };

  const editSpecs = (index, text, type) => {
    const temp = product.specs;
    temp[index][type] = text;
    setProduct({ ...product, specs: temp });
  };

  const addNewPlusPoint = () => {
    const temp = product.plusPoints;
    temp.push('New point');
    setProduct({ ...product, plusPoints: temp });
  };
  const addNewFeature = () => {
    const temp = product.features;
    temp.push('New feature');
    setProduct({ ...product, features: temp });
  };
  const addNewSpec = () => {
    const temp = product.specs;
    temp.push({ title: 'title spec', desc: 'desc spec' });
    setProduct({ ...product, specs: temp });
  };
  const deletePlusPoints = index => {
    const temp = product.plusPoints;
    temp.splice(index, 1);
    setProduct({ ...product, plusPoints: temp });
  };
  const deleteFeature = index => {
    const temp = product.features;
    temp.splice(index, 1);
    setProduct({ ...product, features: temp });
  };
  const deleteSpecs = index => {
    const temp = product.specs;
    temp.splice(index, 1);
    setProduct({ ...product, specs: temp });
  };

  const editVideoURL = () => {
    const value = videoURLholder;
    if (value.length > 0) {
      const videoID = value.split('v=')[1];
      if (videoID) {
        setProduct({ ...product, video: videoID });
      } else {
        toast.error('Video id not found, please recheck url');
      }
    } else {
      setProduct({ ...product, video: '' });
    }
  };

  return (
    <>
      <FileUpload
        uploadDoc={!!productImageType.file}
        open={triggers.fileModal}
        close={() => setTriggers({ ...triggers, fileModal: false })}
        onChangeMediaFunc={e => onChangeMediaFunc(e)}
        submitMediaFormFunc={() => submitMediaFormFunc()}
      />
      {saveBtnLoader || triggers.fileModal ? (
        <Loader />
      ) : !product ? (
        <h1>Product not found</h1>
      ) : (
        <div className="Product">
          <div className="header">
            <div className="formInput">
              <input
                onChange={e =>
                  setProduct({ ...product, title: e.target.value })
                }
                className="title"
                type="text"
                value={product && product.title}
              />
            </div>
            <button
              onClick={() => saveData(createSaveData())}
              className="btn1__primary"
            >
              Save
            </button>
          </div>
          <div className="formInput formInputSingleRow">
            <label htmlFor="slug">Model Id : </label>
            <input
              disabled
              onChange={e =>
                setProduct({ ...product, model_id: e.target.value })
              }
              type="text"
              value={product && product.model_id}
            />
          </div>
          <div className="formInput">
            <label htmlFor="Product Description">Product Description</label>
            <textarea
              name="description"
              value={product && product.description.join('\n')}
              onChange={e =>
                setProduct({
                  ...product,
                  description: e.target.value.split('\n'),
                })
              }
              cols="30"
              rows="10"
            />
          </div>
          <div className="productVideo formInput">
            <label htmlFor="Product Description">Product Video</label>
            <div className="formInput formInputSingleRow">
              <input
                onChange={e => setVideoURLholder(e.target.value)}
                value={videoURLholder.length >= 0 && videoURLholder}
                className="videoUrl"
                id="videoUrl"
                placeholder="Enter youtube video URL"
                type="text"
              />
              <button className="btn1__primary" onClick={() => editVideoURL()}>
                Add URL
              </button>
            </div>
            {product && product.video && product.video.length >= 0 && (
              <iframe
                width="100%"
                height="620"
                src={`https://www.youtube.com/embed/${product.video}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
              />
            )}
          </div>
          <div className="manuals">
            <div className="formInput ">
              <label htmlFor="slug">Manuals </label>
              <div className="content">
                {product &&
                  product.manuals &&
                  typeof product.manuals !== 'string' && (
                    <a
                      download
                      href={product.manuals.link}
                      className="btn1__primary productManualButton"
                    >
                      {`${product.title  } User Manual`}
                    </a>
                  )}
                <a
                  onClick={() => {
                    setProductImageType({ ...productImageType, file: true });
                    setTriggers({ ...triggers, fileModal: true });
                  }}
                  className="btn1__primary"
                >
                  {product.manuals ? 'Edit Manual' : 'Add More'}
                </a>
              </div>
              {/* <img  onClick={()=>{ setProductImageType({...productImageType,file : true}) ;setTriggers({...triggers,fileModal : true})}} src={EditIcon} alt="edit icon" className="icon"/> */}
            </div>
          </div>
          <div className="images">
            <div className="formInput">
              <label htmlFor="Product images">Product images</label>
            </div>
            <div className="products">
              {product &&
                product.images.map((image, index) => (
                  <div
                    draggable
                    onDragOver={e => e.preventDefault()}
                    onDrop={e => handleDrop(e, index)}
                    onDragStart={e => {
                      e.dataTransfer.setData('prevIndex', index);
                    }}
                  >
                    <EditImage
                      src={image}
                      edit={false}
                      close={() => deleteImage(index)}
                    />
                  </div>
                ))}
              <div
                onClick={() => {
                  const temp = createSaveData();
                  setConfig({ ...config, categories: temp.categories });
                  setProductImageType({
                    ...productImageType,
                    carrousel: true,
                    file: false,
                  });
                  setTriggers({ ...triggers, fileModal: true });
                }}
                className="editableImage editableImageAdd"
              >
                <img className="addIcon" src={AddIcon} alt="add icon" />
              </div>
            </div>
          </div>
          <div className="formInput formInputSingleRow formInputChoiceTick">
            <label htmlFor="Mark Latest"> Mark as Latest Product</label>
            <input
              onChange={e => {
                setProduct({ ...product, latest: e.target.checked });
              }}
              checked={product && product.latest}
              type="checkbox"
              name="mark latest"
              id=""
            />
          </div>
          <div className="plusPoints">
            <div className="formInput">
              <label htmlFor="PlusPoints">FEATURES</label>
            </div>
            <div className="buttons">
              <button onClick={() => addNewFeature()} className="btn1__primary">
                Add New
              </button>
            </div>
            <ul className="points">
              {product &&
                product.features &&
                product.features.map((point, index) => (
                  <li
                    contentEditable
                    onBlur={e => editFeatures(index, e.target.innerText)}
                    key={index}
                  >
                    {point} <span onClick={() => deleteFeature(index)}>x</span>
                  </li>
                ))}
            </ul>
          </div>
          <div className="techSpecs">
            <div className="formInput">
              <label htmlFor="PlusPoints">PRODUCT SPECIFICATIONS</label>
            </div>
            <div className="buttons">
              <button onClick={() => addNewSpec()} className="btn1__primary">
                Add New
              </button>
            </div>
            <table>
              {product &&
                product.specs &&
                product.specs.map((spec, index) => (
                  <tr>
                    <td
                      colSpan="1"
                      contentEditable
                      onBlur={e =>
                        editSpecs(index, e.target.innerText, 'title')
                      }
                    >
                      {spec.title}
                    </td>
                    <td
                      colSpan="1"
                      contentEditable
                      onBlur={e => editSpecs(index, e.target.innerText, 'desc')}
                    >
                      {spec.desc}
                    </td>
                    <td colSpan="1">
                      <button
                        className="btn2__primary"
                        onClick={() => deleteSpecs(index)}
                      >
                        Delete spec
                      </button>
                    </td>
                  </tr>
                ))}
              {product && product.specs && product.length <= 0 && (
                <tr>
                  <td>{spec.title}</td>
                  <td>{spec.desc}</td>
                </tr>
              )}
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
