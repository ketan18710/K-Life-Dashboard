/**
 *
 * Dashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import {redirectFor as redirectForConstants } from 'utils/constants';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import Home from '../../components/Dashboard/Home/index'
import AboutUs from '../../components/Dashboard/AboutUs/index'
export function Dashboard(props) {
  const {redirectFor,uploadImage,uploadImageData} = props
  useInjectReducer({ key: 'dashboard', reducer });
  useInjectSaga({ key: 'dashboard', saga });
  const redirectFunc = () => {
    switch (redirectFor) {
      case redirectForConstants.DASHBOARD:
          return <Home {...props}/>;
        break;
    
      case redirectForConstants.DASHBOARD_ABOUTUS:
          return <AboutUs {...props}/>;
        break;
    
      default:
        break;
    }
  }
  
  return (
    <div className="Dashboard"> 
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      {
        redirectFunc()
      }
    </div>
  );
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
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

export default compose(withConnect)(Dashboard);
