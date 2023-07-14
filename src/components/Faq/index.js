import React, { useState, useEffect } from 'react';
import './faq.css';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import Layout from '../../Layout/Layout';
import accodionData from '../api/Accodions'
import MiniNav from '../MiniNav/MiniNav';
import { useSelector, useDispatch } from 'react-redux'
import { allactiveFaqData } from '../../redux/action/Action'
import Loadingspinner from '../Books/Loadingspinner';



const Faq = () => {
  const [isFaqOpne, setisFaqOpen] = useState(false)
  const [firstFaqOpen, setfirstFaqOpen] = useState(0);
  const [loading, setLoading] = useState(false)

  const getFaqData = useSelector((state) => state.GetactiveFaqDataReducer.FaqAllactiveData)
  const dispatch = useDispatch()

  //  console.log("getFaqData",getFaqData)

  const handleAccodion = (i) => {
    if (isFaqOpne === i) {
      return setisFaqOpen(null)
    }
    setisFaqOpen(i)

  }
  useEffect(() => {
    dispatch(allactiveFaqData())
  }, [])

  useEffect(() => {
    if (getFaqData.length != 0) {
      setLoading(false)
    }
    else {
      setLoading(true)
    }
  }, [getFaqData])
  console.log("getFaqData", getFaqData);
  return (
    <Layout>
      <div className="padding_div">
        <div className="flewless bg-light faq">
          <div className="row">
            <div className="about_content">

              <MiniNav NavData={['faq', 'FAQ']} />
              <div className="container-fluid">
                <div className="review_main_heading faq_heading">
                  <h2>
                    frequently asked questions
                  </h2>
                </div>
                <div className="row">
                  <div className='col-sm-12 col-md-12 col-lg-12 col-xl-6 mt-4 '>
                    {loading ? <Loadingspinner /> : null}

                    {getFaqData.map((elems, i) => {
                      return (
                        <div className='  accodion mt-4' key={elems.faq_id} >
                          <div className="accodion_border" >
                            <div className="accodion_content" onClick={() => handleAccodion(i)} >
                              <h3 style={{ color: isFaqOpne === i ? 'var(--orange)' : null, }}>{elems.faq_title}</h3>
                              {isFaqOpne === i ? <span><FaMinusCircle size={27} style={{ color: isFaqOpne === i ? 'var(--orange)' : null }} /></span> : <span><FaPlusCircle size={27} /></span>}
                            </div>
                            <div className={isFaqOpne === i ? 'faqheightpara' : 'faqpara'}>{isFaqOpne === i ? <p dangerouslySetInnerHTML={{ __html: elems.faq_description }}></p> : null}</div>
                          </div>
                        </div>
                      )
                    })}



                    {/* <div className='  accodion mt-4' key={"1"} >
                        <div className="accodion_border" >
                          <div className="accodion_content"  onClick={() => handleAccodion(1)} >
                            <h3 style={{ color: isFaqOpne === 1 ? 'var(--orange)' : null, }}>What is Lorem Ipsum?</h3>
                            {isFaqOpne === 1 ? <span><FaMinusCircle size={27} style={{ color: isFaqOpne === 1 ? 'var(--orange)' : null }} /></span> : <span><FaPlusCircle size={27} /></span>}
                          </div>
                          <p>{isFaqOpne === 1 ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," : null}</p>
                        </div>
                      </div>
                      <div className='  accodion mt-4' key={"2"} >
                        <div className="accodion_border" >
                          <div className="accodion_content"  onClick={() => handleAccodion(2)} >
                            <h3 style={{ color: isFaqOpne === 2 ? 'var(--orange)' : null, }}>What is Lorem Ipsum?</h3>
                            {isFaqOpne === 2 ? <span><FaMinusCircle size={27} style={{ color: isFaqOpne === 2 ? 'var(--orange)' : null }} /></span> : <span><FaPlusCircle size={27} /></span>}
                          </div>
                          <p>{isFaqOpne === 2 ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," : null}</p>
                        </div>
                      </div>
                      <div className='  accodion mt-4' key={"3"} >
                        <div className="accodion_border" >
                          <div className="accodion_content"  onClick={() => handleAccodion(3)} >
                            <h3 style={{ color: isFaqOpne === 3 ? 'var(--orange)' : null, }}>What is Lorem Ipsum?</h3>
                            {isFaqOpne === 3 ? <span><FaMinusCircle size={27} style={{ color: isFaqOpne === 3 ? 'var(--orange)' : null }} /></span> : <span><FaPlusCircle size={27} /></span>}
                          </div>
                          <p>{isFaqOpne === 3 ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," : null}</p>
                        </div>
                      </div>
                      <div className='  accodion mt-4' key={"4"} >
                        <div className="accodion_border" >
                          <div className="accodion_content"  onClick={() => handleAccodion(4)} >
                            <h3 style={{ color: isFaqOpne === 4 ? 'var(--orange)' : null, }}>What is Lorem Ipsum?</h3>
                            {isFaqOpne === 4 ? <span><FaMinusCircle size={27} style={{ color: isFaqOpne === 4 ? 'var(--orange)' : null }} /></span> : <span><FaPlusCircle size={27} /></span>}
                          </div>
                          <p>{isFaqOpne === 4 ? "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," : null}</p>
                        </div>
                      </div> */}





                  </div>
                  <div className="col-sm-12 col-md-12 col-lg-12 col-xl-6 faq_img">
                    <img src="./assets/images/faq.png" alt="faq_img" className='img-fluid w-100' />
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

export default Faq;