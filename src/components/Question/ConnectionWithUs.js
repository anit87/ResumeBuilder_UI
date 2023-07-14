import React from 'react';
import {BsFillCameraVideoFill} from 'react-icons/bs';
import {SiLoom} from 'react-icons/si'
import './Question.css';

const ConnectionWithUs = () => {
  return (
   <div className="connection pb-5 pt-2">
    <div className="connetion_main_div ">
        <div className="row">
          <div className="text col-md-9 col-lg-9">
          <h4>CONNECTED WITH US</h4>
          </div>
          <div className="connetion_icon col-md-3 col-lg-3">
            <div className="row justify-content-end">
                <div className="col-md-6 conneted_Icon me-3 ">
           <BsFillCameraVideoFill className='connectIcon' size={40}/>
           </div>
           <div className="col-md-6 conneted_Icon">
           <SiLoom className='connectIcon ' size={40}/>
           </div>
           </div>
          </div>
        </div>
      

    </div>
   </div>
  )
}

export default ConnectionWithUs