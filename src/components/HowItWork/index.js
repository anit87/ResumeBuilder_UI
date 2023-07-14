import React,{useState,useEffect} from 'react';
import './HowItWork.css';
import timeLineData from '../api/timeline'


const HowItWork = () => {
    const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1450px)');
    const listener = () => setIsDesktop(media.matches);
    listener();
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [isDesktop]);


  const newClassName = isDesktop ? ''  : 'img-fluid';
 
    return (
        <div className='how-work-section'>
           <h3>how it works</h3>
        
        <div className="how__work ">
            <div className="container-fluid">
                <div className="work_content">
                    <div className="timeline-wrapper">
                    <div className="timeline ">
                        {timeLineData.map((item) => {
                            return (
                                <div key={item.id}>
                                    <div className="timeline-container primary" key={item.id}>
                                        <div className="timeline-icon">
                                            {item.icon}
                                        </div>
                                        <div className="timeline-body">
                                            <h4 className="timeline-title">{item.heading}</h4>
                                            <hr />  
                                            <p>{item.para}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="timeline__img ">
                        <img src="./assets/images/newtarget.png" alt="images" className={newClassName}/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default HowItWork