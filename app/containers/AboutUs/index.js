/**
 *
 * AboutUs
 *
 */

import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Logo from '../../images/logo.png'
import './style.scss'
function AboutUs() {
  useEffect(() => { 
    // const AboutUS = document.getElementsByClassName('AboutUS');
    // [].forEach.call(AboutUS, a => {
    //   a.style.opacity = 0;
    // });
    // setTimeout(() => {
    //   [].forEach.call(AboutUS, a => {
    //     a.style.opacity = 1;
    //   });
    // }, 550);
   }, [])
  return (
      <div className="AboutUS">
        <h1 className="header">About Us</h1>
        <div className="description">
          <div className="logo">
            <img src={Logo} alt="K-life logo"/>
          </div>
          <h3 className="tagline">Innovative. Modern. Personal.</h3>
          We are proud to introduce, K- Life, the medical equipments division of Kannu Impex (India) Pvt. Ltd.
          having a wide selection of diagnostic, preventive healthcare and home healthcare products.
          Our products are designed keeping the same core values in mind with which we want to run the
          organisation, strong ethics and exceptional quality in everything. The products are aimed at helping
          an individual detect, monitor and manage their health in an easy and efficient manner. With a steady
          growth, today we offer a PAN India presence with a sales network in every corner of the country and
          a sales team strongly working towards penetrating every remote place in India.
          The prime aim of our brand has been providing the much needed top class healthcare offerings in India at
          a price point possible for people of all the economical sections of the society. The bare minimum profit
          policy has helped not only us grow at a fast pace but has also helped in increasing
          the business of our distributors, whole sellers and retailers.
        </div>
      </div>
  )
}

AboutUs.propTypes = {
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

export default compose(withConnect)(AboutUs);
