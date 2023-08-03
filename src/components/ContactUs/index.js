import React, { useEffect, useRef, useState } from 'react';
import './ContactUs.css';
import Layout from '../../Layout/Layout'
import { HiMailOpen } from 'react-icons/hi';
import MiniNav from '../MiniNav/MiniNav';
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from 'react-redux';
import { recaptchaaction, ContactUs } from '../../redux/action/Action'
import { reCaptchaKey } from '../Admin/Components/Api/BaseLine';
import AlertComponent from '../basicComponents/Alert';

function allKeysHaveValues(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === undefined || obj[key] === null || obj[key] === '') {
        return false;
      }
    }
  }
  return true;
}

const ContantUs = () => {

  const [alert, setAlert] = useState(false);
  const [contactusData, setContactUsData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const statuscaptcha = useSelector((state) => state.recaptchareducer.captchastatus)
  const contactUsStatus = useSelector((state) => state.contactUsStatus.status)

  useEffect(() => {
    alertfn()

  }, [contactUsStatus])

  // console.log("statuscaptcha", contactUsStatus)
  const alertfn = () => {
    setTimeout(() => setAlert(true), 100);
  }

  const dispatch = useDispatch()
  const captchaRef = useRef(null)

  const ContactUsHandle = (e) => {
    let { name, value } = e.target;
    setContactUsData((old) => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    captchaRef.current.reset();
    dispatch(ContactUs(contactusData))
  }

  const handleChange = (e) => {
    const token = captchaRef.current.getValue();
    dispatch(recaptchaaction(token))
    // console.log("token",token)
  }

  return (
    <Layout>
      {(contactUsStatus.status === true || contactUsStatus.status === false) && <AlertComponent
        open={alert}
        type={contactUsStatus.status === true ? "info" : "error"}
        msg={contactUsStatus.message}
        onClose={() => setAlert(false)}
      />}
      <div className="padding_div">
        <MiniNav NavData={['contactus', 'Contact us']} />
        <div className="full_from">
          <div className="container d-flex justify-content-center">
            <div className="contact_us_parent ">
              <div className="container-fluid p-5 custom_contact_us">
                <div className="row">
                  <div className="col-md-6 contact_input" id="details">
                    <form onSubmit={handleSubmit}>
                      <div className="text mb-5 ">
                        <h3 className="mb-2">Get In Touch</h3>
                        <p>We are here for you! How can we help?</p>
                      </div>
                      <div className="mb-3 contact_input">
                        <input type="text" className="form-control contact_form" id="exampleFormControlInput1" name='name' value={contactusData.name} placeholder="First Name" onChange={ContactUsHandle} />
                      </div>
                      <div className="mb-3">
                        <input type="email" className="form-control contact_form" id="exampleFormControlInput1" name='email' value={contactusData.email} placeholder="Email Address" onChange={ContactUsHandle} />
                      </div>
                      <div className="mb-3">
                        <input type="text" className="form-control contact_form" id="exampleFormControlInput1" name='subject' value={contactusData.subject} placeholder="Subject" onChange={ContactUsHandle} />
                      </div>
                      <div className="mb-3">
                        <textarea className="form-control contact_form text_area" id="exampleFormControlTextarea1" name='message' value={contactusData.message} placeholder="Message" rows="3" onChange={ContactUsHandle}></textarea>
                      </div>

                      <div className='recaptcha-div'>
                        {/* sitekey="6Lf9TrgiAAAAABdM8ml-sdvv0FE2j0eVH22o77St" */}

                        <ReCAPTCHA
                          sitekey={reCaptchaKey}
                          ref={captchaRef}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="d-flex btn__buy contact_btn pt-2">
                        {(statuscaptcha.success == true && allKeysHaveValues(contactusData)) ?
                          <button className="btn " type="submit">Send Message</button> :
                          <button className="btn " type="button" disabled>Send Message</button>
                        }
                      </div>
                    </form>
                  </div>
                  <div className="col-md-6">
                    <div className="" id="form">
                      <div className="contentus my-contact-us-divv">
                        <div className="">
                          <img src="./assets/images/contact-vector.png" alt="contact_image" className='img-fluid w-90  ' />
                        </div>
                        <div className="contact_us_details mt-5">
                          <div className="d-flex align-items-center mt-3">
                            <div className="contact_icon">
                              <HiMailOpen size={25} />
                            </div>
                            <p className='ml-5'>support@flawlessresume.com</p>
                          </div>
                        </div>
                        <div className="follow_us mt-4">
                          <span className='ml-5'>Follow us on :</span>
                          <img src="./assets/images/facebook.svg" alt="facebook" className='mb-2 pb-1' /> <img src="./assets/images/twitter.svg" alt="twitter" className='mb-2  pb-1' /> <img src="./assets/images/instagram.svg" alt="instagram" className='img-fluid w-100 mb-2 mr-5  pb-1' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className='iframe-div'>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13004069.896900944!2d-104.65611544442767!3d37.27565371492453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sin!4v1663143665778!5m2!1sen!2sin" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </Layout>
  )
}

export default ContantUs