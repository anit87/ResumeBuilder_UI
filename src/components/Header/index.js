import React from 'react'
import './Header.css'
import { AiOutlineIdcard, AiFillWechat } from 'react-icons/ai'
import { FaHandshake } from 'react-icons/fa'
// import {AiFillWechat} 

const Header = () => {
    return (
        <>
        <div className="padding_div">
        <div className="header_content">
            <div className="header_text text-center">
                <h1>Resume Writing Service </h1>
            </div>
            <div className="main_header">
                <div className="container-fluid" id='container_width'>
                  
                        <div className="parent_header">
                        <div className="row">
                            <div className="header_text col-sm-12 col-md-12 col-lg-4 col-xl-4">
                                <h3 className='animated bounceInLeft'>First impression  is <br /> everything</h3>
                                <h5 className='animated bounceInRight mt-3'>Get a Flawless Resume 
                                    and <br /> land that JOB!
                                    </h5>
                            </div>
                            <div className="header__img animated bounceInRight  col-sm-12 col-md-12 col-lg-8 col-xl-8">
                                <img src="./assets/images/ban.png" alt="" className='img-fluid'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header_extra ">
                <div className="container ">
                    <div className="exter-text align-text-bottom">
                        <div className="row">
                        <div className="team_card col-12 col-sm-12  col-md-12 col-lg-4 " >
                            <div className="icons" >
                                <AiOutlineIdcard size='40px' />
                            </div>
                            <p>Leading industry experts</p>
                        </div>
                        <div className="team_card col-12 col-sm-12  col-md-12 col-lg-4">
                            <div className="icons" >
                                <FaHandshake size='40px' />
                            </div>
                            <p>Formatted for success</p>
                        </div>
                        <div className="team_card col-12 col-sm-12 col-md-12 col-lg-4">
                            <div className="icons" >
                                <AiFillWechat size='40px' />
                            </div>
                            <p className='ml-1'>Exclusive resume designs that are proven to get job interviews</p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Header




