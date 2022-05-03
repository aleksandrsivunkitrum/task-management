import React from "react";
import {Button, Dialog, DialogActions, DialogContent,  DialogTitle} from "@mui/material";

function CommonDialog(props){
    const {open = false, title, content, handleClose, handleSave, saveTitle = 'Save'} = props;

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {content}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>{saveTitle}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CommonDialog;
