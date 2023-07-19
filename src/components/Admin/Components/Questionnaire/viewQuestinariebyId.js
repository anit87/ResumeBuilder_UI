import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import Layout from '../../Pages/Layout';
import { Paper, Box, Button, Typography } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
// import './adminorder.css'
import { adminorderbyid, adminQuestionnaireById } from '../../../../redux/action/Action';



const useStyle = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(15),
        width: '100%',
    },
    table: {
        margin: 'auto',
        marginBottom: "70px"
    }
}))


const QuestionnaireId = () => {

    const toggleState = useSelector((state) => state.togglingReducer.togglingAll)
    const adminorderbyidreducerdata = useSelector((state) => state.adminallorderbyidreducer.adminorderallbyid)
    const GetIntakeFrmData = useSelector((state) => state.AdminQuestionnaireIdReducer.adminQuestionnaireDataId)
    // console.log("Get Intake Frm Data", GetIntakeFrmData, "  -  ", adminorderbyidreducerdata)

    const Navigate = useNavigate();
    const dispatch = useDispatch()

    const classes = useStyle()
    const userid = useParams()
    let id = userid.id
    let response = id.split("/");
    // console.log("userid", response)

    const goBack = () => {
        Navigate(`/admin/questionnaire`)
    }


    useEffect(() => {
        dispatch(adminQuestionnaireById(response[0]))
    }, [])
    useEffect(() => {
        dispatch(adminorderbyid(response[1]))
    }, [])

    return (
        <>
            <Layout>
                <div className={classes.root} >

                    <div style={{ position: 'absolute', right: 0, left: toggleState ? 300 : 0, width: toggleState ? '70%' : '90%', transition: '.3s all', margin: 'auto' }}>
                        <Box sx={{ marginBottom: '40px' }}>
                            <Typography variant="h5" component="h5" sx={{ marginBottom: '5px !important', fontSize: '25px', }}>
                                Order Details
                            </Typography>
                        </Box>
                        <Box style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6" component="h6" sx={{ marginBottom: '20px !important', fontSize: '19px' }}>
                                Order Number : {adminorderbyidreducerdata != [] ? `FR${adminorderbyidreducerdata[0]?.order_number}L` : null}
                            </Typography>
                            <Typography variant="h5" component="h5" sx={{ marginBottom: '20px !important', fontSize: '19px' }}>
                                {/* Order Date : {adminorderbyidreducerdata != [] ? adminorderbyidreducerdata[0]?.order_date : null} */}
                                Order Date : {adminorderbyidreducerdata != [] ? new Date(`${adminorderbyidreducerdata[0]?.order_created_at}`).toLocaleString() : null}
                            </Typography>
                            <Box>
                                <Button sx={{ marginRight: '10px !important', backgroundColor: '#d0989b !important' }}
                                    onClick={goBack}
                                    variant="contained"
                                    className='popup-update-btn' >
                                    Back
                                </Button>
                            </Box>
                        </Box>
                        <Box style={{ marginBottom: '20px' }}>
                            <Typography variant="h6" component="h6" sx={{ marginBottom: '20px !important' }}>
                                Customer Details
                            </Typography>
                            <Typography variant="h6" component="h6" sx={{ marginBottom: '20px !important', fontSize: '18px !important' }}>
                                Name : {adminorderbyidreducerdata != [] ? adminorderbyidreducerdata[0]?.cust_fname + ' ' + adminorderbyidreducerdata[0]?.cust_lname : null}
                            </Typography>
                            <Typography variant="h6" component="h6" sx={{ marginBottom: '20px !important', fontSize: '18px !important' }}>
                                Email : {adminorderbyidreducerdata != [] ? adminorderbyidreducerdata[0]?.cust_email : null}
                            </Typography>
                            <hr />
                        </Box>
                        <Paper elevation={0} className={classes.table}>
                            <Box sx={{ marginBottom: '40px' }}>
                                <Typography variant="h5" component="h5" sx={{ marginBottom: '5px !important', fontSize: '25px', }}>
                                    Questionnaire Form Detail
                                </Typography>
                            </Box>
                            {/*--------------- ----------To see filled intake forms ----------------------------*/}
                            <div className='fron-order-detail-div' style={{ marginBottom: "20px" }}>
                                <div className='customer-intakefrm-table'>
                                    {(typeof GetIntakeFrmData == 'object' && GetIntakeFrmData.length>0)  ? GetIntakeFrmData?.map((item, i) => {
                                        return (
                                            <div key={i} className='customer-intake-form'>
                                                <div className='container'>
                                                    <div className='div-last-edited'>
                                                        <h5 className='customer-data-heading'>Last Updated On : </h5>
                                                        <p>{item.stepfrm_updated_at}</p>
                                                    </div>
                                                    <div className='div-wrapper'>
                                                        <h4 className='customer-data-heading'>Personal Information</h4>
                                                        <div className='row'>
                                                            <div className='col-md-6'>
                                                                <h6><span>First Name :</span> {item.stepfrm_name}</h6>
                                                                <h6><span>Email :</span> {item.stepfrm_email}</h6>
                                                            </div>
                                                            <div className='col-md-6'>
                                                                <h6><span>Last Name :</span> {item.stepfrm_lName}</h6>
                                                                <h6><span>Phone:</span> {item.stepfrm_phone}</h6>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='div-wrapper'>
                                                        <h4 className='customer-data-heading'>Address</h4>
                                                        <div className='row'>
                                                            <div className='col-md-6'>
                                                                <h6><span>Location :</span> {item.stepfrm_address}</h6>
                                                                <h6><span>City :</span> {item.stepfrm_city}</h6>
                                                                <h6><span>Country :</span> {item.stepfrm_country}</h6>
                                                            </div>
                                                            <div className='col-md-6'>
                                                                <h6><span>Appartment :</span> {item.stepfrm_appartment}</h6>
                                                                <h6><span>Zip Code :</span> {item.stepfrm_postal_code}</h6>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='div-wrapper'>
                                                        <h4 className='customer-data-heading'>Education</h4>
                                                        <div className='row'>
                                                            <div className='col-md-6'>
                                                                <h6><span>Institution Name :</span> {item.stepfrm_institute}</h6>
                                                                <h6><span>Degree :</span> {item.stepfrm_degree}</h6>
                                                                <h6><span>Start Date :</span> {item.stepfrm_start_date}</h6>
                                                                <h6><span>Did You Graduate :</span> {item.stepfrm_graduation}</h6>
                                                                <h6><span>Linkedin :</span> {item.stepfrm_linkeDin}</h6>
                                                            </div>
                                                            <div className='col-md-6'>
                                                                <h6><span>Institution Location:</span> {item.stepfrm_location}</h6>
                                                                <h6><span>Concentration :</span> {item.stepfrm_concentration}</h6>
                                                                <h6><span>End Date :</span> {item.stepfrm_toend_date}</h6>
                                                                <h6><span>Graduation Date :</span> {item.stepfrm_graduation == "Yes" ? item.stepfrm_graduation_date : ""}</h6>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='div-wrapper'>
                                                        <h4 className='customer-data-heading'>Company Information</h4>
                                                        <div className='row'>
                                                            <div className='col-md-6'>
                                                                <h6><span>Company Name :</span> {item.stepfrm_company_name}</h6>
                                                                <h6><span>Dates of Employment: From :</span> {item.stepfrm_date_of_form}</h6>
                                                                <h6><span>Job Title  :</span> {item.stepfrm_job_title}</h6>
                                                            </div>
                                                            <div className='col-md-6'>
                                                                <h6><span>Company Address:</span> {item.stepfrm_company_address}</h6>
                                                                <h6><span>To :</span> {item.stepfrm_toemployment}</h6>
                                                                <h6><span>Direct Report  :</span> {item.stepfrm_direct_report}</h6>
                                                            </div>
                                                        </div>

                                                        <div className='row'>
                                                            <div className='col-md-12'>
                                                                <div className='othr-companyinfo'>
                                                                    <h6><span>Description of duties and achievements :</span> </h6>
                                                                    <div dangerouslySetInnerHTML={{ __html: item.stepfrm_description }} />
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className='div-wrapper'>
                                                        <h4 className='customer-data-heading'>Technical Skills</h4>
                                                        <div className='row'>
                                                            <div className='col-md-12'>
                                                                <div className='technical-skil-div'>
                                                                    <div dangerouslySetInnerHTML={{ __html: item.stepfrm_techinical_skill }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='div-wrapper'>
                                                        <h4 className='customer-data-heading'>Other Information</h4>
                                                        <div className='row'>
                                                            <div className='col-md-12'>
                                                                <div className='other-info-div'>
                                                                    <div dangerouslySetInnerHTML={{ __html: item.stepfrm_other_info }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    }) : <h6>No Form Filled By User</h6>}
                                </div>
                            </div>
                        </Paper>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default QuestionnaireId