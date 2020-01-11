import * as React from "react";
import {forwardRef} from 'react';
import MaterialTable from "material-table";

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
import {Fragment} from "react";
import RefreshIcon from '@material-ui/icons/Refresh';
import {reportService} from "../service/reportService";


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

export default class ReportsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            columns: [
                {
                    title: 'Наименование', field: 'reportName',
                },
                {
                    title: 'Клиент',
                    field: 'miniClient',
                    editable: 'never',
                    render: (data, type) => {
                        return (<div>{data.miniClient.clientName}</div>)
                    }
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
                        2: 'ПРОСРОЧЕН'
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
                        var diff = (deeadLine.getTime() - todaay.getTime())/(1000 * 3600 * 24);
                        let col;
                        let back;
                        let tit;
                        if (diff <= 10) {
                            col = 'red';
                            back = 'lightgray';
                            tit = 'Дедлайн скоро истекает или уже просрочен';
                        }
                        return (<div title={tit} style={{color: col, backgroundColor : back}}>{data.deadLine}</div>)
                    }
                }
            ],
            data: [],
            clickedClient: undefined,
        };
        this.tableRef = React.createRef();
    }

    async componentDidMount() {
        reportService.getReports()
            .then(res =>  this.setState({data: res, loader: false}));
    }

    openClientView(id) {
        let {history} = this.props;
        history.push({
            pathname: '/clients/' + id,
        });
    }

    render() {
        return (
            <Fragment>
                <MaterialTable
                    title="Таблица Отчетностей"
                    columns={this.state.columns}
                    isLoading={this.state.loader}
                    icons={tableIcons}
                    tableRef={this.tableRef}
                    data={this.state.data}
                    options={{
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
                            // backgroundColor: 'rgba(95,96,99,0.32)',
                            backgroundColor: 'rgba(0,69,147,0.52)',
                            color: "white",
                            fontSize: 12,
                            fontWeight: 'bolder'
                        }
                    }}
                    onRowClick={(
                        (evt, selectedRow) => {
                            this.setState((state, props) => {
                                return state.clickedClient = selectedRow
                            })
                        })
                    }
                    style={{width: '99%'}}
                    localization={{
                        body: {
                            emptyDataSourceMessage: 'Поиск не дал результатов',
                            addTooltip: 'Добавить Акт',
                            deleteTooltip: 'Удалить Акт',
                            editTooltip: 'Редактировать',
                            editRow: {
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
                    }}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        this.setState({loader: true});
                                        reportService.putReport(newData)
                                            .then(res => {
                                                const data = this.state.data;
                                                const index = data.indexOf(oldData);
                                                data[index] = res;
                                                this.setState({data: data, loader: false}, () => resolve())
                                            })
                                    }
                                    resolve()
                                }, 50)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        this.setState({loader: true});
                                        reportService.deleteReport(oldData)
                                            .then(resp => {
                                                let data = this.state.data;
                                                const index = data.indexOf(oldData);
                                                data.splice(index, 1);
                                                this.setState({data: data, loader: false}, () => resolve())
                                            });
                                    }
                                    resolve()
                                }, 50)
                            }),
                    }}
                    onRowClick={(
                        (evt, clickedAct) => {
                            this.openClientView.bind(this);
                            this.openClientView(clickedAct.clientId);
                        })
                    }
                    actions={[
                        {
                            icon: () => { return (<RefreshIcon/>)},
                            tooltip: 'Refresh Data',
                            isFreeAction: true,
                            onClick: () =>  {
                                    this.setState({loader: true});
                                    this.componentDidMount()
                                        .then(res => {
                                            this.setState({loader: false});
                                        })
                            },
                        }
                    ]}
                />
            </Fragment>
        )
    }
}
