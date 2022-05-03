import React from "react";
import {
    ListItem,
    ListItemText, Paper
} from "@mui/material";
import {Droppable} from "react-beautiful-dnd";
import ItemWrapper from "./itemWrapper";
import {useSelector} from "react-redux";
import { getTicketsByList} from '../../../store/ticketsSlice'
import NewTicket from "./newTicket";
import ListMenu from "./list/menu";

function ListWrapper({item}){
    const tickets = useSelector((state) => getTicketsByList(state, item.id))

    return (
        <Paper variant="outlined">
            <ListItem
                secondaryAction={
                    <ListMenu item={item}/>
                }
            >
                <ListItemText
                    primary={item.title}
                />
            </ListItem>

            <NewTicket listId={item.id}/>

            <Droppable
                droppableId={`${item.id}`}
            >
                {(provided, snapshot) => (
                    <React.Fragment>
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {tickets.map((ticket, idx) => (<ItemWrapper idx={idx} key={ticket.id} item={ticket}/>))}
                        </div>
                        {provided.placeholder}
                    </React.Fragment>
                )}</Droppable>
        </Paper>
    )
}
export default ListWrapper;
