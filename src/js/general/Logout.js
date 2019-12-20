import React from "react";
import { useAuth } from "../context/auth";
import Button from "@material-ui/core/Button";

function LogoutComp() {
    const { setAuthTokens } = useAuth();

    function logOut() {
        setAuthTokens();
    }

    return (
        <div>
            <Button onClick={logOut}>Log out</Button>
        </div>
    );
}

export default LogoutComp;
