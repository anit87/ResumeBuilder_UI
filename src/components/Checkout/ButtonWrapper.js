import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useState } from "react";


const amount = "20";
const style = { layout: 'horizontal', color: 'silver', shape: 'pill', height: 50, width: 10 };

const ButtonWrapper = ({ currency, showSpinner, continueshipping, checksubtotal, gettransectionpprove }) => {

    // const[paypaltransactionid,setPaypaltransactionid]=useState()
    const [paypalorderid, setPaypalorderid] = useState()
    // const[paypalstatus,setPaypalstatus]=useState()



    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);

    useEffect(() => {
        if (paypalorderid != null) {
            continueshipping(paypalorderid);
        }
    }, [paypalorderid])


    return (<>
        {/* { (showSpinner && isPending) && <div className="spinner" /> } */}
        <PayPalButtons
            style={style}
            disabled={false}
            forceReRender={[checksubtotal, currency, style]}
            fundingSource={undefined}
            createOrder={async (data, actions) => {
                const orderId = await actions.order
                    .create({
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: currency,
                                    value: checksubtotal,
                                },
                            },
                        ],
                    });
                // Your code here after create the order             
                const orderIs = `F2${orderId}L`;
                // orderId = orderIs;
                setPaypalorderid(orderId);
                return orderId;
            }}
            onApprove={async (data, actions) => {
                // console.log("onApprove ", data, " actions:- ", actions);
                const details = await actions.order.capture();
                // console.log("details are ", details);
                gettransectionpprove(details.purchase_units[0].payments.captures[0].id, details.id, details.purchase_units[0].payments.captures[0].status);
            }}
            onCancel={(cancel, data) => {
                // setCancel(cancel);
                console.log("Paypal cancel Is:", cancel, " data ", data)
            }}
            onError={(err) => {
                // setError(err);
                console.error("Paypal Error Is:", err)
            }}
        />
    </>
    );
}

export default ButtonWrapper; 