import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import { adminorderbyid, WriteResumePkg, UserIntakeFormData, UserIntakeFormById } from '../../redux/action/Action';
import './checkout.css'

const Orderdetails = () => {

    const [subtotal, setSubtotal] = useState(0)
    const [subtotalproduct, setSubtotalproduct] = useState(0)
    const [discount, setDiscount] = useState(0)

    const adminorderbyidreducerdata = useSelector((state) => state.adminallorderbyidreducer.adminorderallbyid)
    const WriteResumeMsg = useSelector((state) => state.GetmsgforWriteResume.WriteResumePkgData)
    const GetIntakeFrmData = useSelector((state) => state.GetUserIntakeFormData.getuserintakeformData)
    // console.log("GetIntakeFrmData", WriteResumeMsg, GetIntakeFrmData)

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const userid = useParams()
    const feact1 = userid.id;
    const feact = feact1.replace("Y2F0ZWdvcnk9d", "")
    const feact2 = feact.trim() / 45;
    // console.log("userid", feact2)

    const chatfun = () => {
        dispatch(adminorderbyid(feact2)).then(() => navigate(`/chatting/${userid.id}`))
    }
    const IntakeFormById = (order_ids) => { 
        dispatch(UserIntakeFormById(order_ids)).then(() => navigate(`/editstepperform/${order_ids}`))
    }
    const handleWriteResume = (order_number) => {
        navigate(`/stepperform/${order_number}`)
    }
    useEffect(() => {
        if (adminorderbyidreducerdata.length != 0) {
            let subtotal = 0
            adminorderbyidreducerdata.map((item) => {
                subtotal += parseFloat(item.order_subtotal)
            })
            setSubtotal(subtotal)
            setSubtotalproduct(adminorderbyidreducerdata[0]?.order_subtotal)
        }
    }, [adminorderbyidreducerdata])

    useEffect(() => {
        dispatch(adminorderbyid(feact2))
        dispatch(WriteResumePkg(adminorderbyidreducerdata[0]?.order_number))
        dispatch(UserIntakeFormData({ cust_id: localStorage?.getItem("frontuserid"), order_id: adminorderbyidreducerdata[0]?.order_number }))

    }, [adminorderbyidreducerdata[0]?.order_number])

    // useEffect(()=>{
    //     dispatch(WriteResumePkg(adminorderbyidreducerdata[0]?.order_number))
    // },[adminorderbyidreducerdata[0]?.order_number])


    return (
        <>
            <Layout>
                <div className='padding_div' >
                    <div className='front-order-details'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    <div className='fron-order-detail-div'>
                                        <div className='order-number'>
                                            <h3>Order Number : {adminorderbyidreducerdata != [] ? `FR${adminorderbyidreducerdata[0]?.order_number}L` : null}</h3>
                                            <div style={{ display: "flex" }}>
                                                <button className='btn chatdivchat' onClick={chatfun}>Chat</button>
                                                {WriteResumeMsg?.message == "True" && GetIntakeFrmData == '' ?
                                                    <button className='btn chatdivchat' onClick={() => handleWriteResume(adminorderbyidreducerdata[0]?.order_number)}>Questionnaire </button>
                                                    : null
                                                }
                                            </div>
                                        </div>
                                        <div className='customer-details'>
                                            {/* <h3>Customer Details</h3> */}
                                            <h3>Order Date : {adminorderbyidreducerdata != [] ?new Date(`${adminorderbyidreducerdata[0]?.order_date}`).toDateString() : null}</h3>
                                            {/* <h3>Order Date : {adminorderbyidreducerdata != [] ? adminorderbyidreducerdata[0]?.order_date : null}</h3> */}
                                        </div>
                                        <div className='customer-details-table'>
                                            <table className="table admin-order-table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">S.No</th>
                                                        <th scope="col">Item Name</th>
                                                        <th scope="col">Quantity</th>
                                                        <th scope="col"> Price</th>
                                                        <th scope="col">Total Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {adminorderbyidreducerdata.map((item, i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <th scope="row">{i + 1}</th>
                                                                <td>{item.addons != null ? <div className='front-orderdetails-addon-name'>
                                                                    <p>{item.order_item_product_name}</p>
                                                                    {item.addons.map((v, vindex) => {
                                                                        return <p key={vindex}>{v.order_items_cart_addons_name} - ${v.order_items_cart_addons_price}</p>
                                                                    })}
                                                                </div>
                                                                    : <div><p>{item.order_item_product_name}</p></div>}
                                                                </td>
                                                                {/* <td>{item.order_item_product_name}</td> */}
                                                                <td>{item.order_item_qty}</td>
                                                                <td>${`${parseFloat(item.order_item_price).toFixed(2)}`}</td>
                                                                <td>${parseFloat(item.order_item_qty * item.order_item_price).toFixed(2)}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                    <tr>
                                                        <th colSpan={4}></th>
                                                    </tr>
                                                    <tr>
                                                        <th colSpan={4} ></th>
                                                        <th >Total : ${parseFloat(subtotalproduct - discount).toFixed(2)}</th>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>
                                        {/*--------------- ----------To see filled intake forms ----------------------------*/}
                                        {WriteResumeMsg?.message == "True" && GetIntakeFrmData != '' ?
                                            <div className='customer-intakefrm-table'>
                                                <div className='order-number'>
                                                    <h3>Questionnaire Form Detail</h3>
                                                    <div >
                                                        <button className='btn chatdivchat' onClick={() => IntakeFormById(adminorderbyidreducerdata[0]?.order_number)}>Edit Questionnaire Form</button>
                                                    </div>
                                                </div>
                                                {typeof GetIntakeFrmData == 'object' ? GetIntakeFrmData?.map((item, i) => {
                                                    return (
                                                        <div key={i} className='customer-intake-form'>
                                                            {/* <h6>Order Number : {item.stepfrm_address}</h6> */}
                                                            <div className='container'>
                                                                <div className='div-last-edited'>
                                                                    <h5 className='customer-data-heading'>Last Updated On : </h5>
                                                                    <p>{new Date(`${item.stepfrm_updated_at}`).toLocaleString()}</p>
                                                                    {/* <p>{item.stepfrm_updated_at}</p> */}
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
                                                }) : null}
                                            </div>
                                            : null}
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* <Box style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant="h6" component="h6" sx={{ marginBottom: '20px !important', fontSize: '21px' }}>
                                Order Number : {adminorderbyidreducerdata != [] ? adminorderbyidreducerdata[0]?.order_number : null}
                            </Typography>
                            <Box>
                                <button className='btn chatdivchat' onClick={chatfun}>Chat</button>
                            </Box>
                        </Box>
                        <Box style={{ marginBottom: '20px' }}>
                            <Typography sx={{ marginBottom: '20px !important', fontSize: '18px' }}>
                                Customer Details
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
                                                <td>{item.order_item_product_name}</td>
                                                <td>{item.order_item_qty}</td>
                                                <td>{item.order_item_price}</td>
                                                <td>{item.order_net_amount}</td>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <th colSpan={4}></th>
                                        <th>Sub total : {subtotal}</th>
                                    </tr>
                                    <tr>
                                        <th colSpan={4}></th>
                                        <th >Discount : {discount}</th>
                                    </tr>
                                    <tr>
                                        <th colSpan={4}></th>
                                        <th >Total : {parseFloat(subtotal - discount)}</th>
                                    </tr>

                                </tbody>
                            </table>
                        </Paper>
                        <Box>
                            <Button
                                variant="contained"
                                className='popup-update-btn'

                            >
                                Update Order Status
                            </Button>
                        </Box> */}
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Orderdetails