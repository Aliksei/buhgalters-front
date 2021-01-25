import * as React from "react";
import {Fragment} from "react";
import MaterialTable from "material-table";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import CachedIcon from '@material-ui/icons/Cached';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import tableIcons from "./common";
import {deleteClient, getClients, postClient} from "../service/clientService";
import {useTableData} from "../service/custom-hooks/custom-hookjs";
import {EditClientDialog} from "../client/clientPersonalData";


const Clients = ({history}) => {

    const [loader, setLoader] = React.useState(true);
    const [update, triggerUpdate] = React.useState({});
    const data = useTableData(getClients, setLoader, update);
    const [opened, setOpened] = React.useState(false);

    const openClientView = (id) => {
        history.push({
            pathname: '/clients/' + id,
        });
    };

    const options = {
        doubleHorizontalScroll: true,
        pageSizeOptions: [5, 10, 15],
        pageSize: 15,
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
            // cellStyle: { whiteSpace: "nowrap" }
        },
        {title: 'УНП', field: 'ynp', type: 'numeric'},
        {title: 'Директор', field: 'director'},
        {title: 'Фонд $', field: 'fond', type: 'numeric'},
        {title: 'Юр. Адрес', field: 'address'},
        {title: 'Имнс', field: 'imns'},
        {title: 'Почта', field: 'email'},
        {title: 'ОКПО', field: 'okpo'},
        {title: 'ФСЗН', field: 'fszn'},
        {title: 'Номер контракта', field: 'contractId'},
    ];

    const localization = {
        body: {
            emptyDataSourceMessage: 'Данные отсутствуют',
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

    const onReject = (reason, reject) => {
        window.alert("Ошибка Запроса: " + reason);
        setLoader(false);
        reject();
    };

    const isPresent = (field) => {
        let result = field === null || field === '' || field === undefined;
        return !result;
    };

    return (
        <Fragment>
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/clients">
                    Клиенты
                </Link>
            </Breadcrumbs>
            <EditClientDialog opened={opened} client={{id: ''}}
                              apiCall={postClient}
                              handleClose={() => setOpened(false)}
                              update={triggerUpdate}
                              title={'Создание нового клиента'}
            />
            <MaterialTable
                title="Таблица Клиенты"
                columns={columns}
                isLoading={loader}
                icons={tableIcons}
                data={data}
                options={options}
                onRowClick={(evt, clickedClient) => openClientView(clickedClient.id)}
                localization={localization}
                actions={[
                    {
                        icon: () => <CachedIcon/>,
                        tooltip: 'Обновить данные в таблице',
                        isFreeAction: true,
                        onClick: () => {
                            setLoader(true);
                            triggerUpdate(new Date());
                        },
                    },
                    {
                        icon: () => <AddBoxOutlinedIcon/>,
                        tooltip: 'Добавить нового клиента',
                        isFreeAction: true,
                        onClick: () => {
                            setOpened(true)
                        }
                    }
                ]}
                editable={{
                    onRowDelete: oldData => new Promise((resolve, reject) => {
                        setLoader(true);
                        deleteClient(oldData)
                            .then(resp => {
                                triggerUpdate(new Date());
                                resolve();
                            }, (reason) => onReject(reason, reject));
                    }),
                }}
            />
        </Fragment>
    )
};


export default Clients;


