import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl, Card, CardContent, Typography, CardActions } from "@mui/material";
import { useNavigate } from 'react-router-dom/dist';
import useAuthentication from '../common/hooks/useAuthentication';
import { getUserByEmail, signInWithGoogle } from '../services/api.service';
import useNotification from '../common/hooks/useNotification';

const Login = () => {
    const [loginForm, setLoginForm] = useState({
        email: ""
    });
    const navigate = useNavigate();
    const { addAuth } = useAuthentication();
    const { addNotification } = useNotification();

    const handleChange = (change) => {
        setLoginForm(prev => {
            return { ...prev, ...change };
        })
    }

    const login = async () => {
        const users = await getUserByEmail(loginForm.email);
        if (users.length > 0) {
            const { email, role } = users[0];
            localStorage.setItem('man-client-user-inf', JSON.stringify({ email }));
            addAuth(email, role);
            navigate(`/`);
        } else {
            addNotification('User does not exist!', 'error');
        }
    }

    const loginWithGoogle = async () => {
        const result = await signInWithGoogle();
        validateLogin(result.user);
    }

    const validateLogin = async (currentUser) => {
        const { displayName, email, profilePic } = currentUser;
        const users = await getUserByEmail(email);
        if (users.length > 0) {
            const { role } = users[0];
            localStorage.setItem('man-client-user-inf', JSON.stringify({ displayName, email, profilePic }));
            addAuth(email, role);
            navigate(`/`);
        } else {
            addNotification('User does not exist!', 'error');
        }
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
                    <Button variant="contained" className="google-btn" onClick={loginWithGoogle}>Login With Google</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default Login;