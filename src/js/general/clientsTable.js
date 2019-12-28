import * as React from "react";
import {forwardRef, Fragment} from "react";
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
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import CachedIcon from '@material-ui/icons/Cached';
import {clientService} from "../service/clientService";


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

export default class Clients extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: true,
            columns: [
                {
                    title: 'Имя', field: 'name',
                },
                {title: 'УНП', field: 'ynp', type: 'numeric'},
                {title: 'Директор', field: 'director'},
                {title: 'Фонд $', field: 'fond', type: 'numeric'},
                {title: 'Юр. Адрес', field: 'address'},
                {title: 'Имнс', field: 'imns'},
                {title: 'Почта', field: 'email'},
                {title: 'ОКПО', field: 'okpo'},
                {title: 'ФСЗН', field: 'fszn'},
            ],
            data: [],
        };
        this.tableRef = React.createRef();
    }

    async componentDidMount() {
        clientService.getClients()
            .then(clients => {
                this.setState({data: clients, loader: false});
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
            <Fragment>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/clients">
                        Клиенты
                    </Link>
                </Breadcrumbs>
                <MaterialTable
                    title="Таблица Клиенты"
                    columns={this.state.columns}
                    isLoading={this.state.loader}
                    icons={tableIcons}
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
                        (evt, clickedClient) => {
                            this.openClientView.bind(this);
                            this.openClientView(clickedClient.id);
                        })
                    }
                    style={{width: '100%'}}
                    tableRef={this.tableRef}
                    localization={{
                        body: {
                            emptyDataSourceMessage: 'Поиск не дал результатов',
                            addTooltip: 'Добавить Клиента',
                            deleteTooltip: 'Удалить Клиента',
                            editTooltip: 'Редактировать',
                            editRow: {
                                deleteText: 'Удалить выбранного клиента?',
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
                    actions={[
                        {
                            icon: () => {
                                return (<CachedIcon/>)
                            },
                            tooltip: 'Refresh Data',
                            isFreeAction: true,
                            onClick: () => {
                                this.setState({loader: true});
                                this.componentDidMount()
                                    .then(() => {
                                        this.setState({loader: false});
                                    })
                            },
                        }
                    ]}
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        this.setState({loader: true});
                                        clientService.postClient(newData)
                                            .then(res => {
                                                const data = this.state.data;
                                                data.push({
                                                        id: res.id,
                                                        director: res.director,
                                                        email: res.email,
                                                        fond: res.fond,
                                                        fszn: res.fszn,
                                                        name: res.name,
                                                        okpo: res.okpo,
                                                        ynp: res.ynp,
                                                        imns: res.imns,
                                                        address: res.address
                                                    }
                                                )
                                                ;
                                                (this.setState({data: data, loader: false}, () => resolve()))
                                            })
                                    }
                                    resolve()
                                }, 50)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        this.setState({loader: true});
                                        clientService.putClient(newData)
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
                                        clientService.deleteClient(oldData)
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
                />
            </Fragment>

        )
    }
}
