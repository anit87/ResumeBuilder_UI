import React, { useEffect, useState, useRef } from 'react';
import './checkout.css'
import Layout from '../../Layout/Layout';
import MiniNav from '../MiniNav/MiniNav';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { cartaction, shippingaction, orderdetailaction, paypalsave } from '../../redux/action/Action';
import { useDispatch, useSelector } from 'react-redux';
import { apiURL } from '../../../src/components/Admin/Components/Api/BaseLine'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Alert from '@mui/material/Alert';
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import ButtonWrapper from './ButtonWrapper';
import { paypalClientId } from '../../../src/components/Admin/Components/Api/BaseLine';


const Checkout = () => {
    const currency = "USD";

    const [shippingadress, setShippingadress] = useState({
        email: localStorage.getItem('frontemail'),
        country: '',
        firstname: '',
        lastname: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        pincode: '',
        customer_id: localStorage.getItem('frontuserid')
    })



    const [errormsgcheckout, setErrormsgcheckout] = useState(false)

    // console.log("shippingadress",shippingadress)

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const checkoutdatareducer = useSelector((state) => state.cartreducer.datacart);

    // console.log("checkoutdatareducer",checkoutdatareducer)
    const [checksubtotal, setChecksubtotal] = useState(0);
    const [cartid, setCartid] = useState([]);
    // const [productname,setProductname] = useState([]);
    // console.log("cartid",cartid)

    const [coupondetails, setCoupondetails] = useState({
        order_coupon_name: '',
        order_discount_amount: 0,
    })

    const [orderDetails, setOrderDetails] = useState({
        customer_id: '',
        order_subtotal: '',
        order_discount_amount: '',
        order_coupon_name: '',
        order_net_amount: '',
        crt_id: '',

    })
    const returncart = () => {
        navigate('/cart')
    }

    const updatevalue = (e) => {
        let { name, value } = e.target;
        setShippingadress((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const updatevaluecountry = (e) => {
        setShippingadress((prev) => {
            return {
                ...prev,
                country: e
            }
        })
    }

    const updatevaluestate = (e) => {
        setShippingadress((prev) => {
            return {
                ...prev,
                state: e
            }
        })
    }

    const gettransectionpprove = (paypaltransectionid, paypalorderid, paypalstatus) => {
        // console.log("in parentssss",paypaltransectionid,paypalorderid,paypalstatus)
        const data = { paypaltransectionid: paypaltransectionid, paypalorderid: paypalorderid, paypalstatus: paypalstatus, cartid:cartid[0] }
        dispatch(paypalsave(data)).then(() => navigate(`/paypalthankyou/${data.paypalorderid}`))


    }

    const continueshipping = (paypalorderid) => {
        if (shippingadress.firstname != '' && shippingadress.lastname != '' && shippingadress.address != '' && shippingadress.email != ''
            && shippingadress.country != '' && shippingadress.city != '' && shippingadress.state != '' && shippingadress.pincode != '') {
            dispatch(shippingaction(shippingadress))
            dispatch(orderdetailaction({ orderDetails: orderDetails, paypalorderid: paypalorderid }))
            // .then(()=>navigate('/order'))
        }
        else {
            setErrormsgcheckout(true)
        }

    }

    useEffect(() => {
        let initialcheckout = 0
        let initilacartid = []
        // let initilaproductname = []
        checkoutdatareducer.map((item) => {
            initialcheckout += parseFloat(item.cart_price * item.cart_qty)
            initilacartid.push(item.cart_id)
            // initilaproductname.push(item.product_name)
        })
        setChecksubtotal(initialcheckout)
        setCartid(initilacartid)
        // setProductname(initilaproductname)
    }, [checkoutdatareducer])

    useEffect(() => {
        dispatch(cartaction(localStorage.getItem("frontuserid")))
    }, [])


    useEffect(() => {
        setOrderDetails({
            customer_id: localStorage.getItem('frontuserid'),
            order_subtotal: checksubtotal,
            order_discount_amount: coupondetails.order_discount_amount,
            order_coupon_name: coupondetails.order_coupon_name,
            order_net_amount: parseFloat(checksubtotal - coupondetails.order_discount_amount),
            crt_id: cartid,

            // product_name:productname,
        })
    }, [cartid, checksubtotal, coupondetails])

    return (
        <Layout>
            <div className='padding_div'>
                <MiniNav NavData={['checkout', 'Checkout']} />
                <div className='checkout_form_section'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-8 col-md-12  order-lg-1 order-md-2 order-2'>
                                <div className='checkout_form'>
                                    <div className='errormsgcheckout'>
                                        {errormsgcheckout && <Alert severity="error">All Fields Required!</Alert>}
                                    </div>
                                    <div className='form_heading'>
                                        <div className='checkout_form_heading'>
                                            <h4>Contact information</h4>
                                        </div>
                                    </div>
                                    <div className='checkout_form_div'>
                                        <form>
                                            <div className="form-group">
                                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={updatevalue} value={shippingadress.email} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="exampleFormControlSelect1" className='shipping_label'>Shipping address<span>*</span></label>

                                                <CountryDropdown
                                                    className="form-control"
                                                    value={shippingadress.country}
                                                    name="country"
                                                    onChange={updatevaluecountry} />
                                            </div>
                                            <div className="form-row row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputEmail4" className='firstname_checkout'>First name<span>*</span></label>
                                                    <input type="text" className="form-control" id="inputEmail4" placeholder="First name" name="firstname" value={shippingadress.firstname} onChange={updatevalue} />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="inputPassword4" className='lastname_checkout'>Last name(optional)<span>*</span></label>
                                                    <input type="text" className="form-control" id="inputPassword4" placeholder="Last name" name="lastname" onChange={updatevalue} value={shippingadress.lastname} />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Address (Required)" name="address" onChange={updatevalue} value={shippingadress.address} />
                                            </div>
                                            <div className="form-group">
                                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Apartment, suite, etc. (optional)" name="apartment" onChange={updatevalue} value={shippingadress.apartment} />
                                            </div>
                                            <div className="form-row row">

                                                <div className="form-group col-md-4">
                                                    <RegionDropdown
                                                        className="form-control"
                                                        country={shippingadress.country}
                                                        name="state"
                                                        value={shippingadress.state}
                                                        onChange={updatevaluestate} />
                                                </div>
                                                <div className="form-group col-md-4">

                                                    <input type="text" className="form-control" id="inputEmail4" placeholder="City (Required)" name="city" value={shippingadress.city} onChange={updatevalue} />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <input type="text" className="form-control" id="inputPassword4" placeholder="Zip code (Required)" name="pincode" onChange={updatevalue} value={shippingadress.pincode} />
                                                </div>
                                            </div>

                                            <div className='checkout_form_submit'>
                                                <button type="button" className="btn return_button" onClick={returncart}><span><ChevronLeftIcon /></span>Return to cart</button>
                                                {(shippingadress.firstname != '' && shippingadress.lastname != '' && shippingadress.address != '' && shippingadress.email != ''
                                                    && shippingadress.country != '' && shippingadress.city != '' && shippingadress.state != '' && shippingadress.pincode != '')
                                                    ? <div className='paypal-button'>
                                                        <button type="button" className="btn submit_btn" onClick={continueshipping}>Place Order</button>
                                                        <PayPalScriptProvider
                                                            options={{
                                                                "client-id": paypalClientId,
                                                                components: "buttons",
                                                                currency: "USD"
                                                            }}
                                                        >
                                                            <ButtonWrapper
                                                                currency={currency}
                                                                showSpinner={false}
                                                                continueshipping={continueshipping}
                                                                gettransectionpprove={gettransectionpprove}
                                                                checksubtotal={checksubtotal}
                                                            />
                                                        </PayPalScriptProvider>
                                                    </div>
                                                    : <button type="button" className="btn submit_btn befor-submit-place" >Place Order</button>}
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-12 order-lg-2 order-1 order-md-1'>
                                <div className='checkout_sidebar'>
                                    {checkoutdatareducer.map((item, i) => {
                                        return (
                                            <div className='book_details' key={i} >
                                                <div className='book_image_detail'>
                                                    <div className='book_image'>
                                                        {item?.image ? <img src={`${apiURL}${item?.image}`} alt="book" /> : <img src='/assets/images/loginvector.png' alt='procduct' />}
                                                    </div>
                                                    <div className='book_name'>
                                                        {item.addons != null ? <div className='checkout-addon-name'><h3>{item.product_name}</h3>{item.addons.map((v, ind) => { return <p key={ind} >{v.addons_name} - ${v.addons_price}</p> })}</div> : <h3>{item.product_name}</h3>}

                                                    </div>
                                                </div>
                                                <div className='book_price'>
                                                    <h4>{`$${parseFloat(item.cart_price * item.cart_qty).toFixed(2)}`}</h4>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                    <div className='totalDiv'>
                                        <h4>Total</h4>
                                        <h4>{`$${parseFloat(checksubtotal).toFixed(2)}`}</h4>

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

export default Checkout