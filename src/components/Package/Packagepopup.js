import React, { useState } from 'react'
import './packagepopup.css'
import { cardData, PackagePara } from '../api/PackageCardData';
import { useDispatch } from 'react-redux';
import { packagesaveaddon } from '../../redux/action/Action'
import { useNavigate } from 'react-router-dom';
import PackageCartpopup from './packageCartPopup';

const Packagepopup = (props) => {
    const [openloginpopup, setOpenloginpopup] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const packageFun = (product_id, product_amount) => {
        if (localStorage.getItem("frontuserid") == null) {
            setOpenloginpopup(true)
        }
        else {
            let cust = localStorage.getItem("frontuserid");
            let total = 0
            props.checkedValue.map((item) => {
                total += parseInt(item.addonPrice)
            })
            const data = { product_id: product_id, customer_id: cust, cart_price: total + parseInt(product_amount), addons: props.checkedValue }
            dispatch(packagesaveaddon(data)).then(() => navigate('/cart'))
        }
    }

    const PackagePopupclose = () => {
        setOpenloginpopup(false)
    }
    return (
        <div>
            <div id="myModal" className="mymodal">
                <div className="my-modal-content">
                    <span onClick={props.closepopup} className="close">&times;</span>
                    <div className='package-checkbox-in-modal'>
                        {
                            props.PackageAddonReducer.map((item, i) => {
                                if (i == props.indexmodal) {
                                    return (
                                        <div className='my-modal-div' key={i}>
                                            <div className="card-body">
                                                <h4 className="card-title" dangerouslySetInnerHTML={{ __html: item.product_name }}></h4>
                                                <h5 className="card-title" dangerouslySetInnerHTML={{ __html: `$${item.product_amount}` }}></h5>
                                                <div className="package_para">
                                                    <p className="card-text" dangerouslySetInnerHTML={{ __html: item.product_description }}></p>
                                                    <p className="card-text">{item.para2}</p>
                                                    <p className="card-text">{item.para3}</p>
                                                </div>
                                            </div>

                                            {props.checkedValue.map((v, index) => {
                                                if (v.id == props.indexmodal) {
                                                    return (
                                                        <div className='my-modal-para-div' key={index} >
                                                            <p>{v.value}</p>
                                                        </div>
                                                    )
                                                }
                                            })}
                                            <div className='package-cart-button-div'>
                                                <button onClick={() => packageFun(item.product_id, item.product_amount)}>Add To Cart</button>
                                            </div>
                                        </div>
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                {openloginpopup && <PackageCartpopup PackagePopupclose={PackagePopupclose} />}
            </div>
        </div>
    )
}

export default Packagepopup