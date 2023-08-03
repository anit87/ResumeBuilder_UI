import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import './dashboard.css'
import Layout from '../../Pages/Layout';
import Table from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Paper, Box, Button, Typography, TextField } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useSelector, useDispatch } from 'react-redux';
import { toggle } from '../../../../redux/action/Action';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { BsPeople } from 'react-icons/bs';
import { FcQuestions } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';
import { allFaqData, Allcustomer } from '../../../../redux/action/Action';
import { deleteFaq } from '../../../../redux/action/Action'
import { getIdToEditFAQ } from '../../../../redux/action/Action'
import Swal from "sweetalert2";
import LineChart from './linechart';

const useStyle = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(20),
        width: '100%',
    },
    table: {

        //  width:'90%',
        margin: 'auto',

    },
    edit_btn: {
        color: '#44449b'
    },
    delete_btn: {
        color: '#e13d3d'

    },
}))

const AdminDashboard = () => {

    const classes = useStyle()

    const dispatch = useDispatch()

    const Navigate = useNavigate();

    const toggleState = useSelector((state) => state.togglingReducer.togglingAll)

    const getFaqAllData = useSelector((state) => state.GetFaqDataReducer.FaqAllData)

    const getallcustomer = useSelector((state) => state.getallcustomer.customerData)


    let FaqLength = getFaqAllData?.length
    let CustomersLength = getallcustomer.length

    const FaqData = () => {
        Navigate('/admin/allfaq')
    }
    const CustomersData = () => {
        Navigate('/admin/allcustomer')
    }

    useEffect(() => {
        dispatch(toggle())
        dispatch(allFaqData())
        dispatch(Allcustomer())

    }, [allFaqData, Allcustomer])
    return (

        <>
            <Layout>
                <div className={classes.root} >

                    <div className={classes.student}>
                        <Paper elevation={0} className={classes.table}
                            style={{ position: 'absolute', right: 0, left: toggleState ? 300 : 0, width: toggleState ? '80%' : '90%', transition: '.3s all', }}>
                            <div className='upper_section'>
                                <div className='container'>
                                    <div className='row' >
                                        <div className='col-md-7 d-flex'>
                                            <div className='w-100'>
                                                <div className='row'>

                                                    <div className="col-md-5 cardleft" >
                                                        <div className="card-body cardone">
                                                            <h5 className="card-title">FAQ</h5>
                                                            <p className="card-text"> Check and Review All Faq Questions</p>
                                                            <button className='btn  card-btn cardbdybtn' onClick={FaqData}>GO</button>
                                                        </div>
                                                    </div>
                                                    {/* <div className="col-md-5 cardleft" >
                                                        <div className="card-body cardtwo">
                                                            <h5 className="card-title">Packages</h5>
                                                            <p className="card-text"></p>
                                                            <button className='btn  card-btn cardbdybtn'>GO</button>
                                                        </div>
                                                    </div> */}

                                                    <div className="col-md-5 cardleft">
                                                        <div className="card-body cardtwo">
                                                            <h5 className="card-title">Customers</h5>
                                                            <p className="card-text"> Can Check Customers Status and Details</p>
                                                            <button className='btn  card-btn cardbdybtn' onClick={CustomersData}>GO</button>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>

                                        </div>
                                        <div className="col-md-5 right-box">
                                            <div className='total-cstmrs'>
                                                <div className='total-cstmrs-body'>
                                                    <span><BsPeople />  Customers </span>
                                                    <div className='allcstmrs'> {CustomersLength}</div>
                                                </div>
                                                <div className='total-cstmrs-body'>
                                                    <span><FcQuestions />  Faq </span>
                                                    <div className='allcstmrs'> {FaqLength}</div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='lower_section'>
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col-md-12 lwrchart'>
                                            {/* <LineChart/> */}
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </Paper>


                    </div>
                </div>
            </Layout>
        </>
    )
}

export default AdminDashboard