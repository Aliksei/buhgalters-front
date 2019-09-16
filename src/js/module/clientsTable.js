import * as React from "react";
import MaterialTable from "material-table";


export default class Editable extends React.Component {
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
                {title: 'Surname', field: 'surname', initialEditValue: 'initial edit value'},
                {title: 'Birth Year', field: 'birthYear', type: 'numeric'},
                {
                    title: 'Birth Place',
                    field: 'birthCity',
                    lookup: {34: 'İstanbul', 63: 'Şanlıurfa'},
                },
            ],
            data: []
        }
    }

    componentDidMount() {
        const url = 'http://localhost:8080';
        fetch(url, {
            method: "GET"
        }).then(response => response.json())
            .then(clients => {
                this.setState({data: clients})
                console.log(clients)
            })
    }

    render() {
        return (
            <MaterialTable
                title="Клиенты"
                columns={this.state.columns}
                data={this.state.data}
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
        )
    }
}
