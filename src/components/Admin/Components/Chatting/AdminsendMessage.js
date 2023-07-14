import React, { useState, useEffect, useRef } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../../../chatting/chatting.css';
import { MdOutlineAttachFile, MdSend } from 'react-icons/md';
import { BsFillCameraVideoFill, BsTypeBold, BsFillEmojiSmileFill, BsTypeStrikethrough } from 'react-icons/bs';
import Picker from 'emoji-picker-react';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import {adminorderbyid, UserChat, AddUserChat,Adminchataction,Adminchatuseraction, GetCData } from '../../../../redux/action/Action';
import { useParams } from 'react-router-dom';

const AdminsendMessage = (props) => {
   
    const [attachFileData, setAttachFileData] = useState('')
    const [attachFilename, setAttachFilename] = useState([])
    const [msg, setMsg] = useState([])
    const [sendColor, setSendColor] = useState('#656565')
    const [DataAdmin, setDataAdmin] = useState('Hello')

    const userid = useParams()
    const editorRef = useRef(null);
    const messagesEndRef = useRef(null);

    const adminorderbyidreducerdata = useSelector((state)=>state.adminallorderbyidreducer.adminorderallbyid)
    const dispatch = useDispatch();

    let MsgData;

    const EditorChange=()=>{
      MsgData = editorRef.current.getContent();
      if(MsgData !=''){
      setSendColor('#f25b2a');
      }else{
      setSendColor('#656565');
      }
    }
   const log = () => {
      // props.SendAdminMsg(messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' }))
      dispatch(GetCData('1'))
      MsgData = editorRef.current.getContent();
      setMsg(MsgData);
      setSendColor('#656565');
      let Data = {chatting_msg:MsgData, customer_id:props.CustomerId, chatting_from_user:0, chatting_to_user:props.CustomerId, 
                  order_id:adminorderbyidreducerdata[0]?.order_number, attachFileData}

      if (MsgData != '' && attachFileData=='') {            
        dispatch(AddUserChat(Data)) 
        editorRef.current.setContent('');
        setAttachFilename([])
        setAttachFileData('')
     } 
      else if (attachFileData !='' && MsgData==''){   
        dispatch(UserChat(Data))
        editorRef.current.setContent('');
        setAttachFilename([])
        setAttachFileData('')
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
      }    
  };

  const chatfiles = (e) => {
    let files = e.target.files
    setAttachFileData(files)
    setSendColor('#f25b2a');
    for(let item of files){
        attachFilename.push(item.name)
    }
  }

  useEffect(()=>{
    dispatch(adminorderbyid(props.id))
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
},[log])


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
          toolbar:  ['bold italic link'],
          placeholder:'Write a Message...',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:17px;color: #5e5e5e}'
        }}
        onSelectionChange={EditorChange}
      />

<div className=" right-icons">
         <div className='file-name-div'>
            {
                attachFilename.map((item,i)=>{
                    return(
                    <p key={i}>{item}</p>
                    )
                })
             } 
         </div>
             <input type="file" id='attach_file' onChange={(e) => chatfiles(e)} multiple/>
              <label htmlFor="attach_file"><MdOutlineAttachFile size={22} color={'#656565'} className='chatting-icon' /></label>
                {/* <span className='spacing'></span> */}
                 {/* <BsFillEmojiSmileFill size={22} color={'#656565'} className='chatting-icon' onClick={() => setShowPicker((val) => !val)} /> */}
                 <span className='spacing'></span>
                 <MdSend size={22} color={sendColor} className='chatting-icon' onClick={log} />
                  {/* {showPicker && ( <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} /> )} */}
                     </div>

        </div>
        
            
        </>
  )
}

export default AdminsendMessage