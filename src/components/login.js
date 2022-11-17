import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl, Card, CardContent, Typography, CardActions } from "@mui/material";
import { useNavigate } from 'react-router-dom/dist';


const Login = () => {
    const [loginForm, setLoginForm] = useState({
        email: ""
    });
    const navigate = useNavigate();

    const handleChange = (change) => {
        setLoginForm(prev => {
            return { ...prev, ...change };
        })
    }

    const login = () => {
        localStorage.setItem('userName', loginForm.email);
        navigate(`/`);
    }

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Test Mode
                    </Typography>
                    <div className='login-form'>
                        <FormControl className='form-field'>
                            <TextField label="Enter an email id" variant="outlined" value={loginForm.email} onChange={(e) => { handleChange({ email: e.target.value }); }} />
                        </FormControl>
                    </div>
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={login}>Login</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default Login;