import React, { useEffect, useState } from 'react';
import { Paper, Box, Button, Typography, TextField, Stack, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../../Pages/Layout';
import { useDispatch, useSelector } from 'react-redux';
import {AddPackageData,getalladdons} from '../../../../redux/action/Action'
import './Package.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
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
    alignItems: 'center',
    justifyContent: 'center',
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
    }


  },

  textarea: {
    // color: theme.palette.secondary.light,
    padding: `${theme.spacing(1)} 5px`,
    width: '100%',
    height: '100px!important',
    fontSize: 15,
    fontWeight: 500,
    marginBottom: 10,
    border: '1px solid #c4c4c4',
  }



}))

const Addpackage = (props) => {

  const classes = useStyle(props);
  const navigation = useNavigate()
  const dispatch = useDispatch();
  const [packageData, setPackageData] = useState({
    product_name: '',
    product_description: '',
    product_amount:'',
    product_sale_amount:'',
    product_type_id : '1'
  });

  const [message, setMessage] = useState({
    successMsg : 'hideMsg',
    errorMsg   : 'hideMsg'
  });
  const [addons, setAddons] = useState([]);
  const [status, setStatus] = useState(null);
  const [completedmessage, setCompletedmessage] = useState(null);
  const [show, setShow] = useState(false)
  const [preventfromstart, setPreventfromstart] = useState(false)

  const [editorstate, setEditorstate] = useState({
    editor: '',
  });

  const toggleState = useSelector((state)=>state.togglingReducer.togglingAll)
  const addondatafromreducer = useSelector((state)=> state.addondata.addondatafinal);
  const addpackagemsg = useSelector((state)=> state.addPackagereducer.addpackagemsg);

  const handleChangeDescription = (event, editor) => {
    const data = editor.getData()
  setPackageData((pre)=>{
      return{
        ...pre,
        product_description : data
      }
    })

  }

  const handleFAQ = (e) => {
    setPackageData((prev) => {
      const { name, value } = e.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const checkedValue = (e) => {
    const { value, name, checked } = e.target
    if (checked) {
      setAddons((prev) => [...prev, value])
    } else {
      let index = addons.indexOf(value)
      addons.splice(index, 1)
      let unchecked = [...addons]
      setAddons(unchecked)
    }

  }

  const goBack = () => {
    navigation(`/admin/allpackage`)
  }

  const handlePackageData = () => {
      let Data = {PackageData  :packageData, Addons : addons}
      dispatch(AddPackageData(Data))
      setPreventfromstart(true)
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
 
dispatch(getalladdons())
  
}, [addons])

useEffect(()=>{
if(addpackagemsg.length!=0 && preventfromstart==true){
  setStatus(addpackagemsg.Status)
      setShow(true)
      setCompletedmessage(addpackagemsg.message)
      setPreventfromstart(false)
}
},[addpackagemsg])

  useEffect(() => {
    const editor =
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        onChange={(e, editor, data) => handleChangeDescription(e, editor, data)}
      />
    setEditorstate((prev) => {
      return {
        ...prev,
        editor: editor
      }
    })
  }, [])

  useEffect(()=>{
    let timeId = setTimeout(()=>{
      setShow(false)
    }, 5000)
    return () =>{
      clearTimeout(timeId)
    }
  },[show])

  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.student}>
          <Paper variant='outlined' className={classes.table}
            style={{ position: 'absolute', right: '10px', left: toggleState ? 300 : 0, width: toggleState ? '70%' : '90%', transition: '.3s all', margin: 'auto', border: 'none', paddingLeft: toggleState ? '0px' : '180px' }}>
            <Typography variant="h5" component="h5" sx={{ marginBottom: '20px !important' }}>
              Add Package
            </Typography>
            {/* <div>
              <Stack spacing={1}>
                <Alert className='updatesuccessmsg_stack_alert' severity={status==200 ? "success" : "error"}>{completedmessage}</Alert>
              </Stack>
            </div> */}
            {show ==true ?
              <div style={{marginBottom:'25px'}}>
                <Stack spacing={1}>
                  <Alert className='updatesuccessmsg_stack_alert' sx={{ width: '100% important' }} severity={status==200 ? "success" : "error"}>{completedmessage}</Alert>
                </Stack>
              </div>
              : null}
      
            <Box style={{ display: 'flex', width: '100%' }}>
              <Box style={{ flexBasis: '70%' }} >
                <Box style={{ display: 'flex' }}>
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Name"
                    name='product_name'
                    variant="outlined"
                    sx={{ width: "45%", marginBottom: 2, flexGrow: '1' }}
                    value={packageData.product_name}
                    onChange={handleFAQ}
                  />
                </Box>
                <Box className='add-package-editor'>
                <Typography variant="h6" component="h6"  >
                        Description 
                </Typography>
                    {editorstate.editor}
                </Box>
                <Box style={{ display: 'flex', marginBottom: '20px' }}>

                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Sale Amount"
                    name='product_sale_amount'
                    variant="outlined"
                    sx={{ width: "45%", marginBottom: 2, flexGrow: '1' }}
                    value={packageData.product_sale_amount}
                    onChange={handleFAQ}
                  />
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Price"
                    name='product_amount'
                    variant="outlined"
                    sx={{ width: "45%", marginBottom: 2, flexGrow: '1', marginLeft: '10px' }}
                    value={packageData.product_amount}
                    onChange={handleFAQ}
                  />
                </Box>
                <Button sx={{marginRight:'10px !important',backgroundColor: '#d0989b !important'}} onClick={goBack}
                    variant="contained"
                    className='popup-update-btn'                  
                  >
                    Cancel
                  </Button>
                <Button sx={{backgroundColor: '#d0989b !important'}}
                  variant="contained"
                  className={classes.stundentBtn}
                  onClick={handlePackageData}
                >
                  Add Package
                </Button>
              </Box>
              <Box style={{ flexBasis: '30%', display: 'flex', justifyContent: 'center' }}>
                <FormGroup>
                  {addondatafromreducer.map((item) => {
                    return (
                      <FormControlLabel key={item.addons_id} control={<Checkbox labelstyle={{color: '#d0989b'}} iconstyle={{fill: '#d0989b'}}/>}
                        label={`${item.addons_name} - $${item.addons_price}`} name={item.addons_name}
                        onClick={checkedValue} value={item.addons_id}
                      />
                    )
                  })}

                </FormGroup>
              </Box>
            </Box>
          </Paper>
        </div>
      </div>
    </Layout>
  );
};

export default Addpackage;