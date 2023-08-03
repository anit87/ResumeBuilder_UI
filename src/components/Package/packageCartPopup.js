import React, { useEffect, useState } from 'react';
import './PackageCartpopup.css'
import {Alert, Stack } from '@mui/material';
import { useDispatch ,useSelector} from 'react-redux';
import {loginaction, lengthcartaction} from '../../redux/action/Action'

const PackageCartpopup = (props) => {
    const [loginboleanstate,setLoginboleanstate] = useState(false)
    const [errormsg,setErrormsg] = useState(false)
    const [loginstate,setLoginstate] = useState({
        email : "",
        password: ''
    })

    const dispatch = useDispatch()

    let frontlogindata = useSelector((state)=>state.frontendloginreducer.frontloginmsg);

    const logininfo = (e) => {
        const {name,value} = e.target
        setLoginstate((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }

    const loginbtn = () => {
        dispatch(loginaction(loginstate))
        setLoginboleanstate(true)
        setErrormsg(true)
    }


    useEffect(() => {
        if(frontlogindata.Status==200 && loginboleanstate && loginstate.email !='' && loginstate.password !=''){
          localStorage.setItem("frontemail",frontlogindata.email );
          localStorage.setItem("frontuserid",frontlogindata.userId);
        //   props.PackagePopupclose()
          setLoginboleanstate(false)
          dispatch(lengthcartaction(localStorage?.getItem("frontuserid")))
            setTimeout(()=>props.PackagePopupclose(), 5000)
        }
      }, [frontlogindata,loginboleanstate, loginstate])
      
    useEffect(() => {
         let timeId =  setTimeout(()=>setErrormsg(false), 5000)
          return()=>{clearTimeout(timeId)}
    }, [errormsg])

    return (
        <div className="package-popup-box">
            <div className="package-box">
                <span className="package-close-icon" onClick={props.PackagePopupclose} >x</span>
                <div className='popup-inputs' >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 col-lg-6 col-xl-6 auth_img">
                                <img src="/assets/images/login2.png" alt="loginvector" className="img-fluid " />
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-6 auth_content">
                                <div className="For_padding">
                                    <Stack sx={{ width: '100%', marginBottom: '25px' }} spacing={2}>
                                        {frontlogindata.Status == 200 && errormsg ? <Alert severity="success">Login Successfully</Alert> : frontlogindata.Status == 403 && errormsg ? <Alert severity="error">Sorry Your Account is Deactivated</Alert> : frontlogindata.Status == 404 && errormsg ? <Alert severity="error">Invalid Cerenditials</Alert> : frontlogindata.Status == 401 && errormsg ? <Alert severity="error">Invalid Cerenditials</Alert> : null}
                                    </Stack>
                                    <div className="text-center pt-4 pb-3 auth_header">
                                        <h4 style={{color:'#f25b2a'}}>LOGIN</h4>
                                    </div>
                                    <div className="auth_input">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">User Name <span>*</span></label>
                                            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="User Name" name='email' value={loginstate.email} onChange={logininfo} />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Password <span>*</span></label>
                                            <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Password" name='password' value={loginstate.password} onChange={logininfo} />
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 col-lg-12 mt-4">
                                                <button className="btn  w-100 auth_btn" onClick={()=>loginbtn()}>Login</button>
                                            </div>
                                        </div>
                                        <div className="social_media_icons text-center mt-3">
                                            <input type="password" className="form-control" id="exampleFormControlInput1" hidden />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PackageCartpopup