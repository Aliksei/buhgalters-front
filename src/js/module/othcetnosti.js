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
import Autocomplete from '@material-ui/lab/Autocomplete';
import MaterialTable from "material-table";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";


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


export default class Otchets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            client: this.props.client,
            columns: [
                {title: 'Наименование', field: 'name'},
                {
                    title: 'Тип',
                    field: 'type',
                    lookup: {0: 'Налоги', 1: 'Фсзн', 2: 'Статисктика', 3: 'БелгосСтрах'}
                }
                ,
                {
                    title: 'Статус',
                    field: 'status',
                    lookup: {0: 'ОТПРАВЛЕН', 1: 'ПРИНЯТ', 2: 'ПРОСРОЧЕН'}
                },
                {title: 'Клиент', field: 'clientName'},
                {
                    title: 'Дата',
                    field: 'date',
                    type: 'date'
                },
                {title: 'Дедлайн', field: 'actDate', type: 'date'},
            ],
            key: 0,
            data: [],
            loader: false
        }
    }

    // async componentDidMount() {
    //     Promise.all([
    //         this.getClients(),
    //         this.getAllActs()
    //     ]).then(([clientList, actList]) => {
    //         console.log(clientList);
    //         console.log(actList);
    //         actList.map(act => {
    //
    //             act.clientId = clientList.filter(c => c.id === act.clientId)[0].name;
    //
    //         });
    //         this.setState({clients: clientList, data: actList, loader: false})
    //     });
    // }

    async getAllReports() {
        const response = await fetch("http://localhost:8080/reports");
        return await response.json();
    }

    async editAct(clientId, act) {
        const response = await fetch("http://localhost:8080/acts");
        const json = await response.json();
        this.setState({data: json, loader: false});
    }

    async getClients() {
        const response = await fetch("http://localhost:8080/clients");
        return await response.json();
    }

    async getClientsForActs() {
        const response = await fetch("http://localhost:8080/clients/forActs");
        return await response.json()
    }

    async createAct(act) {
        this.setState({loader: true});
        return await fetch('http://localhost:8080/acts/createAct', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(act)
        });
    }

    async deleteAct(client) {
        const response = await fetch("http://localhost:8080/acts");
        const json = await response.json();
        this.setState({data: json, loader: false});
    }

    render() {
        return (
            <MaterialTable
                style={{width: '120%'}}
                title={'Таблица Отчетностей'}
                columns={this.state.columns}
                icons={tableIcons}
                data={this.state.data}
                isLoading={this.state.loader}
                options={{
                    pageSizeOptions: [5, 10, 15],
                    paginationType: 'stepped',
                    exportButton: true,
                    columnsButton: true,
                    exportAllData: true,
                    grouping: true,
                    showFirstLastPageButtons: true,
                    toolbar: true,
                    draggable: true,
                }}
                localization={{
                    body: {
                        emptyDataSourceMessage: 'Поиск не дал результатов',
                        addTooltip: 'Добавить Отчетность',
                        deleteTooltip: 'Удалить Отчетность',
                        editTooltip: 'Редактировать'
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
                                    newData.clientId = this.state.clientId;
                                    this.createAct(newData)
                                        .then(res => res.json())
                                        .then(res => {
                                            const data = this.state.data;
                                            data.push(res);
                                            this.setState({data, loader: false}, () => resolve());
                                        });
                                }
                                resolve()
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            this.setState({loader: true});
                            setTimeout(() => {
                                {
                                    const data = this.state.data;
                                    const index = data.indexOf(oldData);
                                    data[index] = newData;
                                    this.setState({data, loader: false}, () => resolve());
                                }
                                resolve()
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    let data = this.state.data;
                                    const index = data.indexOf(oldData);
                                    data.splice(index, 1);
                                    this.setState({data}, () => resolve());
                                }
                                resolve()
                            }, 1000)
                        }),
                }}
            />


        )
    }
}
