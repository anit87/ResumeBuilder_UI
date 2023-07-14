import React from 'react';
import MiniNav from '../MiniNav/MiniNav';
import './Cart.css';
import { AiOutlineCloseSquare } from 'react-icons/ai';
import Layout from '../../Layout/Layout';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cartaction, deletecartaction, updatecartaction, lengthcartaction, AllCartCustItems } from '../../redux/action/Action';
import { useState } from 'react';
import { apiURL } from '../../../src/components/Admin/Components/Api/BaseLine'
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const Cart = () => {

    const [subtotal, setSubtotal] = useState(0)
    const [tax, setTax] = useState(0)
    const cartdatareducer = useSelector((state) => state.cartreducer.datacart)
    console.log("cartdatareducer", cartdatareducer)

    const [datafromapi, setDatafromapi] = useState([])

    const [singledata, setSingledata] = useState()

    const [updatedcartid, setUpdatedcartid] = useState([])
    const [updatedcartqty, setUpdatedcartqty] = useState([])

    // const [update_cart,setUpdate_cart] = useState([])

    // console.log("datafromapi",datafromapi)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deletecart = (id) => {
        Swal.fire({
            type: 'warning',
            icon: 'warning',
            text: 'Are you sure you want to delete Item?',
            showCancelButton: true,
            confirmButtonColor: '#507c37',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deletecartaction(id)).then(() => dispatch(cartaction(localStorage.getItem("frontuserid"))))
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved')
            }
        })

    }

    const proceedcheckout = (e) => {
        dispatch(updatecartaction(datafromapi))

        navigate('/checkout')
    }

    const updateqty = (e) => {
        let singledatata = {}
        let testingg = []
        let { id, value } = e.target;
        setUpdatedcartqty((prev) => {
            return [...prev, value]
        })
        setUpdatedcartid((prev) => {
            return [...prev, id]
        })
        datafromapi.map((v) => {
            if (v.cart_id == id) {

                singledatata = {
                    ...v,
                    cart_qty: parseFloat(value)
                }
                testingg.push(singledatata)
            } else {
                testingg.push(v)
            }
        })

        setDatafromapi(testingg)
        //    console.log("datafromapi",datafromapi)


    }


    const updatecartqty = () => {
        // update_cart.push({cart_id:updatedcartid,cart_qty:updatedcartqty})
        // dispatch(updatecartaction([{cart_id:updatedcartid,cart_qty:updatedcartqty}]))
        // console.log("datafromapi",datafromapi)
        dispatch(updatecartaction(datafromapi))
    }

    useEffect(() => {
        dispatch(AllCartCustItems(localStorage.getItem("frontuserid")))
        dispatch(updatecartaction(datafromapi))
    }, [updateqty])

    useEffect(() => {
        let beforedata = [];
        if (typeof cartdatareducer == "object") {
            cartdatareducer?.map((v) => {
                beforedata.push(v)
            })
            setDatafromapi(beforedata)
        }
    }, [cartdatareducer])

    useEffect(() => {
        let initialsubtotal = 0
        datafromapi?.map((item) => {
            initialsubtotal += item.cart_qty * item.cart_price
        })
        setSubtotal(initialsubtotal)

    }, [datafromapi])


    useEffect(() => {
        dispatch(cartaction(localStorage.getItem("frontuserid")))
        //   dispatch(lengthcartaction(localStorage.getItem("frontuserid")))
        dispatch(AllCartCustItems(localStorage.getItem("frontuserid")))


    }, [cartaction, AllCartCustItems])

    useEffect(() => {
        dispatch(AllCartCustItems(localStorage.getItem("frontuserid")))
    }, [deletecart])


    let Email = localStorage?.getItem("frontemail");

    return (
        <Layout>
            <div className="padding_div">
                <div className="cart">
                    <MiniNav NavData={['cart', 'Cart']} />
                    <div className="container">
                        <div className="cart_content">
                            <div className="row">
                                <div className="col-md-12 col-lg-12 col-xl-9">
                                    <div className="table-responsive my-table-mian-div">
                                        <table className="table" style={{ width: "100%" }}>
                                            <thead>
                                                <tr>
                                                    <th className='heading-center' scope="col" style={{ width: "46%" }}>Product</th>
                                                    <th scope="col" style={{ width: "10%" }}>Price</th>
                                                    <th scope="col" style={{ width: "10%" }}>Quantity</th>
                                                    <th scope="col" style={{ width: "10%" }}>Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {localStorage.getItem("frontuserid") != null ?
                                                    datafromapi?.map((item, index) => {
                                                        return (
                                                            <tr key={index} >
                                                                <td className='cart-table-td' >
                                                                    <button onClick={() => deletecart(item?.cart_id)}>
                                                                        <AiOutlineCloseSquare size={22} className="table-close-icon" />
                                                                    </button>
                                                                    <div className='cart-featured-image'>
                                                                        {item?.image ? <img src={`${apiURL}${item?.image}`} alt="book" /> : <img src='/assets/images/loginvector.png' alt='procduct' />}
                                                                    </div>
                                                                    {
                                                                        item.addons != null ?
                                                                            <div className='cart-addon-div'>
                                                                                <p>{item.product_name}</p>
                                                                                {
                                                                                    item.addons.map((v, i) => {
                                                                                        return <p key={i}>{v.addons_name} - ${v.addons_price}</p>
                                                                                    })
                                                                                }
                                                                            </div> :
                                                                            <p>{item.product_name}</p>
                                                                    }
                                                                </td>
                                                                <td >
                                                                    <p>{`$${parseFloat(item?.cart_price).toFixed(2)}`}</p>
                                                                </td>

                                                                <td className='cart-table-input'>
                                                                    {item.addons != null ? <input type="text" id={item?.cart_id} name="quantity" min="1" max='1' value={item?.cart_qty} disabled
                                                                    /> : <input type="number" id={item?.cart_id} name="quantity" min="1" value={item?.cart_qty}
                                                                        onChange={updateqty} />}
                                                                    {/* <input type="number" id={item?.cart_id} name="quantity" min="1" value={item?.cart_qty}
                                                                      onChange={updateqty} /> */}
                                                                </td>
                                                                <td>
                                                                    <p>{`$${parseFloat(item?.cart_price * item?.cart_qty).toFixed(2)}`}</p>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                    : null

                                                }
                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                                <div className="col-md-12 col-lg-12 col-xl-3 cart_checkout">
                                    <div className="cart_heading text-center ">
                                        <h4 className='pb-3 pt-3'>CART TOTALS</h4>
                                    </div>
                                    <div className="cart_amout">
                                        <div className="subtotal">
                                        </div>
                                        <div className="subtotal ">
                                            <div className="row">
                                                <h3 className='col-md-6 col-lg-6'>Total</h3>
                                                <h5 className='col-md-6 col-lg-6 final_total'>{`$${parseFloat(subtotal + tax).toFixed(2)}`}</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12 col-lg-12 cart_btn mb-3">
                                            <button onClick={proceedcheckout} className="btn  w-100 auth_btn" disabled={Email ? 0 : 1}>
                                                Proceed to Checkout
                                            </button>
                                        </div>
                                    </div>
                                    <div className="cart_check_links d-flex ">
                                        <div className="row justify-content-center">
                                            <div className="col-md-3 col-lg-3  col-sm-3 col-3 me-2 shop">
                                                <img src="./assets/images/shoppay_white.svg" alt="shoppay" />
                                            </div>
                                            <div className="col-md-3 col-lg-3  col-sm-3 col-3 me-2 paypal">
                                                <img src="./assets/images/paypal.svg" alt="paypal" />
                                            </div>
                                            <div className="col-md-3 col-lg-3  col-sm-3 col-3 me-2 gpay">
                                                <img src="./assets/images/google_pay.svg" alt="gpay" />
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

export default Cart