import React from "react";
import {TextField} from "@mui/material";
import { useForm } from "react-hook-form";
import CommonDialog from "../components/dialog";
import {useDispatch, useSelector} from "react-redux";
import { updateUser, getAllProps } from '../../store/commonSlice'

const errorMessage = 'letters and numbers only.'

function Form({handleClose}){
    const commonProps = useSelector(getAllProps)

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: commonProps
    });

    const dispatch = useDispatch();

    const dialogTitle = 'User Settings'

    const onSave = async ({title, description, username}) => {
        const item = {
            title,
            description,
            username
        };

        await dispatch(updateUser(item))
        handleClose()
    }

    return (
        <CommonDialog
            open={true}
            handleClose={handleClose}
            handleSave={handleSubmit(onSave)}
            title={dialogTitle}
            content={
                <>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="standard"
                        error={!!errors.title}
                        {...{helperText:errors.title?errorMessage:''}}

                        {...register('username', { pattern: /^[A-Za-z0-9]+$/i })}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        error={!!errors.title}
                        {...{helperText:errors.title?errorMessage:''}}

                        {...register('title', { pattern: /^[A-Za-z0-9]+$/i })}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        variant="standard"
                        {...register('description')}
                    />
                </>
            }
        />


    )
}

export default Form;
