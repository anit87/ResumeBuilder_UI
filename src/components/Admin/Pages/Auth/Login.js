import React from 'react';
import { makeStyles } from '@mui/styles';
import { Box, Paper, TextField, Button } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginfun } from '../../../../redux/action/Action'


const useStyle = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    color: 'red',
    background: 'url(/assets/images/background.webp)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiPaper-root': {
      width: '30%',
      height: 400,
      [theme.breakpoints.down('md')]: {
        width: '80%'
      }
    }
  },
  image: {
    width: 200,
    marginBottom: theme.spacing(5)
  },
  inputs: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiInputLabel-root': {
      fontSize: 15,
      fontWeight: 500,
    },
    '& .MuiButton-root': {
      color: theme.palette.secondary.light,

    }
  },

}))
const Login = () => {

  const statuslogindata = useSelector((state) => state.loginstatus.loginvaluestatus)

  const [logindata, setLogindata] = useState([{
    user_email: "",
    password: ""
  }])

  const dispatch = useDispatch()
  const Navigate = useNavigate();

  const changehandle = (event) => {
    let { name, value } = event.target;
    setLogindata({
      ...logindata,
      [name]: value
    })
  }


  const validationfun = () => {
    if (statuslogindata == 200) {
      sessionStorage.setItem("credential", logindata.user_email);
      Navigate('/admin/order')
    }
  }

  useEffect(() => {
    let data = { "user_email": logindata.user_email, "password": logindata.password, "action": "login" }
    if (logindata.user_email && logindata.password) {
      dispatch(loginfun(data))
    }
  }, [changehandle])

  const classes = useStyle()
  return (
    <div className={classes.root}>
      <Paper variant='outlined' className={classes.papar}>
        <Box className={classes.inputs}>
          <img src="/assets/images/logo.jpg" alt="logo" className={classes.image} />
          <TextField id="outlined-basic" label="User Email" name="user_email" variant="outlined" sx={{ width: '70%', marginBottom: 2 }} onChange={changehandle} />
          <TextField id="outlined-basic" type='password' label="Password" name="password" variant="outlined" sx={{ width: '70%', marginBottom: 2 }} onChange={changehandle} />
          <Button variant="contained" onClick={validationfun}>Login</Button>
        </Box>
      </Paper>
    </div>
  )
}

export default Login;