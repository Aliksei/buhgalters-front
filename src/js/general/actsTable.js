import * as React from "react";
import MaterialTable from "material-table";
import RefreshIcon from '@material-ui/icons/Refresh';
import {actService} from "../service/actService";
import tableIcons from "./common";
import {useActs} from "../service/custom-hooks/custom-hookjs";


const Acts = (props) => {

    const [loader, setLoader] = React.useState(true);
    const [update, triggerUpdate] = React.useState({});
    const data = useActs(setLoader, update);

    const openClientView = (id) => {
        let {history} = props;
        history.push({
            pathname: '/clients/' + id,
        });
    };

    const onReject = (reason, reject) => {
        window.alert("Ошибка Запроса: " + reason);
        setLoader(false);
        reject();
    };

    const onSuccess = (res, resolve) => {
        triggerUpdate(res);
        resolve();
    };

    return (
        <MaterialTable
            style={{width: '99%'}}
            title={'Таблица Актов'}
            columns={columns}
            icons={tableIcons}
            data={data}
            isLoading={loader}
            options={options}
            localization={localization}
            onRowClick={((evt, clickerRow) => openClientView(clickerRow.client.id))}
            editable={{
                onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                    setTimeout(() => {
                        {
                            setLoader(true);
                            actService.putAct(newData)
                                .then(res => onSuccess(res, resolve), (reason) => onReject(reason, reject));
                        }
                    }, 50)
                }),
                onRowDelete: oldData => new Promise((resolve, reject) => {
                    setTimeout(() => {
                        {
                            setLoader(true);
                            actService.deleteAct(oldData)
                                .then(res => triggerUpdate(new Date()), onReject);
                        }
                        resolve()
                    }, 50)
                }),
            }}
            actions={[
                {
                    icon: () => <RefreshIcon/>,
                    tooltip: 'Обновить данные в таблице',
                    isFreeAction: true,
                    onClick: () => triggerUpdate(new Date())
                }
            ]}
        />
    )
};


const columns = [
    {title: 'Номер Акта', field: 'actNumber'},
    {
        title: 'Клиент',
        field: 'client',
        render: (row) => (<div>{row.client.name}</div>),
        editable: 'never'
    },
    {title: 'Статус', field: 'status', lookup: {0: 'ВЫСТАВЛЕН', 1: 'ОПЛАЧЕН'}},
    {title: 'Сумма', field: 'summ', type: 'numeric'},
    {title: 'Дата отправки', field: 'actDate', type: 'date'},
    {
        title: 'Месяц',
        field: 'month',
        lookup: {
            1: 'Январь',
            2: 'Февраль',
            3: 'Март',
            4: 'Апрель',
            5: 'Май',
            6: 'Июнь',
            7: 'Июль',
            8: 'Август',
            9: 'Сентябрь',
            10: 'Октябрь',
            11: 'Ноябрь',
            12: 'Декабрь',
        },
    }
];

const localization = {
    body: {
        emptyDataSourceMessage: 'Поиск не дал результатов',
        addTooltip: 'Добавить Акт',
        deleteTooltip: 'Удалить Акт',
        editTooltip: 'Редактировать Акт',
        editRow: {
            saveTooltip: 'Сохранить',
            cancelTooltip: 'Отменить',
            deleteText: 'Удалить выбранный акт?',
        }
    },
    toolbar: {
        searchPlaceholder: 'Поиск'
    },
    pagination: {
        labelRowsSelect: 'элементов',
        labelDisplayedRows: '{count} страница {from}-{to} старниц',
        firstTooltip: 'В начало',
        previousTooltip: 'Назад',
        nextTooltip: 'Вперед',
        lastTooltip: 'В Конец'
    },
};

const options = {
    pageSizeOptions: [5, 10, 15],
    pageSize: 10,
    paginationType: 'stepped',
    exportButton: true,
    columnsButton: true,
    padding: 'dense',
    exportAllData: true,
    grouping: true,
    showFirstLastPageButtons: true,
    toolbar: true,
    draggable: true,
    headerStyle: {
        padding: "1px 2px 3px 3px",
        backgroundColor: 'rgba(0,69,147,0.52)',
        color: "white",
        fontSize: 12,
        fontWeight: 'bolder'
    }
};

export default Acts;
