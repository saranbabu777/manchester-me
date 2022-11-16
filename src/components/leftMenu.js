import React from 'react';
import { Box, Divider, List, ListItem, ListItemButton } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from "react-router-dom";

const LeftMenu = (props) => {
    return (
        <>
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={props.toggleDrawer(false)}
                onKeyDown={props.toggleDrawer(false)}
            >
                <List>
                    <ListItem key='User List' disablePadding>
                        <Link to="/">
                            <ListItemButton>
                                <ListItemIcon>
                                    <MailIcon />
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
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary='Add payment' />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem key='Dashboard' disablePadding>
                        <Link to="/dashboard">
                            <ListItemButton>
                                <ListItemIcon>
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary='Dashboard' />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                </List>
            </Box>
        </>
    )
}

export default LeftMenu;