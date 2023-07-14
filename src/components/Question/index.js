import React, { useState } from 'react';
import Layout from '../../Layout/Layout';
import MiniNav from '../MiniNav/MiniNav';
import './Question.css';
import { HiOutlineArrowNarrowRight, HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { FiSave } from 'react-icons/fi';
import axios from 'axios'

import {AiOutlineFolderOpen} from 'react-icons/ai';
import { useEffect } from 'react';

const Question = () => {
  const [nextComp, setNextComp] = useState(1)
  const [ResumeExisting, setResumeExisting] = useState(false)
  const [isResumeExisting, setIsResumeExisting] = useState(false)
  const [showUpdatedSummary, setShowUpdateSummary] = useState(false)
  const [share, setShare] = useState(false)
  const [IsresumeUpdate, setIsResumeUpdated] = useState(false)



  const handleResume = (data) => {
    if (data === 'resumeExist') {
      setIsResumeExisting(false)
      setResumeExisting(true)
    } else if (data === 'resumeNotExist') {
      setResumeExisting(false)
      setIsResumeExisting(true)
    } else if (data === 'updated') {
      setIsResumeUpdated(false)
      setShowUpdateSummary(true)
    } else if (data === 'isUpdate?') {
      setShowUpdateSummary(false)
      setIsResumeUpdated(true)
    } else if (data === 'share') {
      setShare(true)
    } else if (data === 'notShare') {
      setNextComp(4)
    } else if (data === 'next') {
      setNextComp(nextComp + 1)
    }
    else if (data === 'prev') {
      setNextComp(nextComp - 1)
    }
  }


  // const fetchData = async() =>{
   
  //   console.log('req',req)

  // }
  // useEffect(()=>{
  //   fetchData()
  // })
  const firstQuestion = () => {
    return (
      <div className="question_component">
        <div className="question_main">
          <div className="row">
            <div className="col-md-12 col-lg-9">
              <h2 >Do you have an existing resume?</h2>
            </div>
            <div className="col-md-12 col-lg-3 d-flex align-items-center justify-content-end button_div_question">
              <button className={ResumeExisting ? 'question_yes_btn question_yes_active me-3' : 'question_yes_btn me-3'} onClick={() => handleResume('resumeExist')} >Yes</button>
              <button className={isResumeExisting ? 'question_btn_active question_no_btn ' : 'question_no_btn'} onClick={() => handleResume('resumeNotExist')} >No</button>
            </div>
          </div>
        </div>
        {ResumeExisting && <div className="pt-5">
          <label htmlFor="formFile" className="form-label">Click "Choose File" button to upload a file:</label>
          <input className="form-control " type="file" id="formFile" />
        </div>}
        {isResumeExisting && <div className="resume_summary mt-5">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam quod exercitationem laborum accusamus repellat atque perspiciatis repellendus laudantium blanditiis? Quidem, est. Blanditiis laborum ipsam repellat. Vitae vel eveniet nesciunt, quos expedita officiis tenetur numquam nihil dolore. Tempora, mollitia ducimus. Optio, odit. Voluptatem nemo quos repellendus dolorum accusantium, sequi praesentium sit!</p>
        </div>}
      </div>

    )
  }
  const secondQuestion = () => {
    return (
      <div className="question_component">
        <div className="question_main">
          <div className="row">
            <div className="col-md-12 col-lg-9">
              <h2 >Is the resume that was uploaded fully updated with all jobs?</h2>
            </div>
            <div className="col-md-12 col-lg-3 d-flex align-items-center justify-content-end button_div_question">
              <button className={showUpdatedSummary ? 'question_yes_btn question_yes_active me-3' : 'question_yes_btn me-3'} onClick={() => handleResume('updated')}>Yes</button>
              <button className={IsresumeUpdate ? 'question_btn_active question_no_btn ' : 'question_no_btn'} onClick={() => handleResume('isUpdate?')}>No</button>
            </div>
          </div>
        </div>
        {IsresumeUpdate && <div className="question_textarea">
          <div className="mt-5 mt-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Please tell use about other jobs not listed</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="8" placeholder='Please tell use about other jobs not listed'></textarea>
          </div>
        </div>}
        {showUpdatedSummary && <div className="resume_summary mt-5">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam quod exercitationem laborum accusamus repellat atque perspiciatis repellendus laudantium blanditiis? Quidem, est. Blanditiis laborum ipsam repellat. Vitae vel eveniet nesciunt, quos expedita officiis tenetur numquam nihil dolore. Tempora, mollitia ducimus. Optio, odit. Voluptatem nemo quos repellendus dolorum accusantium, sequi praesentium sit!</p>
        </div>}
      </div>

    )
  }
  const thirdQuestion = () => {
    return (
      <div className="question_component">
        <div className="share_addition">
          <div className="question_main">
            <div className="row">
              <div className="col-md-12 col-lg-9">
                <h2 >Is there any other additional info you would like to share?</h2>
              </div>
              <div className="col-md-12 col-lg-3 d-flex align-items-center justify-content-end button_div_question">
                <button className={share ? 'question_yes_btn question_yes_active me-3' : 'question_yes_btn me-3'} onClick={() => handleResume('share')}>Yes</button>
                <button className='question_no_btn' onClick={() => handleResume('notShare')}>No</button>
              </div>
            </div>
          </div>
          {share &&
            <>
              <div className="question_textarea">
                <div className="mt-5 mb-3">
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="8" placeholder='Is there any other additional info you would like to share?'></textarea>
                </div>
              </div>
              <div className="question_share_btn">
                <button className='btn btn-info '>Submit</button>
              </div>
            </>}
        </div>
      </div>

    )
  }
  const FourthQuestion = () => {
    return (

      <div className="share_addition">
        <div className="question_main">
          <div className="row">
            <div className="col-md-12 col-lg-9">
              <h2 >Please provide at least 1 job posting you have applied for?</h2>
            </div>
            {/* <div className="col-md-3 col-lg-3 d-flex align-items-center justify-content-end ">
              <button className='question_yes_btn me-3' >Yes</button>
              <button className='question_no_btn'>No</button>
            </div> */}
          </div>
        </div>
        <div className="question_textarea">
          <div className="mt-5 mb-3">
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="8" placeholder='Is there any other additional info you would like to share?'></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Click "Choose File" button to upload a file:</label>
            <input className="form-control question_input" type="file" id="formFile" />
          </div>
        </div>
        <div className="question_share_btn">
          <button className='btn btn-info'>Submit</button>
        </div>
      </div>
    )
  }
  return (
    <Layout>
      <div className='padding_div'>
      <div className="question">
        <MiniNav NavData={['', '']} />
        <div className="main_question_component">
          <div className="container">
            {nextComp === 1 && firstQuestion()}
            {nextComp === 2 && secondQuestion()}
            {nextComp === 3 && thirdQuestion()}
            {nextComp === 4 && FourthQuestion()}
            {nextComp > 1 && <button className="btn stepper_back  me-3 mt-3" type="submit" onClick={() => handleResume('prev')}><HiOutlineArrowNarrowLeft size={20} className='stepIcon' /> Back</button>}
            {nextComp === 4 ? '' : <button className="btn stepper_next mt-3" type="submit" onClick={() => handleResume('next')}>Next <HiOutlineArrowNarrowRight size={20} className='stepIcon' /></button>}

            {nextComp === 4 ? <button className="btn stepper_save mt-3" type="submit">Save <FiSave size={20} className='stepIcon' /> </button> : null}
          </div>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default Question