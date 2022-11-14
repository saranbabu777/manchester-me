import React, { useEffect, useState } from 'react';
import * as apiService from '../services/api.service';

const PaymentDetails = (props) => {
    const [paymentDetails, setPaymentDetails] = useState([]);

    useEffect(() => {
        const getPaymentDetails = async () => {
            const month = 'jan';
            const year = 2022;
            const data = await apiService.filterPayment(props.email, month, year);
            setPaymentDetails((prev) => {
                return data;
            });
        }
        getPaymentDetails();
    }, [props.email])

    return (
        <>
            <h1>Payments of {props.email}</h1>
            {
                paymentDetails.map((row, key) => {
                    return <div key={"payment" + key}>
                        <span>{row.date.toDateString()}</span>
                        <p>{row.type}</p>
                        <p>{row.sum}</p>
                        <p>{row.mode}</p>
                    </div>
                })
            }
        </>
    )
}

export default PaymentDetails;