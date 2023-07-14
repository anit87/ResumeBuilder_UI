import React, {useEffect} from 'react'
import Layout from '../../Layout/Layout';
// import './books.css';
import './OurProcess.css'
import { VscCircleFilled } from 'react-icons/vsc';
import MiniNav from '../MiniNav/MiniNav';



const ourProcessData = [
    {
        id: 1,
        para: 'Send Your Resume /Complete online Form / Send Job Posting'
    },
    {
        id: 2,
        para: 'Speak with Resume Writer'
    },
    {
        id: 3,
        para: 'Select your Resume Template'
    },
    {
        id: 4,
        para: 'Receive resume draft'
    },
    {
        id: 5,
        para: 'Revise until perfect'
    },
    {
        id: 6,
        para: 'Final resume delivered in MS Word and PDF'
    },


]
const OurProcess = () => {
    return (
        <Layout >
            <div className="padding_div">
            <div className="flewless ourProcessComponent">
                <div className="row">
                    <div className="about_content">

                    <MiniNav NavData={['process','Our Process']} />
                        <div className="review_main_heading pb-5 mb-4">
                            <h2 className='our_process_heading mt-4'>
                                Our Process
                            </h2>
                        </div>
                        <div className="our_process_img pb-5">
                            <img src="/assets/images/PROCESSINFO.jpg" alt="our_process" />
                        </div>
                        <div className="our_process_content">
                            <div className="container mb-5">
                                {ourProcessData.map((elem)=>{
                                  return(
                                    <div className="our_process_paras my-our-process-paras" key={elem.id}>
                                    <VscCircleFilled size={20} className="process_icon"/>
                                    <p>{elem.para}</p>
                                </div>
                                  )
                                })}
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </Layout>
    )
}

export default OurProcess