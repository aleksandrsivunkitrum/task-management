import React from "react";
import {Card, CardContent, CardHeader,Typography} from "@mui/material";
import ItemMenu from "./item/menu";

function Item({item}){
    return(
        <Card sx={{m:1}}>
            <CardHeader
                action={
                    <ItemMenu item={item}/>
                }
                subheader={item.title}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {item.description}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default Item;
