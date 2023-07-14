import React, { useMemo, useState } from 'react'
import './chatting.css';
import MiniNav from '../MiniNav/MiniNav';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import { useEffect } from 'react';
import Layout from '../../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { adminorderbyid, zoomaction, zoomapiaction, GetAdminMsg, Getchatlinkimagesfile, GetchatFile, GetchatLink } from '../../redux/action/Action';
import { useNavigate, useParams } from 'react-router-dom';
import Loom from '../../components/Loom/loom';
import SendMessage from './sendMessage';
import GetChat from './getChat';



const Chatting = () => {
    const [textAreaData, setTextAreaData] = useState('')
    const [textBoldItalic, setTextBoldItalic] = useState('')
    const [zoomjoinurl, setZoomjoinurl] = useState()
    const [chattingData, setChattingData] = useState()
    const [time, setTime] = useState(Date.now());
    const navigate = useNavigate();


    const adminorderbyidreducerdata = useSelector((state) => state.adminallorderbyidreducer.adminorderallbyid)

    let zoomtokendatadata = useSelector((state) => state.zoomtoken.zoomtokenno)

    let zoomurlmeeting = useSelector((state) => state.zoommeetingurl.zoomurl)

    const chatlinkimagealldata = useSelector((state) => state.Adminchatlinkimagereducer.adminchatlinkimagedata)

    const chatFilesAlldata = useSelector((state) => state.ChatFilereducer.chatFiledata)
    const chatLinksAlldata = useSelector((state) => state.ChatLinksReducer.chatLinkData)
    // console.log("chatLinksAlldata",chatLinksAlldata)
    // const chatFilesAlldata = useSelector((state)=>console.log('state data is', state))

    //  const GetChat =  useMemo(import GetChat from './getChat');
    // console.log("chatFilesAlldata",chatFilesAlldata)
    // console.log("adminorderbyidreducerdata",adminorderbyidreducerdata)

    const userid = useParams()
    const feact1 = userid.id;
    const feact = feact1.replace("Y2F0ZWdvcnk9d", "")
    const feact2 = feact.trim() / 45;
    const dispatch = useDispatch()

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const zoomredirect = (URL) => {
        // console.log("URL",URL)
        window.open(`${URL}`, '_blank', 'noopener,noreferrer');
        // window.location.replace(`${URL}`)
    }

    useEffect(() => {
        if (textAreaData.length === 0) {
            setTextBoldItalic('')
        }

    })
    useEffect(() => {
        dispatch(adminorderbyid(feact2))
    }, [])

    useEffect(() => {
        dispatch(zoomaction())
    }, [])

    useEffect(() => {
        if (zoomtokendatadata != null)
            dispatch(zoomapiaction(zoomtokendatadata?.access_token))
    }, [zoomtokendatadata])

    useEffect(() => {
        if (zoomurlmeeting != null)
            setZoomjoinurl(zoomurlmeeting[0]?.join_url)
    }, [zoomurlmeeting])

    useEffect(() => {
        // let id = adminorderbyidreducerdata[0]?.order_number
        // dispatch(Getchatlinkimagesfile(id))
        let timeId = setTimeout(() => {
            let Data = { order_id: adminorderbyidreducerdata[0]?.order_number, customer_id: '0' }
            dispatch(GetAdminMsg(Data));
        }, 3000)
        return () => {
            clearTimeout(timeId)
        }
    }, [adminorderbyidreducerdata])

    useEffect(() => {
        let timeId = setInterval(() => {
            let id = adminorderbyidreducerdata[0]?.order_number
            dispatch(Getchatlinkimagesfile(id));
            dispatch(GetchatFile(id));
            dispatch(GetchatLink(id));
        }, 2000)
        return () => {
            clearInterval(timeId)
        }

    }, [adminorderbyidreducerdata])

    const ToOrderDetail = ()=>{
        navigate(`/orderdetail/${feact1}`)
    }
    // console.log("id is", feact2)

    return (
        <Layout>
            <div className="padding_div">
                <div className='chatting-mini-div'>
                    <MiniNav NavData={['review', 'Review']} />
                </div>

                <div className='chatting'>
                    <div className="container-fluid">
                        {/* <MiniNav /> */}

                        <div className="communication_text text-center mb-5 mt-3">
                            <h4>Communicate with us via <span> Zoom Video calls </span> and <span> Loom Recordings.</span></h4>
                        </div>

                        <div className="row">
                            <div className="chatting_main col-md-12 col-lg-8 col-xl-8 col-xxl-9">
                                <div className="chatting_left_side">
                                    <div className=" d-flex meeting_record chatting-border-div">

                                        <div className="  d-flex align-items-center  auth_icon_text text-color me-5">
                                            <div className=" auth_icon me-2">
                                                <button onClick={() => zoomredirect(zoomjoinurl)}>
                                                    <BsFillCameraVideoFill className='connectIcon' size={13} /></button>
                                            </div>
                                            <span> Schedule a meeting</span>
                                        </div>
                                        <div className="  d-flex align-items-center auth_icon_text text-color">
                                            <div className="me-2 auth_icon">
                                                {/* <SiLoom className='connectIcon' size={13} /> */}
                                                <Loom />
                                            </div>
                                            <span>Record with Loom</span>
                                        </div>
                                    </div>
                                    <div className="chatting_resume chatting-border-div">
                                        <h3>Flawless Resume Team</h3>
                                    </div>
                                    <div className="chatting_avatar chatting-border-div">
                                        <h3 style={{display:'flex'}} >Order : <p style={{cursor:'pointer'}} onClick={()=>ToOrderDetail()}>#{adminorderbyidreducerdata[0]?.order_number}</p> - Name : {adminorderbyidreducerdata[0]?.cust_fname + " " + adminorderbyidreducerdata[0]?.cust_lname}</h3>
                                    </div>
                                    <div className="chatting_resume chatting-border-div p-0">
                                        <GetChat feact2={feact2} />
                                        <div className="text-editor">

                                        </div>

                                        <div className="text_field">
                                            <div className="">
                                                <SendMessage feact2={feact2} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" col-md-12 col-lg-4 col-xl-4 col-xxl-3 chatting_links chatting-border-div">
                                <div className="chatting_content my-chatting-content">
                                    <h4 className=''>
                                        {/* <IoIosArrowBack /> */}
                                     Files & Links</h4>
                                    {/* <form className="search mb-2">
                                        <input type="text" placeholder='Search here....' />
                                        <button type="submit"><AiOutlineSearch size={20} /></button>
                                    </form> */}

                                    <div className="  chatting-tabs">
                                        {/* <ul className="nav nav-pills mb-3 d-flex justify-content-between" id="pills-tab" role="tablist"> */}
                                        <ul className="nav nav-pills mb-3 d-flex" id="pills-tab" role="tablist">
                                            <li className="nav-item " role="presentation">
                                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" >All</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" >Files</button>
                                            </li>
                                            {/* <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Links</button>
                                            </li> */}
                                        </ul>
                                    </div>
                                    <div className="chatting_files">
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                                                {chatlinkimagealldata == '' ? <div className='tab-no-content'><p>No Data Available</p></div>
                                                    :
                                                    <ul className="sidebar-div p-0">
                                                        {chatlinkimagealldata?.map((items, index) => {

                                                            let ItemsdateIs = new Date(items.chatting_created_at);
                                                            let dayName = days[ItemsdateIs.getDay()];
                                                            return (
                                                                items?.fileData?.map((childItems, childIndex) => {
                                                                    return (
                                                                        <li key={childIndex}>
                                                                            <div className="my-sidebar-box sidebar-box d-flex ">
                                                                                <div className="side-img">
                                                                                    <img src="/assets/images/chat.jpg" alt="" />
                                                                                </div>
                                                                                <div className="sidebar-text">
                                                                                    {/* <p>Chat Flawless Resume</p> */}
                                                                                    {/* <p>{childItems.replace('Chat_Data/', '')}</p> */}
                                                                                    <p className='tab-text'> <a href={`/${childItems.trim()}`} download={`${childItems.replace('Chat_Data/', '').trim()}`}>{childItems.replace('Chat_Data/', '')}</a></p>
                                                                                </div>
                                                                                <div className="sidebar-memory">
                                                                                    {/* <p>227.00 KB</p> */}
                                                                                    <p>{items.chatting_created_at.slice(2, 11)}</p>
                                                                                    {/* <p>Monday</p> */}
                                                                                    <p>{dayName}</p>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })
                                                            )
                                                        })
                                                        }
                                                    </ul>
                                                }
                                            </div>
                                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                                {/* <p>No Data</p>  */}
                                                {chatFilesAlldata == undefined || chatFilesAlldata == '' ? <div className='tab-no-content'><p>No Data Available</p></div>
                                                    :
                                                    <ul className="sidebar-div p-0">
                                                        {chatFilesAlldata?.map((items, index) => {

                                                            let ItemsdateIs = new Date(items.chatting_created_at);
                                                            let dayName = days[ItemsdateIs.getDay()];
                                                            return (
                                                                items?.fileData?.map((childItems, childIndex) => {
                                                                    return (
                                                                        <li key={childIndex}>
                                                                            <div className="my-sidebar-box sidebar-box d-flex ">
                                                                                <div className="side-img">
                                                                                    <img src="/assets/images/chat.jpg" alt="" />
                                                                                </div>
                                                                                <div className="sidebar-text">
                                                                                    {/* <p>Chat Flawless Resume</p> */}
                                                                                    {/* <p>{childItems.replace('Chat_Data/', '')}</p> */}
                                                                                    <p className='tab-text'> <a href={`/${childItems.trim()}`} download={`${childItems.replace('Chat_Data/', '').trim()}`}>{childItems.replace('Chat_Data/', '')}</a></p>
                                                                                </div>
                                                                                <div className="sidebar-memory">
                                                                                    {/* <p>227.00 KB</p> */}
                                                                                    <p>{items.chatting_created_at.slice(2, 11)}</p>
                                                                                    {/* <p>Monday</p> */}
                                                                                    <p>{dayName}</p>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })
                                                            )
                                                        })
                                                        }
                                                    </ul>
                                                }
                                            </div>
                                            {/* <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                                <p>No Data</p>
                                            </div> */}
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

export default Chatting