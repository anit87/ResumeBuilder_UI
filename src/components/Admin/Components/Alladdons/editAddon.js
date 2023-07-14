import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Layout from '../../Pages/Layout';
import { Paper, Box, Button, Typography, TextField, Alert, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getIdToEditAddon, updateAddon } from '../../../../redux/action/Action'
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


const Editaddons = props => {

  const navigation = useNavigate()
  const classes = useStyle(props);
  const [addonData, setAddonData] = useState({
    id: '',
    name: '',
    price: '',
  });

  const [message, setMessage] = useState();
  const [status, setStatus] = useState(null);
  const [completedmessage, setCompletedmessage] = useState(null);
  const [show, setShow] = useState(false)
  const [preventfromstart, setPreventfromstart] = useState(false)

  const dispatch = useDispatch();

  let { id } = useParams();

  const singaladdon = useSelector((state) => state.Addaddondatabyid.initialaddonid)
  const toggleState = useSelector((state) => state.togglingReducer.togglingAll)
  const updatemsgfromreducer = useSelector((state) => state.Getmsgforaddonupdate.adminaddonmsg)

  const UpdateMessage = () => {
    return (
      <Stack spacing={2}>
        <Alert className='popup_updatemsg_stack_alert' severity="success">Data Updated Successfully</Alert>
      </Stack>
    )
  }

  const goBack = () => {
    navigation(`/admin/alladdons`)
  }

  const handleAddon = (e) => {
    setAddonData((prev) => {
      const { name, value } = e.target;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const UpdateAddonData = () => {
    dispatch(updateAddon(addonData));
    setMessage(UpdateMessage())
    setPreventfromstart(true)
  };


  useEffect(() => {
    setAddonData({
      id: singaladdon[0]?.addons_id,
      name: singaladdon[0]?.addons_name,
      price: singaladdon[0]?.addons_price,

    });
  }, [singaladdon]);


  useEffect(() => {
    if (updatemsgfromreducer.length != 0 && preventfromstart == true) {
      setStatus(updatemsgfromreducer.Status)
      setShow(true)
      setCompletedmessage(updatemsgfromreducer.message)
      setPreventfromstart(false)
    }

  }, [updatemsgfromreducer])

  useEffect(() => {
    let timeId = setTimeout(() => {
      setShow(false)
    }, 5000)
    return () => {
      clearTimeout(timeId)
    }
  }, [show])

  useEffect(() => {
    dispatch(getIdToEditAddon(id))
  }, [])


  return (
    <Layout>
      <div className={classes.root}>
        <div className={classes.student}>
          <Paper variant='outlined' className={classes.table}
            style={{
              position: 'absolute', right: '10px', left: toggleState ? 300 : 0, width: toggleState ? '70%' : '90%',
              transition: '.3s all', margin: 'auto', border: 'none', paddingLeft: toggleState ? '0px' : '180px'
            }}>
            <Typography variant="h5" component="h5" sx={{ marginBottom: '20px !important' }}>
              Edit Addon
            </Typography>
            {show == true ?
              <div style={{ marginBottom: '25px' }}>
                <Stack spacing={1}>
                  <Alert className='updatesuccessmsg_stack_alert' sx={{ width: '100% important' }} severity={status == 200 ? "success" : "error"}>{completedmessage}</Alert>
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
                    name='name'
                    className='test'
                    variant="outlined"
                    sx={{ width: "90%", marginBottom: 2 }}
                    value={addonData.name}
                    onChange={handleAddon}
                  />
                  <TextField
                    type="text"
                    id="outlined-basic"
                    label="Price"
                    name='price'
                    variant="outlined"
                    sx={{ width: "90%", marginBottom: 2 }}
                    value={addonData.price}
                    onChange={handleAddon}
                  />

                  <Box>
                    <Button sx={{ marginRight: '10px !important', backgroundColor: '#d0989b !important' }} onClick={goBack}
                      variant="contained"
                      className='popup-update-btn'
                    >
                      Cancel
                    </Button>

                    <Button sx={{ backgroundColor: '#d0989b !important', marginRight: 'auto !important', marginLeft: '0px !important' }}
                      variant="contained"
                      className='popup-update-btn'
                      onClick={UpdateAddonData}
                    >
                      Update Addon
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
}

export default Editaddons