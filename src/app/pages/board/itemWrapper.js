import React from "react";
import {Draggable} from "react-beautiful-dnd";
import Item from "./item";

function ItemWrapper({item, idx}){
    return(
        <Draggable
            draggableId={`${item.id}`}
            index={idx}
        >
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Item item={item}/>
                </div>
            )}
        </Draggable>
    )
}

export default ItemWrapper
