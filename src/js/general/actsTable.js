import * as React from "react";
import {forwardRef} from "react";

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import RefreshIcon from '@material-ui/icons/Refresh';
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

export default class Acts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            clientId: null,
            clientName: null,
            columns: [
                {title: 'Номер Акта', field: 'actNumber'},
                {
                    title: 'Клиент', field: 'clientId',
                    editComponent: this.getEditComponent
                }
                ,
                {
                    title: 'Статус',
                    field: 'status',
                    lookup: {0: 'ВЫСТАВЛЕН', 1: 'ОПЛАЧЕН'}
                },
                {
                    title: 'Сумма',
                    field: 'summ',
                    type: 'numeric'
                },
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
            ],
            key: 0,
            data: [],
            loader: true
        };
        this.tableRef = React.createRef();
    }

    getEditComponent = props => {
        let options = !!this.state.clients ? this.state.clients : [];

        let selectedOption = options && options.length > 0 && !!this.state.clientId
            ? options.filter(opt => opt.name == this.state.clientName)[0]
            : 'props.rowData.clientId';

        // let cur = props.rowData === {} ? '' : props.rowData.clientId;


        return (
            <Autocomplete
                style={{width: '100px'}}
                options={options}
                getOptionLabel={option => option.name}
                onChange={(event, opt) => {
                    this.setState({clientId: opt.id, clientName: opt.name});
                }}
                renderInput={params => {
                    params.inputProps.value = selectedOption.name;
                    return (<TextField {...params}
                                       style={{width: '100px'}}
                                       margin="normal"
                    />)
                }
                }
            />
        )
    };

    async componentDidMount() {
        Promise.all([
            this.getClients(),
            this.getAllActs()
        ]).then(([clientList, actList]) => {
            actList.map(act => {
                act.clientId = clientList.filter(c => c.id === act.clientId)[0].name;
            });
            this.setState({clients: clientList, data: actList, loader: false})
        });
    }

    async getAllActs() {
        const response = await fetch("http://localhost:8080/acts");
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

    async deleteAct(data) {
        this.setState({loader: true});
        return await fetch('http://localhost:8080/acts/' + data.id, {
            method: 'delete',
        });
    }

    openClientView(id) {
        let {history} = this.props;
        history.push({
            pathname: '/clients/' + id,
        });
    }

    render() {
        return (
            <MaterialTable
                style={{width: '99%'}}
                title={'Таблица Актов'}
                columns={this.state.columns}
                icons={tableIcons}
                data={this.state.data}
                isLoading={this.state.loader}
                options={{
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
                        // backgroundColor: 'rgba(95,96,99,0.32)',
                        backgroundColor: 'rgba(0,69,147,0.52)',
                        color: "white",
                        fontSize: 12,
                        fontWeight: 'bolder'
                    }
                }}
                localization={{
                    body: {
                        emptyDataSourceMessage: 'Поиск не дал результатов',
                        addTooltip: 'Добавить Акт',
                        deleteTooltip: 'Удалить Акт',
                        editTooltip: 'Редактировать Акт'
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
                onRowClick={(
                    (evt, clickedClient) => {
                        this.openClientView.bind(this);
                        this.openClientView(clickedClient.id);
                    })
                }
                editable={{
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
                                    this.deleteAct(oldData)
                                        .then()
                                    let data = this.state.data;
                                    const index = data.indexOf(oldData);
                                    data.splice(index, 1);
                                    this.setState({data}, () => resolve());
                                }
                                resolve()
                            }, 1000)
                        }),
                }}
                actions={[
                    {
                        icon: () => {
                            return (<RefreshIcon/>)
                        },
                        tooltip: 'Refresh Data',
                        isFreeAction: true,
                        onClick: () => {
                            this.setState({loader: true});
                            this.componentDidMount()
                                .then(res => {
                                    this.setState({loader: false});
                                })
                        },
                    }
                ]}
            />
        )
    }
}
