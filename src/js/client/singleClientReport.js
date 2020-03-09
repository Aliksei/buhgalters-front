import * as React from "react";
import {forwardRef} from "react";

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from "material-table";
import {reportService} from "../service/reportService";
import {useEffect} from "react";


const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

const ClientsReport = ({owner, reportList, update}) => {

    const [loader, setLoader] = React.useState(true);

    useEffect(() => {
        if (Object.keys(owner).length !== 0 ) {
            setLoader(false);
        }
    }, [owner, reportList]);


        return (
            <MaterialTable
                style={{width: '99%'}}
                title={'Таблица отчетов клиента : ' + owner.name}
                columns={columns}
                icons={tableIcons}
                data={reportList}
                isLoading={loader}
                options={options}
                localization={localization}
                editable={{
                    onRowAdd: newData => new Promise((resolve, reject) => {
                        if (validateReport(newData)) {
                            setTimeout(() => {
                                {
                                    setLoader(true);
                                    newData.clientId = owner.id;
                                    reportService.postReport(newData)
                                        .then(res => update(res));
                                }
                                resolve()
                            }, 50)
                        } else {
                            window.alert("Данные введены неверно");
                            reject();
                        }
                    }),
                    onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                        if (validateReport(newData)) {
                            setTimeout(() => {
                                {
                                    setLoader(true);
                                    newData.clientId = owner.id;
                                    reportService.putReport(newData)
                                        .then(res => update(res))
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
                                reportService.deleteReport(oldData)
                                    .then(res => update(new Date()));
                            }
                            resolve()
                        }, 50)
                    }),
                }}
            />
        )
};

export default ClientsReport;

const validateReport = (report) => {
    if (validateField(report.reportName) &&
        validateField(report.reportType) &&
        validateField(report.status) &&
        validateField(report.deadLine) &&
        validateField(report.reportDate)) {
        return true;
    } else {
        return false;
    }
};

const validateField = (field) => {
    let result = field === '' || field === null || field === undefined;
    return  !result;
};

const localization = {
    body: {
        emptyDataSourceMessage: 'Поиск не дал результатов',
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
        lookup: {
            0: 'ОТПРАВЛЕН',
            1: 'ПРИНЯТ',
            2: 'ПРОСРОЧЕН',
            3: 'СРОК НЕ НАСТУПИТ'
        }
    },
    {
        title: 'Дата отправки',
        field: 'reportDate',
        type: 'date',
    },
    {
        title: 'Дедлайн',
        field: 'deadLine',
        type: 'date',
        render: (data, type) => {
            let deeadLine = new Date(data.deadLine);
            let todaay = new Date();
            var diff = (deeadLine.getTime() - todaay.getTime()) / (1000 * 3600 * 24);
            let col;
            let tit;
            if (diff <= 10) {
                col = 'red';
                tit = 'Дедлайн скоро истекает или уже просрочен';
            }
            return (<div title={tit} style={{color: col}}>{data.deadLine}</div>)
        }
    }
];

