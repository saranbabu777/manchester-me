import { Box, Card, CardContent, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from './calendar';
import PaymentDetails from './paymentDetails';
import TabPanel, { a11yProps } from './tabPanel';

const UserDetails = () => {
    const [email, setEmail] = useState('');
    const [selectedTab, setSelectedTab] = useState(0);
    const params = useParams();

    useEffect(() => {
        const email = params.email.toString();
        setEmail(email);
    }, [params.email]);

    const handleTabChange = (event, tabIndex) => {
        setSelectedTab(tabIndex);
    };

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Summary of {email}
                    </Typography>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="user details">
                            <Tab label="Attendance" {...a11yProps(0)} />
                            <Tab label="Payment Details" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={selectedTab} index={0}>
                        <Calendar email={email} />
                    </TabPanel>
                    <TabPanel value={selectedTab} index={1}>
                        <PaymentDetails email={email} />
                    </TabPanel>
                </CardContent>
            </Card>
        </>
    )
}

export default UserDetails;