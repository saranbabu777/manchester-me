import { useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import LeftMenu from './leftMenu';
import useAuthentication from '../common/hooks/useAuthentication';
import { logOut } from '../services/api.service';
import useNotification from '../common/hooks/useNotification';


const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { auth, removeAuth } = useAuthentication();
    const { addNotification } = useNotification();

    const signOut = () => {
        removeAuth();
        logOut();
        handleClose();
        localStorage.setItem('man-client-user-inf', null);
        addNotification('User signed out', 'success');
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