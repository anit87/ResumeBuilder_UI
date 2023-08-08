import React, { useEffect, useState } from 'react';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import './Auth.css';
import MiniNav from '../../components/MiniNav/MiniNav';
import Layout from '../../Layout/Layout';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginaction, lengthcartaction } from '../../redux/action/Action'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Loom from '../../components/Loom/loom';

const Login = () => {
    const [loginboleanstate, setLoginboleanstate] = useState(false)
    const [errormsg, setErrormsg] = useState(false)
    const [loginstate, setLoginstate] = useState({
        email: "",
        password: ''
    })
    const [cartLength, setCartLength] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    let frontlogindata = useSelector((state) => state.frontendloginreducer.frontloginmsg)

    const logininfo = (e) => {
        const { name, value } = e.target
        setLoginstate((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const loginbtn = () => {
        if (loginstate.email === "abc123@gmail.com" && loginstate.password === "abc123") {
            navigate("/admin")
        } else {
            dispatch(loginaction(loginstate))
            setLoginboleanstate(true)
            setErrormsg(true)
            setCartLength(true);
        }
    }

    useEffect(() => {
        if (frontlogindata.Status == 200 && loginboleanstate) {
            localStorage.setItem("frontemail", frontlogindata.email);
            localStorage.setItem("frontuserid", frontlogindata.userId);
            navigate('/package')
            setLoginboleanstate(false)
        }
    }, [frontlogindata])

    useEffect(() => {
        setTimeout(() => setErrormsg(false), 15000)
    }, [errormsg])

    useEffect(() => {
        if (cartLength == true) {
            dispatch(lengthcartaction(localStorage?.getItem("frontuserid")))
        }
    }, [loginbtn])

    return (
        <Layout >
            <div className="padding_div">
                <div className="auth">
                    <MiniNav NavData={['login', 'Login']} />
                    <div className="container">
                        <div className="communication_text text-center mb-5 mt-3">
                            <h4>Communicate with us via <span> Zoom Video calls </span> and <span> Loom Recordings.</span></h4>
                        </div>
                        <div className="auth_main_div my-auth-main-div">
                            <div className="row justify-content-center">
                                <div className="col-md-12 col-lg-6 col-xl-7 auth_img text-center">
                                    <img src="./assets/images/login2.png" alt="loginvector" className="img-fluid " />
                                </div>
                                {/* <img src="./assets/images/loginvector.png" alt="loginvector" className='col-md-6 col-lg-6 img-fluid p-0  auth_img' /> */}
                                <div className="col-md-12 col-lg-6 col-xl-5 auth_content">
                                    <div className="meeting_record">
                                        <div className="row ">
                                            <div className="col-md-6 col-lg-6  d-flex align-items-center justify-content-center auth_icon_text">
                                                <div className=" auth_icon me-2">

                                                    <BsFillCameraVideoFill className='connectIcon' size={13} />
                                                </div>
                                                <span> Schedule a meeting</span>
                                            </div>
                                            <div className="col-md-6 col-lg-6  d-flex align-items-center auth_icon_text">
                                                <div className=" me-2 auth_icon">
                                                    {/* <SiLoom className='connectIcon' size={13} /> */}
                                                    <Loom disable={true} />
                                                </div>
                                                <span>Record with Loom</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="For_padding">
                                        <div className="text-center pt-4 pb-3 auth_header">
                                            <h2>LOGIN</h2>
                                        </div>
                                        <Stack sx={{ width: '100%' }} spacing={2}>
                                            {frontlogindata.Status == 200 && errormsg ? <Alert severity="success">Login Successfully</Alert>
                                                : frontlogindata.Status == 500 && errormsg ? <Alert severity="error">Sorry Your Account is Deactivated</Alert>
                                                    : frontlogindata.Status == 404 && errormsg ? <Alert severity="error">Invalid Cerenditials</Alert>
                                                        : frontlogindata.Status == 401 && errormsg ? <Alert severity="error">Sorry Email Did Not Exist, Create New Account</Alert>
                                                            : null}
                                        </Stack>
                                        <div className="auth_input">
                                            <div className="mb-3">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">User Name <span>*</span></label>
                                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="User Name" name='email' value={loginstate.email} onChange={logininfo} />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="exampleFormControlInput1" className="form-label">Password <span>*</span></label>
                                                <input type="password" className="form-control" id="exampleFormControlInput1" placeholder="Password" name='password' value={loginstate.password} onChange={logininfo} />
                                            </div>
                                            {/* <div className="login_check">
                                                <input className="form-check-input mt-1" type="checkbox" value="" id="flexCheckDefault" />
                                                <label className="form-check-label" for="flexCheckDefault">
                                                    &nbsp;   Remember me
                                                </label>
                                            </div> */}
                                            <div className="row">
                                                <div className="col-md-12 col-lg-12 mt-4">
                                                    <button className="btn  w-100 auth_btn" onClick={loginbtn} disabled={!loginstate.email || !loginstate.password} >
                                                        Login
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="user mt-3">
                                                <div className="row">
                                                    <div className='col-md-6 col-lg-6 span_link '>New User? <NavLink to='/register' className='user_link'>Register</NavLink></div>
                                                    <div className='col-md-6 col-lg-6 span_link '>Login As <NavLink to='/Admin' className='user_link'>Admin</NavLink></div>
                                                    {/* <div className='col-md-6 col-lg-6   forget_password'><i><a href=""> Forget your password</a></i></div> */}
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login