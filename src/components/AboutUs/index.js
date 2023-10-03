import React from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import MiniNav from '../MiniNav/MiniNav';
import './About.css';

const About = () => {
    const navigate = useNavigate();
    const ToPackageBtn = () => {
        navigate('/package')
    }

    return (
        <Layout >
            <div className="padding_div">
                <div className="flewless about">
                    <div className="row">
                        <div className="about_content">
                            <MiniNav NavData={['about', 'About Us']} />
                            <div className="review_main_heading my-about-us-div">
                                <h2>
                                    welcome to flawless resume,<br /> the leading resume writers in <span>north america.</span>
                                </h2>

                            </div>
                            <div className="container-fluid">
                                <div className="flewless_content about_text_data my-about-text-data-div">
                                    <div className="row">
                                        <div className="col-12 .col-sm-12 col-md-12 col-lg-5 col-xl-6 about_img flewless__img">
                                            <img src="./assets/images/about-image.jpg" alt="about_img" className='img-fluid w-100' />
                                        </div>
                                        <div className="col-12 .col-sm-12 col-md-12 col-lg-7 col-xl-6">
                                            <div className="flewless_texts about_text my-flawles-text-about">
                                                <p>At Flawless Resume we draw on a our experienced network of <span> HR career services </span> professionals to provide the most comprehensive resume writing services available to clients across diverse industries.</p>
                                                <p>Our team of professional resume writers have worked across all functions and are familiar with roles specific to your desired out come.</p>
                                                <p>While many resume writing service firms outsource their resume writing overseas, our entire resume writing teams are located in the <span> United States.</span></p>
                                            </div>
                                            <div className=" btn__buy package_btn mt-5 my_about_btn">
                                                <button className="btn " type="submit" onClick={() => ToPackageBtn()} >START YOUR FLAWLESS RESUME</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default About