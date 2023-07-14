import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../ProgressBar/progress.css'
import './resumeinfo.css'

const ResumeInfo = () => {
    const navigate = useNavigate();

    const ToPackageBtn = () =>{
      navigate('/package')
     }
    return (
        <div className="Review bg-light">
            <div className="container-fluid">
{/* 
                <div className="Review__info_content ">
                    <div className="row">
                        <div className=" col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5 Review_img_parent">
                            <div className="Review_resumeInfo__img  align-center img-fluid">
                                <div className="child_img">
                                    <img src="./assets/images/newreiview.png" alt="a man" />
                                </div>

                            </div>
                        </div>
                        <div className=" col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7 Review_resumeinfo_text">
                            <h4>Did you Know?</h4>
                            <p>It takes 6 seconds for a hiring manager to review a resume and make a determination on candidacy. how your resume looks and reads truly matters.</p>
                            <div className="progress_content">
                                <div className="progress_bar">
                                    <div className="resume_written_service my-resume-review-class">
                                        <ul>
                                            <li><span>A single typo on your resume can take your dream job away.</span><span> 61% of Recruiters shared that they discard a resume if it has mistakes.</span></li>
                                            <li>76% of the resumes are rejected due to an unprofessional email address.</li>
                                            <li><span>On average, 250 resumes are sent for each corporate job opening.</span><span> Only 4 resumes are shortlisted for an interview and only one will be selected for the job.</span></li>
                                        </ul>
                                    </div>
                                    <div className="btn__buy flawless_btn resume_info_button my_custom_resume_info">
                                        <button className='btn flawless_resume_custom_btn'>start your flawless resume</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                
                <div className="Review__info_content ">
                    <div className="review-content-wrapper">
                        <div className="  Review_img_parent">
                            <div className="Review_resumeInfo__img  align-center img-fluid">
                                <div className="child_img">
                                    <img src="./assets/images/newreiview.png" alt="a man" />
                                </div>

                            </div>
                        </div>
                        <div className="  Review_resumeinfo_text">
                            <h4>Did you Know?</h4>
                            <p>It takes 6 seconds for a hiring manager to review a resume and make a determination on candidacy. how your resume looks and reads truly matters.</p>
                            <div className="progress_content">
                                <div className="progress_bar">
                                    <div className="resume_written_service my-resume-review-class">
                                        <ul>
                                            <li><span>A single typo on your resume can take your dream job away.</span><span> 61% of Recruiters shared that they discard a resume if it has mistakes.</span></li>
                                            <li>76% of the resumes are rejected due to an unprofessional email address.</li>
                                            <li><span>On average, 250 resumes are sent for each corporate job opening.</span><span> Only 4 resumes are shortlisted for an interview and only one will be selected for the job.</span></li>
                                        </ul>
                                    </div>
                                    <div className="btn__buy flawless_btn resume_info_button my_custom_resume_info">
                                        <button className='btn flawless_resume_custom_btn' onClick={ToPackageBtn}>start your flawless resume</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResumeInfo;