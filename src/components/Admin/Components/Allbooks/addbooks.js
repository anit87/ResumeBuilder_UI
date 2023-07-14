import React, { useEffect, useState, useRef } from 'react';
import { Paper, Box, Button, Typography, TextField, Stack, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Layout from '../../Pages/Layout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { savebooks } from '../../../../redux/action/Action' 
import './adminbooks.css'
import { useNavigate } from 'react-router-dom';


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

const Addbooks = () => {

  const classes = useStyle();
  const navigation = useNavigate()
  const toggleState = useSelector((state) => state.togglingReducer.togglingAll)

  const dispatch = useDispatch();
  const imgpreview = useRef()
  const [imagesname, setImagesname] = useState([])
  const [booksData, setBooksData] = useState({
    product_name: '',
    product_description: '',
    product_amount: '',
    product_sale_amount: '',
    product_images: '',
    product_type_id: '2',
    product_book_author: '',
    product_book_review: '',
    product_book_title: '',
  });
  // ----------------------------------------------------------------------------
  const [status, setStatus] = useState(null);
  const [completedmessage, setCompletedmessage] = useState(null);
  const [show, setShow] = useState(false)
  const [preventfromstart, setPreventfromstart] = useState(false)

  const [editorstate, setEditorstate] = useState({
    editor: '',
  });

  const SaveBooksDataMessage = useSelector((state) => state.SaveBooksReducer.SaveBooksMsg)

  const handlebook = (e) => {
    setBooksData((prev) => {
      const { name, value } = e.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeDescription = (event, editor) => {
    const data = editor.getData()
    setBooksData((pre) => {
      return {
        ...pre,
        product_description: data
      }
    })

  }

  console.log(imagesname);
  const imagefun = (e) => {
    let beforeimagename = []
    let allfiles = e.target.files;
    for (let x = 0; x < allfiles.length; x++) {
      let initialurl = URL.createObjectURL(allfiles[x]);
      beforeimagename.push(initialurl);
    }
    setImagesname(beforeimagename)
    setBooksData((pre) => {
      return {
        ...pre,
        product_images: e.target.files
      }
    })

  }

  const goBack = () => {
    navigation(`/admin/allbooks`)
  }

  const savebookdata = () => {
    // console.log(booksData);
    dispatch(savebooks(booksData))
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

  useEffect(() => {
    if (SaveBooksDataMessage.length != 0 && preventfromstart == true) {
      setStatus(SaveBooksDataMessage?.status)
      setShow(true)
      setCompletedmessage(SaveBooksDataMessage?.message)
      setPreventfromstart(false)
    }

  }, [SaveBooksDataMessage])

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
            <Typography variant="h5" component="h5" sx={{ marginBottom: '20px !important', }}>
              Add Book
            </Typography>

            {
              show == true ?
                <div style={{ marginBottom: '25px' }}>
                  <Stack spacing={1}>
                    <Alert className='updatesuccessmsg_stack_alert' sx={{ width: '100% important' }} severity={status == 200 ? "success" : "error"}>{completedmessage}</Alert>
                  </Stack>
                </div>
                : null
            }

            <Box style={{ display: 'flex' }}>
              <Box style={{ flexBasis: '70%' }}>
                <Box style={{ display: 'flex', marginBottom: '20px' }}>
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Book Name"
                    name='product_name'
                    variant="outlined"
                    sx={{ width: "40%", marginBottom: 2, flexGrow: '1' }}
                    value={booksData.product_name}
                    onChange={(e) => handlebook(e)}

                  />
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Author"
                    name='product_book_author'
                    variant="outlined"
                    sx={{ width: "40%", marginBottom: 2, flexGrow: '1', marginLeft: '10px' }}
                    value={booksData.product_book_author}
                    onChange={(e) => handlebook(e)}
                  />
                </Box>

                <TextField
                  type="text"
                  id="outlined-basic"
                  label="Book Title"
                  name='product_book_title'
                  variant="outlined"
                  sx={{ width: "100%", marginBottom: 2, flexGrow: '1' }}
                  value={booksData.product_book_title}
                  onChange={(e) => handlebook(e)}

                />
                <Box className='add-book-editor'>
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
                    sx={{ width: "40%", marginBottom: 2, flexGrow: '1' }}
                    value={booksData.product_sale_amount}
                    onChange={(e) => handlebook(e)}

                  />
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Amount"
                    name='product_amount'
                    variant="outlined"
                    sx={{ width: "40%", marginBottom: 2, flexGrow: '1', marginLeft: '10px' }}
                    value={booksData.product_amount}
                    onChange={(e) => handlebook(e)}

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
                  className={classes.stundentBtn}
                  onClick={savebookdata}
                >
                  Add Book
                </Button>
              </Box>
              <Box style={{ flexBasis: '30%', textAlign: 'center' }}>
                <Button sx={{ backgroundColor: '#d0989b !important' }}
                  variant="contained"
                  component="label"
                >
                  Upload Image
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={(e) => imagefun(e)}
                  />
                </Button>
                <div ref={imgpreview} id='previewimag'>
                  {imagesname.map((item, index) => {
                    return (
                      <img key={index} src={item} />
                    )
                  })}
                </div>

              </Box>
            </Box>
          </Paper>
        </div>
      </div>
    </Layout>
  );
}

export default Addbooks