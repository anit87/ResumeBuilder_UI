import React, { useEffect } from 'react'
import Layout from '../../Layout/Layout';
import './linkdin.css'
import MiniNav from '../MiniNav/MiniNav';
import { useNavigate, useParams } from 'react-router-dom';


const LinkedIn = () => {

  let navigate = useNavigate();

  const ToPackageBtn = () => {
    navigate('/package') 
  }
  return (
    <Layout >
      <div className="padding_div">
        <div className="flewless about ">
          <div className="row">
            <div className="about_content my-about-content">
              <MiniNav NavData={['linkedin', 'Linkedin']} />

              <div className="container-fluid">
                <div className="flewless_content my-flewless-content mt-5 pt-2" >
                  <div className='my-flawless-layout'>
                    <div className="about_img flewless__img my_linkedin_imgdiv">
                      <img src="./assets/images/mylinkedin.png" alt="about_img" className='img-fluid w-100' />
                    </div>
                    <div className="my_linkedin_textdiv">
                      <div className="linkdin_heading my-linkedin-heading">
                        <h2>
                          GET YOUR LINKEDIN PROFILE UPDATED AND GET INTERVIEWED!
                        </h2>
                        <div className=" btn__buy package_btn my_linkedin_btn">
                          <button className="btn " onClick={() => ToPackageBtn()} type="submit">Order NOW - $69.00</button>
                        </div>
                      </div>
                      <div className="linkdin_text my-linkedin-text pt-4">
                        <p>LinkedIn is the largest business-oriented networking website geared specifically towards professionals. It has over 500 million members, in over 200 countries.</p>
                        <p> Having an active and well put together LinkedIn profile will, significantly increase the chances of your discovery by various companies looking to hire people based on your skills and experience.</p>
                        <p>A professionally written LinkedIn profile allows you to create an online professional brand which can help open doors to opportunities and networks that you may not have been aware of without the help of social media. A well written LinkedIn profile, highlights your achievements and demonstrates your expertise and credibility in your industry.</p>
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

export default LinkedIn