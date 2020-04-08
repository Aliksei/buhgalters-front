import * as React from "react";
import {forwardRef, Fragment, useEffect} from "react";
import MaterialTable from "material-table";
import RefreshIcon from '@material-ui/icons/Refresh';
import {reportService} from "../service/reportService";
import tableIcons from "./common";
import {useReports} from "../service/custom-hooks/custom-hookjs";

const Reports = (props) => {

    const [loader, setLoader] = React.useState(true);
    const [update, triggerUpdate] = React.useState({});
    const data = useReports(setLoader, update);

    const openClientView = (id) => {
        let {history} = props;
        history.push({
            pathname: '/clients/' + id,
        });
    };

    const onReject = (reason) => {
        setLoader(false);
        window.alert("Ошибка Запроса: " + reason);
    };

    return (
        <Fragment>
            <MaterialTable
                title="Таблица Отчетностей"
                columns={columns}
                isLoading={loader}
                icons={tableIcons}
                data={data}
                options={options}
                style={{width: '99%'}}
                localization={localization}
                onRowClick={(evt, clickedReport) => openClientView(clickedReport.clientId)}
                editable={
                    {onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    setLoader(true);
                                    reportService.putReport(newData)
                                        .then(res => triggerUpdate(res), onReject)
                                }
                                resolve()
                            }, 50)
                        }),
                    onRowDelete: oldData => new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    setLoader(true);
                                    reportService.deleteReport(oldData)
                                        .then(res => triggerUpdate(res), onReject);
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
                        onClick: () => {
                            setLoader(true);
                            triggerUpdate(new Date())
                        },
                    }
                ]}
            />
        </Fragment>
    )
};

const localization = {
    body: {
        emptyDataSourceMessage: 'Поиск не дал результатов',
        addTooltip: 'Добавить Акт',
        deleteTooltip: 'Удалить Акт',
        editTooltip: 'Редактировать',
        editRow: {
            saveTooltip: 'Сохранить',
            cancelTooltip: 'Отменить',
            deleteText: 'Удалить выбранный отчет?',
        }
    },
    toolbar: {
        searchPlaceholder: 'Поиск',
        addRemoveColumns: 'Поля для отображения',
        showColumnsTitle: 'Настройки колонок',
        exportTitle: 'Выгрузка в CSV файл'
    },
    pagination: {
        labelRowsSelect: 'элементов на странице',
        labelDisplayedRows: '{count} страница {from}-{to} старниц',
        // labelDisplayedRows: '{count} страница {from}-{to} старниц',
        firstTooltip: 'В начало',
        previousTooltip: 'Назад',
        nextTooltip: 'Вперед',
        lastTooltip: 'В Конец'
    },
};

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
        padding: "1px 2px 3px 3px",
        color: "white",
        fontSize: 12,
        fontWeight: 'bolder'
    }
};

const columns = [
    {title: 'Наименование', field: 'reportName',},
    {
        title: 'Клиент',
        field: 'miniClient',
        editable: 'never',
        render: (data, type) => (<div>{data.miniClient.clientName}</div>)
    },
    {
        title: 'Тип отчетности', field: 'reportType',
        lookup: {0: 'Налоги', 1: 'ФСЗН', 2: 'Статистика', 3: 'Белгосстрах'}
    },
    {
        title: 'Статус', field: 'status',
        lookup: {0: 'ОТПРАВЛЕН', 1: 'ПРИНЯТ', 2: 'ПРОСРОЧЕН', 3 : 'СРОК НЕ НАСТУПИТ'}
    },
    {title: 'Дата отправки', field: 'reportDate', type: 'date',},
    {title: 'Дедлайн', field: 'deadLine', type: 'date',
        render: (data, type) => {
            let deeadLine = new Date(data.deadLine);
            let todaay = new Date();
            var diff = (deeadLine.getTime() - todaay.getTime()) / (1000 * 3600 * 24);
            let col;
            let back;
            let tit;
            if (diff <= 10) {
                col = 'red';
                back = 'lightgray';
                tit = 'Дедлайн скоро истекает или уже просрочен';
            }
            return (<div title={tit} style={{color: col, backgroundColor: back}}>{data.deadLine}</div>)
        }
    }
];


export default Reports;
