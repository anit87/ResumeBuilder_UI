import React, { useState } from 'react';
import { ImEye } from 'react-icons/im';
import './Manage.css';
import Layout from '../../Layout/Layout';
import MiniNav from '../MiniNav/MiniNav';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllOrderManageAction, adminorderbyid, UserIntakeFormData } from '../../redux/action/Action';
import { useNavigate } from 'react-router-dom';
import Loadingspinner from '../Books/Loadingspinner';


const Manage_order = () => {

    const [successmsgorder, setSuccessmsgorder] = useState(false)
    const [loading, setLoading] = useState(false)
    const [orderNo, setOrderNo] = useState([])

    const mesfromorderreducer = useSelector((state) => state.orderplacereducer.orderplace)
    const manageAllOrders = useSelector((state) => state.AllManageOrderReducer.ManageOrderAll)
    const adminorderbyidreducerdata = useSelector((state) => state.adminallorderbyidreducer.adminorderallbyid)
    // console.log("manageAllOrders", manageAllOrders)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    let UserId = localStorage.getItem('frontuserid');

    const viewfun = (order_id) => {
        console.log("order_id", order_id)
        const checkuserid = order_id * 45 + 'Y2F0ZWdvcnk9d'
        dispatch(adminorderbyid(order_id)).then(() => navigate(`/orderdetail/${checkuserid}`))
    }
    const handleWriteResume = (order_number) => {
        const checkuserid = order_number
        // const checkuserid = orderId * 45 + 'Y2F0ZWdvcnk9d'
        navigate(`/stepperform/${checkuserid}`)
    }
    useEffect(() => {
        if (mesfromorderreducer.length != 0) {
            setSuccessmsgorder(true)
        } else {
            setSuccessmsgorder(false)
        }
    }, [mesfromorderreducer])

    useEffect(() => {
        let timeout = setTimeout(() => setSuccessmsgorder(false), 5000);
        return () => {
            clearTimeout(timeout);
        }
    }, [successmsgorder])

    useEffect(() => {
        dispatch(AllOrderManageAction(localStorage.getItem('frontuserid')))
    }, [])

    useEffect(() => {
        if (manageAllOrders.status) {
            setLoading(false)
        }
        else {
            setLoading(true)
        }
    }, [manageAllOrders])

    const ToPackageBtn = () => {
        navigate('/package')
    }
    return (
        <Layout >
            <div className="padding_div">
                <div className="hiding_mini_order"> <MiniNav NavData={['', '']} /></div>
                <div className="manage">
                    <div className="container">
                        <div className="manage_main">
                            <div className="manage_content">
                                <div className="manage_heading d-flex justify-content-between">
                                    <div className="manage_heading_text">
                                        <h3>Manage Orders</h3>
                                    </div>
                                </div>
                                <div className='table-responsive'>
                                    {loading
                                        ? <div className='no_table_data'>
                                            <Loadingspinner />
                                            <div className='no_data_available'>
                                                <div className='sample_inner_button_div'>
                                                    <button type="button" onClick={ToPackageBtn} className='btn sample_inner_button'>START YOUR FLAWLESS RESUME</button>
                                                </div>
                                            </div>
                                        </div>
                                        : manageAllOrders.length<1|| manageAllOrders.result.length < 1
                                            ? <div className='d-flex justify-content-center align-items-center' >
                                                <h6 className='m-4'>No Orders Found</h6>
                                            </div>
                                            : <table className="table mt-5">
                                                < tbody >
                                                    <tr className='main_tr '>
                                                        <td ></td>
                                                        <td> </td>
                                                        <td> <h5 className='d'>g</h5> </td>
                                                        <td> <h5></h5> </td>
                                                    </tr>
                                                    <tr className='main_tr'>
                                                        <td ><h5>ORDER ID</h5></td>
                                                        <td> <h5>TOTAL</h5> </td>
                                                        <td> <h5>ORDERS DATE</h5> </td>
                                                        <td> <h5>STATUS</h5> </td>
                                                        <td> </td>
                                                    </tr>
                                                    {manageAllOrders.result?.map((items, i) => {
                                                        return (
                                                            <tr key={i} className='main_tr'>
                                                                <td className='table_img' >{`FR${items?.order_number}L`}</td>
                                                                <td className='table_img' >${`${parseFloat(items?.order_subtotal).toFixed(2)}`}</td>
                                                                {/* <td className='table_img' >{items?.order_date}</td> */}
                                                                <td className='table_img' >{new Date(`${items?.order_created_at}`).toLocaleString()}</td>
                                                                {items.order_status == 1 ? <td className='table_img' >Completed</td> : <td className='table_img' >Failed</td>}
                                                                <td>
                                                                    <div className="d-flex justify-content-center questions_div">
                                                                        <button className="questions_btn " onClick={() => viewfun(items.order_id)}>
                                                                            <ImEye style={{ marginRight: "5px" }} size={20} className='mb-1' />
                                                                            View
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    {items?.prdct_type == true ?
                                                                        <div className="d-flex questions_div ">
                                                                            <button className='questions_btn' onClick={() => handleWriteResume(items.order_number)}>Questionnaire </button>
                                                                            {/* <button className='questions_btn' onClick={() => handleWriteResume(items.order_number)}>Questionnaire </button> */}
                                                                        </div>
                                                                        : null
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}

                                                </tbody>
                                            </table>}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Manage_order