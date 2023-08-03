import React, { useState } from 'react';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { Stack, Alert } from '@mui/material';
import { SiLoom } from 'react-icons/si';
import './Auth.css';
import MiniNav from '../../components/MiniNav/MiniNav';
import Layout from '../../Layout/Layout';
import { NavLink } from 'react-router-dom';
import { AddCustomersData } from '../../redux/action/Action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';


const Register = () => {

    const [addRegisterData, setAddRegisterData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
    })


    const [passwordValidtion, setPasswordValidtion] = useState({
        capsLetter: false,
        numberCheck: false,
        pwdLength: false,
        specialChar: false,

    })

    const [emailValidation, setEmailValidation] = useState({
        emailValid: false
    })


    const [resMessage, setResMessage] = useState({
        errorMessage: 'errormsghide',
        errorMsg: 'errormsghide',
        errordecline: 'errormsghide',
        errorpassword: 'errormsghide',
        erroremail: 'errormsghide',

    })



    const [checkbox, setCheckbox] = useState(false)
    const [show, setShow] = useState(true)
    const [msgClas, setMsgClas] = useState('')

    let dispatch = useDispatch()

    const AddNewCustomersReducer = useSelector((state) => state.addCustomersreducer.ADDCUSTOMERVALUE)


    const emailHandleChange = (e) => {
        const { name, value } = e.target;
        let emailValid = /\S+@\S+\.\S+/.test(value)
        setEmailValidation({
            emailValid
        });

    }

    const PasswordHandleChange = (e) => {
        const { name, value } = e.target;
        const capsLetter = /[A-Z]/.test(value);
        const numberCheck = /[0-9]/.test(value);
        const pwdLength = value.length >= 6;
        const specialChar = /[!@#$%^&*?_=+-]/.test(value);
        setPasswordValidtion({
            capsLetter,
            numberCheck,
            pwdLength,
            specialChar,
        })
    }

    const CheckBoxHandler = (e) => {
        setCheckbox(!checkbox)
    }

    const AddDataChangeHandle = (e) => {
        const { name, value } = e.target;
        setAddRegisterData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    }


    const AddData = (e) => {
        e.preventDefault();
        setShow(true)
        let { password, confirm_password, email, first_name, last_name } = addRegisterData;
        if (password && confirm_password && email && first_name && last_name != '') {
            if (passwordValidtion.capsLetter && passwordValidtion.numberCheck && passwordValidtion.pwdLength &&
                passwordValidtion.specialChar == true) {
                if (emailValidation.emailValid == true) {
                    if (password == confirm_password) {
                        dispatch(AddCustomersData(addRegisterData))
                            .then(() => {
                                setResMessage({
                                    errorMessage: 'errormsghide',
                                    errorMsg: 'errormsgshow',
                                    errordecline: 'errormsghide',
                                    errorpassword: 'errormsghide',
                                    erroremail: 'errormsghide',
                                })
                                setMsgClas('message_cls')
                            })
                    } else {
                        setResMessage({
                            errorMessage: 'errormsghide',
                            errorMsg: 'errormsghide',
                            errordecline: 'errormsghide',
                            errorpassword: 'errormsgshow',
                            erroremail: 'errormsghide',


                        })
                    }
                } else {
                    setResMessage({
                        errorMessage: 'errormsghide',
                        errorMsg: 'errormsghide',
                        errordecline: 'errormsghide',
                        errorpassword: 'errormsghide',
                        erroremail: 'errormsgshow',

                    })

                }
            } else {
                setResMessage({
                    errorMessage: 'errormsgshow',
                    errorMsg: 'errormsghide',
                    errordecline: 'errormsghide',
                    errorpassword: 'errormsghide',
                    erroremail: 'errormsghide',


                })
            }
        } else {
            setResMessage({
                errorMessage: 'errormsghide',
                errorMsg: 'errormsghide',
                errordecline: 'errormsgshow',
                errorpassword: 'errormsghide',
                erroremail: 'errormsghide',


            })
        }

    }

    useEffect(() => {
        // dispatch(AddCustomersData())
    }, [AddNewCustomersReducer])

    useEffect(() => {
        let timeId = setTimeout(() => {
            setShow(false)
        }, 7000)
        return () => {
            clearTimeout(timeId)
        }
    }, [show])


    return (
        <Layout >

            <div className="padding_div">
                <div className="auth">
                    <MiniNav NavData={['register', 'Signup']} />
                    <div className="container">
                        <div className="communication_text text-center mb-5 mt-3">
                            <h4>Communicate with us via <span> Zoom Video calls </span> and <span> Loom Recordings.</span></h4>
                        </div>
                        <div className="auth_main_div my-auth-main-div">
                            <div className="row justify-content-center">
                                <div className="col-md-12 col-lg-6 col-xl-7 auth_img auth_img_register d-flex justify-content-center align-items-center">
                                    <img src="./assets/images/sign2.png" alt="loginvector" className="img-fluid " />
                                </div>
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
                                                    <SiLoom className='connectIcon' size={13} />
                                                </div>
                                                <span>Record with Loom</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="for_register_padding">
                                        <div className="text-center pt-4 pb-5 auth_header">
                                            <h2>REGISTER</h2>
                                            <p className='text-center'>Please fill in this form to create an account</p>

                                        </div>
                                        {show &&
                                            <div className='all-msg'>
                                                <div className={resMessage.errorMessage}>
                                                    <Stack spacing={2}>
                                                        <Alert className='message_cls' sx={{ width: '100% important' }} severity="error">
                                                            Password should be of minimum six characters that contain number, capital letter and special character.
                                                        </Alert>
                                                    </Stack>
                                                </div>
                                                <div className={resMessage.erroremail}>
                                                    <Stack spacing={2}>
                                                        <Alert className='message_cls' sx={{ width: '100% important' }} severity="error">
                                                            Please enter valid email
                                                        </Alert>
                                                    </Stack>
                                                </div>


                                                {AddNewCustomersReducer?.Status == 404 ?

                                                    <div className={resMessage.errorMsg}>
                                                        {AddNewCustomersReducer?.message !== '' ?
                                                            <Stack spacing={2}>
                                                                <Alert className={msgClas} sx={{ width: '100% important' }} severity="error">{AddNewCustomersReducer?.message}</Alert>
                                                            </Stack> : null
                                                        }
                                                    </div>
                                                    :
                                                    <div className={resMessage.errorMsg}>
                                                        <Stack spacing={2}>
                                                            {AddNewCustomersReducer?.message !== '' ?
                                                                <Alert className={msgClas} sx={{ width: '100% important' }} severity="success">
                                                                    {AddNewCustomersReducer?.message}
                                                                </Alert> : null
                                                            }
                                                        </Stack>
                                                    </div>
                                                }
                                                <div className={resMessage.errordecline}>
                                                    <Stack spacing={2}>
                                                        <Alert className='message_cls' sx={{ width: '100% important' }} severity="error">All Field Required</Alert>
                                                    </Stack>
                                                </div>
                                                <div className={resMessage.errorpassword}>
                                                    <Stack spacing={2}>
                                                        <Alert className='message_cls' sx={{ width: '100% important' }} severity="error">Password and Confirm Password Not Match</Alert>
                                                    </Stack>
                                                </div>
                                            </div>
                                        }


                                        <div className="auth_input register_input">
                                            <form >
                                                <div className="row">
                                                    <div className=" col-md-6 col-lg-6 mb-3">
                                                        <label htmlFor="exampleFormControlInput1" className="form-label">First Name <span>*</span></label>
                                                        <input type="text" autoComplete='' value={addRegisterData.first_name} name='first_name' className="form-control" id="exampleFormControlInput1" placeholder="First Name" onChange={AddDataChangeHandle} />
                                                    </div>
                                                    <div className="col-md-6 col-lg-6 mb-3">
                                                        <label htmlFor="exampleFormControlInput1" className="form-label">Last Name <span>*</span></label>
                                                        <input type="text" autoComplete='' value={addRegisterData.last_name} name='last_name' className="form-control" id="exampleFormControlInput2" placeholder="Last Name" onChange={AddDataChangeHandle} />
                                                    </div>
                                                    <div className=" col-md-12 col-lg-12 mb-3">
                                                        <label htmlFor="exampleFormControlInput1" className="form-label">Email <span>*</span></label>
                                                        <input type="email" autoComplete='' value={addRegisterData.email} name='email' onKeyUp={emailHandleChange} className="form-control" id="exampleFormControlInput3" placeholder="Email" onChange={AddDataChangeHandle} />
                                                    </div>
                                                    <div className=" col-md-12 col-lg-12 mb-3">
                                                        <label htmlFor="exampleFormControlInput1" className="form-label">Password <span>*</span></label>
                                                        <input type="password" autoComplete='' value={addRegisterData.password} name='password' className="form-control" id="exampleFormControlInput4" placeholder="Password" onKeyUp={PasswordHandleChange} onChange={AddDataChangeHandle} />
                                                    </div>
                                                    <div className=" col-md-12 col-lg-12 mb-3">
                                                        <label htmlFor="exampleFormControlInput1" className="form-label">Confirm Password <span>*</span></label>
                                                        <input type="password" autoComplete='' value={addRegisterData.confirm_password} name='confirm_password' className="form-control" id="exampleFormControlInput5" placeholder="Confirm Password" onChange={AddDataChangeHandle} />
                                                    </div>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input " type="checkbox" name='checkbox' value={addRegisterData.checkbox} id="flexCheckDefault" onChange={CheckBoxHandler} />
                                                    <label className="form-check-label terms " htmlFor="flexCheckDefault">
                                                        &nbsp; I accept the <a href="" className='user_link'>Terms of Use</a>  &#38; <a href="" className='user_link'> Privacy Policy.</a>
                                                    </label>
                                                </div>
                                                {checkbox == true ?
                                                    <div className="row">
                                                        <div className="col-md-12 col-lg-12 mt-4">
                                                            <button type='submit' className="btn  w-100 auth_btn" onClick={AddData}>REGISTER</button>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className="row">
                                                        <div className="col-md-12 col-lg-12 mt-4">
                                                            <div className="btn  w-100 authantication_btn_tw"  >REGISTER</div >
                                                        </div>
                                                    </div>}

                                                <div className=" mt-3 text-center mb-5">
                                                    <span className='new_user have_account'>Already have an account? <NavLink to="/login" className='user_link'>Login here</NavLink></span>
                                                </div>
                                            </form>
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

export default Register;

