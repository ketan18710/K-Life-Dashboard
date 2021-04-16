/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import makeSelectApp ,{makeSelectConfig}from './selectors';
import reducer from './reducer';
import saga from './saga';
import {getData,} from './actions'
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import rough from './rough';
import { Switch, Route } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
import './style.scss';
import HomePage from 'containers/Home/Loadable';
import AboutUs from 'containers/AboutUs/index';
import Products from 'containers/Products/Loadable'
import {DEFAULT_IMAGE_1 as IMG1,DEFAULT_IMAGE_2 as IMG2,APP_ROUTES,redirectFor} from 'utils/constants'
import Dashboard from 'containers/Dashboard/Loadable';
// import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Gallery from 'components/Gallery';
// import {APP_ROUTES} from 'utils/constants';
// const AppWrapper = styled.div`
//   max-width: calc(768px + 16px * 2);
//   margin: 0 auto;
//   display: flex;
//   min-height: 100%;
//   padding: 0 16px;
//   flex-direction: column;
// `;

export  function App(props) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga }); 
  const initConfig = {
    "carrousel": [IMG1, IMG1],
    "KLifeInfo":[
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
    "margueeProducts" : [
      {
        image : IMG1,
        title :"Analysers"
      },
      {
        image : IMG2,
        title :"Home Healthcare Devices"
      },
      {
        image : IMG1,
        title :"Medical Equipment"
      },
    ],
    "latest": [
      {
        "title": "Product 1",
        "image" : IMG1,
        "category_slug" : 'diagnostics',
        "description":"Consequat duis occaecat est ad voluptate consequat. Irure reprehenderit ullamco qui anim commodo Lorem voluptate ullamco ipsum non. Et do nostrud fugiat elit fugiat occaecat enim exercitation commodo minim. Occaecat consequat duis ipsum aliqua. Adipisicing quis aliqua velit aliqua eu sit ipsum consequat nulla duis enim excepteur aliquip reprehenderit.",        
        "sub_category_slug": "HbA1c_Analyser",
        "model_id": "CloverA1c"
      },
      {
        "title": "Product 2",
        "image" : IMG2,
        "category_slug" : 'diagnostics',
        "description":"Consequat duis occaecat est ad voluptate consequat. Irure reprehenderit ullamco qui anim commodo Lorem voluptate ullamco ipsum non. Et do nostrud fugiat elit fugiat occaecat enim exercitation commodo minim. Occaecat consequat duis ipsum aliqua. Adipisicing quis aliqua velit aliqua eu sit ipsum consequat nulla duis enim excepteur aliquip reprehenderit.",
        "sub_category_slug": "Pregnancy_Cards",
        "model_id": "pregacheck"
      },
      {
        "title": "Product 3",
        "image" : IMG1,
        "category_slug" : 'medical_equipment',
        "description":"Consequat duis occaecat est ad voluptate consequat. Irure reprehenderit ullamco qui anim commodo Lorem voluptate ullamco ipsum non. Et do nostrud fugiat elit fugiat occaecat enim exercitation commodo minim. Occaecat consequat duis ipsum aliqua. Adipisicing quis aliqua velit aliqua eu sit ipsum consequat nulla duis enim excepteur aliquip reprehenderit.",
        "sub_category_slug": "ECG_Machines",
        "model_id": "Single_Channel"
      },
      {
        "title": "Product 4",
        "image" : IMG2,
        "category_slug" : 'medical_equipment',
        "description":"Consequat duis occaecat est ad voluptate consequat. Irure reprehenderit ullamco qui anim commodo Lorem voluptate ullamco ipsum non. Et do nostrud fugiat elit fugiat occaecat enim exercitation commodo minim. Occaecat consequat duis ipsum aliqua. Adipisicing quis aliqua velit aliqua eu sit ipsum consequat nulla duis enim excepteur aliquip reprehenderit.",
        "sub_category_slug": "ECG_Machines",
        "model_id": "Six_Channel"
      },
      {
        "title": "Product 5",
        "image" : IMG1,
        "category_slug" : 'home_health_care',
        "description":"Consequat duis occaecat est ad voluptate consequat. Irure reprehenderit ullamco qui anim commodo Lorem voluptate ullamco ipsum non. Et do nostrud fugiat elit fugiat occaecat enim exercitation commodo minim. Occaecat consequat duis ipsum aliqua. Adipisicing quis aliqua velit aliqua eu sit ipsum consequat nulla duis enim excepteur aliquip reprehenderit.",
        "sub_category_slug": "Blood_Glucose_Meters",
        "model_id": "Gluneo_Lite"
      },
    ],
    "socialLinks": { "instagram": "", "facebook": "" },
    "aboutUS": {},
    "gallery": [IMG1, IMG2, IMG1,IMG2,IMG1, IMG2, IMG1,IMG2,IMG1, IMG2, IMG1],
    "categories": [
      {
        "title": "diagnostics",
        "category_slug" : 'diagnostics',
        "subCategories": [
          {
            "sub_category_slug": "HbA1c_Analyser",
            "title": "HbA1c Analyser",
            "description": "Ipsum cillum cillum qui consectetur aliqua. Officia id eiusmod commodo fugiat aliquip nulla pariatur sint excepteur. Lorem irure nisi id est nisi eu id adipisicing consectetur. Id officia aute in officia do quis ipsum amet voluptate eu aute. Incididunt ullamco esse proident reprehenderit. Duis amet eiusmod labore consequat. Ad fugiat sint anim duis elit non laboris laboris.",
            "products": [
              {
                "title": "Clover A1c",
                "isNew": false,
                "marqueeProduct": "false",
                "p": "CloverA1c",
                "images": [IMG1, IMG2, IMG1],
                "description": "Laboris cupidatat non labore nostrud. Labore incididunt non dolor sint et cupidatat mollit nisi do incididunt. Amet amet et ut aute cupidatat dolore duis minim.",
                "features": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>`,
                "video": "https://www.youtube.com/watch?v=AmT7RpAeVHA",
                "manuals": [
                  { "title": "Demo Doc", "link": "http://www.africau.edu/images/default/sample.pdf" },
                ],
                "accessories": { "image": IMG1, "data": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>` }
              },  
            ]
          },
          {
            "sub_category_slug": "Pregnancy_Cards",
            "title": "Pregnancy Cards",
            "description": "Consectetur magna est anim sint culpa ipsum eiusmod ad eiusmod cupidatat. Sunt ullamco sit veniam veniam fugiat exercitation ipsum occaecat nisi eu tempor in. Fugiat laborum enim consectetur Lorem elit sunt anim. Cupidatat excepteur adipisicing reprehenderit esse non proident consequat laboris laboris sit consectetur pariatur ut magna.",
            "products": [
              {
                "title": "Pregacheck",
                "isNew": false,
                "marqueeProduct": "true",
                "model_id": "pregacheck",
                "images": [IMG1, IMG2, IMG1,IMG2,IMG1, IMG1,IMG2],
                "description": "",
                "features": "",
                "video": "url",
                "manuals": [
                  { "title": "Demo Doc", "link": "http://www.africau.edu/images/default/sample.pdf" },
                ],
                "accessories": { "image": IMG1, "data": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>` }
              }
            ]
          }
        ]
      },
      {
        "title": "Medical Equipment",
        "category_slug" : 'medical_equipment',
        "subCategories": [
          {
            "sub_category_slug": "ECG_Machines",
            "title": "ECG Machines",
            "description": "Ipsum cillum cillum qui consectetur aliqua. Officia id eiusmod commodo fugiat aliquip nulla pariatur sint excepteur. Lorem irure nisi id est nisi eu id adipisicing consectetur. Id officia aute in officia do quis ipsum amet voluptate eu aute. Incididunt ullamco esse proident reprehenderit. Duis amet eiusmod labore consequat. Ad fugiat sint anim duis elit non laboris laboris.",
            "products": [
              {
                "title": "Single Channel",
                "isNew": false,
                "marqueeProduct": "false",
                "model_id": "Single_Channel",
                "images": [IMG1, IMG2, IMG1],
                "description": "Laboris cupidatat non labore nostrud. Labore incididunt non dolor sint et cupidatat mollit nisi do incididunt. Amet amet et ut aute cupidatat dolore duis minim.",
                "features": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>`,
                "video": "https://www.youtube.com/watch?v=AmT7RpAeVHA",
                "manuals": [
                  { "title": "Demo Doc", "link": "http://www.africau.edu/images/default/sample.pdf" },
                ],
                "accessories": { "image": IMG1, "data": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>` }
              },
              {
                "title": "Three Channel",
                "isNew": false,
                "marqueeProduct": "false",
                "model_id": "Three_Channel",
                "images": [IMG1, IMG2, IMG1],
                "description": "Laboris cupidatat non labore nostrud. Labore incididunt non dolor sint et cupidatat mollit nisi do incididunt. Amet amet et ut aute cupidatat dolore duis minim.",
                "features": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>`,
                "video": "https://www.youtube.com/watch?v=AmT7RpAeVHA",
                "manuals": [
                  { "title": "Demo Doc", "link": "http://www.africau.edu/images/default/sample.pdf" },
                ],
                "accessories": { "image": IMG1, "data": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>` }
              },
              {
                "title": "Six Channel",
                "isNew": false,
                "marqueeProduct": "false",
                "model_id": "Six_Channel",
                "images": [IMG1, IMG2, IMG1],
                "description": "Laboris cupidatat non labore nostrud. Labore incididunt non dolor sint et cupidatat mollit nisi do incididunt. Amet amet et ut aute cupidatat dolore duis minim.",
                "features": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>`,
                "video": "https://www.youtube.com/watch?v=AmT7RpAeVHA",
                "manuals": [
                  { "title": "Demo Doc", "link": "http://www.africau.edu/images/default/sample.pdf" },
                ],
                "accessories": { "image": IMG1, "data": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>` }
              },
              {
                "title": "Twelve Channel",
                "isNew": false,
                "marqueeProduct": "false",
                "model_id": "Twelve_Channel",
                "images": [IMG1, IMG2, IMG1],
                "description": "Laboris cupidatat non labore nostrud. Labore incididunt non dolor sint et cupidatat mollit nisi do incididunt. Amet amet et ut aute cupidatat dolore duis minim.",
                "features": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>`,
                "video": "https://www.youtube.com/watch?v=AmT7RpAeVHA",
                "manuals": [
                  { "title": "Demo Doc", "link": "http://www.africau.edu/images/default/sample.pdf" },
                ],
                "accessories": { "image": IMG1, "data": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>` }
              },
            ]
          },
          {
            "sub_category_slug": "Multi_Parameter_Patient_Monitors",
            "title": "Multi Parameter Patient Monitors",
            "description": "Consectetur magna est anim sint culpa ipsum eiusmod ad eiusmod cupidatat. Sunt ullamco sit veniam veniam fugiat exercitation ipsum occaecat nisi eu tempor in. Fugiat laborum enim consectetur Lorem elit sunt anim. Cupidatat excepteur adipisicing reprehenderit esse non proident consequat laboris laboris sit consectetur pariatur ut magna.",
            "products": [
              {
                "title": "SpO2 and NIBP Patient Monitor",
                "isNew": false,
                "marqueeProduct": "true",
                "model_id": "SpO2_NIBP_Patient_Monitor",
                "images": [IMG1, IMG2, IMG1,IMG2,IMG1, IMG1,IMG2],
                "description": "",
                "features": "",
                "video": "url",
                "manuals": [
                  { "title": "Demo Doc", "link": "http://www.africau.edu/images/default/sample.pdf" },
                ],
                "accessories": { "image": IMG1, "data": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>` }
              },
              {
                "title": "Five Parameter Patient Monitor",
                "isNew": false,
                "marqueeProduct": "true",
                "model_id": "Five_Parameter_Patien_ Monitor",
                "images": [IMG1, IMG2, IMG1,IMG2,IMG1, IMG1,IMG2],
                "description": "",
                "features": "",
                "video": "url",
                "manuals": [
                  { "title": "Demo Doc", "link": "http://www.africau.edu/images/default/sample.pdf" },
                ],
                "accessories": { "image": IMG1, "data": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>` }
              },
            ]
          },
          {
            "sub_category_slug": "Oxygen_Concentrator",
            "title": "Oxygen Concentrator",
            "description": "Consectetur magna est anim sint culpa ipsum eiusmod ad eiusmod cupidatat. Sunt ullamco sit veniam veniam fugiat exercitation ipsum occaecat nisi eu tempor in. Fugiat laborum enim consectetur Lorem elit sunt anim. Cupidatat excepteur adipisicing reprehenderit esse non proident consequat laboris laboris sit consectetur pariatur ut magna.",
            "products": [
              {
                "title": "5 Litre Oxygen Concentrator",
                "isNew": false,
                "marqueeProduct": "true",
                "model_id": "5_Litre_Oxygen_Concentrator",
                "images": [IMG1, IMG2, IMG1,IMG2,IMG1, IMG1,IMG2],
                "description": "",
                "features": "",
                "video": "url",
                "manuals": [
                  { "title": "Demo Doc", "link": "http://www.africau.edu/images/default/sample.pdf" },
                ],
                "accessories": { "image": IMG1, "data": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>` }
              },
            ]
          },
          {
            "sub_category_slug": "Suction_Unit",
            "title": "Suction Unit",
            "description": "Consectetur magna est anim sint culpa ipsum eiusmod ad eiusmod cupidatat. Sunt ullamco sit veniam veniam fugiat exercitation ipsum occaecat nisi eu tempor in. Fugiat laborum enim consectetur Lorem elit sunt anim. Cupidatat excepteur adipisicing reprehenderit esse non proident consequat laboris laboris sit consectetur pariatur ut magna.",
            "products": [
              {
                "title": "Portable Phlegm Suction Unit",
                "isNew": false,
                "marqueeProduct": "true",
                "model_id": "Portable_Phlegm_Suction_Unit",
                "images": [IMG1, IMG2, IMG1,IMG2,IMG1, IMG1,IMG2],
                "description": "",
                "features": "",
                "video": "url",
                "manuals": [
                  { "title": "Demo Doc", "link": "http://www.africau.edu/images/default/sample.pdf" },
                ],
                "accessories": { "image": IMG1, "data": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>` }
              },
            ]
          },
        ]
      },
      {
        "title": "HOME HEALTH CARE",
        "category_slug" : 'home_health_care',
        "subCategories": [
          {
            "sub_category_slug": "Blood_Glucose_Meters",
            "title": "Blood Glucose Meters",
            "description": "Ipsum cillum cillum qui consectetur aliqua. Officia id eiusmod commodo fugiat aliquip nulla pariatur sint excepteur. Lorem irure nisi id est nisi eu id adipisicing consectetur. Id officia aute in officia do quis ipsum amet voluptate eu aute. Incididunt ullamco esse proident reprehenderit. Duis amet eiusmod labore consequat. Ad fugiat sint anim duis elit non laboris laboris.",
            "products": [
              {
                "title": "Gluneo Lite",
                "isNew": false,
                "marqueeProduct": "false",
                "model_id": "Gluneo_Lite",
                "images": [IMG1, IMG2, IMG1],
                "description": "Laboris cupidatat non labore nostrud. Labore incididunt non dolor sint et cupidatat mollit nisi do incididunt. Amet amet et ut aute cupidatat dolore duis minim.",
                "features": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>`,
                "video": "https://www.youtube.com/watch?v=AmT7RpAeVHA",
                "manuals": [
                  { "title": "Demo Doc", "link": "http://www.africau.edu/images/default/sample.pdf" },
                ],
                "accessories": { "image": IMG1, "data": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>` }
              },
              {
                "title": "Glucolab",
                "isNew": false,
                "marqueeProduct": "false",
                "model_id": "Glucolab",
                "images": [IMG1, IMG2, IMG1],
                "description": "Laboris cupidatat non labore nostrud. Labore incididunt non dolor sint et cupidatat mollit nisi do incididunt. Amet amet et ut aute cupidatat dolore duis minim.",
                "features": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>`,
                "video": "https://www.youtube.com/watch?v=AmT7RpAeVHA",
                "manuals": [
                  { "title": "Demo Doc", "link": "http://www.africau.edu/images/default/sample.pdf" },
                ],
                "accessories": { "image": IMG1, "data": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>` }
              },
              {
                "title": "Element",
                "isNew": false,
                "marqueeProduct": "false",
                "model_id": "Element",
                "images": [IMG1, IMG2, IMG1],
                "description": "Laboris cupidatat non labore nostrud. Labore incididunt non dolor sint et cupidatat mollit nisi do incididunt. Amet amet et ut aute cupidatat dolore duis minim.",
                "features": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>`,
                "video": "https://www.youtube.com/watch?v=AmT7RpAeVHA",
                "manuals": [
                  { "title": "Demo Doc", "link": "http://www.africau.edu/images/default/sample.pdf" },
                ],
                "accessories": { "image": IMG1, "data": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>` }
              },
            ]
          },
          {
            "sub_category_slug": "Blood_Pressure_Monitors",
            "title": "Blood Pressure Monitors",
            "description": "Consectetur magna est anim sint culpa ipsum eiusmod ad eiusmod cupidatat. Sunt ullamco sit veniam veniam fugiat exercitation ipsum occaecat nisi eu tempor in. Fugiat laborum enim consectetur Lorem elit sunt anim. Cupidatat excepteur adipisicing reprehenderit esse non proident consequat laboris laboris sit consectetur pariatur ut magna.",
            "products": [
              {
                "title": "BPM-104",
                "isNew": false,
                "marqueeProduct": "true",
                "model_id": "BPM_104",
                "images": [IMG1, IMG2, IMG1,IMG2,IMG1, IMG1,IMG2],
                "description": "",
                "features": "",
                "video": "url",
                "manuals": [
                  { "title": "Demo Doc", "link": "http://www.africau.edu/images/default/sample.pdf" },
                ],
                "accessories": { "image": IMG1, "data": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>` }
              },
              {
                "title": "BPM-105",
                "isNew": false,
                "marqueeProduct": "true",
                "model_id": "BPM_105",
                "images": [IMG1, IMG2, IMG1,IMG2,IMG1, IMG1,IMG2],
                "description": "",
                "features": "",
                "video": "url",
                "manuals": [
                  { "title": "Demo Doc", "link": "http://www.africau.edu/images/default/sample.pdf" },
                ],
                "accessories": { "image": IMG1, "data": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>` }
              },
              {
                "title": "BPM-106",
                "isNew": false,
                "marqueeProduct": "true",
                "model_id": "BPM_106",
                "images": [IMG1, IMG2, IMG1,IMG2,IMG1, IMG1,IMG2],
                "description": "",
                "features": "",
                "video": "url",
                "manuals": [
                  { "title": "Demo Doc", "link": "http://www.africau.edu/images/default/sample.pdf" },
                ],
                "accessories": { "image": IMG1, "data": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>` }
              },
              {
                "title": "BPM-107",
                "isNew": false,
                "marqueeProduct": "true",
                "model_id": "BPM_107",
                "images": [IMG1, IMG2, IMG1,IMG2,IMG1, IMG1,IMG2],
                "description": "",
                "features": "",
                "video": "url",
                "manuals": [
                  { "title": "Demo Doc", "link": "http://www.africau.edu/images/default/sample.pdf" },
                ],
                "accessories": { "image": IMG1, "data": `<ol>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum. Novum commodo malorum vix ut.</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea</li>
                <li style="color: #5e9ca0;">Lorem ipsum dolor sit amet, nonumes voluptatum mel ea, cu case ceteros cum.</li>
                </ol>` }
              },
            ]
          },
        ]
      },
    ]
  }
  const [config, setConfig] = useState(initConfig)
  useEffect(() => {
    props.fetchData()
  }, [])
  console.log(props,'props')
 
  
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
    const observerConfig = { attributes:false, childList:true, subtree: true };
    const observer = new MutationObserver(mainBodyObserverCallback);
    observer.observe(targetNode, observerConfig);
  }, [document.getElementById('mainBodyInnerWrapper')])


  return (
    <>
      <Helmet
        titleTemplate="%s - K-Life"
        defaultTitle="K-Life"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <div className="topGreenBar"></div>
      <Header {...config}/>
      <div id="mainBody">
        <div id="K_LIFE_loader">
          <div class="loader"></div>
        </div>
        <div id="mainBodyInnerWrapper">
          <Switch>
            <Route exact path={APP_ROUTES.HOME} component={()=><HomePage {...config} />} />
            <Route exact path={APP_ROUTES.ROUGH} component={rough} />
            <Route exact path={APP_ROUTES.PRODUCT_CATEGORY} component={()=><Products {...config} productDetail={false}/>} />
            <Route exact path={APP_ROUTES.PRODUCT} component={()=><Products {...config} productDetail={true}/>} />
            <Route exact path={APP_ROUTES.ABOUT_US} component={AboutUs} />
            <Route exact path={APP_ROUTES.GALLERY} component={()=><Gallery {...config} />} />
            <Route exact path={APP_ROUTES.DASHBOARD} component={()=><Dashboard redirectFor={redirectFor.DASHBOARD} config={config} />} />
          </Switch>
        </div>
        <Footer />
      </div> 
    </>     
  );
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  appData: makeSelectApp(),
  userConfig: makeSelectConfig(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchData: () => dispatch(getData()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);