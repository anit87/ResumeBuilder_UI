import React, {useEffect, useRef, useState} from 'react'
import './chatting.css';
import { GetAdminMsg, adminorderbyid,Adminchatuseraction,Getchatstatusread,Getchatlinkimagesfile, GetCData} from '../../redux/action/Action';
import { useDispatch, useSelector } from 'react-redux';
import Loadingspinner from '../Books/Loadingspinner';
import { useParams } from 'react-router-dom';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';


const GetChat = (props) => {
    

    const [chattingdata, setChattingdata] = useState([])
    const [chattinguserdata, setChattinguserdata] = useState([])
    const [combinedata, setCombinedata] = useState([])
    const [finalcombinedata, setFinalcombinedata] = useState("")
    const [loading, setLoading] = useState(true)
    const [dataFromParents, setDataFromParents] = useState()

    const messagesEndRef = useRef(null)

    const userid = useParams()
    const feact1 = userid.id;
    const feact = feact1.replace("Y2F0ZWdvcnk9d", "")
    const feact2 = feact.trim() / 45;

    const adminorderbyidreducerdata = useSelector((state) => state.adminallorderbyidreducer.adminorderallbyid)
    const GetDataAdminSend          = useSelector((state) => state.GetCDatareducer.GetCDatadata)
    const GetAllChattingData        = useSelector((state) => state.Adminchatlinkimagereducer.adminchatlinkimagedata)

    const chatdatauser = useSelector((state) => state.Adminchatuserreducer.adminchatuserdata)

    // console.log("GetDataAdminSend FrontEnd",GetDataAdminSend)
    // console.log("GetAllChattingData:",GetAllChattingData)
    const dispatch = useDispatch();

    if(dataFromParents ==1){
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' })
    }

    useEffect(() => {
        if (adminorderbyidreducerdata.length != 0) {
            //     const data = {order_id:adminorderbyidreducerdata[0]?.order_number,customer_id:0}
            // dispatch(Adminchataction(data))
            // const datauser = {order_id:adminorderbyidreducerdata[0]?.order_number,customer_id:adminorderbyidreducerdata[0]?.cust_id}
            // dispatch(Adminchatuseraction(datauser))
            const datauser = { order_id: adminorderbyidreducerdata[0]?.order_number, customer_id: adminorderbyidreducerdata[0]?.cust_id, admin_id: 0 }
            dispatch(Adminchatuseraction(datauser))
            let chatStatus = setTimeout(() => {
                let data = { order_id: adminorderbyidreducerdata[0]?.order_number, chatting_from_user: adminorderbyidreducerdata[0]?.cust_id, chatting_to_user: 0, chatting_isread: 1 }
                dispatch(Getchatstatusread(data))
            }, 3000)
            return () => {
                clearTimeout(chatStatus)
            }
        }

    }, [adminorderbyidreducerdata])

    // useEffect(()=>{
    //     setChattingdata(chatdata)

    // },[chatdata])

    useEffect(() => {
        setChattinguserdata(chatdatauser)
    }, [chatdatauser])

    useEffect(() => {
        let timeId = setTimeout(() => {
            const datauser = { order_id: adminorderbyidreducerdata[0]?.order_number, customer_id: adminorderbyidreducerdata[0]?.cust_id, admin_id: 0 }
            dispatch(Adminchatuseraction(datauser))
            // dispatch(GetCData('1'))

        }, 3000)
        return () => {
            clearTimeout(timeId)
        }
    }, [chatdatauser])

    // useEffect(()=>{
    //     setCombinedata([...chatdata,...chatdatauser])
    // },[chattingdata,chattinguserdata])

    // useEffect(()=>{
    //     combinedata.sort((a, b) => a?.chatting_created_at?.localeCompare(b?.chatting_created_at));
    //     setFinalcombinedata(combinedata)
    // },[combinedata])

    useEffect(() => {
        if (typeof chattinguserdata == 'object') {
            chattinguserdata.sort((a, b) => a?.chatting_created_at?.localeCompare(b?.chatting_created_at));
            setFinalcombinedata(chattinguserdata)
            // dispatch(GetCData('1'))
        }

    }, [chattinguserdata])

    useEffect(() => {
        if (finalcombinedata.length >= 0 && typeof finalcombinedata == 'object') {
            setLoading(false)
            // messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' }) 
            const mychatTimeout = setTimeout(() => { 
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' }) 
            }, 4000);
            return () => {
                clearTimeout(mychatTimeout)
            }
        }
    }, [finalcombinedata])

    useEffect(() => {
        dispatch(adminorderbyid(feact2))
        const mychatTimeout = setTimeout(() => { 
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' }) 
        }, 5000);
        return () => {
            clearTimeout(mychatTimeout)
        }
    }, [])

    useEffect(()=>{
        setDataFromParents(GetDataAdminSend);
        // console.log('GetDataAdminSend:', GetDataAdminSend)
        const mychatTimeout = setTimeout(() => {
            dispatch(GetCData('0'))
        }, 5000);
        return () => {
            clearTimeout(mychatTimeout)
        }
    },[GetDataAdminSend])

 
    // console.log("finalcombinedata",finalcombinedata)
    // console.log("combinedata",combinedata)
    return (
        <>
            {finalcombinedata == '' ? <div className='invisible '><p>No Messages</p></div> :<div className='main-div-chat-data'>
            {loading ? <Loadingspinner /> : <div>
                <div className="line text-center"><p></p></div>
                {typeof finalcombinedata == 'object' ? finalcombinedata?.map((item) => {
                    return (
                        <div ref={messagesEndRef} id='chatting-content-main-div' className='chatting-content-main-div'>
                            {item.chatting_from_user == 0 ?
                                <div className="chatting_mg left-chatting_mg" key={item.chatting_id}>
                                    <div className="row p-2">
                                        <div className='col-md-2 col-lg-2 inner-msg_div'>
                                            {item?.chatting_from_user == 0 ? <img src="/assets/images/letter msg.jpg" alt="msg_img" /> : <img src="/assets/images/user1.jpg" alt="msg_img" />}
                                        </div>
                                        <div className="msg_div col-md-10 col-lg-10">
                                            {/* <span className='mb-5'>11:18 AM</span> */}
                                            <span className='mb-5'>{item.chatting_created_at.substring(10, 16)}</span>
                                            {/* <h3 className='mt-2'>FLAWLESS RESUME TEAM</h3> */}
                                            {item?.chatting_from_user == 0 ? <h3 className='mt-2'>FLAWLESS RESUME TEAM</h3> : <h3 className='mt-2'>You</h3>}

                                            {/* <p className='pb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat veritatis laudantium officiis incidunt assumenda natus, excepturi tenetur voluptates soluta maxime esse molestiae eveniet in? Voluptatibus consectetur facilis dignissimos iste quas.</p> */}
                                            {item?.chatting_msg_type == '3' ? item?.fileData.map((v) => {
                                                return (
                                                    <p className='pb-2'> <a href={`/${v.trim()}`} download={`${v.replace('Chat_Data/', '').trim()}`}>{/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(v) ? <img src={`/${v.trim()}`} alt='image' /> : <><InsertDriveFileIcon />{`${v.replace('Chat_Data/', '').trim()}`}</>}</a></p>
                                                )
                                            }) : <p className='pb-2' dangerouslySetInnerHTML={{ __html: item.chatting_msg }}></p>}
                                            {/* <p className='pb-2' dangerouslySetInnerHTML={{__html: item.chatting_msg}}></p> */}
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="chatting_mg right-chatting_mg">
                                    <div className="row p-2 right-chatting-inner-div">
                                        <div className="msg_div col-md-10 col-lg-10">
                                            {/* <span className='mb-5'>11:18 AM</span> */}
                                            <span className='mb-5'>{item.chatting_created_at.substring(10, 16)}</span>
                                            {/* <h3 className='mt-2'>FLAWLESS RESUME TEAM</h3> */}
                                            {item?.chatting_from_user == 0 ? <h3 className='mt-2'>FLAWLESS RESUME TEAM</h3> : <h3 className='mt-2'>You</h3>}
                                            {/* <p className='pb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat veritatis laudantium officiis incidunt assumenda natus, excepturi tenetur voluptates soluta maxime esse molestiae eveniet in? Voluptatibus consectetur facilis dignissimos iste quas.</p> */}
                                            {item?.chatting_msg_type == '3' ? item?.fileData.map((v) => {
                                                return (
                                                    <p className='pb-2'> <a href={`/${v.trim()}`} download={`${v.replace('Chat_Data/', '').trim()}`}>{/\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(v) ? <img src={`/${v.trim()}`} alt='image' /> : <><InsertDriveFileIcon />{`${v.replace('Chat_Data/', '').trim()}`}</>}</a></p>
                                                )
                                            }) : <p className='pb-2' dangerouslySetInnerHTML={{ __html: item.chatting_msg }}></p>}
                                            {/* <p className='pb-2' dangerouslySetInnerHTML={{__html: item.chatting_msg}}></p> */}
                                        </div>
                                        <div className='col-md-2 col-lg-2 inner-msg_div'>
                                            {item?.chatting_from_user == 0 ? <img src="/assets/images/letter msg.jpg" alt="msg_img" /> : <img src="/assets/images/user1.jpg" alt="msg_img" />}
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    )
                }) : null}
            </div>}
        </div>}
        </>
    )
}

export  default  GetChat;
