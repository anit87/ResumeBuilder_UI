import React from 'react';
import "./footer.css"
import {GrFacebookOption} from 'react-icons/gr'
import {AiOutlineTwitter,AiFillLinkedin} from 'react-icons/ai';
import {GrMail} from 'react-icons/gr'
import CopyRight from './CopyRight';

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer_content">
          <div className="web_logo">
            <img src="/assets/images/logo-footer.png" alt="logo_footer" />
          </div>
          <div className="footer_links_ ">
            <span>Follow us :
              <a href=""><GrFacebookOption size={25} /></a>
              <a href=""><AiOutlineTwitter size={25} /></a>
              <a href=""><AiFillLinkedin size={25} /></a></span>
          </div>
          <div className="support">
            <a href='mailto:dwhite@flawlessresume.com'> <p> <span> <GrMail size={30} className='icon' /> </span> &nbsp; dwhite@flawlessresume.com</p></a>
          </div>
        </div>
      </div>
      <CopyRight />
    </>
  )
}

export default Footer