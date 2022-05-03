import React, {useEffect} from 'react';
import {
    Grid,
    Paper
} from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import {DragDropContext} from 'react-beautiful-dnd';
import ListWrapper from "./board/listWrapper";
import NewList from "./board/newList";
import { getAllLists, fetch as fetchLists} from '../../store/listsSlice'
import { fetch as fetchTickets, update} from '../../store/ticketsSlice'

function Page() {
    const dispatch = useDispatch()
    const lists = useSelector(getAllLists)

    const listsStatus = useSelector((state) => state.lists.status)
    const ticketsStatus = useSelector((state) => state.tickets.status)

    useEffect(() => {
        if (listsStatus === 'idle') {
            dispatch(fetchLists())
        }
    }, [listsStatus, dispatch])

    useEffect(() => {
        if (ticketsStatus === 'idle') {
            dispatch(fetchTickets())
        }
    }, [ticketsStatus, dispatch])

    const onDragEnd = (result) => {
        const { destination ,draggableId} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        dispatch(update({id:draggableId, listId: destination.droppableId}));
    }


    return (
        <Paper sx={{p:2}} elevation={0}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid container spacing={2} >
                    {lists.map((item, idx)=> (
                        <Grid item xl={2} lg={2} md={3} sm={4} xs={12} key={item.id}>
                            <ListWrapper item={item}/>
                        </Grid>
                    ))}

                    <Grid item xl={2} lg={2} md={3} sm={4} xs={12}>
                        <NewList />
                    </Grid>
                </Grid>
            </DragDropContext>
        </Paper>
    );
}

export default Page;
