import React , {useState}from 'react';
import { Outlet } from 'react-router-dom';
import {Container, AppBar, Icon, Toolbar, Typography, Avatar, IconButton, Badge, Box} from "@mui/material";
import { deepPurple } from '@mui/material/colors';
import {useSelector} from "react-redux";
import UserForm from "../forms/user";
import {getByProperty} from "../../store/commonSlice";
function Layout() {
    const [open, setOpen] = useState(false);
    const username = useSelector((state) => getByProperty(state, 'username'))

    const badge = username?username[0].toUpperCase():'';

    const openDialog = () => {setOpen(true)}
    const closeDialog = () => setOpen(false)

    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Icon sx={{ mr: 2 }} >dashboard</Icon>
                    <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                        Task Management
                    </Typography>
                    <IconButton onClick={openDialog}>
                        <Badge badgeContent={badge} color="error">
                            <Avatar sx={{ bgcolor: deepPurple[500] }}><Icon >person</Icon></Avatar>
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Box sx={{ p:2 }}>
                <Container maxWidth={'xl'} >
                    <Outlet />
                </Container>
            </Box>
            {open && <UserForm  handleClose={closeDialog} />}
        </React.Fragment>
    );
}

export default Layout;
