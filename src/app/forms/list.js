import React from "react";
import {TextField} from "@mui/material";
import { useForm } from "react-hook-form";
import CommonDialog from "../components/dialog";
import {v4 as uuidv4} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {add, update} from '../../store/listsSlice'
import {getByProperty} from "../../store/commonSlice";

const errorMessage = 'letters and numbers only.'

function Form({handleClose, list = null}){
    const username = useSelector((state) => getByProperty(state, 'username'))
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: list||{title:username}
    });

    const dispatch = useDispatch();

    const dialogTitle = !list?'New List':'Edit List'

    const onSave = async ({title}) => {
        const item = {
            title,
            id: list?.id || uuidv4()
        };

        const action = list?update:add;

        await dispatch(action(item)).unwrap()
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
                        label="Title"
                        type="text"
                        fullWidth
                        variant="standard"
                        error={!!errors.title}

                        {...{helperText:errors.title?errorMessage:''}}
                        {...register('title', { pattern: /^[A-Za-z0-9]+$/i })}
                    />
                </>
            }
        />


    )
}

export default Form;
