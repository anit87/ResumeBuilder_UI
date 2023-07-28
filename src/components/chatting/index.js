import React, { useEffect, useState } from 'react'
import './chatting.css';
import MiniNav from '../MiniNav/MiniNav';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { IoIosArrowBack } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import Layout from '../../Layout/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { adminorderbyid, GetAdminMsg, Getchatlinkimagesfile, GetchatFile, GetchatLink, getAllMeets } from '../../redux/action/Action';
import { useNavigate, useParams } from 'react-router-dom';
import Loom from '../../components/Loom/loom';
import SendMessage from './sendMessage';
import GetChat from './getChat';
import { apiURL } from '../../components/Admin/Components/Api/BaseLine';
import ScheduleMeeting from "../zoom/ScheduleMeeting"
import Alert from '../basicComponents/Alert';


const Chatting = () => {
    const navigate = useNavigate();

    const [alert, setAlert] = useState(false);
    const alertfn = () => {
        setTimeout(() => setAlert(true), 100);
    }

    const adminorderbyidreducerdata = useSelector((state) => state.adminallorderbyidreducer.adminorderallbyid)

    const chatlinkimagealldata = useSelector((state) => state.Adminchatlinkimagereducer.adminchatlinkimagedata)

    const chatFilesAlldata = useSelector((state) => state.ChatFilereducer.chatFiledata)
    const chatLinksAlldata = useSelector((state) => state.ChatLinksReducer.chatLinkData)
    const zoomMeetinList = useSelector((state) => state.zoomMeeting.meetingList)

    const zoomMessage = useSelector((state) => state.zoomMeetinReq.message)

    const userid = useParams()
    const feact1 = userid.id;
    const feact = feact1.replace("Y2F0ZWdvcnk9d", "")
    const feact2 = feact.trim() / 45;
    const dispatch = useDispatch()
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        dispatch(adminorderbyid(feact2))
        dispatch(adminorderbyid(feact2))
        dispatch(getAllMeets(feact2))
    }, [])

    useEffect(() => {
        alertfn()
    }, [zoomMessage])


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

    const ToOrderDetail = () => {
        navigate(`/orderdetail/${feact1}`)
    }

    const handleOpen = (setOpen) => {
        setOpen(true)
    }
    console.log("**", zoomMeetinList, " **");
    return (
        <Layout>
            <div className="padding_div">
                <div className='chatting-mini-div'>
                    <MiniNav NavData={['review', 'Review']} />
                </div>
                {zoomMessage &&
                    <Alert
                        open={alert}
                        type={zoomMessage.status !== 200 ? "error" : "info"}
                        msg={zoomMessage.message}
                        onClose={() => setAlert(false)}
                    />
                }

                <div className='chatting'>
                    <div className="container-fluid">
                        <div className="communication_text text-center mb-5 mt-3">
                            <h4>Communicate with us via <span> Zoom Video calls </span> and <span> Loom Recordings.</span></h4>
                        </div>

                        <div className="row">
                            <div className="chatting_main col-md-12 col-lg-8 col-xl-8 col-xxl-9">
                                <div className="chatting_left_side">

                                    <div className=" d-flex meeting_record chatting-border-div">


                                        <div className="d-flex align-items-center  auth_icon_text text-color me-5">
                                            <div className="auth_icon me-2">
                                                <ScheduleMeeting handleOpen={handleOpen} order_id={feact2} />
                                            </div>
                                            <span htmlFor='ScheduleMeeting' > Schedule a meeting</span>
                                        </div>

                                        <div className="d-flex align-items-center auth_icon_text text-color">
                                            <div className="me-2 auth_icon">
                                                <Loom />
                                            </div>
                                            <span>Record with Loom</span>
                                        </div>
                                    </div>
                                    <div className="chatting_resume chatting-border-div">
                                        <h3>Flawless Resume Team</h3>
                                    </div>
                                    <div className="chatting_avatar chatting-border-div">
                                        <h3 style={{ display: 'flex' }} >Order : <p style={{ cursor: 'pointer' }} onClick={() => ToOrderDetail()}>#{`FR${adminorderbyidreducerdata[0]?.order_number}L`}</p> - Name : {adminorderbyidreducerdata[0]?.cust_fname + " " + adminorderbyidreducerdata[0]?.cust_lname}</h3>
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
                                        Files & Links
                                    </h4>

                                    <div className="chatting-tabs">
                                        <ul className="nav nav-pills mb-3 d-flex" id="pills-tab" role="tablist">
                                            <li className="nav-item " role="presentation">
                                                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" >All</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" >Files</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="pills-meeting-tab" data-bs-toggle="pill" data-bs-target="#pills-meeting" type="button" role="tab" aria-controls="pills-meeting" aria-selected="false" >Meetings</button>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="chatting_files">
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

                                                {chatlinkimagealldata === '' ? <div className='tab-no-content'><p>No Data Available</p></div>
                                                    :
                                                    <ul className="sidebar-div p-0">
                                                        {chatlinkimagealldata?.map((items, index) => {

                                                            let ItemsdateIs = new Date(items.chatting_created_at);
                                                            let dayName = days[ItemsdateIs.getDay()];
                                                            return (
                                                                <li key={index}>
                                                                    <div className="my-sidebar-box sidebar-box d-flex ">
                                                                        <div className="side-img">
                                                                            <img src="/assets/images/chat.jpg" alt="" />
                                                                        </div>
                                                                        <div className="sidebar-text">
                                                                            <p className='tab-text'>
                                                                                {items?.chatting_msg_type === '3' ?
                                                                                    <a href={`${apiURL}/${items.chatting_msg}`} download={`${items.chatting_msg.replace('Chat_Image/', '').trim()}`}>
                                                                                        {items.chatting_msg.replace('Chat_Image/', '')}
                                                                                    </a> :
                                                                                    <p dangerouslySetInnerHTML={{ __html: items.chatting_msg }} />
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <div className="sidebar-memory">
                                                                            <p>{items.chatting_created_at.slice(2, 10)}</p>
                                                                            <p>{dayName}</p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })
                                                        }
                                                    </ul>
                                                }
                                            </div>
                                            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                                {chatFilesAlldata == undefined || chatFilesAlldata == '' ? <div className='tab-no-content'><p>No Data Available</p></div>
                                                    :
                                                    <ul className="sidebar-div p-0">
                                                        {chatFilesAlldata?.map((items, index) => {

                                                            let ItemsdateIs = new Date(items.chatting_created_at);
                                                            let dayName = days[ItemsdateIs.getDay()];
                                                            return (
                                                                <li key={index}>
                                                                    <div className="my-sidebar-box sidebar-box d-flex ">
                                                                        <div className="side-img">
                                                                            <img src="/assets/images/chat.jpg" alt="" />
                                                                        </div>
                                                                        <div className="sidebar-text">
                                                                            <p className='tab-text'>
                                                                                <a href={`${apiURL}/${items.chatting_msg}`} download={`${items.chatting_msg.replace('Chat_Image/', '').trim()}`}>
                                                                                    {items.chatting_msg.replace('Chat_Image/', '')}
                                                                                </a>
                                                                            </p>
                                                                        </div>
                                                                        <div className="sidebar-memory">
                                                                            <p>{items.chatting_created_at.slice(2, 10)}</p>
                                                                            <p>{dayName}</p>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })
                                                        }
                                                    </ul>
                                                }
                                            </div>
                                            <div className="tab-pane fade" id="pills-meeting" role="tabpanel" aria-labelledby="pills-meeting-tab">
                                                {!zoomMeetinList ?
                                                    <p>No Data Available</p> :
                                                    <ul className="sidebar-div p-0">
                                                        <table className="table admin-order-table">
                                                            <thead>
                                                                <tr>
                                                                    <th scope="col">S.No</th>
                                                                    <th scope="col">Topic</th>
                                                                    <th scope="col">Time</th>
                                                                    <th scope="col">Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {zoomMeetinList.data.map((item, i) => {
                                                                    const date = new Date(`${item.meetingTime}`)
                                                                    return (
                                                                        <tr key={i}>
                                                                            <td>{i + 1}</td>
                                                                            <td><p>{item.topic}</p></td>
                                                                            <td><p>{date.toLocaleDateString()}<br/>{date.toLocaleTimeString()}</p></td>
                                                                            <td><p>{item.approvedStatus===1? "Approved": "Pending"}</p></td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </ul>
                                                }
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

export default Chatting