import React, { useEffect, useState } from 'react';
import './popupEditFaq.css';
import { Paper, Box, Button, Typography, TextField, Stack, Alert } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { updateFaq, getIdToEditFAQ, allFaqData } from '../../../../redux/action/Action'


const PopupEditFaq = props => {

  
  const [faqData, setFaqData] = useState({
    id: '',
    title: '',
    description: '',
    status: '0',
    statusApi: false

  });

  const [message, setMessage] = useState();

  const dispatch = useDispatch();

  const getFaqSingleData = useSelector((state) => state.getIdToEditReducer.editFaq)


  const UpdateMessage = () =>{
    return(
       <Stack  spacing={2}>
         <Alert className='popup_updatemsg_stack_alert' severity="success">Data Updated Successfully</Alert>
       </Stack>
    )
}

  const handlerStatus = (e) => {
    let { name, value } = e.target;
    if (faqData.statusApi) {
      setFaqData((prev) => {
        return {
          ...prev,

          [name]: false,
          status: "0",
        }
      })
    } else {

      setFaqData((prev) => {
        return {
          ...prev,
          [name]: true,
          status: "1",
        }
      })

    }

  }

  const handleFAQ = (e) => {
    setFaqData((prev) => {
      const { name, value } = e.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleFaqData = () => {
    dispatch(updateFaq(faqData));
    setMessage(UpdateMessage())
  };

  useEffect(() => {
    setFaqData({
      id: getFaqSingleData?.faq_id,
      title: getFaqSingleData?.faq_title,
      description: getFaqSingleData?.faq_description,
      status: getFaqSingleData?.faq_status,
      statusApi: getFaqSingleData?.faq_status == "0" ? false : true

    });
  }, [getFaqSingleData]);

  
  // useEffect(()=>{
  //   dispatch(updateFaq(faqData))
  // })

  // console.log('FaqData',faqData)

  return (

    <div className='popup-box'>
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>

        <div className='popup-inputs' >
          <Typography variant="h6" sx={{ marginBottom: 2 }} className='popup-heading' >
            EDIT FAQ
          </Typography>
          {message}
          <TextField
            type="text"
            id="outlined-basic"
            label="Title"
            name='title'
            variant="outlined"
            sx={{ width: "90%", marginBottom: 2 }}
            value={faqData.title}
            onChange={handleFAQ}

          />
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Description"
            name='description'
            maxRows={5}
            className='popup-textarea'
            value={faqData.description}
            onChange={handleFAQ}
          />


          <FormControl >
            <FormLabel id="demo-row-radio-buttons-group-label">
              Status
            </FormLabel>
            <div className='popup-status' >
              <Switch
                checked={faqData.statusApi}
                name="statusApi"
                value={faqData.statusApi}
                inputProps={{ "aria-label": "controlled" }}
                onChange={(e) => handlerStatus(e)}
              />

              {faqData.statusApi ? (
                <>
                  <Typography
                    variant="body1"
                    componenet="p"
                    className='popup-status-active'
                  >
                    Active
                  </Typography>
                </>
              )
                :
                (<Typography variant="body1" className='popup-status-inactive' >
                  Inactive
                </Typography>)}

            </div>
          </FormControl>
          <Button
            variant="contained"
            className='popup-update-btn'
            onClick={handleFaqData}
          >
            Update Faq
          </Button>
        </div>



      </div>
    </div>


  );
};

export default PopupEditFaq;