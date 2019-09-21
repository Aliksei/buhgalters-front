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
import {string} from "prop-types";
import Reports from "./reportsTable";
import {Fragment} from "react";
import Greetings from "./Greetings";
import Acts from "./actsTable";


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
            columns: [
                {title: 'Имя', field: 'name'},
                {title: 'УНП', field: 'ynp'},
                {title: 'Директор', field: 'director'},
                {title: 'Уставновной Фонд $', field: 'fond', type: 'numeric'},
                {title: 'Юр. Адрес', field: 'address'},
                {title: 'Имнс', field: 'imns'},
                {title: 'ОКПО', field: 'okpo'},
                {title: 'ФСЗН', field: 'fszn'},
            ],
            data: [
                {
                    id: 111,
                    name: 'Ип Ткачук Алексей Алексеевич',
                    ynp: '443454354534',
                    director: "cvhjk",
                    fond: '5678',
                    address: 'masherova',
                    imns: '6789',
                    okpo: 't789',
                    fszn: '5678'
                },
                {
                    id: 222,
                    name: 'Ип Парфимович Артем Жанович',
                    ynp: '768474765745',
                    director: "cvhjk",
                    fond: '5678',
                    address: 'Ждановичи',
                    imns: '6789',
                    okpo: 't789',
                    fszn: '5678'
                },
                {
                    id: 333,
                    name: 'Ип Григорович Андрей Валерьевич',
                    ynp: '97085464',
                    director: "cvhjk",
                    fond: '5678',
                    address: 'masherova',
                    imns: '6789',
                    okpo: 't789',
                    fszn: '5678'
                }
            ],
            clickedClient : undefined
    }

    // componentDidMount() {
    //     const url = 'http://localhost:8080';
    //     fetch(url, {
    //         method: "GET"
    //     }).then(response => response.json())
    //         .then(clients => {
    //             this.setState({data: clients})
    //             console.log(clients)
    //         })
    // }

}

render()
{
    return (
        <Fragment>
            <MaterialTable
                title="Клиенты"
                columns={this.state.columns}
                icons={tableIcons}
                data={this.state.data}
                options={{pageSizeOptions: [5, 10, 15]}}
                onRowClick={(
                    (evt, selectedRow) => {
                        this.setState((state, props) => {
                            return state.clickedClient = selectedRow
                        })
                    })
                }

                localization={{
                    body: {
                        emptyDataSourceMessage: 'Поиск не дал результатов',
                        addTooltip: 'Добавить Клиента',
                        deleteTooltip: 'Удалить Клиента',
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
                                    const data = this.state.data;
                                    data.push(newData);
                                    this.setState({data}, () => resolve());
                                }
                                resolve()
                            }, 1000)
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    const data = this.state.data;
                                    const index = data.indexOf(oldData);
                                    data[index] = newData;
                                    this.setState({data}, () => resolve());
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
            <td><Reports client={this.state.clickedClient}/></td>
            <td><Acts client={this.state.clickedClient}/></td>

        </Fragment>

    )
}
}
