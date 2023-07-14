import React, { useState } from 'react';
import Layout from '../../Layout/Layout';
import './sample.css';
import "react-awesome-lightbox/build/style.css";
import Lightbox from "react-awesome-lightbox";
import MiniNav from '../MiniNav/MiniNav';
 import {MdOutlinePersonOutline} from 'react-icons/md' ;
 import {BsThermometerSun} from 'react-icons/bs' ;
 import {AiFillSetting} from 'react-icons/ai' ;
 import {BsPersonPlusFill} from 'react-icons/bs' ;
 import {HiDocument} from 'react-icons/hi' ;
 import {HiOutlineDocumentDuplicate} from 'react-icons/hi' ;
 import { NavLink, useNavigate } from "react-router-dom";



const Sample = () => {

    const navigate = useNavigate();
    const Books_Data = [
        { id:1, name:'Human Resource', URLName:'Human Resource', icon:<MdOutlinePersonOutline/>, classColor:'resume_span_color' },
        { id:2, name:'Medical/Biotech', URLName:'Medical%2FBiotech', icon:<BsThermometerSun/>, classColor:'resume_span_color2' },
        { id:3, name:'Information Technology', URLName:'Information Technology', icon:<AiFillSetting/>, classColor:'resume_span_color3' },
        { id:4, name:'Public Relations', URLName:'Public Relations', icon:<BsPersonPlusFill/>, classColor:'resume_span_color' },
        { id:5, name:'Geotech/Specialized Fields', URLName:'Geotech%2FSpecialized Fields', icon:<HiOutlineDocumentDuplicate/>, classColor:'resume_span_color2' },
        { id:6, name:'Sales/Marketing/Operations', URLName:'Sales%2FMarketing%2FOperations', icon:<HiOutlineDocumentDuplicate/>, classColor:'resume_span_color' },
        { id:7, name:'Accounting', URLName:'Accounting', icon:<HiOutlineDocumentDuplicate/>, classColor:'resume_span_color' },
        { id:8, name:'View All Samples', URLName:'View All ', icon:<HiOutlineDocumentDuplicate/>, classColor:'resume_span_color3' }
    ]

    

    const Sample_inner_fx = (id,name) =>{
        // console.log('id is', id)
        const newId = id+""+name
        navigate(`/sample_inner/${newId}`)
    }
    const ToPackageBtn = () =>{
        navigate('/package')
       }
    return (
        <Layout >
        <div className="padding_div">
            <div className="flewless bg-light">
            <MiniNav NavData={['sample','Sample']} />
            <div className='sample_section'>
                <div className="resume_type_main_div">
                <div className='container'>
                <div className="row">
                    <div className="col-md-12">
                        <div className="resume_main_div">
                        
                            <div className="review_main_heading">
                                <h2>
                                Resume Samples by Industry
                                </h2> 
                            </div>
                            <div className='resume_type'>
                                <ul>
                                    {Books_Data?.map((items, index)=>{
                                        return(
                                            <li key={items.id}>
                                            <div className={`resume_type_list ${items.classColor}`} onClick={()=>Sample_inner_fx(items.id,items.URLName)}>
                                                <span>{items.icon}</span>
                                                <h3 >{items.name}</h3>
                                            </div>
                                        </li>
                                        )
                                    })}
                                    {/* <li> */}
                                        {/* <NavLink to="/sample_inner"> */}
                                        {/* <div className='resume_type_list resume_span_color' onClick={()=>Sample_inner_fx()}>
                                            <span><MdOutlinePersonOutline/></span>
                                            <h3 >Human Resource</h3>
                                        </div> */}
                                        {/* </NavLink> */}
                                    {/* </li> */}
                                    {/* <li>
                                    <NavLink to="/sample_inner">
                                        <div className='resume_type_list resume_span_color2'>
                                            <span><BsThermometerSun/></span>
                                            <h3>Medical/Biotech</h3>
                                        </div>
                                        </NavLink>
                                    </li>
                                    <li>
                                    <NavLink to="/sample_inner">
                                        <div className='resume_type_list resume_span_color3'>
                                            <span><AiFillSetting/></span>
                                            <h3>Information Technology</h3>
                                        </div>
                                        </NavLink>
                                    </li>
                                    <li>
                                    <NavLink to="/sample_inner">
                                        <div className='resume_type_list resume_span_color'>
                                            <span><BsPersonPlusFill/></span>
                                            <h3>Public Relations</h3>
                                        </div>
                                        </NavLink>
                                    </li>
                                    <li>
                                    <NavLink to="/sample_inner">
                                        <div className='resume_type_list resume_span_color2'>
                                            <span><HiOutlineDocumentDuplicate/></span>
                                            <h3>Geotech/Specialized Fields</h3>
                                        </div>
                                        </NavLink>
                                    </li>
                                    <li>
                                    <NavLink to="/sample_inner">
                                        <div className='resume_type_list resume_span_color'>
                                            <span><HiOutlineDocumentDuplicate/></span>
                                            <h3>Sales/Marketing/Operations</h3>
                                        </div>
                                        </NavLink>
                                    </li>
                                    <li>
                                    <NavLink to="/sample_inner">
                                        <div className='resume_type_list resume_span_color'>
                                            <span><HiOutlineDocumentDuplicate/></span>
                                            <h3>Accounting</h3>
                                        </div>
                                        </NavLink>
                                    </li>
                                    <li>
                                    <NavLink to="/sample">
                                        <div className='resume_type_list resume_span_color3'>
                                            <span><HiOutlineDocumentDuplicate/></span>
                                            <h3>View All Samples</h3>
                                        </div>
                                        </NavLink>
                                    </li> */}
                                </ul>
                            </div>
                            <div className='sample_button_div'>
                            <button type="button" className="btn sample_button" onClick={ToPackageBtn} >START YOUR FLAWLESS RESUME</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>    
               <div className='resume_all_sample_main_div'>
                <div className='container_fluid'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='resume_all_sample_img'>
                                <img src="./assets/images/sampleimg.png" alt="" className='img-fluid' />
                            </div>

                        </div>
                        <div className='col-md-6'>
                            <div className='resume_all_sample_text_div'>
                            <div className='resume_all_sample_text'>
                                <h4>No Experience?</h4>
                                <h4>Entry Level?</h4>
                                <h4>Military Experience?</h4>
                                <h4>Changing Industries?</h4>
                                <h4>Or not sure how to make your resume "shout" look at me?</h4>
                                <p>Resume writers, by training, know the nitty-gritty of what 
                                employers need.</p>
                                <p>With this knowledge, we  highlight your strengths and help build a strong resume.</p> 
                                <p>Flawless Resume can help transform your resume into the compelling story that recruiters love. </p>
                                 <p>Our resumes get you <span>INTERVIEWED!</span></p>
                            </div>
                            <div className='all_sample_button_div '>
                                <button type="button" className="btn sample_button" onClick={ToPackageBtn} >START YOUR FLAWLESS RESUME</button>
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

export default Sample