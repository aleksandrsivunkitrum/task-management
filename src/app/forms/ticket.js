import React from "react";
import {TextField} from "@mui/material";
import { useForm } from "react-hook-form";
import CommonDialog from "../components/dialog";
import {v4 as uuidv4} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {add, update} from '../../store/ticketsSlice'
import {getByProperty} from "../../store/commonSlice";

const errorMessage = 'letters and numbers only.'

function Form({handleClose, listId, ticket = null}){
    const title = useSelector((state) => getByProperty(state, 'title'))
    const description = useSelector((state) => getByProperty(state, 'description'))


    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: ticket||{title, description}
    });

    const dispatch = useDispatch();

    const dialogTitle = !ticket?'New Task':'Edit Task'

    const onSave = async ({title, description}) => {
        const item = {
            title,
            description,
            id: ticket?.id || uuidv4(),
            listId
        };

        const action = ticket?update:add;

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
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="standard"
                        multiline
                        {...register('description')}
                    />
                </>
            }
        />


    )
}

export default Form;
