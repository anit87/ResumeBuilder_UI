import React from 'react';
import { useNavigate } from 'react-router-dom';

const FlawlessSection2 = () => {
    const navigate = useNavigate();

    const ToPackageBtn = () =>{
        navigate('/package')
       }
  return (
    <div className="flewless flawless_sec2 my-flawless-sec ">
    {/* <div className="container-fluid ">
        <div className="resume_written_service">
            <div className="row section_2 section2-cutom">
                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-7">
                    <div className="flewless_texts rsume-flawless">
                        <div className="img-text ">
                            <h2> With our resume writing services you’ll get :</h2>
                            <ul>
                                <li><p>A Custom, modern ATS-optimized resume that tells the unique story of you</p></li>
                                <li><p>Exclusive resume designs that are proven to get job interviews</p></li>
                                <li><p>Personalized support from a Professional Resume Writer who knows your industry</p></li>
                                <li><p>Every package includes a personal phone consultation </p></li>
                                <li><p>More job interview opportunities often leads to multiple job offers - you get to choose
                                    which companies will yield a better career path. </p> </li>
                                <li><p>LinkedIn Update is available as its own service or can be purchased as an add-on </p></li>
                                <li><p>Delivery in Microsoft Word and PDF </p></li>
                            </ul>
                        </div>
                        <div className="btn__buy flawless_btn my_custom_resume_info mt-5">
                            <button className='btn flawless_resume_custom_btn'>start your flawless resume</button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-6 col-xl-5 flawless_img">
                    <img src="/assets/images/1.png" alt="flawless_img1" className='img-fluid'/>
                </div>
            </div>
        </div>
    </div> */}
    <div className='container'>
        <div className='row'>
            <div className='col-md-12'>
                <div className='flwaless-section2-wrapper'>
                <img src="/assets/images/1.png" alt="flawless_img1" className='img-fluid'/>
                    <div className="flewless_texts rsume-flawless">
                        <div className="img-text ">
                            <h2> With our resume writing services you’ll get :</h2>
                            <ul>
                                <li><p>A Custom, modern ATS-optimized resume that tells the unique story of you.</p></li>
                                <li><p>Exclusive resume designs that are proven to get job interviews.</p></li>
                                <li><p>Personalized support from a Professional Resume Writer who knows your industry.</p></li>
                                <li><p>Every package includes a personal phone consultation. </p></li>
                                <li><p>More job interview opportunities often leads to multiple job offers - you get to choose.
                                    which companies will yield a better career path. </p> </li>
                                <li><p>LinkedIn Update is available as its own service or can be purchased as an add-on. </p></li>
                                <li><p>Delivery in Microsoft Word and PDF. </p></li>
                            </ul>
                        </div>
                        <div className="btn__buy flawless_btn my_custom_resume_info mt-5">
                            <button className='btn flawless_resume_custom_btn'onClick={ToPackageBtn} >start your flawless resume</button>
                        </div>
                    </div>
                    

                </div>

            </div>
    </div>
</div>
</div>
  )
}

export default FlawlessSection2