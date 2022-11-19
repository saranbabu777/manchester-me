import { useEffect, useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import LeftMenu from './leftMenu';
import useAuthentication from '../common/hooks/useAuthentication';
import { getUserByEmail, logOut } from '../services/api.service';
import useNotification from '../common/hooks/useNotification';
import { onAuthStateChanged } from '@firebase/auth';
import { auth as firebaseAuth } from '../firebase.config';


const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { auth, addAuth, removeAuth } = useAuthentication();
    const { addNotification } = useNotification();

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) {
                validateLogin(currentUser);
            } else {
                localStorage.setItem('man-client-user-inf', null);
            }
        });
    }, [])


    const validateLogin = async (currentUser) => {
        const { displayName, email, profilePic } = currentUser;
        const users = await getUserByEmail(email);
        if (users.length > 0) {
            const { role } = users[0];
            localStorage.setItem('man-client-user-inf', JSON.stringify({ displayName, email, profilePic }));
            addAuth(email, role);
        } else {
            addNotification('User does not exist!', 'error');
        }
    }

    const signOut = () => {
        removeAuth();
        logOut();
        handleClose();
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [showMenu, setShowMenu] = useState(false);

    const toggleDrawer =
        (open) =>
            (event) => {
                if (
                    event.type === 'keydown' &&
                    ((event).key === 'Tab' ||
                        (event).key === 'Shift')
                ) {
                    return;
                }

                setShowMenu(open);
            };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton onClick={toggleDrawer(true)}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    anchor='left'
                    open={showMenu}
                    onClose={toggleDrawer(false)}
                >
                    <LeftMenu toggleDrawer={toggleDrawer} />
                </Drawer>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Manchester Me
                </Typography>
                {auth && (
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {
                                // Just use while testing
                                /* <MenuItem onClick={clearCollection}>clear collection</MenuItem> */
                            }
                            <MenuItem onClick={handleClose}>{auth.email}</MenuItem>
                            <MenuItem onClick={signOut}>Sign Out</MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header;