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


function sleep(delay = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

function Asynchronous() {
    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const loading = open && options.length === 0;

    React.useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            const response = await fetch('https://country.register.gov.uk/records.json?page-size=5000');
            await sleep(1e3); // For demo purposes.
            const countries = await response.json();

            if (active) {
                setOptions(Object.keys(countries).map(key => countries[key].item[0]));
            }
        })();

        return () => {
            active = false;
        };
    }, [loading]);

    React.useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-demo"
            style={{width: 300}}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionLabel={option => option.name}
            options={options}
            loading={loading}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Asynchronous"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

export default class Acts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [
                {clientId: 323, name: 'JOKER'},
                {clientId: 1, name: 'OUUU'},
                {clientId: 2, name: 'OLLL'},
                {clientId: 32, name: 'KIKI'}
            ],
            client: {},
            columns: [
                {title: 'Номер Акта', field: 'actNumber'},
                {
                    title: 'Клиент', field: 'clientId',
                    editComponent: props => (<Autocomplete
                        options={this.state.clients}
                        value= {this.state.clients[1]}
                        getOptionLabel={option => option.name}
                        onChange={(event, newValue) => {
                            console.log(event);
                            this.setState({client: newValue})
                        }}
                        renderInput={params => <TextField {...params} margin="normal"
                        />
                        }
                    />)
                }
                ,
                {
                    title: 'Статус',
                    field: 'status',
                    lookup: {1: 'ВЫСТАВЛЕН', 2: 'ОПЛАЧЕН'}
                },
                {
                    title: 'Сумма',
                    field: 'summ'
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
        }
    }

    async componentDidMount() {
        // this.getClients()
        //     .then(res => {
        //         this.setState({clients: res})
        //     })

        // fetch("http://localhost:8080/clients")
        //     .then(res => res.json())
        //     .then(c => {
        //         this.setState({
        //             clients: c.map(client => {
        //                 return (
        //                     <MenuItem value={client.id}>{client.name}</MenuItem>
        //                 )
        //             })
        //         });
        //     })

    }

    async getAllActs() {
        const response = await fetch("http://localhost:8080/acts");
        const json = await response.json();
        this.setState({data: json, loader: false});
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
        // if (this.props.client === undefined) {
        //     return null;
        // }

        return (
            <MaterialTable
                title={'Таблица Актов'}
                columns={this.state.columns}
                icons={tableIcons}
                data={this.state.data}
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
                                    this.createAct(newData)
                                        .then(res => res.json())
                                        .then(res => {
                                            const data = this.state.data;
                                            data.push(res);
                                            this.setState({data, loader: false}, () => resolve());
                                            this.setState({client: {}})
                                        });
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


        )
    }
}
