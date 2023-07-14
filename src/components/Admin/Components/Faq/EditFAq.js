import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Layout from '../../Pages/Layout';
import { Paper, Box, Button, Typography, TextField, Stack, Alert } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { updateFaq, getIdToEditFAQ } from '../../../../redux/action/Action'
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '117px 0',
    color: 'red',
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.secondary.light,
    justifyContent: 'center',
    zIndex: -99,
    '& .MuiPaper-root': {
      width: '55%',
      height: 'max-content',
      padding: `${theme.spacing(4)} 0`,
      [theme.breakpoints.down('lg')]: {
        width: '70%',
        padding: `${theme.spacing(2)} 0`,
      },
    },
  },

  inputs: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
    '& .MuiInputLabel-root': {
      fontSize: 15,
      fontWeight: 500,
    },
    '& .MuiButton-root': {
      color: theme.palette.secondary.light,
    },
    '& .css-1nrlq1o-MuiFormControl-root': {
      width: '90%',
      display: 'flex',
      justifyContent: 'flex-start',
      marginBottom: theme.spacing(2),
      fontSize: 15,
      fontWeight: 500,
    },
    '& .css-b62m3t-container': {
      width: '90%',
      marginBottom: 15,
      border: theme.palette.secondary.light,
      '& .css-1s2u09g-control': {
        padding: `${theme.spacing(1)} 5px`,
      },
      '& .css-14el2xx-placeholder': {
        fontSize: 16,
        fontWeight: 500,
      },
      '& .css-1pahdxg-control': {
        outline: 'none',
        padding: `${theme.spacing(1)} 5px`,
        border: `2px solid ${theme.palette.secondary.main}`,
        boxShadow: 'none'
      },
      '& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked': {
        color: '#198754 !important'
      },
      '& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
        backgroundColor: '#198754 !important'
      },
    },
    '& .css-1a25edt-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked': {
      color: theme.palette.primary.green,
    },
    '& .css-1a25edt-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
      background: theme.palette.primary.green,
    },
    '& .makeStyles-inputs-20': {
      background: 'red'
    },
    '& .css-1a25edt-MuiButtonBase-root-MuiSwitch-switchBase': {
      color: 'red'
    },
    '& .css-1yjjitx-MuiSwitch-track': {
      background: 'red'
    },
    '& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked': {
      color: '#00804f !important'
    },
  },
  statusDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  active: {
    fontSize: '17px!important',
    fontWeight: '500!important',
    color: theme.palette.primary.green,
    marginBottom: 2
  },
  inactive: {
    fontSize: '17px!important',
    fontWeight: '500!important',
    color: theme.palette.primary.red,
    marginBottom: 2
  },
  toggle: {
    display: "flex",
    alignItems: "center",
  },

  textarea: {
    padding: `${theme.spacing(1)} 5px`,
    width: '90%',
    height: '100px!important',
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 20
  }
}))

const EditFAQ = (props) => {
  const classes = useStyle(props);

  const [faqData, setFaqData] = useState({
    id: '',
    title: '',
    description: '',
    status: '0',
    statusApi: false
  });
  const [editorstate, setEditorstate] = useState({
    editor: ''
  })

  const [message, setMessage] = useState();
  const [status, setStatus] = useState(null);
  const [completedmessage, setCompletedmessage] = useState(null);
  const [show, setShow] = useState(false)
  const [preventfromstart, setPreventfromstart] = useState(false)

  const dispatch = useDispatch();

  const userId = useParams();
  // const {id} = useParams();                         //can also get object like this
  // console.log('Id', id)
  const navigation = useNavigate()

  const getFaqSingleData = useSelector((state) => state.getIdToEditReducer.editFaq[0])
  const toggleState = useSelector((state) => state.togglingReducer.togglingAll)
  const updatemsgfaqreducer = useSelector((state) => state.updateFAQreducer.updateData)

  const UpdateMessage = () => {
    return (
      <Stack spacing={2}>
        <Alert className='popup_updatemsg_stack_alert' severity="success">Data Updated Successfully</Alert>
      </Stack>
    )
  }
  const handleChangeDescription = (event, editor) => {
    const data = editor.getData()
    setFaqData((pre) => {
      return {
        ...pre,
        description: data
      }
    })
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

  const goBack = () => {
    navigation(`/admin/allfaq`)
  }

  const handleFaqData = () => {
    dispatch(updateFaq(faqData));
    setMessage(UpdateMessage())
    setPreventfromstart(true)
  };

  const editorConfiguration = {
    toolbar: ['heading', '|',
      'fontfamily', 'fontsize', '|',
      'alignment', '|',
      'fontColor', 'fontBackgroundColor', '|',
      'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
      'link', '|',
      'outdent', 'indent', '|',
      'bulletedList', 'numberedList', 'todoList', '|',
      'code', 'codeBlock', '|',
      '|',
      'blockQuote', '|',
      'undo', 'redo']
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

  useEffect(() => {
    const editor =
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={faqData.description != null ? faqData.description : ""}
        onChange={(e, editor, data) => handleChangeDescription(e, editor, data)}
      />
    setEditorstate((prev) => {
      return {
        ...prev,
        editor: editor
      }
    })
  }, [getFaqSingleData])

  useEffect(() => {
    if (updatemsgfaqreducer.length != 0 && preventfromstart == true) {
      setStatus(updatemsgfaqreducer.status)
      setShow(true)
      setCompletedmessage(updatemsgfaqreducer.data)
      setPreventfromstart(false)
    }
  }, [updatemsgfaqreducer])

  useEffect(() => {
    let timeId = setTimeout(() => {
      setShow(false)
    }, 5000)
    return () => {
      clearTimeout(timeId)
    }
  }, [show])

  useEffect(() => {
    dispatch(getIdToEditFAQ(userId.id))
  }, [])

  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.student}>
          <Paper variant='outlined' className={classes.table}
            style={{
              position: 'absolute', right: '10px', left: toggleState ? 300 : 0,
              width: toggleState ? '70%' : '90%', transition: '.3s all', margin: 'auto', border: 'none',
              paddingLeft: toggleState ? '0px' : '180px'
            }}>
            <Typography variant="h5" component="h5" sx={{ marginBottom: '28px !important' }}>
              EDIT FAQ
            </Typography>
            {show == true ?
              <div style={{ marginBottom: '25px' }}>
                <Stack spacing={1}>
                  <Alert className='updatesuccessmsg_stack_alert' sx={{ width: '100% important' }} severity={status == 200 ? "success" : "error"}>{completedmessage}</Alert>
                </Stack>
              </div>
              : null
            }
            <Box style={{ display: 'flex', width: '100%' }}>
              <Box style={{ flexBasis: '70%' }} >
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
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
                  <div className='product-reviews'>
                    {editorstate.editor}
                  </div>
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
                  <Box>
                    <Button sx={{ marginRight: '10px !important', backgroundColor: '#d0989b !important', marginTop: '20px !important' }} onClick={goBack}
                      variant="contained"
                      className='popup-update-btn'
                    >
                      Cancel
                    </Button>

                    <Button sx={{ backgroundColor: '#d0989b !important', marginLeft: '0px !important', marginRight: 'auto !important', marginTop: '20px !important' }}
                      variant="contained"
                      className='popup-update-btn'
                      onClick={handleFaqData}
                    >
                      Update Faq
                    </Button>
                  </Box>

                </Box>
              </Box>
            </Box>
          </Paper>
        </div>
      </div>
    </Layout>
  );
};

export default EditFAQ;