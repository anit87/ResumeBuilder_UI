import React, { useRef } from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { adminorderbyid, Adminchatuseraction, Getchatstatusread, GetCData } from '../../../../redux/action/Action';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { apiURL } from '../Api/BaseLine';

const Adminchatdata = (props) => {


    const [chattinguserdata, setChattinguserdata] = useState([])
    const [finalcombinedata, setFinalcombinedata] = useState([])
    const [dataFromParents, setDataFromParents] = useState()

    const messagesEndRef = useRef(null)

    const userid = useParams()

    const adminorderbyidreducerdata = useSelector((state) => state.adminallorderbyidreducer.adminorderallbyid)
    const GetDataAdminSend = useSelector((state) => state.GetCDatareducer.GetCDatadata)
    const chatdatauser = useSelector((state) => state.Adminchatuserreducer.adminchatuserdata)
    const GetFrontNum = useSelector((state) => state.GetFrontChatNumReducer.GetFrontCNum)

    const dispatch = useDispatch();

    if (dataFromParents == 1) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' })
    }

    useEffect(() => {
        if (adminorderbyidreducerdata.length != 0) {
            const datauser = { order_id: adminorderbyidreducerdata[0]?.order_number, customer_id: adminorderbyidreducerdata[0]?.cust_id, admin_id: 0 }
            dispatch(Adminchatuseraction(datauser))
            let chatStatus = setTimeout(() => {
                let data = { order_id: adminorderbyidreducerdata[0]?.order_number, chatting_from_user: 0, chatting_to_user: adminorderbyidreducerdata[0]?.cust_id, chatting_isread: 1 }
                dispatch(Getchatstatusread(data))
            }, 3000)
            return () => {
                clearTimeout(chatStatus)
            }
        }

    }, [adminorderbyidreducerdata])

    useEffect(() => {
        setChattinguserdata(chatdatauser)
    }, [chatdatauser])

    useEffect(() => {
        let timeId = setTimeout(() => {
            const datauser = { order_id: adminorderbyidreducerdata[0]?.order_number, customer_id: adminorderbyidreducerdata[0]?.cust_id, admin_id: 0 }
            dispatch(Adminchatuseraction(datauser))
        }, 3000)
        return () => {
            clearTimeout(timeId)
        }
    }, [chatdatauser])

    useEffect(() => {
        if (typeof chattinguserdata == 'object') {
            chattinguserdata.sort((a, b) => a?.chatting_created_at?.localeCompare(b?.chatting_created_at));
            setFinalcombinedata(chattinguserdata)
        }

    }, [chattinguserdata])

    useEffect(() => {
        dispatch(adminorderbyid(userid.id))
        const mychatTimeout = setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' })
        }, 5000);
        return () => {
            clearTimeout(mychatTimeout)
        }
    }, [])

    useEffect(() => {
        setDataFromParents(GetDataAdminSend);
        const mychatTimeout = setTimeout(() => {
            dispatch(GetCData('0'))
        }, 5000);
        return () => {
            clearTimeout(mychatTimeout)
        }
    }, [GetDataAdminSend])

    return (
        <div className='main-div-chat-data'>
            <div className="line text-center"><p></p></div>
            {typeof finalcombinedata == 'object' ? finalcombinedata?.map((item, index) => {
                return (
                    <div ref={messagesEndRef} id='chatting-content-main-div' key={index} className='chatting-content-main-div' >
                        {item.chatting_from_user != 0 ?
                            <div className="chatting_mg left-chatting_mg" key={item.chatting_id}>
                                <div className="row p-2">
                                    <div className='col-md-2 col-lg-2 inner-msg_div'>
                                        {item?.chatting_from_user == 0 ?
                                            <img src="/assets/images/letter msg.jpg" alt="msg_img" /> :
                                            <img src="/assets/images/user1.jpg" alt="msg_img" />
                                        }
                                    </div>

                                    <div className="msg_div col-md-10 col-lg-10">
                                        <span className='mb-5'>{new Date(`${item.chatting_created_at}`).toLocaleString()}</span>
                                        {item?.chatting_from_user == 0 ?
                                            <h3 className='mt-2'>FLAWLESS RESUME TEAM</h3> :
                                            <h3 className='mt-2'>{item.cust_fname + " " + item.cust_lname}</h3>
                                        }
                                        {
                                            item?.chatting_msg_type == '3' ?
                                                <p className='pb-2'>
                                                    <a href={`${apiURL}/${item.chatting_msg}`} download={`${item.chatting_msg.replace('Chat_Image/', 'Chat_Image/').trim()}`}>
                                                        {/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(item.chatting_msg) ?
                                                            <img src={`${apiURL}/${item.chatting_msg}`} alt='image' /> :
                                                            <>
                                                                <InsertDriveFileIcon />
                                                                {`${item.chatting_msgreplace('Chat_Image/', '').trim()}`}
                                                            </>
                                                        }
                                                    </a>
                                                </p> :
                                                <p className='pb-2' dangerouslySetInnerHTML={{ __html: item.chatting_msg }}></p>
                                        }
                                    </div>
                                </div>

                            </div>
                            :
                            <div className="chatting_mg right-chatting_mg">
                                <div className="row p-2 right-chatting-inner-div">
                                    <div className="msg_div col-md-10 col-lg-10">
                                        <span className='mb-5'>{new Date(`${item.chatting_created_at}`).toLocaleString()}</span>
                                        {
                                            item?.chatting_from_user == 0 ?
                                                <h3 className='mt-2'>FLAWLESS RESUME TEAM</h3> :
                                                <h3 className='mt-2'>{item.cust_fname + " " + item.cust_lname}</h3>
                                        }
                                        {item?.chatting_msg_type == '3' ?
                                            <p className='pb-2'>
                                                <a href={`/${item.chatting_msg.trim()}`} download={`${item.chatting_msg.replace('Chat_Image/', 'Chat_Image/').trim()}`}>
                                                    {/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(item.chatting_msg) ?
                                                        <img src={`${apiURL}/${item.chatting_msg}`} alt='image' /> :
                                                        <>
                                                            <InsertDriveFileIcon />
                                                            {`${item.chatting_msgreplace('Chat_Image/', '').trim()}`}
                                                        </>
                                                    }
                                                </a>
                                            </p> :
                                            <p className='pb-2' dangerouslySetInnerHTML={{ __html: item.chatting_msg }}></p>
                                        }
                                    </div>
                                    <div className='col-md-2 col-lg-2 inner-msg_div'>
                                        {item?.chatting_from_user == 0 ?
                                            <img src="/assets/images/letter msg.jpg" alt="msg_img" /> :
                                            <img src="/assets/images/user1.jpg" alt="msg_img" />
                                        }
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                )
            }) : null}

        </div>
    )
}

export default Adminchatdata