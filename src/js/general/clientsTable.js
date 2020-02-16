import * as React from "react";
import {Fragment, useEffect} from "react";
import MaterialTable from "material-table";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import CachedIcon from '@material-ui/icons/Cached';
import {clientService} from "../service/clientService";
import tableIcons from "./common";


const Clients = (props) => {

    const [loader, setLoader] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [update, triggerUpdate] = React.useState({});

    useEffect(() => {
        clientService.getClients()
            .then(clients => {
                setData(clients);
                setLoader(false);
            })
    }, [update]);

    const openClientView = (id) => {
        let {history} = props;
        history.push({
            pathname: '/clients/' + id,
        });
    };

    return (
        <Fragment>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/clients">
                    Клиенты
                </Link>
            </Breadcrumbs>
            <MaterialTable
                title="Таблица Клиенты"
                columns={columns}
                isLoading={loader}
                icons={tableIcons}
                data={data}
                options={options}
                onRowClick={(evt, clickedClient) => openClientView(clickedClient.id)}
                style={{width: '100%'}}
                localization={localization}
                actions={[
                    {
                        icon: () => {
                            return (<CachedIcon/>)
                        },
                        tooltip: 'Обновить данные в таблице',
                        isFreeAction: true,
                        onClick: () => {
                            setLoader(true);
                            triggerUpdate(new Date());
                        },
                    }
                ]}
                editable={{
                    onRowAdd: newData => new Promise((resolve, reject) => {
                        if (validateData(newData)) {
                            setTimeout(() => {
                                {
                                    setLoader(true);
                                    clientService.postClient(newData)
                                        .then(res => triggerUpdate(res));
                                }
                                resolve()
                            }, 50)
                        } else {
                            window.alert("Данные введены неверно");
                            reject();
                        }
                    }),
                    onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                        if (validateData(newData)) {
                            setTimeout(() => {
                                {
                                    setLoader(true);
                                    clientService.putClient(newData)
                                        .then(res => triggerUpdate(res));
                                }
                                resolve()
                            }, 50)
                        } else {
                            window.alert("Данные введены неверно");
                            reject();
                        }
                    }),
                    onRowDelete: oldData => new Promise((resolve, reject) => {
                        setTimeout(() => {
                            {
                                setLoader(true);
                                clientService.deleteClient(oldData)
                                    .then(resp => triggerUpdate(new Date()));
                            }
                            resolve()
                        }, 50)
                    }),
                }}
            />
        </Fragment>
    )
};

const validateData = (fdata) => {

    if (isPresent(fdata.ynp) &&
        isPresent(fdata.name) &&
        isPresent(fdata.email) &&
        isPresent(fdata.director) &&
        isPresent(fdata.fond) &&
        isPresent(fdata.address) &&
        isPresent(fdata.imns) &&
        isPresent(fdata.okpo) &&
        isPresent(fdata.fszn)
    ) {
        return true
    } else {
        return false;
    }
};

const isPresent = (field) => {
    let result = field === null || field === '' || field === undefined;
    return !result;
};

export default Clients;

const options = {
    doubleHorizontalScroll: true,
    pageSizeOptions: [5, 10, 15],
    pageSize: 10,
    paginationType: 'stepped',
    exportButton: true,
    columnsButton: true,
    exportAllData: true,
    grouping: true,
    showFirstLastPageButtons: true,
    toolbar: true,
    draggable: true,
    padding: 'dense',
    headerStyle: {
        backgroundColor: 'rgba(0,69,147,0.52)',
        color: "white",
        padding: "1px 2px 3px 3px",
        fontSize: 12,
        fontWeight: 'bolder'
    },
};

const columns = [
    {
        title: 'Имя', field: 'name',
    },
    {title: 'УНП', field: 'ynp', type: 'numeric'},
    {title: 'Директор', field: 'director'},
    {title: 'Фонд $', field: 'fond', type: 'numeric'},
    {title: 'Юр. Адрес', field: 'address'},
    {title: 'Имнс', field: 'imns'},
    {title: 'Почта', field: 'email'},
    {title: 'ОКПО', field: 'okpo'},
    {title: 'ФСЗН', field: 'fszn'},
];

const localization = {
    body: {
        emptyDataSourceMessage: 'Поиск не дал результатов',
        addTooltip: 'Добавить Клиента',
        deleteTooltip: 'Удалить Клиента',
        editTooltip: 'Редактировать',
        editRow: {
            deleteText: 'Удалить выбранного клиента?',
            saveTooltip: 'Сохранить',
            cancelTooltip: 'Отменить',
        }
    },
    toolbar: {
        searchPlaceholder: 'Поиск',
        searchTooltip: 'Поиск',
        addRemoveColumns: 'Поля для отображения',
        showColumnsTitle: 'Настройки колонок',
        exportTitle: 'Выгрузка в CSV файл'
    },
    pagination: {
        labelRowsSelect: 'элементов на странице',
        labelDisplayedRows: '{count} страница {from}-{to} старниц',
        firstTooltip: 'В начало',
        previousTooltip: 'Назад',
        nextTooltip: 'Вперед',
        lastTooltip: 'В Конец'
    },
};
