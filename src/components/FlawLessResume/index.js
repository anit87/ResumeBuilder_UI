import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './Flawless.css';
import FlawlessSection2 from './FlawlessSection2'


const FlewLessResume = () => {
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
      const media = window.matchMedia('(min-width: 990px)');
      const listener = () => setIsDesktop(media.matches);
      listener();
      window.addEventListener('resize', listener);
      return () => window.removeEventListener('resize', listener);
    }, [isDesktop]);

    const navigate = useNavigate();

    const ToPackageBtn = () =>{
        navigate('/package')
       }
    return (
        <>
            <div className="flewless flawless_component">
                <div className={`container-fluid ${isDesktop ? 'p-0' : ''}`}>
                    <div className="row">
                        <div className=" col-sm-12 col-md-12 col-lg-6 col-xl-5 flawless_img">
                            <img src="/assets/images/2.png" alt="flawless_img1" className='img-fluid'/>
                        </div>

                        <div className=" col-sm-12 col-md-12 col-lg-6 col-xl-7 img_text-div-for-pad">
                            <div className="img_text">
                                <h2>   FLAWLESS RESUME GETS YOU INTO MORE DOORS</h2>
                                <p>Having difficulty landing job interviews? You might have the right skillsets,
                                    but your current resume  just isn’t’ cutting it. That’s where we can help. <br />
                                    Our resumes are written to ensure that you are successfully screened by
                                    Applicant Tracking Systems (ATS) and then hand-picked by Hiring Managers. <br />
                                    We ensure that your resume not only looks good, but that it is content rich so that
                                    you are selected as the candidate of choice.</p>
                            </div>
                            <div className="btn__buy flawless_btn my_custom_resume_info mt-5">
                                <button className='btn flawless_resume_custom_btn' onClick={ToPackageBtn}>start your flawless resume</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       <FlawlessSection2 />
        </>

    )
}

export default FlewLessResume
