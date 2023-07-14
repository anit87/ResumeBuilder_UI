import React, { useState, useEffect } from 'react'
import Layout from '../../Layout/Layout';
import './package.css';
import { cardData, PackagePara } from '../api/PackageCardData';
import MiniNav from '../MiniNav/MiniNav';
import { FaCheckCircle } from 'react-icons/fa';
import Packagepopup from './Packagepopup';
import { useDispatch, useSelector } from 'react-redux';
import { getalladdons, allPackageData, PackageAddonData } from '../../redux/action/Action'
import Loadingspinner from '../Books/Loadingspinner';



const Package = () => {
    const [openmodal, setOpenmodal] = useState(false)
    const [indexmodal, setIndexmodal] = useState()
    const [checkedValue, setCheckedValue] = useState([])

    const [disablecheck, setDisablecheck] = useState("")
    const [disablebolean, setDisablebolean] = useState(false)
    const [loading, setLoading] = useState(false)


    const dispatch = useDispatch()


    ///////////API DATA/////////////////////
    const PackageAddonReducer = useSelector((state) => state.PackageAddonDataReducer.packagedatafinal);
    // console.table( PackageAddonReducer);

    ///////////////////popmodal open close function////////////////

    const openmodalfun = (i) => {
        setOpenmodal(!openmodal)
        setIndexmodal(i)

    }
    const closepopup = () => {
        setOpenmodal(!openmodal)

    }
    ///////////////////popmodal open close function////////////////


    ///////////////////checkbox check and uncheck function////////////////

    const valuecheckbox = (e, i, addonId, addonPrice) => {
        if (e.target.checked === true) {
            let checkboxxvalue = e.target.value;
            let valueobject = {
                id: i,
                value: checkboxxvalue,
                addonId: addonId,
                addonPrice: addonPrice
            }
            setCheckedValue((prev) => {
                return (
                    [...prev, valueobject]
                )
            })
            setDisablecheck(i)
            setDisablebolean(true)
        }
        else {
            let newcheckboxvalue = checkedValue.filter((v) => {
                if ((v.value != e.target.value) || (i != v.id)) {
                    return v
                }
            })
            setCheckedValue(newcheckboxvalue)
            setDisablecheck(null)
            setDisablebolean(false)
        }
    }

    ///////////////////checkbox check and uncheck function////////////////

    /////////////////useEffect function startt///////////////////////////

    /////////////useeffect function on check disable other checkbox run on disablecheck checkedValue state change////////////////

    useEffect(() => {
        if (disablebolean == true) {
            let disablecheckdata = document.querySelectorAll('.checkboxclass');
            disablecheckdata.forEach((v) => {
                if (v.id != disablecheck) {
                    v.disabled = true;
                }
            })

        }
        else {
            if (disablebolean == false && checkedValue.length == 0) {
                let disablecheckdata = document.querySelectorAll('.checkboxclass');
                disablecheckdata.forEach((v) => {
                    v.disabled = false;
                })
            }
        }
    }, [disablecheck, checkedValue])

    //////////////useeffect function on check disable other checkbox run on disablecheck checkedValue state change////////////////

    /////////////////useEffect function for dispatch Addons API///////////////////////////

    useEffect(() => {
        dispatch(getalladdons())
        dispatch(allPackageData())
        dispatch(PackageAddonData())
    }, [])

    useEffect(() => {
        if (PackageAddonReducer.length != 0) {
            setLoading(false)
        }
        else {
            setLoading(true)
        }
    }, [PackageAddonReducer])


    return (
        <Layout >
            <div className="padding_div">
                <div className="flewless">
                    <div className="row">
                        <div className="about_content">

                            <MiniNav NavData={['package', 'Packages']} />
                            <div className="container">
                                <div className="package_heading my-package-heading">
                                    <div className="package_text_content my_package_text_content">
                                        <h1>Professional Resume Writing Services</h1>
                                        <p className='package_para'>With our expert resume writers you will be in your new job in no time </p>
                                    </div>
                                    <div className="card_parent">
                                        {loading ? <Loadingspinner /> : null}

                                        <div className="row gx-3 for-res">
                                            {PackageAddonReducer.map((item, i) => {
                                                return (
                                                    <div className='col-12 col-sm-10 col-md-6 col-lg-6 col-xl-3 for-width-res more-package' key={i}>
                                                        <div className="card  my-package-card">
                                                            <div className="card-body">
                                                                <h4 className="card-title">{item.product_name}</h4>
                                                                <h5 className="card-title">{`$${item.product_amount}`}</h5>
                                                                <div className="package_para">
                                                                    <p className="card-text" dangerouslySetInnerHTML={{ __html: item?.product_description }}></p>
                                                                    {/* <p className="card-text">{item.para2}</p> */}
                                                                    {/* <p className="card-text">{item.para3}</p> */}
                                                                </div>

                                                            </div>
                                                            <ul className="list-group list-group-flush" style={{minHeight:"40%"}} >
                                                                <hr />
                                                                {
                                                                    item?.addons?.map((item) => {
                                                                        return (
                                                                            <li key={item.addons_id} className="list-group-item">
                                                                                <div className="row no-margin">
                                                                                    <div className="col-sm-12 col-md-1 col-lg-1 p-0">
                                                                                        <input className="form-check-input checkboxclass" type="checkbox" id={i}
                                                                                            value={`${item.addons_name} - $${item.addons_price}`} aria-label="..."
                                                                                            onClick={(e) => valuecheckbox(e, i, item.addons_id, item.addons_price)}
                                                                                        />
                                                                                    </div>
                                                                                    <div className="col-sm-12 p-0 col-md-11 col-lg-11 d-flex justify-content-center">
                                                                                        <span>{item.addons_name} - ${item.addons_price}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                            <div className=" btn__buy package_btn my_package_btn ">
                                                                <button className="btn " type="submit" onClick={() => openmodalfun(i)}>Order Now</button>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )
                                            })}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='my-another-resume-wrapper'>
                                <div className="section_2 resumeInfo my-another-resumeinfo">
                                    <div className='container'>
                                        <div className="row">
                                            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 info_content" >
                                                {PackagePara.map((items) => {
                                                    return (
                                                        <div className="main_content" key={items.id}>
                                                            <FaCheckCircle className='icon' />
                                                            <p>{items.para}</p>
                                                        </div>
                                                    )
                                                })}
                                                <div className="package_headings">
                                                    <h2>We value our repeat customers, please reach out to us with your order number and we send you  a  discount coupon.</h2>
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
            {openmodal && <Packagepopup closepopup={closepopup} indexmodal={indexmodal} checkedValue={checkedValue} PackageAddonReducer={PackageAddonReducer} />}
        </Layout>
    )
}

export default Package;
