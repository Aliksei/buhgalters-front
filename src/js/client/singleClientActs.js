import * as React from "react";

import MaterialTable from "material-table";
import tableIcons from "../general/common";
import VisibilityIcon from '@material-ui/icons/Visibility';
import {ActView} from "./emailact";
import {deleteAct} from "../service/actService";
import AddBoxIcon from '@material-ui/icons/AddBox';
import Chip from "@material-ui/core/Chip";
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';

const ClientsAct = ({owner, actList, update}) => {

    const [state, setState] = React.useState({
        act: {},
        forEdit: true,
        opened: false,
    });

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
            render: (rowData) => {
                    if (rowData.status === 1) {
                        return (<Chip size="small" label={'ВЫСТАВЛЕН'} style={{backgroundColor: 'rgb(248,242,121, 0.39)'}}
                                      variant={"outlined"} icon={<AccessTimeOutlinedIcon/>}/>);
                    }
                    if (rowData.status === 2) {
                        return (<Chip size="small" label={'ОПЛАЧЕН'} style={{backgroundColor: 'rgba(136,255,136,0.32)'}}
                                      variant={"outlined"} icon={<CheckOutlinedIcon/>}/>);
                    }
            }
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
            field: 'actMonth',
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

    const localization = {
        body: {
            emptyDataSourceMessage: 'Данные отсутствуют',
            addTooltip: 'Добавить Акт',
            deleteTooltip: 'Удалить Акт',
            editTooltip: 'Редактировать Акт',
            editRow: {
                deleteText: 'Удалить выбранный акт?',
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

    const onReject = (reason, reject) => {
        window.alert("Ошибка Запроса: " + reason);
        setState(prevState => {
            return {...prevState}
        });
        reject();
    };

    const ActEditor = () => {
        if (state.opened === false) {
            return null
        } else {
            console.log("RENDER");
            function Response() {
                return (
                    <ActView opened={state.opened} client={owner} act={state.act} forEdit={state.forEdit}
                             handleClose={() => {
                                 setState(() => {
                                     return {
                                         act: {},
                                         opened: false,
                                         forEdit: false,
                                     }
                                 });
                                 update(new Date);
                             }}/>
                )
            }
            return <Response/>;
        }
    };

    return (
        <div>
            <ActEditor/>
            <MaterialTable
                style={{width: '99%'}}
                title={'Таблица aктов клиента :  ' + owner.name}
                columns={columns}
                icons={tableIcons}
                data={actList}
                options={options}
                localization={localization}
                onRowClick={() => {}}
                actions={[
                    {
                        icon: () => <VisibilityIcon/>,
                        tooltip: 'Просмотр актa',
                        onClick: (event, rowData) => {
                            console.log(rowData);
                            setState({
                                act: {...rowData},
                                forEdit: true,
                                opened: true
                            })
                        }
                    },
                    {
                        icon: () => <AddBoxIcon/>,
                        tooltip: 'Добавить новый акт',
                        isFreeAction: true,
                        onClick: () => {
                            setState({
                                act: {},
                                forEdit: false,
                                opened: true,
                            })
                        },
                    }
                ]}
                editable={{
                    onRowDelete: oldData => {
                        return new Promise((resolve, reject) => {
                            deleteAct(oldData)
                                .then(res => {
                                    resolve();
                                    update(new Date());
                                }, (reason) => onReject(reason, reject));
                        })
                    }
,
                }}
            />
        </div>

    )
};

export default ClientsAct;