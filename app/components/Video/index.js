import React,{useState, useEffect} from 'react'
import Icon from '../Icon/index'
import CloseIcon from '../../images/icons/close.svg'
import './style.scss'

function Video(props) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setOpen(props.open)
  }, [props.open])
  const {videoURl , next , previous,title,close} = props
  return (
    open &&
    <div className="showProductVideoModalWrapper">
      <div
        className="showProductVideoModal"
      >
        <div className="header">
          <div className="cancel" >
            <Icon
                mainIcon={CloseIcon}
                hoverIcon={CloseIcon}
                alt="Close Icon"
                action={()=>close()}
            />
          </div>
        </div>
        <div className="content">
          <div className="previous arrow" onClick={()=>previous()}><Icon name="chevron left" /></div>
          <div className="mediaPlayer">
            <video width="900"   controls>
              <source src={videoURl} />
              Your browser does not support HTML video.
            </video>
          </div>
          <div onClick={()=>next()} className="next arrow"><Icon name="chevron right" /></div>
        </div>

      </div>
    </div>
  )
}

export default Video
