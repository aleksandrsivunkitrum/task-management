import React, {useState} from "react";
import {
    Button,
    Card,
    CardActions,
    Paper
} from "@mui/material";
import ListForm from "../../forms/list";


function NewList(){
    const [open, setOpen] = useState(false);

    const openDialog = () => setOpen(true)
    const closeDialog = () => setOpen(false)

    return (
        <Paper variant="outlined">

            <Card >
                <CardActions>
                    <Button size="large" fullWidth onClick={openDialog}>New List</Button>
                </CardActions>
            </Card>
            {open && <ListForm  handleClose={closeDialog} />}
        </Paper>
    )
}
export default NewList;
