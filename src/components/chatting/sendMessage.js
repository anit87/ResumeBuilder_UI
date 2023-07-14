import React, { useState, useEffect, useRef } from 'react'
import './chatting.css';
import { MdOutlineAttachFile, MdSend } from 'react-icons/md';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import {adminorderbyid, UserChat, AddUserChat,Adminchatuseraction, GetCData, GetFrontChatNum } from '../../redux/action/Action';




const SendMessage = (props) => {

  const [attachFileData, setAttachFileData] = useState('')
  const [attachFilename, setAttachFilename] = useState([])
  const [msg, setMsg] = useState([])
  const [sendColor, setSendColor] = useState('#656565')

  const editorRef = useRef(null);
  const adminorderbyidreducerdata = useSelector((state)=>state.adminallorderbyidreducer.adminorderallbyid)
  const dispatch = useDispatch();
  let CustomerId = localStorage?.getItem('frontuserid');
  let MsgData;

  const EditorChange=()=>{
    MsgData = editorRef.current.getContent();
    // console.log("data is ", MsgData)
    if(MsgData !=''){
    setSendColor('#f25b2a');
    }else{
    setSendColor('#656565');
    }
  }

  const sendMsg = () => {
    dispatch(GetCData('1'))
      MsgData = editorRef.current.getContent();
      setMsg(MsgData);
      setSendColor('#656565');
      // console.log("MsgData", MsgData)
      let Data = {chatting_msg:MsgData, customer_id:CustomerId, chatting_from_user:CustomerId, chatting_to_user:0, 
                  order_id:adminorderbyidreducerdata[0]?.order_number, attachFileData}
      
      if (MsgData != '' && attachFileData=='') {            
        dispatch(AddUserChat(Data)) 
        editorRef.current.setContent('');
        setAttachFilename([])
        setAttachFileData('')
        dispatch(GetFrontChatNum('0')); 
        
     } 
      else if (attachFileData !='' && MsgData==''){   
        dispatch(UserChat(Data))
        editorRef.current.setContent('');
        setAttachFilename([])
        setAttachFileData('')
        dispatch(GetFrontChatNum('0')); 

      }
      else if (MsgData=='' && attachFileData==''){
        console.log("emptyyy data")
      }
      else{
        dispatch(AddUserChat(Data))
        dispatch(UserChat(Data))
        editorRef.current.setContent('');
        setAttachFilename([])
        setAttachFileData('')
        dispatch(GetFrontChatNum('0')); 

      }    
  };

  const chatfiles = (e) => {
    setSendColor('#f25b2a')
    let files = e.target.files
    setAttachFileData(files)
    for (let item of files) {
      attachFilename.push(item.name)
    }
  }

  useEffect(()=>{
    dispatch(adminorderbyid(props.feact2))
},[])


useEffect(()=>{
  const datauser = {order_id:adminorderbyidreducerdata[0]?.order_number,customer_id:adminorderbyidreducerdata[0]?.cust_id,admin_id:0}
  const myTimeout = setTimeout(myGreeting, 5000);
  function myGreeting() {
    // dispatch(Adminchataction(data))
    dispatch(Adminchatuseraction(datauser))
  }
  return () => {
    clearTimeout(myTimeout);
  }
},[sendMsg])


  return (
    <>
      <div className='chatting-editor-div'>

        <Editor
          apiKey='hpv89x6nkbd7fnibw3s4ii8sm7ytlqzazuzxppga1cfzjvkj'
          onInit={(evt, editor) => editorRef.current = editor}
          // initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            menubar: false,
            plugins: ['link'],
            toolbar: ['bold italic link'],
            placeholder: 'Write a Message...',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:17px;color: #5e5e5e}',
          }}
          onSelectionChange={EditorChange}
        />

        <div className=" right-icons">
          <div className='file-name-div'>
            {
              attachFilename.map((item) => {
                return (
                  <p>{item}</p>
                )
              })
            }
          </div>
          <input type="file" id='attach_file' onChange={(e) => chatfiles(e)} multiple />
          <label htmlFor="attach_file"><MdOutlineAttachFile size={22} color={'#656565'} className='chatting-icon' /></label>
          {/* <span className='spacing'></span> */}
          {/* <BsFillEmojiSmileFill size={22} color={'#656565'} className='chatting-icon' onClick={() => setShowPicker((val) => !val)} /> */}
          <span className='spacing'></span>
          <MdSend size={22} color={sendColor} className='chatting-icon' onClick={sendMsg} />
          {/* {showPicker && ( <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} /> )} */}
        </div>

      </div>


    </>
    )
}

export default SendMessage;