import * as React from "react";
import MaterialTable from "material-table";
import RefreshIcon from '@material-ui/icons/Refresh';
import tableIcons from "./common";
import {useTableData} from "../service/custom-hooks/custom-hookjs";
import {getActs} from "../service/actService";
import {ActView} from "../client/emailact";
import VisibilityIcon from '@material-ui/icons/Visibility';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Chip from "@material-ui/core/Chip";
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';

const Acts = ({history}) => {

    const [loader, setLoader] = React.useState(true);
    const [update, triggerUpdate] = React.useState({});
    const [actView, setActForView] = React.useState({
        act: {},
        opened: false,
        client: {}
    });

    const data = useTableData(getActs, setLoader, update);

    const openClientView = (id) => {
        history.push({
            pathname: '/clients/' + id,
        });
    };

    const columns = [
        {title: 'Номер Акта', field: 'actNumber'},
        {title: 'Клиент', field: 'client.name', editable: 'never'},
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
        },
        {
            title: 'Статус', field: 'status',
            render: (rowData, f) => {
                let yellowStyle = {backgroundColor: 'rgb(248,242,121, 0.39)'};
                let greenStyle = {backgroundColor: 'rgba(136,255,136,0.32)'};
                const Status = ({label, style, icon}) => (
                    <Chip size="small" label={label} style={style} variant={"outlined"} icon={icon}/>
                );
                if (f === 'row') {
                    if (rowData.status === 1) {
                        return <Status label={'ВЫСТАВЛЕН'} style={yellowStyle} icon={<AccessTimeOutlinedIcon/>}/>;

                    }
                    if (rowData.status === 2) {
                        return <Status label={'ОПЛАЧЕН'} style={greenStyle} icon={<CheckOutlinedIcon/>}/>;
                    }
                }
                if (f === 'group') {
                    if (rowData === 1) {
                        return <Status label={'ВЫСТАВЛЕН'} style={yellowStyle} icon={<AccessTimeOutlinedIcon/>}/>;
                    }
                    if (rowData === 2) {
                        return <Status label={'ОПЛАЧЕН'} style={greenStyle} icon={<CheckOutlinedIcon/>}/>;
                    }
                }
            }
        },
        {title: 'Сумма', field: 'summ', type: 'numeric'},
        {title: 'Дата отправки', field: 'actDate', type: 'date'}
    ];
    const localization = {
        body: {
            emptyDataSourceMessage: 'Данные отсутствуют',
            addTooltip: 'Добавить Акт',
            deleteTooltip: 'Удалить Акт',
            editTooltip: 'Редактировать Акт',
            editRow: {
                saveTooltip: 'Сохранить',
                cancelTooltip: 'Отменить',
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
    const options = {
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
            padding: "1px 2px 3px 3px",
            backgroundColor: 'rgba(0,69,147,0.52)',
            color: "white",
            fontSize: 12,
            fontWeight: 'bolder'
        }
    };

    return (
        <div>
            <ActView opened={actView.opened} forEdit={true} client={actView.client} handleClose={() => {
                setActForView(() => {
                    return {
                        act: {},
                        opened: false,
                        client: {}
                    }
                });
                setLoader(true);
                triggerUpdate(new Date);
            }} act={actView.act} saveOrUpdate={'update'}/>
            <MaterialTable
                title={'Таблица Актов'}
                columns={columns}
                icons={tableIcons}
                data={data}
                isLoading={loader}
                options={options}
                localization={localization}
                onRowClick={((evt, clickerRow) => openClientView(clickerRow.client.id))}
                actions={[
                    {
                        icon: () => <RefreshIcon/>,
                        tooltip: 'Обновить данные в таблице',
                        isFreeAction: true,
                        onClick: () => {
                            setLoader(true);
                            triggerUpdate(new Date())
                        }
                    },
                    {
                        icon: () => <VisibilityIcon/>,
                        tooltip: 'Просмотр актa',
                        onClick: (event, rowData) => {
                            setActForView({
                                act: {...rowData},
                                opened: true,
                                client: {...rowData.client}
                            });
                        }
                    },
                    {
                        icon: () => <PersonOutlineIcon/>,
                        tooltip: 'Просмотр клиента',
                        onClick: (event, rowData) => {
                            openClientView(rowData.client.id)
                        }
                    }
                ]}
            />
        </div>
    )
};

export default Acts;
