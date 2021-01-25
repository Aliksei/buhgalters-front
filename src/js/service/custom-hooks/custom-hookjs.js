import * as React from "react";
import {useEffect} from "react";
import {getClientActs, getClientById, getClientReports} from "../clientService";

export const useTableData = (dataProvider, setLoader, update) => {
    const [data, setData] = React.useState([]);
    useEffect(() => {
        const abortController = new AbortController();
        dataProvider(abortController.signal).then(res => {
            setData(res);
            setLoader(false);
        });
        return () => abortController.abort();
    }, [update, dataProvider, setLoader]);
    return data;

};

export const useClientData = (clientId, update) => {
    const [clientData, setClientData] = React.useState({
        client: null,
        acts: null,
        reports: null
    });
    useEffect(() => {
        const abortController = new AbortController();
        let signal = abortController.signal;
        Promise.all([
            getClientById(clientId, signal),
            getClientReports(clientId, signal),
            getClientActs(clientId, signal)
        ])
            .then(([client, reports, acts]) => {
                setClientData({client: client, reports : reports, acts: acts})
            });
        return () => abortController.abort();
    }, [update, clientId]);

    return clientData;
};