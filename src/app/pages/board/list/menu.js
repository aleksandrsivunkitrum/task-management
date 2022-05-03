import React, {useState}  from "react";
import {useDispatch} from "react-redux";
import {Icon, IconButton, MenuItem} from "@mui/material";
import StyledMenu from "../../../components/styledMenu";
import ListForm from "../../../forms/list";
import CommonDialog from "../../../components/dialog";
import {deleteItem} from "../../../../store/listsSlice";

function ListMenu({item}){
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [open, setOpen] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const openDialog = () => {handleClose(); setOpen(true)}
    const closeDialog = () => setOpen(false)

    const openConfirmDialog = () => {handleClose(); setConfirm(true)}
    const closeConfirmDialog = () => setConfirm(false)

    const onConfirm = async () => {
        closeConfirmDialog()
        await dispatch(deleteItem(item)).unwrap()
    }

    return (
        <>
            <IconButton aria-label="actions"
                        onClick={handleClick}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
            >
                <Icon >more_vert</Icon>
            </IconButton>
            <StyledMenu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleClose}
            >
                <MenuItem onClick={openDialog} disableRipple>
                    <Icon >edit</Icon>
                    Edit
                </MenuItem>
                <MenuItem onClick={openConfirmDialog} disableRipple>
                    <Icon >delete</Icon>
                    Delete
                </MenuItem>

            </StyledMenu>
            {open && <ListForm  handleClose={closeDialog} list={item}/>}
            {confirm && <CommonDialog open={true}  handleClose={closeConfirmDialog} handleSave={onConfirm} saveTitle={'Yes'} content={'Confirm to delete?'}/>}
        </>
    )
}

export default ListMenu;
