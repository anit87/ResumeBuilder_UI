import React, { useEffect, useRef, useState } from 'react';
import Layout from '../../Layout/Layout';
import './sample.css';
import './Sample_inner.css';
import "react-awesome-lightbox/build/style.css";
import MiniNav from '../MiniNav/MiniNav';
import { NavLink, useParams, useNavigate } from "react-router-dom";
import Innersamplepopup from './Innersamplepopup';



const Sample_inner = () => {
    const navigate = useNavigate();
    const ref = useRef(null);

    const [staticclass, setStaticclass] = useState('')
    const [toggleclass, setToggleclass] = useState('staticclass_hide')
    const [categoryID, setCategoryID] = useState()
    const [imgaesID, setImgaesID] = useState()
    const [popupbolean, setPopupbolean] = useState(false)
    const sampleId = useParams();
    const id = sampleId.id
    const newIdIs = id.substring(0, 1);
    const sampleName = id.substring(1)
    const length = id.length;
    const newName = id.substring(1, length);
    const newNameIs = newName.replace("/", " ");


    const imagezoomfun = (e) => {
        // console.log('zoom funx', e.target)
        let val = 'staticclass' + e.target.id
        setStaticclass(val)
        // console.log("val is", val)
        setCategoryID(e.target.id)
        setImgaesID(e.target.name)
        setPopupbolean(true)

    }

    // useEffect(() => {
    //     // if(popupbolean==true){
    //         window.onclick = function(event) {
    //             console.log("dfknjiuhfeuwhf",event)
    //             if ( ref.current.contains(event.target.id== '123')) {
    //                  console.log(" ia ma abover it")
    //                 //  event.stopPropagation()=true
    //                 setPopupbolean(false)
    //             }
    //           }
    //     // }
        
    // }, [popupbolean])
    

    

    const allsample = (e) => {
        // console.log("sddwd",e.target)
        const newId = e.target.id + "" + e.target.name
        navigate(`/sample_inner/${newId}`)
    }

    const InnerDataisdata = [
        // { id: 1, name: 'Human Resource', images: ['/assets/images/human_resource.jpg', '/assets/images/human_resource1.jpg', '/assets/images/human_resource2.jpg'] },
        { id: 1, name: 'Human Resource', resume: [{id: 1, images:['/assets/images/hrfirst1.jpg' , '/assets/images/hrfirst2.jpg']},{id: 2, images:['/assets/images/hrsecond1.jpg' , '/assets/images/hrsecond2.jpg']}] },
        { id: 2, name: 'Medical%2FBiotech', resume: [{id:1, images:['/assets/images/medical_1.jpg','/assets/images/medical_2.jpg']},{id:2, images:['/assets/images/medicalsecond.jpg']}] },
        { id: 3, name: 'Information Technology', resume: [{id:1, images:['/assets/images/carl1.jpg', '/assets/images/carl2.jpg']}] },
        { id: 4, name: 'Public Relations', resume: [{id:1, images:['/assets/images/public_1.jpg', '/assets/images/public_2.jpg']}] },
        { id: 5, name: 'Geotech%2FSpecialized Fields', resume: [{id:1, images:['/assets/images/geotech_1.jpg', '/assets/images/geotech_2.jpg']}]}, 
                
        { id: 6, name: 'Sales%2FMarketing%2FOperations', resume: [{id:1, images:['/assets/images/mark1.jpg', '/assets/images/mark2.jpg']},{id:2, images:['/assets/images/smith1.jpg', '/assets/images/smith2.jpg']},{id:3, images:['/assets/images/andrew1.jpg', '/assets/images/andrew2.jpg', '/assets/images/andrew3.jpg']}] },
        { id: 7, name: 'Accounting', resume: [{id:1, images:['/assets/images/account.jpg', '/assets/images/account1.jpg']}] },
        {id: 8, name: 'View All Samples', resume: [
            {id: 1, images:['/assets/images/hrfirst1.jpg' , '/assets/images/hrfirst2.jpg']},{id: 2, images:['/assets/images/hrsecond1.jpg' , '/assets/images/hrsecond2.jpg']},
            {id:3, images:['/assets/images/medical_1.jpg','/assets/images/medical_2.jpg']},{id:4, images:['/assets/images/medicalsecond.jpg']},
            {id:5, images:['/assets/images/carl1.jpg', '/assets/images/carl2.jpg']},
            {id:6, images:['/assets/images/public_1.jpg', '/assets/images/public_2.jpg']},
            {id:7, images:['/assets/images/geotech_1.jpg', '/assets/images/geotech_2.jpg']},
            {id:8, images:['/assets/images/mark1.jpg', '/assets/images/mark2.jpg']},{id:9, images:['/assets/images/smith1.jpg', '/assets/images/smith2.jpg']},{id:10, images:['/assets/images/andrew1.jpg', '/assets/images/andrew2.jpg', '/assets/images/andrew3.jpg']},
            {id:11, images:['/assets/images/account.jpg', '/assets/images/account1.jpg']},
            ]}
    ]
    const ToPackageBtn = () => {
        navigate('/package')
    }

    const close_fnx = () =>{
        setPopupbolean(false)

    }

    return (
        <Layout >
            <div className="padding_div">
                <div className="flewless bg-light">
                    <MiniNav NavData={['sample', 'Sample', `sample_inner/${id == newIdIs + 'Medical/Biotech' ? newIdIs + 'Medical%2FBiotech' :
                        id == newIdIs + 'Geotech/Specialized Fields' ? newIdIs + 'Geotech%2FSpecialized%20Fields' :
                            id == newIdIs + 'Sales/Marketing/Operations' ? newIdIs + 'Sales%2FMarketing%2FOperations' : id}`
                        , `${sampleName}`]} />
                    <div className='sample_inner_section_heading'>
                        <h2>{sampleName} Resume Sample</h2>
                    </div>
                    <div className='sample_inner_image_demo_div'>
                        <div className='sample_inner_image_demo'>
                            {InnerDataisdata.map((items) => {
                                return (
                                    items.id == newIdIs ?
                                        items.resume.map((v, index) => {
                                            return (
                                                                <>
                                                                <div key={index} onClick={imagezoomfun}  className={`unique-wrapper`}>
                                                                    <div className='unique-wrapper-div'>
                                                                        <img src={v.images[0]} alt='sample_inner' className='img-fluid' name={v.id} id={items.id} />
                                                                    </div>
                                                                </div>
                                                            </>
                                                         
                                            //     v.images?.map((itemV, itemVIndex)=>{
                                            // console.log("v",itemV)
                                            //         return(
                                            //             <>
                                            //             <div onClick={imagezoomfun}  className={`unique-wrapper ${staticclass}${itemVIndex}`}>
                                            //                 <div className='inner-sample-unique-image'>
                                            //                     <img src={itemV[0]} alt='sample_inner' className='img-fluid' id={itemVIndex} />
                                            //                 </div>
                                            //             </div>
                                            //         </>
                                            //         )
                                            //     })
                                         
                                            )
                                        })

                                        : null
                                )

                            })}
                            {/* <img src='/assets/images/sample_inner.png' alt='sample_inner' className='img-fluid' /> */}
                        </div>
                    </div>
                    <div className='sample_inner_button_div'>
                        <button type="button" onClick={ToPackageBtn} className='btn sample_inner_button'>START YOUR FLAWLESS RESUME</button>
                    </div>
                    {`${sampleName}` != 'View All' ?
                        <div className='other_resume_sample_div'>
                            <div className='other_resume_sample_div_heading'>
                                <h3>Other Resume Samples</h3>
                            </div>
                            <div className='all_other_resume_wrapper'>
                                {InnerDataisdata.map((v, index) => {
                                    // console.log('vv', v.id)
                                    return (
                                        <>
                                        {v.id!=8 ?  v.resume.map((itms, indexs)=>{
                                        //  console.log('itms  are', itms)
                                            return(
                                            <div key={indexs} onClick={allsample} className='all_other_resume'>
                                            <img  src={itms?.images[0]} alt='' name={v.name} id={v.id} className='img-fluid' />
                                        </div>
                                            )
                                        }) : null}
                                        </>
                                       
                                      
                                    )
                                })}

                                {/* <div className='all_other_resume'>
                        <img src='/assets/images/other2.png' alt='' className='img-fluid'/>
                    </div>
                    <div className='all_other_resume'>
                        <img src='/assets/images/other3.png' alt='' className='img-fluid'/>
                    </div>
                    <div className='all_other_resume'>
                        <img src='/assets/images/other4.png' alt='' className='img-fluid'/>
                    </div> */}
                            </div>
                        </div>
                        : ''}

                        { popupbolean &&
                        <div onClick={close_fnx} ref={ref} className='staticclass' id='123'>
                            <div  onClick={(e)=>e.stopPropagation()} className='inner-sample-unique-image'>
                              <Innersamplepopup InnerDataisdata={InnerDataisdata} categoryID={categoryID} imgaesID={imgaesID}/>
                            </div>
                        </div>
                        }
                </div>
            </div>
        </Layout>
    )
}

export default Sample_inner