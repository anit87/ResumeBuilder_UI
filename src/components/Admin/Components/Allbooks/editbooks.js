import React, { useEffect, useState, useRef } from 'react';
import { Paper, Box, Button, Typography, TextField, Stack, Alert } from '@mui/material';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Layout from '../../Pages/Layout';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getIdToEditBooks, updatebooks, Getoutofstockaction } from '../../../../redux/action/Action'
import { apiURL } from '../Api/BaseLine';
import './adminbooks.css'
import { useNavigate, useParams } from 'react-router-dom';


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

const Editbooks = () => {

  const classes = useStyle();
  const toggleState = useSelector((state) => state.togglingReducer.togglingAll)

  const booksbyiddatareducer = useSelector((state) => state.booksIddataimage.booksIddatafinalimage);
  const getmsgbooksave = useSelector((state) => state.Getmsgforsavebook.Getmsgforsavebookdata);
  

  const dispatch = useDispatch();
  const imgpreview = useRef()
  const navigation = useNavigate()

  const { id } = useParams();

  const [imagesname, setImagesname] = useState([])
  const [unlinkedimages, setUnlinkedimages] = useState([])
  const [linkedimages, setLinkedimages] = useState()
  const [status, setStatus] = useState(null);
  const [completedmessage, setCompletedmessage] = useState(null);
  const [show, setShow] = useState(false)
  const [preventfromstart, setPreventfromstart] = useState(false)

  const [booksData, setBooksData] = useState({
    product_name: '',
    product_description: '',
    product_amount: '',
    product_sale_amount: '',
    product_id: '',
    product_type_id: '2',
    product_book_author: '',
    product_book_review: '',
    product_book_title: '',
    product_bookstock: ''

  });

  const [editorstate, setEditorstate] = useState({
    editor: '',
    reviewEditor: ''

  });

  const editorRef = useRef(null);


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

  const handleChangeReviews = (event, editor) => {
    const data = editor.getData()
    setBooksData((pre) => {
      return {
        ...pre,
        product_book_review: data
      }
    })

  }

  const imagefun = (e) => {
    let beforeimagename = []
    let allfiles = e.target.files;
    for (let x = 0; x < allfiles.length; x++) {
      let initialurl = URL.createObjectURL(allfiles[x]);
      beforeimagename.push(initialurl);
    }
    setImagesname(beforeimagename)
    setLinkedimages(allfiles)

  }

  const savebookdata = () => {
    dispatch(updatebooks({ booksData: booksData, unlinkedimages: unlinkedimages, linkedimages: linkedimages }))
    setPreventfromstart(true)
  }

  const goBack = () => {
    navigation(`/admin/allbooks`)
  }

  const outofstock = (e) => {
    if (e.target.checked == true) {
      setBooksData((prev) => {
        const { name, value } = e.target;
        return {
          ...prev,
          [name]: 1,
        };
      });
    }
    else {
      setBooksData((prev) => {
        const { name, value } = e.target;
        return {
          ...prev,
          [name]: 0,
        };
      });
    }

  }

  const unlinkedImagefun = (e, id) => {
    let hide = e.target.parentElement;
    hide.style.display = 'none';
    booksbyiddatareducer?.image?.map((v) => {
      if (id == v.pd_img_id) {
        setUnlinkedimages((prev) => {
          return [
            ...prev,
            v
          ]
        })
      }
    })
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
        data={booksData.product_description != null ? booksData.product_description : ""}
        onChange={(e, editor, data) => handleChangeDescription(e, editor, data)}
      />
    setEditorstate((prev) => {
      return {
        ...prev,
        editor: editor
      }
    })
  }, [booksData])

  useEffect(() => {
    const Revieweditor =
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={booksData.product_book_review != null ? booksData.product_book_review : ""}
        onChange={(e, editor, data) => handleChangeReviews(e, editor, data)}
      />
    setEditorstate((prev) => {
      return {
        ...prev,
        reviewEditor: Revieweditor
      }
    })
  }, [booksData])

  useEffect(() => {
    setBooksData({
      product_name: booksbyiddatareducer.product_name,
      product_description: booksbyiddatareducer.product_description,
      product_amount: booksbyiddatareducer.product_amount,
      product_sale_amount: booksbyiddatareducer.product_sale_amount,
      product_id: booksbyiddatareducer.product_id,
      product_type_id: '2',
      product_book_author: booksbyiddatareducer.product_book_author,
      product_book_review: booksbyiddatareducer.product_review,
      product_book_title: booksbyiddatareducer.product_book_title,
      product_bookstock: booksbyiddatareducer.product_book_sold_out
    });
  }, [booksbyiddatareducer])

  useEffect(() => {
    dispatch(getIdToEditBooks(id))
  }, [])

  useEffect(() => {
    if (getmsgbooksave?.length != 0 && preventfromstart == true) {
      setStatus(getmsgbooksave?.Status)
      setShow(true)
      setCompletedmessage(getmsgbooksave?.message)
      setPreventfromstart(false)
    }

  }, [getmsgbooksave])

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
            <Typography variant="h5" component="h5" sx={{ marginBottom: '20px !important' }}>
              Edit Book
            </Typography>

            {show == true ?
              <div style={{ marginBottom: '25px' }}>
                <Stack spacing={1}>
                  <Alert className='updatesuccessmsg_stack_alert' sx={{ width: '100% important' }} severity={status == 200 ? "success" : "error"}>{completedmessage}</Alert>
                </Stack>
              </div>
              : null}

            <Box style={{ display: 'flex' }}>
              <Box style={{ flexBasis: '70%' }}>
                <Box style={{ display: 'flex', marginBottom: '20px' }}>
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Book Name"
                    name='product_name'
                    variant="outlined"
                    sx={{ width: "100%", marginBottom: 2, flexGrow: '1' }}
                    value={booksData.product_name}
                    onChange={(e) => handlebook(e)}
                  />
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Author"
                    name='product_book_author'
                    variant="outlined"
                    sx={{ width: "100%", marginBottom: 2, flexGrow: '1', marginLeft: '10px' }}
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
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '30px' }}>
                  <label style={{ fontSize: '18px' }}>
                    <input style={{ marginRight: '10px !important' }} className="form-check-input out-of-stock-check admin-checkbox-color" type="checkbox" id="check1" name="product_bookstock" value={booksData.product_bookstock} onClick={outofstock} checked={booksData.product_bookstock == 0 ? false : true} readOnly />
                    Out of Stock</label>
                </Box>
                <Box>
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
                    Update Book
                  </Button>
                </Box>

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
                  {booksbyiddatareducer?.image?.map((item, index) => {
                    return (
                      <div className='image-cross' key={item.pd_img_id}>
                        <button onClick={(e) => unlinkedImagefun(e, item.pd_img_id)}>x</button>
                        <img key={index} src={`${apiURL}${item.pd_img_feature_image}`} />
                      </div>
                    )
                  })}

                  {
                    imagesname.map((item, index) => {
                      return (
                        <div className='image-cross' key={index}>
                          <img key={index} src={item} />
                        </div>
                      )
                    })
                  }
                </div>

              </Box>
            </Box>
          </Paper>
        </div>
      </div>
    </Layout>
  );
}

export default Editbooks