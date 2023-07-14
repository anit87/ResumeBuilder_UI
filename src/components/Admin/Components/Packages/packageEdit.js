import React, { useEffect, useRef, useState } from 'react';
import { Paper, Box, Button, Typography, TextField, Alert, Stack, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../../Pages/Layout';
import { useDispatch, useSelector } from 'react-redux';
import FormGroup from '@mui/material/FormGroup';
import { getalladdons, getIdToEditPackage, updatePackage } from '../../../../redux/action/Action'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useNavigate, useParams } from 'react-router-dom';
import './Package.css'


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
    '& .message_cls': {
      width: '100% !important'
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

const PackageEdit = (props) => {
  const classes = useStyle(props);
  const checkboxes = useRef()
  const [packageData, setPackageData] = useState({
    product_id: '',
    product_name: '',
    product_description: '',
    product_amount: '',
    product_sale_amount: '',
    product_type_id: '1'
  });

  const [editorstate, setEditorstate] = useState({
    editor: '',
  });

  const [addons, setAddons] = useState([]);
  const [unlinkedaddons, setUnlinkedaddons] = useState([]);
  const [status, setStatus] = useState(null);
  const [completedmessage, setCompletedmessage] = useState(null);
  const [show, setShow] = useState(false)
  const [preventfromstart, setPreventfromstart] = useState(false)

  const navigation = useNavigate()
  const dispatch = useDispatch();
  let { slug } = useParams();

  const singalpackage = useSelector((state) => state.getIdToEditPackageReducer.packageiddatavalue)
  const addondatafromreducer = useSelector((state) => state.addondata.addondatafinal);
  const toggleState = useSelector((state) => state.togglingReducer.togglingAll)
  const getupdatemsg = useSelector((state) => state.Getmsgforpackageupdate.adminpackagemsg)
 

  const handleChangeDescription = (event, editor) => {
    const data = editor.getData()
    setPackageData((pre) => {
      return {
        ...pre,
        product_description: data
      }
    })
  }

  const checkedValue = (e) => {
    const { value, name, checked } = e.target
    let index = addons.indexOf(value)

    if (checked) {
      setAddons((prev) => [...prev, value])
      let index1 = unlinkedaddons.indexOf(value)
      unlinkedaddons.splice(index1, 1)
      let unlincked = [...unlinkedaddons]
      setUnlinkedaddons(unlincked)
    } else {
      setUnlinkedaddons((prev) => [...prev, value])
      addons.splice(index, 1)
      let unchecked = [...addons]
      setAddons(unchecked)
    }

  }

  const goBack = () => {
    navigation(`/admin/allpackage`)
  }

  const handlePackage = (e) => {
    setPackageData((prev) => {
      const { name, value } = e.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const editorConfiguration = {
    toolbar: ['heading', '|', 'fontfamily', 'fontsize', '|', 'alignment', '|',
      'fontColor', 'fontBackgroundColor', '|', 'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
      'link', '|', 'outdent', 'indent', '|', 'bulletedList', 'numberedList', 'todoList', '|', 'code', 'codeBlock', '|', '|',
      'blockQuote', '|', 'undo', 'redo'],
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
        // { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
      ]
    }
  };

  const UpdatePackageData = () => {
    let Data = { PackageData: packageData, Addons: addons, Unlinkedaddons: unlinkedaddons }
    console.table(Data);
    dispatch(updatePackage(Data));
    setPreventfromstart(true)
  };

  useEffect(() => {
    setPackageData({
      product_id: singalpackage?.product_id,
      product_name: singalpackage?.product_name,
      product_description: singalpackage?.product_description,
      product_amount: singalpackage?.product_amount,
      product_sale_amount: singalpackage?.product_sale_amount,
      product_type_id: singalpackage?.product_type_id,
    });
  }, [singalpackage]);
  

  useEffect(() => {
    let addonset = []
    let initialval = document.querySelectorAll(".editcheck");
    initialval?.forEach((item) => {
      let bolean = false;
      singalpackage?.package_addons?.forEach((v) => {
        if (item.name == v.addons_name) {
          bolean = true
          addonset.push(v.addons_id)
        }
      })
      if (bolean == true) {
        item.checked = true;
      }
    })
    setAddons(addonset)
  }, [packageData, singalpackage])

  useEffect(() => {
    dispatch(getalladdons())
  }, [addons])

  useEffect(() => {
    const editor =
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        name='product_description'
        data={singalpackage?.product_description}
        onChange={(e, editor, data) => handleChangeDescription(e, editor, data)}
      />
    setEditorstate((prev) => {
      return {
        ...prev,
        editor: editor
      }
    })
  }, [singalpackage])

  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false)
    }, 5000)
    return () => {
      clearTimeout(timeId)
    }
  }, [show]);

  useEffect(() => {
    dispatch(getIdToEditPackage(slug))
  }, [])

  useEffect(() => {
    if (getupdatemsg.length != 0 && preventfromstart == true) {
      setStatus(getupdatemsg.Status)
      setShow(true)
      setCompletedmessage(getupdatemsg.message)
      setPreventfromstart(true)
    }
  }, [getupdatemsg])


  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.student}>
          <Paper variant='outlined' className={classes.table}
            style={{ position: 'absolute', right: '10px', left: toggleState ? 300 : 0, width: toggleState ? '70%' : '90%', transition: '.3s all', margin: 'auto', border: 'none', paddingLeft: toggleState ? '0px' : '180px' }}>
            <Typography variant="h5" component="h5" sx={{ marginBottom: '20px !important' }}>
              Edit Package
            </Typography>
            {show == true ?
              <div style={{ marginBottom: '25px' }}>
                <Stack spacing={1}>
                  <Alert className='updatemsg_stack_alert' severity={status == 200 ? "success" : "error"}>{completedmessage}</Alert>
                </Stack>
              </div>
              : null}
            <Box style={{ display: 'flex', width: '100%' }}>
              <Box style={{ flexBasis: '70%' }} >
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Name"
                    name='product_name'
                    className='test'
                    variant="outlined"
                    sx={{ width: "90%", marginBottom: 2 }}
                    value={packageData.product_name}
                    onChange={handlePackage}
                  />
                  <Typography variant="h6" component="h6"  >
                    Description
                  </Typography>
                  {editorstate.editor}
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Price"
                    name='product_amount'
                    variant="outlined"
                    sx={{ width: "90%", marginBottom: 2 }}
                    value={packageData.product_amount}
                    onChange={handlePackage}
                  />
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Price"
                    name='product_sale_amount'
                    variant="outlined"
                    sx={{ width: "90%", marginBottom: 2 }}
                    value={packageData.product_sale_amount}
                    onChange={handlePackage}
                  />
                </Box>
                <Button sx={{ marginRight: '10px !important', backgroundColor: '#d0989b !important' }} onClick={goBack}
                  variant="contained"
                  className='popup-update-btn'
                >
                  Cancel
                </Button>
                <Button sx={{ backgroundColor: '#d0989b !important' }}
                  variant="contained"
                  className='popup-update-btn'
                  onClick={UpdatePackageData}
                >
                  Update Package
                </Button>
              </Box>
              <Box style={{ flexBasis: '30%', display: 'flex', justifyContent: 'center' }}>
                <FormGroup>
                  {addondatafromreducer.map((item, index) => {
                    return (
                      <label key={index}>
                        <input name={item.addons_name} value={item.addons_id} onChange={checkedValue} className="form-check-input editcheck admin-checkbox-color"
                          type="checkbox" id="flexCheckDefault" /> {item.addons_name} - ${item.addons_price}
                      </label>
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

export default PackageEdit;