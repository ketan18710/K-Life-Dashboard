import React, { useState, useEffect } from 'react';
import './style.scss';
import Loader from '../../Loader';
function AboutUs(props) {
  const { config, setConfig, save, saveData, saveBtnLoader } = props;
  const [data, setData] = useState('');
  const [loader, setLoader] = useState(null);
  useEffect(() => {
    // debugger
    if (Array.isArray(config.aboutUS)) {
      setData(config.aboutUS.join('\n'));
    }
  }, [config]);
  const saveContent = () => {
    const temp = config;
    config.aboutUS = data.split('\n');
    saveData(temp);
  };

  return (
    <div className="Dashboard__aboutUs">
      {saveBtnLoader || loader ? (
          <Loader />
          :
        <>
          <div className="header">
            <h3 className="title">ABOUT US : </h3>
            <button className="btn2__primary" onClick={() => saveContent()}>
              SAVE
            </button>
          </div>
          {/* <div className="actions">
            <button className="btn1__primary" onClick={()=>setSaveContentTrigger(true)}> Save</button>
          </div> */}
          <textarea
            value={data}
            onChange={e => setData(e.target.value)}
            rows="20"
          />
        </>
      )}
    </div>
  );
}

export default AboutUs;
