import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Attendance from './attendance';
import PaymentDetails from './paymentDetails';

const UserDetails = () => {
    const [email, setEmail] = useState('');
    const params = useParams();

    useEffect(() => {
        const email = params.email.toString();
        setEmail(email);
    }, [params.email]);

    return (
        <>
            <Attendance email={email} />
            payment details
            <PaymentDetails email={email} />
        </>
    )
}

export default UserDetails;