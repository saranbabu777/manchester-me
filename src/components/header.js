import { useEffect, useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import LeftMenu from './leftMenu';
import useAuthentication from '../common/hooks/useAuthentication';


const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(null);
    const { auth } = useAuthentication();

    useEffect(() => {
        const email = localStorage.getItem('userName').toString();
        setUser(email);
    }, [])

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
                            <MenuItem onClick={handleClose}>{auth.email}</MenuItem>
                            <MenuItem onClick={handleClose}>Settings</MenuItem>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header;