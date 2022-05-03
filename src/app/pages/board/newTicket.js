import React, {useState} from "react";
import {
    Button,
    Card,
    CardActions,
} from "@mui/material";

import TicketForm from "../../forms/ticket";

function NewTicket({listId}){
    const [open, setOpen] = useState(false);

    const openDialog = () => setOpen(true)
    const closeDialog = () => setOpen(false)

    return (
        <Card elevation={0}>
            <CardActions>
                <Button size="large" fullWidth onClick={openDialog}>New Task</Button>
            </CardActions>
            {open && <TicketForm  handleClose={closeDialog} listId={listId}/>}

        </Card>
    )
}
export default NewTicket;
