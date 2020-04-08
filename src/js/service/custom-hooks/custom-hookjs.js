import * as React from "react";
import {useEffect} from "react";
import {clientService} from "../clientService";
import {reportService} from "../reportService";
import {actService} from "../actService";


export const useClients = (setLoader, update) => {
    const [data, setData] = React.useState([]);
    useEffect(() => {
        clientService.getClients()
            .then(clients => {
                setData(clients);
                setLoader(false);
            })
    }, [update]);
    return data;
};


export const useReports = (setLoader, update) => {
    const [data, setData] = React.useState([]);
    useEffect(() => {
        reportService.getReports()
            .then(res => {
                setData(res);
                setLoader(false);
            });
    }, [update]);
    return data;
};

export const useActs = (setLoader, update) => {
    const [data, setData] = React.useState([]);
    useEffect(() => {
            actService.getActs().then(res => {
                setData(res);
                setLoader(false);
            })
        }, [update]
    );
    return data;
};
