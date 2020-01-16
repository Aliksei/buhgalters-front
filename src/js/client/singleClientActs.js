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
import {actService} from "../service/actService";
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

const ClientsAct = ({owner, actList, update}) => {

        const [loader, setLoader] = React.useState(true);

        useEffect(() => {
            if (Object.keys(owner).length !== 0 && actList.leading > 0) {
                setLoader(false);
            }
        }, [actList, owner]);
        return (
            <MaterialTable
                style={{width: '99%'}}
                title={'Таблица aктов клиента :  ' + owner.name}
                columns={columns}
                icons={tableIcons}
                data={actList}
                isLoading={loader}
                options={options}
                localization={localization}
                editable={{
                    onRowAdd: newData => new Promise((resolve, reject) => {
                        setTimeout(() => {
                            {
                                setLoader(true);
                                newData.clientId = owner.id;
                                actService.postAct(newData)
                                    .then(res => update(res));
                            }
                            resolve()
                        }, 50)
                    }),
                    onRowUpdate: (newData, oldData) => new Promise((resolve, reject) => {
                        setTimeout(() => {
                            {
                                setLoader(true);
                                newData.clientId = owner.id;
                                actService.putAct(newData)
                                    .then(res => update(res))
                            }
                            resolve()
                        }, 50)
                    }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                {
                                    setLoader(true);
                                    actService.deleteAct(oldData)
                                        .then(res => update(new Date()));
                                }
                                resolve()
                            }, 50)
                        }),
                }}
            />
        )
    }

;

export default ClientsAct;

const columns = [
    {title: 'Номер Акта', field: 'actNumber'},
    {
        title: 'Клиент', field: 'clientId',
        hidden: true
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
    {
        title: 'Дата отправки',
        field: 'actDate',
        type: 'date',
        // render: (data, type) => {
        //     let moment = Moment(data);
        //     moment.locale();
        //     return (<div>{moment.format('YYYY-MM-DD')}</div>)
        // }
    },
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
];

const options = {
    pageSizeOptions: [5, 10, 15],
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

const localization = {
    body: {
        emptyDataSourceMessage: 'Поиск не дал результатов',
        addTooltip: 'Добавить Акт',
        deleteTooltip: 'Удалить Акт',
        editTooltip: 'Редактировать Акт',
        editRow: {
            deleteText: 'Удалить выбранный акт?',
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
