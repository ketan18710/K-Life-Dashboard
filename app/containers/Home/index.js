/**
 *
 * Home
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import DEFAULT_IMAGE_1 from '../../utils/constants';
import { compose } from 'redux';
import Carrausel from '../../components/Carausel/index'
import Icon from '../../components/Icon/index'
import {Card3 as Card} from '../../components/Cards/index'
import {DEFAULT_IMAGE_1,APP_ROUTES} from 'utils/constants'
import {redirectToUrl} from 'utils/common'
import LeftIcon from '../../images/icons/left.svg'
import LeftIconHover from '../../images/icons/left_hover_blue.svg'
import RightIcon from '../../images/icons/right.svg'
import RightIconHover from '../../images/icons/right_hover_blue.svg'
import './style.scss'


const Home=(props)=>{
  const {KLifeInfo : kLife,margueeProducts,latest :products } = props
  const [firstProdIndex, setFirstProdIndex] = useState(0)
  const index1 = firstProdIndex
  const index2 = products && products.length && ((firstProdIndex + 1 )% products.length)
  const index3 = products && products.length && ((firstProdIndex + 2 )% products.length)
  const changeFirstProdIndex = (index) => {
    setFirstProdIndex(index)
  }
  const goToNext = () => {
    setLatestProductCardsOpacity(false)
    setFirstProdIndex((firstProdIndex + 1 )% products.length)
  }
  const goToPrevious = () => {
    setLatestProductCardsOpacity(false)
    const newIndex = firstProdIndex -1
    setFirstProdIndex(newIndex <0 ? (newIndex + products.length ): newIndex)
  }
  var min_horizontal_move = 30;
  var max_vertical_move = 30;
  var within_ms = 1000;

  var start_xPos;
  var start_yPos;
  var start_time;
  function touch_start(event) {
      start_xPos = event.touches[0].pageX;
      start_yPos = event.touches[0].pageY;
      start_time = new Date();
  }


  function touch_end(event) {
      var end_xPos = event.changedTouches[0].pageX;
      var end_yPos = event.changedTouches[0].pageY;
      var end_time = new Date();
      let move_x = end_xPos - start_xPos;
      let move_y = end_yPos - start_yPos;
      let elapsed_time = end_time - start_time;
      if (Math.abs(move_x) > min_horizontal_move && Math.abs(move_y) < max_vertical_move && elapsed_time < within_ms) {
          if (move_x < 0) {
              // alert("left");
              goToNext()
          } else {
              // alert("right");
              goToPrevious()
          }
      }
  }
  useEffect(() => {
    const innerHtml = document.getElementById("latestProductsFirst").innerHTML
    if(innerHtml){
      var content = document.getElementById("latestProductsFirst");
      content.addEventListener('touchstart', touch_start);
      content.addEventListener('touchend', touch_end);
    }
  }, [document.getElementById("latestProductsFirst") && document.getElementById("latestProductsFirst").innerHTML])

  const setLatestProductCardsOpacity = (opacity) => {
    const latestProducts = document.querySelector('.latestProducts')
    const cards = latestProducts.querySelectorAll('.product');
    [].forEach.call(cards, a => {
      if(opacity){
        setTimeout(() => {
          a.style.opacity = 1;
        }, 200);
      }else{
        a.style.opacity = 0.1;
      }
    });
  }
  useEffect(() => {
    setLatestProductCardsOpacity(true)
  }, [firstProdIndex])

  return (
    <div className="homePage">
      <Carrausel/>
      <div className="KLife__info">
        <h3 className="title">WHY <span>K-LIFE</span></h3>
        <div className="points">
          {
            kLife  && kLife.map((item=>
              <div className="point">
                <img src={item.image}/>
                <h4 className="label">{item.label}</h4>
              </div>
            ))
          }
        </div>
      </div>
      <div className="marqeeProducts">
        <h3 className="title">MARQUEE PRODUCTS</h3>
        <h4 className="description">Our Best Selling Categories</h4>
        <div className="products">
          {
            margueeProducts && margueeProducts.length && margueeProducts.map((product=>
              <div className="product">
                <div className="image">
                  <img src={product.image} alt={product.title + '  image'}/>
                </div>
                <h3 className="title">{product.title}</h3>
              </div>  
            ))
          }
        </div>
      </div>
      <div className="latestProducts">
          <h3 className="title">LATEST PRODUCTS</h3>
          <h4 className="description">Our Newest Launches</h4>
          <div className="products">
            <Icon
                mainIcon={LeftIcon}
                hoverIcon={LeftIconHover}
                alt="Show previous product Icon"
                action={goToPrevious}
            />
            <div className="product" id="latestProductsFirst">
              <Card 
                title={products[index1].title}
                image={products[index1].image}
                description={products[index1].description}
                action={()=>redirectToUrl(APP_ROUTES.PRODUCT_ALIAS(products[index1].category_slug,products[index1].sub_category_slug,products[index1].model_id))}
              />
            </div>
            <div className="product">
              <Card 
                title={products[index2].title}
                image={products[index2].image}
                description={products[index2].description}
                action={()=>redirectToUrl(APP_ROUTES.PRODUCT_ALIAS(products[index1].category_slug,products[index1].sub_category_slug,products[index1].model_id))}
              />
            </div>
            <div className="product">
              <Card 
                title={products[index3].title}
                image={products[index3].image}
                description={products[index3].description}
                action={()=>redirectToUrl(APP_ROUTES.PRODUCT_ALIAS(products[index1].category_slug,products[index1].sub_category_slug,products[index1].model_id))}
              />
            </div>
            <Icon
                mainIcon={RightIcon}
                hoverIcon={RightIconHover}
                alt="Show next product Icon"
                action={goToNext}
            />
          </div>
          <div className="actionDots">
            {
              products && products.length && products.map(((product,index)=>
                <div className={index === firstProdIndex ? 'active dot' : 'dot'} onClick={()=>{setLatestProductCardsOpacity(false); changeFirstProdIndex(index)}}></div>  
              ))
            }
          </div>
      </div>
    </div>
  )
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Home);
