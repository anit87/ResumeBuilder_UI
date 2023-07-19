import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import Layout from '../../Pages/Layout';
import { Paper, Box, Button, Typography } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './adminorder.css'
import { adminorderbyid, updateOrderStatus } from '../../../../redux/action/Action';



const useStyle = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(15),
        width: '100%',
    },
    table: {
        margin: 'auto',
    },
    edit_btn: {
        color: '#44449b'
    },
    delete_btn: {
        color: '#d0989b'
    },
}))


const Editorder = () => {
    const [subtotal, setSubtotal] = useState(0)
    const [subtotalproduct, setSubtotalproduct] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [statusValue, setStatusValue] = useState("")

    const toggleState = useSelector((state) => state.togglingReducer.togglingAll)
    const adminorderbyidreducerdata = useSelector((state) => state.adminallorderbyidreducer.adminorderallbyid)
    const updatedOrderStatus = useSelector((state) => state.adminallorderbyidreducer.updatedOrderStatus)

    const Navigate = useNavigate();
    const dispatch = useDispatch()

    const classes = useStyle()
    const userid = useParams()

    const goBack = () => {
        Navigate(`/admin/order`)
    }

    useEffect(() => {
        let subtotal = 0
        adminorderbyidreducerdata.map((item) => {
            subtotal += parseInt(item.order_subtotal)
        })
        setSubtotal(subtotal)
        setSubtotalproduct(adminorderbyidreducerdata[0]?.order_subtotal)
    }, [adminorderbyidreducerdata])

    useEffect(() => {
        dispatch(adminorderbyid(userid.id))

    }, [])
    return (
        <>
            <Layout>
                <div className={classes.root} >

                    <div style={{ position: 'absolute', right: 0, left: toggleState ? 300 : 0, width: toggleState ? '70%' : '90%', transition: '.3s all', margin: 'auto' }}>
                        <Box sx={{ marginBottom: '40px' }}>
                            <Typography variant="h5" component="h5" sx={{ marginBottom: '5px !important', fontSize: '25px', }}>
                                Edit Order
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
                                <select className="form-select" onChange={(e) => setStatusValue(e.target.value)} aria-label="Default select example">
                                    <option defaultValue>Change Status</option>
                                    <option value={0}>Pending</option>
                                    <option value={1}>Fullfill</option>
                                    <option value={2}>Delay</option>
                                </select>
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
                        </Box>

                        <Paper elevation={0} className={classes.table}
                        >
                            <table className="table admin-order-table">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Product Quantity</th>
                                        <th scope="col">Product Price</th>
                                        <th scope="col">Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {adminorderbyidreducerdata.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td><p>{item.order_item_product_name}</p></td>
                                                <td><p>{item.order_item_qty}</p></td>
                                                <td><p>${parseFloat(item.order_item_price).toFixed(2)}</p></td>
                                                <td><p>${parseFloat(item.order_item_qty * item.order_item_price).toFixed(2)}</p></td>
                                            </tr>
                                        )
                                    })}
                                    {/* <tr>
                                      <th colSpan={4}></th>
                                      <th>Sub total : {parseFloat(subtotalproduct).toFixed(2)}</th>
                                  </tr>
                                  <tr>
                                      <th colSpan={4}></th>
                                      <th >Discount : {discount}</th>
                                  </tr> */}
                                    <tr>
                                        <th colSpan={4}></th>
                                        <th ><p>Total : ${parseFloat(subtotalproduct - discount).toFixed(2)}</p></th>
                                    </tr>

                                </tbody>
                            </table>
                        </Paper>
                        <Box>
                            <Button sx={{ marginRight: '10px !important', backgroundColor: '#d0989b !important' }} onClick={goBack}
                                variant="contained"
                                className='popup-update-btn'
                            >
                                Cancel
                            </Button>
                            <Button sx={{ backgroundColor: '#d0989b !important' }}
                                variant="contained"
                                className='popup-update-btn'
                                onClick={() => (dispatch(updateOrderStatus({ id: userid.id, order_status: statusValue })), goBack())}
                            >
                                Update Order Status
                            </Button>

                        </Box>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Editorder