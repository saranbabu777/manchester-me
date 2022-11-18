import React from 'react';
import { Box, Divider, List, ListItem, ListItemButton } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import { Dashboard, Login, Money, Person, PlaylistAdd, PlusOne } from '@mui/icons-material';

const LeftMenu = (props) => {
    return (
        <div className='left-nav'>
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={props.toggleDrawer(false)}
                onKeyDown={props.toggleDrawer(false)}
            >
                <List>
                    <ListItem key='Mock Login' disablePadding>
                        <Link to="/login">
                            <ListItemButton>
                                <ListItemIcon>
                                    <Login />
                                </ListItemIcon>
                                <ListItemText primary='Mock Login' />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem key='User List' disablePadding>
                        <Link to="/">
                            <ListItemButton>
                                <ListItemIcon>
                                    <PlaylistAdd />
                                </ListItemIcon>
                                <ListItemText primary='User List' />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem key='Add payment' disablePadding>
                        <Link to="/add-payment">
                            <ListItemButton>
                                <ListItemIcon>
                                    <PlusOne />
                                </ListItemIcon>
                                <ListItemText primary='Add payment' />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem key='Staff Dashboard' disablePadding>
                        <Link to="/dashboard">
                            <ListItemButton>
                                <ListItemIcon>
                                    <Dashboard />
                                </ListItemIcon>
                                <ListItemText primary='Staff Dashboard' />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem key='Manage Leave' disablePadding>
                        <Link to="/manage-leave">
                            <ListItemButton>
                                <ListItemIcon>
                                    <Person />
                                </ListItemIcon>
                                <ListItemText primary='Manage Leave' />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem key='Salary' disablePadding>
                        <Link to="/salary">
                            <ListItemButton>
                                <ListItemIcon>
                                    <Money />
                                </ListItemIcon>
                                <ListItemText primary='Salary' />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                </List>
                <Divider />
            </Box>
        </div>
    )
}

export default LeftMenu;