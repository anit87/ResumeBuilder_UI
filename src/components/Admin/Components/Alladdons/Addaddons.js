import React, { useEffect, useState } from 'react';
import { Paper, Box, Button, Typography, TextField, Stack, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Layout from '../../Pages/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { Addaddonsaction, getalladdons } from '../../../../redux/action/Action'
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

const Addaddons = () => {
  const classes = useStyle();

  const navigation = useNavigate()
  const dispatch = useDispatch();
  const [addonData, setAddonData] = useState({
    name: '',
    price: '',
  });


  const [message, setMessage] = useState();
  const [status, setStatus] = useState(null);
  const [completedmessage, setCompletedmessage] = useState(null);
  const [show, setShow] = useState(false)
  const [preventfromstart, setPreventfromstart] = useState(false)

  const toggleState = useSelector((state) => state.togglingReducer.togglingAll)
  const addonmsgfromreducer = useSelector((state) => state.Addaddondata.initialaddaddon);
  console.log("addonmsgfromreducer", addonmsgfromreducer);
  const handleAddon = (e) => {
    setAddonData((prev) => {
      const { name, value } = e.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const UpdateMessage = () => {
    return (
      <Stack spacing={2}>
        <Alert className='message_cls' severity="success">Data Inserted Successfully</Alert>
      </Stack>
    )
  }

  const goBack = () => {
    navigation(`/admin/alladdons`)
  }

  const AllFieldRequiredMessage = () => {
    return (
      <Stack spacing={2}>
        <Alert className='message_cls' sx={{ width: '100% important' }} severity="error">All Field Required</Alert>
      </Stack>
    )
  }

  const handleAddonData = () => {
    if (addonData.name || addonData.price != '') {
      dispatch(Addaddonsaction(addonData))
      setMessage(UpdateMessage())
      setPreventfromstart(true)
    } else {
      setMessage(AllFieldRequiredMessage())

    }
  }

  useEffect(() => {
    if (addonmsgfromreducer.length != 0 && preventfromstart == true) {
      setStatus(addonmsgfromreducer.Status)
      setShow(true)
      setCompletedmessage(addonmsgfromreducer.message)
      setPreventfromstart(false)
    }

  }, [addonmsgfromreducer])

  useEffect(() => {
    dispatch(getalladdons())
  }, [])

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
              Add Addon
            </Typography>

            {show == true ?
              <div style={{ marginBottom: '25px' }}>
                <Stack spacing={1}>
                  <Alert className='updatesuccessmsg_stack_alert' sx={{ width: '100% important' }} severity={status == 200 ? "success" : "error"}>{completedmessage}</Alert>
                </Stack>
              </div>
              : null}
            <Box>
              <TextField
                type="text"
                id="outlined-basic"
                label="Name"
                name='name'
                variant="outlined"
                sx={{ width: "100%", marginBottom: 2, flexGrow: '1' }}
                value={addonData.name}
                onChange={handleAddon}

              />
              <TextField
                type="text"
                id="outlined-basic"
                label="Price"
                name='price'
                variant="outlined"
                sx={{ width: "100%", marginBottom: 2, flexGrow: '1' }}
                value={addonData.price}
                onChange={handleAddon}

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
              onClick={handleAddonData}
            >
              Add Addon
            </Button>
          </Paper>
        </div>
      </div>
    </Layout>
  );
}

export default Addaddons