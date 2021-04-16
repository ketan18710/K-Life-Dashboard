/**
 *
 * Products
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectProducts from './selectors';
import reducer from './reducer';
import saga from './saga';
import DisplayProducts from 'components/Products/DisplayProducts/index'
import ProductDetail from 'components/Products/ProductDetail/index'
const Products = (props)=>{
  useInjectReducer({ key: 'products', reducer });
  useInjectSaga({ key: 'products', saga });
  const {category_slug,sub_category_slug,model_id} = useParams();
  const {productDetail,categories} = props
  const category =  categories.find(category=>category.category_slug === category_slug)
  const subCategory =  category.subCategories.find(subCategory=>subCategory.sub_category_slug === sub_category_slug)
  const product = subCategory && subCategory.products.find(product=>product.model_id === model_id)
  return (
    <>
      <Helmet>
        <title>Products</title>
        <meta name="description" content="Description of Products" />
      </Helmet>
      {
        productDetail ?
        <ProductDetail {...product} model_id={model_id} categoryProducts={subCategory.products}/>
        :
        <DisplayProducts category_slug={category_slug} {...subCategory}/>
      }
    </>
  );
}

Products.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  products: makeSelectProducts(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Products);
