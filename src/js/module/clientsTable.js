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
        }
    }

    async componentDidMount() {
        this.getClients()
    }

    async getClients() {
        const response = await fetch("http://localhost:8080/clients");
        const json = await response.json();
        this.setState({data: json, loader: false});
    }

    async updateClient(data) {
        this.setState({loader: true});
        return await fetch('http://localhost:8080/clients/update/' + data.id, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
    }

    async addClient(data) {
        this.setState({loader: true});
        return await fetch('http://localhost:8080/clients/create', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
    }

    async deleteClient(data) {
        this.setState({loader: true});
        return await fetch('http://localhost:8080/clients/delete/' + data.id, {
            method: 'delete',
        });
    }

    openClientView(clickedClient) {
        let {history} = this.props;
        history.push({
            pathname: '/clients/' + clickedClient.id,
        });
    }

    render() {
        return (
            <Fragment>
                <MaterialTable
                    title="Таблица Клиенты"
                    columns={this.state.columns}
                    isLoading={this.state.loader}
                    icons={tableIcons}
                    data={this.state.data}
                    options={{
                        doubleHorizontalScroll: true,
                        pageSizeOptions: [5, 10, 15],
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
                            fontSize: 12,
                            fontWeight: 'bolder'
                        }
                    }}
                    onRowClick={(
                        (evt, clickedClient) => {
                            this.openClientView.bind(this);
                            this.openClientView(clickedClient);
                        })
                    }
                    style={{width: '95%'}}
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
                    editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        this.addClient(newData)
                                            .then(res => res.json())
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
                                }, 1000)
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        this.updateClient(newData)
                                            .then(res => res.json())
                                            .then(res => {
                                                const data = this.state.data;
                                                const index = data.indexOf(oldData);
                                                data[index] = res;
                                                this.setState({data: data, loader: false}, () => resolve())
                                            })
                                    }
                                    resolve()
                                }, 1000)
                            }),
                        onRowDelete: oldData =>
                            new Promise((resolve, reject) => {
                                setTimeout(() => {
                                    {
                                        this.deleteClient(oldData)
                                            .then(resp => {
                                                let data = this.state.data;
                                                const index = data.indexOf(oldData);
                                                data.splice(index, 1);
                                                this.setState({data: data, loader: false}, () => resolve())
                                            });
                                    }
                                    resolve()
                                }, 1000)
                            }),
                    }}
                />
            </Fragment>

        )
    }
}
