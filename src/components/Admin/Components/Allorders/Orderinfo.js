import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import Layout from '../../Pages/Layout';
import { Paper, Box, Typography } from '@mui/material';
import "react-data-table-component-extensions/dist/index.css";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './adminorder.css'
import { adminorderbyid } from '../../../../redux/action/Action';


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
  chat: {
    backgroundColor: '#d0989b',
    color: '#fff',
    outline: 'none',
    border: '1px solid #d0989b',
    fontSize: '17px',
    textTransform: 'capitalize',
    padding: '5px 10px'

  },
}))

const Orderinfo = () => {
  const [subtotal, setSubtotal] = useState(0)
  const [subtotalproduct, setSubtotalproduct] = useState(0)
  const [discount, setDiscount] = useState(0)
  const toggleState = useSelector((state) => state.togglingReducer.togglingAll)

  const adminorderbyidreducerdata = useSelector((state) => state.adminallorderbyidreducer.adminorderallbyid)

  // console.log("adminorderbyidreducerdata",adminorderbyidreducerdata)
  const Navigate = useNavigate();
  const dispatch = useDispatch()

  const userid = useParams()

  const classes = useStyle()

  const handlechat = (id) => {
    dispatch(adminorderbyid(id)).then(() => Navigate(`/admin/adminchatting/${id}`))
  }
  const handleMeeting = (id) => {
    Navigate(`/admin/meetings/${id}`)
  }

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
                Order Details
              </Typography>
            </Box>
            <Box style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5" component="h5" sx={{ marginBottom: '5px !important', fontSize: '19px' }}>
                {/* Order Number : {adminorderbyidreducerdata != [] ? adminorderbyidreducerdata[0]?.order_number : null} */}
                Order Number : {adminorderbyidreducerdata != [] ? `FR${adminorderbyidreducerdata[0]?.order_number}L` : null}
              </Typography>
              <Typography variant="h5" component="h5" sx={{ marginBottom: '20px !important', fontSize: '19px' }}>
                {/* Order Date : {adminorderbyidreducerdata != [] ? adminorderbyidreducerdata[0]?.order_date : null} */}
                Order Date : {adminorderbyidreducerdata != [] ? new Date(`${adminorderbyidreducerdata[0]?.order_created_at}`).toLocaleString() : null}
              </Typography>

              <Box>
                <button className={`${classes.chat} btn mx-2`} onClick={() => handlechat(adminorderbyidreducerdata[0]?.order_id)}>Chat</button>
                <button className={`${classes.chat} btn mx-2`} onClick={() => handleMeeting(adminorderbyidreducerdata[0]?.order_id)}>Meetings</button>
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
                        <td>
                          {
                            item.addons != null ?
                              <div className='admin-orderinfo-addon-name'>
                                <p>{item.order_item_product_name}</p>
                                {item.addons.map((v, index) => {
                                  return <p key={index} >{v.order_items_cart_addons_name} - ${v.order_items_cart_addons_price}</p>
                                })}
                              </div> :
                              <div>
                                <p>{item.order_item_product_name}</p>
                              </div>
                          }
                        </td>
                        <td><p>{item.order_item_qty}</p></td>
                        <td><p>${parseFloat(item.order_item_price).toFixed(2)}</p></td>
                        <td><p>${parseFloat(item.order_item_qty * item.order_item_price).toFixed(2)}</p></td>
                      </tr>
                    )
                  })}
                  {/* <tr>
                        <th colSpan={4}></th>
                        <th>Sub total : {subtotalproduct}</th>
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
              <Box>
                <button className={`${classes.chat} btn`} onClick={() => goBack()}>Cancel</button>
              </Box>
            </Paper>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Orderinfo