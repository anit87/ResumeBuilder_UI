import React, { useEffect, useState } from 'react';
import { Paper, Box, Button, Typography, TextField,  Stack, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../../Pages/Layout';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import {AddFaqData} from '../../../../redux/action/Action'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate } from 'react-router-dom';



const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding:'117px 0',
    color: 'red',
    display: 'flex',
    alignItems: 'center',
    background: theme.palette.secondary.light,
    justifyContent: 'center',
    zIndex: -99,
    '& .MuiPaper-root': {
      width: '35%',
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
    zIndex: 99,
    '& .MuiInputLabel-root': {
      fontSize: 17,
      fontWeight: 600,
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
        // borderColor: 'hsl(0, 0%, 80%)',
        border: `2px solid ${theme.palette.secondary.main}`,
        boxShadow: 'none'
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
    '& .message_cls' : {
      width : '100% !important'
    },
    '& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked': {
      color: '#198754'
  },
  
  '& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track': {
      backgroundColor: '#198754 !important'
  }

  },

  textarea: {
    // color: theme.palette.secondary.light,
    padding: `${theme.spacing(1)} 5px`,
    width: '90%',
    height: '100px!important',
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 20
  }

}))

const AddFAQ = (props) => { 

  const navigation = useNavigate()
  const classes = useStyle(props);
  const toggleState = useSelector((state) => state.togglingReducer.togglingAll)
  const addFaqmsgdata = useSelector((state) => state.addFAQreducer.FaqAddmsg)
  const dispatch = useDispatch();

  const [faqData, setFaqData] = useState({
    title: '',
    description: '',
    status: 0,
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

  const handleChangeDescription = (event, editor) => {
    const data = editor.getData()
    setFaqData((pre) => {
      return {
        ...pre,
        description: data
      }
    })
  }

  const handleFAQ = (e) => {
    const { name, value } = e.target;
    setFaqData((prev) => {
      return {
        ...prev,
        [name]: value,

      };
    });

  };

  const handlerStatus = (e) => {
    if (faqData.status) {
      setFaqData((prev) => {
        return {
          ...prev,
          [e.target.name]: 0,
          statusApi: false,
        }
      })
    } else {

      setFaqData((prev) => {
        return {
          ...prev,
          [e.target.name]: 1,
          statusApi: true,
        }
      })
    }

  }

  const UpdateMessage = () => {
    return (
      <Stack spacing={2}>
        <Alert className='message_cls' severity="success">Faq Inserted Successfully</Alert>
      </Stack>
    )
  }

  const AllFieldRequiredMessage = () => {
    return (
      <Stack spacing={2}>
        <Alert className='message_cls' sx={{ width: '100% important' }} severity="error">All Field Required</Alert>
      </Stack>
    )
  }

  const goBack = () => {
    navigation(`/admin/allfaq`)
  }

  const handleFaqData = () => {
    if (faqData.title && faqData.description != '') {
      dispatch(AddFaqData(faqData))
      setMessage(UpdateMessage)
      setPreventfromstart(true)
      //  setFaqData({
      //   title: '',
      //   description: '',
      //   // status:0,
      //   // statusApi:false
      //  })
    } else {
      setMessage(AllFieldRequiredMessage())

    }
  }

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
    const editor =
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        // data={faqData.description !=null ? faqData.description : "" }
        onChange={(e, editor, data) => handleChangeDescription(e, editor, data)}
      />
    setEditorstate((prev) => {
      return {
        ...prev,
        editor: editor
      }
    })
  }, [])

  useEffect(() => {
    if (addFaqmsgdata.length != 0 && preventfromstart == true) {
      setStatus(addFaqmsgdata.status)
      setShow(true)
      setCompletedmessage(addFaqmsgdata.data)
      setPreventfromstart(false)
    }
  }, [addFaqmsgdata])

  useEffect(() => {
    let timeId = setTimeout(() => {
      setShow(false)
    }, 5000)
    return () => {
      clearTimeout(timeId)
    }
  }, [show])

  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.student}>
          <Paper variant='outlined' className={classes.table}
            style={{ position: 'absolute', right: '10px', left: toggleState ? 300 : 0, width: toggleState ? '70%' : '90%', transition: '.3s all', margin: 'auto', border: 'none', paddingLeft: toggleState ? '0px' : '180px' }}>
            <Box className={classes.inputs} >
              <Typography variant="h5" component="h5" sx={{ marginBottom: 2, marginBottom: '20px !important', width: '100%' }}>
                Add FAQ
              </Typography>
              {show == true ?
                <div style={{ marginBottom: '25px' }}>
                  <Stack spacing={1}>
                    <Alert className='updatesuccessmsg_stack_alert' sx={{ width: '100% important' }} severity={status == 200 ? "success" : "error"}>{completedmessage}</Alert>
                  </Stack>
                </div>
                : null}
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
              <FormControl className={classes.radionBtns}>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Status
                </FormLabel>
                <Box className={classes.statusDiv}>
                  <Switch
                    checked={classes.statusApi}
                    name="status"
                    value={faqData.status}
                    inputProps={{ "aria-label": "controlled" }}
                    onChange={(e) => handlerStatus(e)}
                  />
                  {faqData.status ? (
                    <Typography
                      variant="body1"
                      componenet="p"
                      className={classes.active}
                      value={faqData.status}
                    >
                      active
                    </Typography>
                  )
                    :
                    (<Typography variant="body1" value={faqData.status} className={classes.inactive} >
                      Inactive
                    </Typography>)}
                </Box>
              </FormControl>
              <Box>
                <Button sx={{ marginRight: '10px !important', backgroundColor: '#d0989b !important', marginTop: '20px !important' }} onClick={goBack}
                  variant="contained"
                  className='popup-update-btn'
                >
                  Cancel
                </Button>
                <Button sx={{ backgroundColor: '#d0989b !important' }}
                  style={{ width: 'max-content', marginTop: '20px' }}
                  variant="contained"
                  className={classes.stundentBtn}
                  onClick={handleFaqData}
                >
                  Add Faq
                </Button>
              </Box>
            </Box>
          </Paper>
        </div>
      </div>
    </Layout>
  );
};

export default AddFAQ;