import React, { useEffect, useState } from 'react';
import './Cartpopup.css'
import { Paper, Box, Button, Typography, TextField, Alert, Stack   } from '@mui/material';
import { useDispatch ,useSelector} from 'react-redux';
import {loginaction, innerbookaction, lengthcartaction} from '../../redux/action/Action'
import { NavLink, useNavigate } from 'react-router-dom';


const Cartpopup = (props) => {
    // console.log('Hello Data is', props.product_id, props.cart_price, props.cart_qty, props.customer_id)
    const [loginboleanstate,setLoginboleanstate] = useState(false)
    const [errormsg,setErrormsg] = useState(false)
    const [loginstate,setLoginstate] = useState({
        email : "",
        password: ''
    })
    const [cartLength,setCartLength] = useState(false)

    const navigate = useNavigate()
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
        setCartLength(true)
    }

    useEffect(() => {
        if(frontlogindata.Status==200 && loginboleanstate && loginstate.email !='' && loginstate.password !=''){
          localStorage.setItem("frontemail",frontlogindata.email );
          localStorage.setItem("frontuserid",frontlogindata.userId);
          props.popupclose()
          setLoginboleanstate(false)
          dispatch(innerbookaction({product_id:props.product_id,
            cart_price:props.cart_price,
            cart_qty:props.cart_qty,
            customer_id:localStorage.getItem("frontuserid")}))
                navigate('/cart')
        }
        if(cartLength == true){
            dispatch(lengthcartaction(localStorage?.getItem("frontuserid")))
        }

      }, [frontlogindata,loginboleanstate, loginstate])
      
      useEffect(() => {
         let timeId =  setTimeout(()=>setErrormsg(false), 15000)
          return()=>{clearTimeout(timeId)}
      }, [errormsg])

    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.popupclose} >x</span>
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

export default Cartpopup