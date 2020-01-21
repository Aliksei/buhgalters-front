import React, {Fragment, useEffect, useState} from "react";
import Button from "@material-ui/core/Button";



const SendActForm = (props) => {

    return (

        <Button variant="contained"
                color="inherit"
                size="small"
                onClick={handleOpen}
                style={{backgroundColor: 'rgba(0,69,147,0.52)', color: "white"}}>
            Изменить
        </Button>

    )
};



export default SendActForm;
