import React from 'react'
import Icon from '../Icon/index'
import './style.scss'
import MailIcon from '../../images/icons/mail.svg'
import Logo from '../../images/logo_white.png'
function Footer() {
  return (
    <div className="Footer">
      <div className="info">
        <img src={Logo}  className="logo" alt="K-life Logo"/>
        <h4>Address : Suite 412</h4>
        <h4>Suncity Trade Tower,</h4>
        <h4> Sector 21,</h4>
        <h4> Gurugram, Haryana 122016</h4>
        <h4>
          <Icon
            mainIcon={MailIcon}
            hoverIcon={MailIcon}
            alt="Mail Icon"
          />
          <a href = "mailto: info@klifecare.com ">info@klifecare.com </a>
        </h4>
        <h4>
          <Icon
            mainIcon={MailIcon}
            hoverIcon={MailIcon}
            alt="Mail Icon"
          />
          <a href = "mailto: pranay@klifecare.com ">pranay@klifecare.com </a>
        </h4>
      </div>
      <div className="location">
        <h3>Find Us Here</h3>
        <div className="map">
        <div className="mapouter">
          <div className="gmap_canvas">
              <iframe width="200" 
                height="200" 
                id="gmap_canvas" 
                src="https://maps.google.com/maps?q=Suncity%20Trade%20Tower,%20412,%20Sector%2021,%20Gurugram,%20Haryana%20122016&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                frameborder="0" 
                scrolling="no" 
                marginheight="0" 
                marginwidth="0"
              ></iframe>
              <a href="https://embedgooglemap.net/maps/100"></a>
              <br />
              <a href="https://www.embedgooglemap.net"></a>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
