import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom/dist';
import PaymentDetails from './paymentDetails';

const Salary = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setEmail(localStorage.getItem('userName'));
    }, []);

    const navigateToPayment = () => {
        navigate(`/add-payment`);
    }
    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Salary details of {email}
                    </Typography>
                    <PaymentDetails email={email} />
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={navigateToPayment}>Request Salary Advance</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default Salary;