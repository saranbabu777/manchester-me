import React from 'react';
import { Box, Divider, List, ListItem, ListItemButton } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from "react-router-dom";
import { SportsSoccer, Dashboard, Login, Money, Person, Add } from '@mui/icons-material';
import useAuthentication from '../common/hooks/useAuthentication';

const LeftMenu = (props) => {
    const { auth, permission } = useAuthentication();

    return (
        <div className='left-nav'>
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={props.toggleDrawer(false)}
                onKeyDown={props.toggleDrawer(false)}
            >
                {(process.env.NODE_ENV === 'development') &&
                    <>
                        <List>
                            <ListItem key='Login' disablePadding>
                                <Link to="/login">
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Login />
                                        </ListItemIcon>
                                        <ListItemText primary='Login' />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        </List>
                        <Divider />
                    </>
                }
                {
                    auth &&
                    <>
                        <List>
                            <ListItem key='Dashboard' disablePadding>
                                <Link to="/">
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Dashboard />
                                        </ListItemIcon>
                                        <ListItemText primary='Dashboard' />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem key='Academy' disablePadding>
                                <Link to="/academy">
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <SportsSoccer />
                                        </ListItemIcon>
                                        <ListItemText primary='Academy' />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        </List>
                        <Divider />
                    </>
                }
                {
                    /* Menu Items Specific For Admin Role */
                    (auth?.role === permission.ADMIN) &&
                    <>
                        <List>
                            <ListItem key='Add payment' disablePadding>
                                <Link to="/add-payment">
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Add />
                                        </ListItemIcon>
                                        <ListItemText primary='Add payment' />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem key='Manage Attendance' disablePadding>
                                <Link to="/attendance">
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Person />
                                        </ListItemIcon>
                                        <ListItemText primary='Manage Attendance' />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        </List>
                        <Divider />
                    </>
                }
                {
                    /* Menu Items Specific For Staff Role */
                    (auth?.role === permission.STAFF) &&
                    <>
                        <List>
                            <ListItem key='Manage Attendance' disablePadding>
                                <Link to="/manage-leave">
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Person />
                                        </ListItemIcon>
                                        <ListItemText primary='Manage Attendance' />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem key='My Salary' disablePadding>
                                <Link to="/salary">
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Money />
                                        </ListItemIcon>
                                        <ListItemText primary='My Salary' />
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        </List>
                        <Divider />
                    </>
                }
            </Box>
        </div>
    )
}

export default LeftMenu;