import * as React from "react";

import MaterialTable from "material-table";
import {reportService} from "../service/reportService";
import tableIcons from "../general/common";
import Chip from "@material-ui/core/Chip";

const ClientsReport = ({owner, reportList, update}) => {

    const localization = {
        body: {
            emptyDataSourceMessage: 'Данные отсутствуют',
            addTooltip: 'Добавить Отчет',
            deleteTooltip: 'Удалить Отчет',
            editTooltip: 'Редактировать Отчет',
            editRow: {
                deleteText: 'Удалить выбранный отчет?',
                saveTooltip: 'Сохранить',
                cancelTooltip: 'Отменить',
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
        pageSizeOptions: [10, 20, 30],
        pageSize: 10,
        paginationType: 'stepped',
        padding: 'dense',
        showFirstLastPageButtons: true,
        headerStyle: {
            backgroundColor: 'rgba(0,69,147,0.52)',
            color: "white",
            fontSize: 12,
            fontWeight: 'bolder'
        }
    };

    const columns = [
        {
            title: 'Id', field: 'id',
            hidden: true
        },
        {
            title: 'Наименование', field: 'reportName',
        },
        {
            title: 'Тип отчетности',
            field: 'reportType',
            lookup: {
                0: 'Налоги',
                1: 'ФСЗН',
                2: 'Статистика',
                3: 'Белгосстрах',
            }
        },
        {
            title: 'Статус',
            field: 'status',
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
                                  size="small" label={data.deadLine}
                                  style={{backgroundColor: 'rgba(255,54,0,0.70)'}}
                                  variant={"outlined"}/>)
                }
                return <Chip size="small" label={data.deadLine} variant={"outlined"}/>
            }
        }
    ];

    const onReject = (reason, reject) => {
        window.alert("Ошибка Запроса: " + reason);
        reject();
    };

    const onSuccess = (res, resolve) => {
        update(res);
        resolve();
    };

    const validateReport = (report) => {
        if (validateField(report.reportName) &&
            validateField(report.reportType) &&
            validateField(report.status) &&
            validateField(report.deadLine)) {
            return true;
        } else {
            return false;
        }
    };

    const validateField = (field) => {
        let result = field === '' || field === null || field === undefined;
        return !result;
    };

    return (
        <MaterialTable
            style={{width: '99%'}}
            title={'Таблица отчетов клиента : ' + owner.name}
            columns={columns}
            icons={tableIcons}
            data={reportList}
            options={options}
            localization={localization}
            onRowClick={() => {}}
            editable={{
                onRowAdd: newData => new Promise((resolve, reject) => {
                    if (validateReport(newData)) {
                        newData.clientId = owner.id;
                        reportService.postReport(newData)
                            .then(res => onSuccess(res, resolve), (reason) => onReject(reason, reject));
                    } else {
                        window.alert("Данные введены неверно");
                        reject();
                    }
                }),
                onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                    if (validateReport(newData)) {
                        newData.clientId = owner.id;
                        reportService.putReport(newData)
                            .then(res => onSuccess(res, resolve), (reason) => onReject(reason, reject))
                    } else {
                        window.alert("Данные введены неверно");
                        reject();
                    }
                }),
                onRowDelete: oldData => new Promise((resolve, reject) => {
                    reportService.deleteReport(oldData)
                        .then(res => {
                            update(new Date());
                            resolve();
                        }, (reason) => onReject(reason, reject));
                }),
            }}
        />
    )
};

export default ClientsReport;