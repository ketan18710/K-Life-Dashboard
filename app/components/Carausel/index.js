import React,{useState,useEffect} from 'react'
import Icon from '../Icon/index'
import LeftIcon from '../../images/icons/left.svg'
import LeftIconHover from '../../images/icons/left_hover_blue.svg'
import RightIcon from '../../images/icons/right.svg'
import RightIconHover from '../../images/icons/right_hover_blue.svg'
import Image1 from './images/1.png'
import Image2 from './images/2.png'
import Image3 from './images/3.png'
import Image4 from './images/4.png'
import Image5 from './images/5.png'
import Image6 from './images/6.png'
import Image7 from './images/7.png'
import Image8 from './images/8.png'
import './style.scss'
function Carrausel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const imageList = [Image1,Image2,Image3,Image4,Image5,Image6,Image7,Image8]
  const goToNext = () => {
    const length  = imageList.length 
    if(activeIndex +1 < length){
      setActiveIndex(activeIndex +1)
    }else{
      const x = (activeIndex+1) % length
      setActiveIndex(x)
    }
  }
  const goToPrevious = () => {
    const length  = imageList.length 
    if(activeIndex -1 >=0){
      setActiveIndex(activeIndex - 1)
    }else{
      const x = activeIndex -1 + length
      setActiveIndex(x)
    }
  }
  useEffect(() => { 
    const AboutUS = document.getElementsByClassName('carrausel');
    if(AboutUS){
      [].forEach.call(AboutUS, a => {
        a.style.opacity = 0.3;
      });
      setTimeout(() => {
        [].forEach.call(AboutUS, a => {
          a.style.opacity = 1;
        });
      }, 50);
    }
   }, [activeIndex])
  return (
    <div className="carrausel">
      <img src={imageList[activeIndex]} alt="carrausel image"/>
      <div className="actions">
        <Icon
            mainIcon={LeftIcon}
            hoverIcon={LeftIconHover}
            alt="Show previous image"
            action={goToPrevious}
        />
        <Icon
            mainIcon={RightIcon}
            hoverIcon={RightIconHover}
            alt="Show previous image"
            action={goToNext}
        />
      </div>
    </div>
  )
}
 
export default Carrausel
