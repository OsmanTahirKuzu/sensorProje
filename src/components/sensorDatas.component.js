import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
const yeniData=[] ;
let sensor
function getSensor() {
    axios.get('http://localhost:5000/details/')
        .then(response => {
            sensor = response.data
        })
        .catch((error) => {
            console.log(error);
        })
}
getSensor()


setInterval(function () {
    let i = 0;
    while (i < sensor.length) {
        yeniData[i] = {
            type: sensor[i].type,
            location: sensor[i].location,
            reportDelay: sensor[i].reportDelay,
            duman: Math.random(),
            co2: Math.random(),
            metan: Math.random(),
            toz: Math.random(),
            o2: Math.random(),
            timeStamps: new Date().toLocaleString("tr-TR"),
        }
        console.log(yeniData[i]);

        axios.post('http://localhost:5000/sensorDatas/add', yeniData[i])
            .then(res => console.log(res.data));
        i++;
    }
}, 12000)

const SensorData = props => (
    <tr>
        <td>{props.sensorData.type}</td>
        <td>{props.sensorData.location}</td>
        <td>{props.sensorData.reportDelay}</td>
        <td>{props.sensorData.duman}</td>
        <td>{props.sensorData.co2}</td>
        <td>{props.sensorData.metan}</td>
        <td>{props.sensorData.toz}</td>
        <td>{props.sensorData.o2}</td>
        <td>{props.sensorData.timeStamps}</td>
        <td>
            <a href="#" onClick={() => { props.deleteSensorData(props.sensorData._id) }}>delete</a>
        </td>

    </tr>
)

export default class SensorDatas extends Component {
    constructor(props) {
        super(props);

        this.deleteSensorData = this.deleteSensorData.bind(this)

        this.state = { sensorDatas: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/sensorDatas/')
            .then(response => {
                this.setState({ sensorDatas: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteSensorData(id) {
        axios.delete('http://localhost:5000/sensorDatas/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            sensorDatas: this.state.sensorDatas.filter(el => el._id !== id)
        })
    }

    sensorData() {
        return this.state.sensorDatas.map(currentsensorData => {
            return <SensorData sensorData={currentsensorData} deleteSensorData={this.deleteSensorData} key={currentsensorData._id} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Sensörler Özet</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>type</th>
                            <th>Konum</th>
                            <th>Raporlama Sıklığı</th>
                            <th>Duman</th>
                            <th>CO2</th>
                            <th>Metan</th>
                            <th>Toz</th>
                            <th>O2</th>
                            <th>Zaman Damgası</th>
                            <th>Aksiyonlar</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.sensorData()}
                    </tbody>
                </table>
            </div>
        )
    }
}