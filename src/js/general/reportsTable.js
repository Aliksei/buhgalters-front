import * as React from "react";
import {Fragment} from "react";
import MaterialTable from "material-table";
import RefreshIcon from '@material-ui/icons/Refresh';
import {getReports, reportService} from "../service/reportService";
import tableIcons from "./common";
import {useTableData} from "../service/custom-hooks/custom-hookjs";
import Chip from "@material-ui/core/Chip";
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';

const Reports = (props) => {

    const [loader, setLoader] = React.useState(true);
    const [update, triggerUpdate] = React.useState({});
    const data = useTableData(getReports, setLoader, update);

    const openClientView = (id) => {
        let {history} = props;
        history.push({
            pathname: '/clients/' + id,
        });
    };

    const onReject = (reason,reject) => {
        setLoader(false);
        window.alert("Ошибка Запроса: " + reason);
        reject();
    };

    const localization = {
        body: {
            emptyDataSourceMessage: 'Данные отсутствуют',
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
            lookup: {0: 'НОВЫЙ', 1: 'ПРИНЯТ'}
        },
        {title: 'Дедлайн', field: 'deadLine', type: 'date', grouping: false,
            render: (data, type) => {
                let deeadLine = new Date(data.deadLine);
                let todaay = new Date();
                let diff = (deeadLine.getTime() - todaay.getTime()) / (1000 * 3600 * 24);
                if (diff <= 10) {
                    let tit = 'Дедлайн скоро истекает или уже просрочен';
                    return (<Chip title={tit}
                                  icon={<AccessTimeOutlinedIcon/>}
                                  size="small" label={data.deadLine} style={{backgroundColor: 'rgba(255,54,0,0.70)'}} variant={"outlined"}/>)
                }
                return <Chip size="small" label={data.deadLine} variant={"outlined"}/>
            }
        }
    ];

    return (
        <Fragment>
            <MaterialTable
                title="Таблица Отчетностей"
                columns={columns}
                isLoading={loader}
                icons={tableIcons}
                data={data}
                options={options}
                // style={{width: '99%'}}
                localization={localization}
                onRowClick={(evt, clickedReport) => openClientView(clickedReport.clientId)}
                editable={
                    {onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                            setLoader(true);
                            reportService.putReport(newData)
                                .then(res => {
                                    resolve();
                                    triggerUpdate(res);
                                }, (reason) => onReject(reason, reject))
                        }),
                    onRowDelete: oldData => new Promise((resolve, reject) => {
                        setLoader(true);
                        reportService.deleteReport(oldData)
                            .then(res => {
                                resolve();
                                triggerUpdate(res);
                            }, (reason) => onReject(reason, reject));
                        }),
                }}
                actions={[
                    {
                        icon: () => <RefreshIcon/>,
                        tooltip: 'Обновить данные в таблице',
                        isFreeAction: true,
                        onClick: () => {
                            triggerUpdate(new Date())
                        },
                    }
                ]}
            />
        </Fragment>
    )
};

export default Reports;
