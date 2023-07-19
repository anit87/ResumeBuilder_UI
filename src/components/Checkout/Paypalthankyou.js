import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import { adminorderbyid, paypalthankyouidaction, UserIntakeFormById } from '../../redux/action/Action';
import './checkout.css'
import Loadingspinner from '../Books/Loadingspinner';

const Paypalthankyou = () => {
  const [redirectbolean, setRedirectbolean] = useState(false)
  const paypaldata = useSelector((state) => state.paypalorderreducer.paypalres)
  const paypalthankdata = useSelector((state) => state.paypalthanyouidreducer.paypalthank)

  console.log("paypalthankdata", paypalthankdata);
  let newPaypalthankdata = { ...paypalthankdata }
  const GetIntakeFrmDataId = useSelector((state) => state.GetUserIntakeFormById.getUserStepFormById)

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const userid = useParams()

  const orderfun = () => {
    if (paypaldata.length != 0) {
      const checkuserid = paypaldata * 45 + 'Y2F0ZWdvcnk9d'
      dispatch(adminorderbyid(paypaldata)).then(() => navigate(`/orderdetail/${checkuserid}`))
    }
    else {
      const checkuserid = newPaypalthankdata[0]?.order_id * 45 + 'Y2F0ZWdvcnk9d'
      dispatch(adminorderbyid(newPaypalthankdata[0]?.order_id)).then(() => navigate(`/orderdetail/${checkuserid}`))
    }
  }

  const orderfunQuestionnaire = (order_number, order_id) => {
    let id = `${order_number}%2F${order_id}`
    navigate(`/stepperform/${id}`)
    setRedirectbolean(true)

  }

  useEffect(() => {
    dispatch(paypalthankyouidaction(userid.id))
  }, [])
  useEffect(() => {
    dispatch(UserIntakeFormById(newPaypalthankdata[0]?.order_number))
  }, [newPaypalthankdata[0]?.order_number], newPaypalthankdata[0]?.product_type_id)

  // console.log("newPaypalthankdata[0]?.product_type_id",  newPaypalthankdata[0]?.product_type_id)
  // console.log("GetIntakeFrmDataId", GetIntakeFrmDataId)

  return (
    <Layout>
      <div className='padding_div'>
        <div className='thankyou'>
          <div className='thanyoudiv'>
            <div className='thankyouimg'><svg fill="#f25b2a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="50px" height="50px"><path d="M 41.9375 8.625 C 41.273438 8.648438 40.664063 9 40.3125 9.5625 L 21.5 38.34375 L 9.3125 27.8125 C 8.789063 27.269531 8.003906 27.066406 7.28125 27.292969 C 6.5625 27.515625 6.027344 28.125 5.902344 28.867188 C 5.777344 29.613281 6.078125 30.363281 6.6875 30.8125 L 20.625 42.875 C 21.0625 43.246094 21.640625 43.410156 22.207031 43.328125 C 22.777344 43.242188 23.28125 42.917969 23.59375 42.4375 L 43.6875 11.75 C 44.117188 11.121094 44.152344 10.308594 43.78125 9.644531 C 43.410156 8.984375 42.695313 8.589844 41.9375 8.625 Z" /></svg></div>
            <h3>thank you!</h3>
            <h3>your order is confirmed.</h3>

          </div>
          <>
            <div className='chatdiv'>
              <button className='btn chatdivorder' onClick={() => orderfun()}>View Order Details</button>
            </div>
          </>
          {typeof newPaypalthankdata[0]?.product_type_id == 'string' && newPaypalthankdata[0]?.product_type_id == 1 ?
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h5>Please Fill Out The Questionnarie Form</h5>
              <div className='questionnairediv'>
                <button className='btn questionnairediv' onClick={() => orderfunQuestionnaire(newPaypalthankdata[0]?.order_number, newPaypalthankdata[0]?.order_id)}>START</button>
              </div>
            </div> : null}
        </div>
      </div>
    </Layout>
  )
}

export default Paypalthankyou