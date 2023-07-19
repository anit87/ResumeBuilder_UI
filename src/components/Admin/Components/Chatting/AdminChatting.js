import React, { useState } from 'react'
import { makeStyles } from '@mui/styles';
import '../../../chatting/chatting.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminorderbyid, GetchatFile, Getchatlinkimagesfile, GetchatLink } from '../../../../redux/action/Action';
import { useNavigate, useParams } from 'react-router-dom';
import AdminsendMessage from './AdminsendMessage';
import Layout from '../../Pages/Layout';
import Adminchatdata from './Adminchatdata';
import { apiURL } from '../Api/BaseLine';

const useStyle = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(10),
        width: '100%',
    },
    table: {
        margin: 'auto',

    },
    edit_btn: {
        color: '#44449b'
    },
    delete_btn: {
        color: '#d0989b'

    },
    chat_btn: {
        color: '#d0989b'

    },
}))

const AdminChatting = () => {

    const [textAreaData, setTextAreaData] = useState('')
    const [textBoldItalic, setTextBoldItalic] = useState('')

    const toggleState = useSelector((state) => state.togglingReducer.togglingAll)
    const classes = useStyle()

    const adminorderbyidreducerdata = useSelector((state) => state.adminallorderbyidreducer.adminorderallbyid)
    const chatlinkimagealldata = useSelector((state) => state.Adminchatlinkimagereducer.adminchatlinkimagedata)
    const chatFilesAlldata = useSelector((state) => state.ChatFilereducer.chatFiledata)
    const chatLinksAlldata = useSelector((state) => state.ChatLinksReducer.chatLinkData)


    const chatdatauser = useSelector((state) => state.Adminchatuserreducer.adminchatuserdata)

    // console.log("chatFilesAlldata", chatFilesAlldata);

    const userid = useParams()
    const dispatch = useDispatch()
    const Navigate = useNavigate()

    const goBack = () => {
        Navigate(`/admin/orderinfo/${userid.id}`)
    }

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];



    useEffect(() => {
        if (textAreaData.length === 0) {
            setTextBoldItalic('')
        }

    })
    useEffect(() => {
        dispatch(adminorderbyid(userid.id))
    }, [])

    useEffect(() => {
        let timeId = setInterval(() => {
            let id = adminorderbyidreducerdata[0]?.order_number
            dispatch(Getchatlinkimagesfile(id))
            dispatch(GetchatFile(id));
            dispatch(GetchatLink(id));

        }, 3000)
        return () => {
            clearInterval(timeId)
        }
    }, [adminorderbyidreducerdata])

    return (
        <>
            <Layout>
                <div className={classes.root} >
                    <div style={{ position: 'absolute', right: 0, left: toggleState ? 300 : 0, width: toggleState ? '77%' : '95%', transition: '.3s all', margin: 'auto' }}>
                        <div className='chatting adminchatting'>

                            <div className="container-fluid">
                                <div className="row">
                                    <div className={toggleState ? `chatting_main col-md-12 col-lg-8 col-xl-8 col-xxl-8` : `chatting_main col-md-12 col-lg-8 col-xl-8 col-xxl-9`}>

                                        <div className="chatting_left_side">
                                            <div className="chatting_resume admin-chatting_resume chatting-border-div">
                                                <h3>Flawless Resume Team</h3>
                                            </div>
                                            <div className="chatting_avatar chatting-border-div">
                                                <h3 style={{ cursor: 'pointer' }} onClick={goBack}>Order : #{adminorderbyidreducerdata[0]?.order_number} - Name : {adminorderbyidreducerdata[0]?.cust_fname + " " + adminorderbyidreducerdata[0]?.cust_lname}</h3>
                                            </div>
                                            <div className="chatting_resume chatting-border-div p-0">
                                                <Adminchatdata />
                                                <div className="text-editor">
                                                </div>

                                                <div className="text_field">
                                                    <div className="">
                                                        <AdminsendMessage id={userid.id} CustomerId={adminorderbyidreducerdata[0]?.cust_id} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={toggleState ? `col-md-12 col-lg-4 col-xl-4 col-xxl-4 chatting_links chatting-border-div` : `col-md-12 col-lg-4 col-xl-4 col-xxl-3 chatting_links chatting-border-div`}>
                                        <div className="chatting_content my-chatting-content">
                                            <h4 className=''>Files & Links</h4>

                                            <div className="chatting-tabs">
                                                <ul className="nav nav-pills mb-3 d-flex " id="pills-tab" role="tablist">
                                                    <li className="nav-item " role="presentation">
                                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" >All</button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Files</button>
                                                    </li>

                                                    {/* <li className="nav-item" role="presentation">
                                                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Links</button>
                                                    </li> */}
                                                </ul>
                                            </div>
                                            <div className="chatting_files">

                                                <div className="tab-content" id="pills-tabContent">
                                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                                        {chatdatauser == '' ? <div className='tab-no-content'><p>No Data Available</p></div>
                                                            :
                                                            <ul className="sidebar-div p-0">
                                                                {chatdatauser?.map((items, index) => {

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
                                                                                    <p className='tab-text'> <a href={`${apiURL}/${items.chatting_msg}`} download={`${items.chatting_msg.replace('Chat_Image/', '').trim()}`}>
                                                                                        {items.chatting_msg.replace('Chat_Image/', '')}</a></p>
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
                                                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                                        {chatLinksAlldata == undefined || chatLinksAlldata == '' ? <div className='tab-no-content'><p>No Data Available</p></div>
                                                            :
                                                            <ul className="sidebar-div p-0">
                                                                {chatLinksAlldata?.map((items, index) => {

                                                                    let ItemsdateIs = new Date(items.chatting_created_at);
                                                                    let dayName = days[ItemsdateIs.getDay()];
                                                                    return (
                                                                        <li key={index}>
                                                                            <div className="my-sidebar-box sidebar-box d-flex ">
                                                                                <div className="side-img">
                                                                                    <img src="/assets/images/chat.jpg" alt="" />
                                                                                </div>
                                                                                <div className="sidebar-text">
                                                                                    <p className='tab-text'> <a href={`${apiURL}/${items.chatting_msg}`} download={`${items.chatting_msg.replace('Chat_Image/', '').trim()}`}>
                                                                                        {items.chatting_msg.replace('Chat_Image/', '')}</a></p>
                                                                                </div>
                                                                                <div className="sidebar-memory">
                                                                                    <p>{items.chatting_created_at.slice(2, 10)}</p>
                                                                                    <p>{"dayName"}</p>
                                                                                </div>
                                                                            </div>
                                                                        </li>

                                                                    )
                                                                })
                                                                }
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
                </div>
            </Layout>
        </>
    )
}

export default AdminChatting