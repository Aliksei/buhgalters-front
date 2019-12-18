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

export default class ClientsReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loader: true,
            columns: [
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
                        console.log(type)
                        var diff = (deeadLine.getTime() - todaay.getTime())/(1000 * 3600 * 24);
                        let col;
                        let tit;
                        if (diff <= 10) {
                            col = 'red';
                            tit = 'Дедлайн скоро истекает или уже просрочен';
                        }
                        return (<div title={tit} style={{color: col}}>{data.deadLine}</div>)
                    }
                }
            ]
        };
    }

    componentDidMount() {
        let param = encodeURIComponent(this.props.clientId);
        this.getReportsByClient(param)
            .then(res => {
                this.setState({data: res, loader: false});
            })
    }

    async updateReport(data) {
        this.setState({loader: true});
        return await fetch('http://localhost:8080/reports/' + data.id, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
            .then(res => res.json());
    }

    async createNewReport(report) {
        this.setState({loader: true});
        return await fetch('http://localhost:8080/reports', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(report)
        })
            .then(res => res.json());
    }

    async getReportsByClient(id) {
        return await fetch("http://localhost:8080/reports/byClient?clientId=" + id)
            .then(res => res.json());
    }

    render() {
        return (
            <MaterialTable
                style={{width: '99%'}}
                title={'Таблица отчетов клиента : ' + this.props.owner.name}
                columns={this.state.columns}
                icons={tableIcons}
                data={this.state.data}
                isLoading={this.state.loader}
                options={{
                    pageSizeOptions: [5, 10, 15],
                    paginationType: 'stepped',
                    padding: 'dense',
                    showFirstLastPageButtons: true,
                }}
                localization={{
                    body: {
                        emptyDataSourceMessage: 'Поиск не дал результатов',
                        addTooltip: 'Добавить Отчет',
                        deleteTooltip: 'Удалить Отчет',
                        editTooltip: 'Редактировать Отчет'
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
                }}
                editable={{
                    onRowAdd: newData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    this.setState({loader: true});
                                    newData.clientId = this.props.owner.id;
                                    this.createNewReport(newData)
                                        .then(res => {
                                            const data = this.state.data;
                                            data.push(res);
                                            this.setState({data, loader: false}, () => resolve());
                                        });
                                }
                                resolve()
                            }, 1)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    newData.clientId = this.props.owner.id;
                                    this.updateReport(newData)
                                        .then(res => {
                                            const gj = this.state.data;
                                            const index = gj.indexOf(oldData);
                                            gj[index] = res;
                                            this.setState({data: gj, loader: false}, () => resolve());
                                        })
                                }
                                resolve()
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    this.deleteAct(oldData)
                                        .then(res => {
                                            let data = this.state.data;
                                            const index = data.indexOf(oldData);
                                            data.splice(index, 1);
                                            this.setState({data, loader: false}, () => resolve());
                                        });
                                }
                                resolve()
                            }, 1000)
                        }),
                }}
            />
        )
    }
}


