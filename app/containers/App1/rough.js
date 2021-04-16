import React,{useState , useEffect} from 'react'
import {Card2 , Card3 , Card4} from '../../components/Cards/index'
import Video from '../../components/Video/index'
import {DEFAULT_IMAGE_1} from 'utils/constants'
import Carrausel from '../../components/Carausel/index'
function rough() {
  const [triggers, setTriggers] = useState({
    video: false
  })
  const [activeVideoLink, setActiveVideoLink] = useState(null)
  const [activeIndex, setActiveIndex] = useState(-1)
  const videosObj = [
    {
      title : 'Cardiovascular System',
      link  : "https://www.w3schools.com/html/mov_bbb.mp4",
      poster : 'https://images.immediate.co.uk/production/volatile/sites/34/2020/11/what-is-the-cardiovascular-system-and-how-does-exercise-affect-it-844197a.jpg?quality=90&resize=768%2C574'
    },
    {
      title : 'Respiratory System',
      link  : "https://www.w3schools.com/html/mov_bbb.mp4",
      poster : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT40xJEkpg-3nM1LDsdK7VQBOp3LIzKwMoCeA&usqp=CAU'
    },
    {
      title : 'Digestive System',
      link  : "https://www.w3schools.com/html/mov_bbb.mp4",
      poster : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT40xJEkpg-3nM1LDsdK7VQBOp3LIzKwMoCeA&usqp=CAU'
    },
  ]
  const goToNextVideo = () => {
    const length  = videosObj.length 
    if(activeIndex +1 < length){
      setActiveIndex(activeIndex +1)
    }else{
      const x = (activeIndex+1) % length
      setActiveIndex(x)
    }
  }
  const goToPrevious = () => {
    const length  = videosObj.length 
    if(activeIndex -1 >=0){
      setActiveIndex(activeIndex - 1)
    }else{
      const x = activeIndex -1 + length
      setActiveIndex(x)
    }
  }
  
  const defineVideoURl = (activeIndex) => {
    if(activeIndex >=0){
      const obj = videosObj[activeIndex]
      return obj.link
    }else{
      return null
    }
  }
  
  return (
    <div className="rough">
      <div className="demoCarrausel">
        <Carrausel />
      </div>
      <div className="demoCard1">
        <Card3 
          image={DEFAULT_IMAGE_1}
          description="Consequat duis occaecat est ad voluptate consequat. Irure reprehenderit ullamco qui anim commodo Lorem voluptate ullamco ipsum non. Et do nostrud fugiat elit fugiat occaecat enim exercitation commodo minim. Occaecat consequat duis ipsum aliqua. Adipisicing quis aliqua velit aliqua eu sit ipsum consequat nulla duis enim excepteur aliquip reprehenderit."
          title="Card 3 Prod"
          />
        <Card3 
          image={DEFAULT_IMAGE_1}
          description="Proident consequat anim veniam adipisicing. Minim magna in enim ea do cillum culpa. Nostrud do velit dolor elit ullamco ex veniam. Ex ad do nostrud dolore tempor laboris labore mollit. Dolor exercitation quis dolore id nostrud aute. Voluptate ut consectetur non anim nisi exercitation."
          title="Card 3 Prod"
        />
      </div>
      <div className="demoCard2">        
        <Card2
            title="Title" 
            image={DEFAULT_IMAGE_1}
            description="This is sample description"
          />
          <Card2
            title="Title" 
            image={DEFAULT_IMAGE_1}
            newCard={true}
            description="This is sample description"
          />
      </div>
      <div className="video">
        <Video 
          videoURl={defineVideoURl(activeIndex)}
          open={triggers.video}
          title={activeIndex > 0 && videosObj[activeIndex].title}
          next={()=>goToNextVideo()}
          previous={()=>goToPrevious()}
          close={()=>setTriggers({...triggers,video : false})}
        />
      </div>
      <div className="videoPostersArray">
        {
          videosObj.map((item , index)=>(
            <div className="poster" style={{backgroundImage : `url(${item.poster})`}} onClick={()=>{setActiveIndex(index) ;setTriggers({...triggers,video : true})}}>
              {/* <Icon name="play circle outline"/> */}
              <p>{item.title}</p>
            </div>
          ))
        }
      </div>
      <div className="ProductCards">
        {/* <Card4 
            id='1'
            model="N-90"
            keyword="Compact"
            title="Product Title"
            image={DEFAULT_IMAGE_1}
        /> */}
        <div className="cardExample1">
          <div className="image">
            <img src={DEFAULT_IMAGE_1}/>
          </div>
          <div className="content">
            <h3 className="title">GLUCOMETER</h3>
            <h5 className="model">GL-22</h5>
            <p className="action">SHOW DETAILS</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default rough
