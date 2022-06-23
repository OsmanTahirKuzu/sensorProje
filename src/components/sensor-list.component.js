import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Detail = props => (
  <tr>
    <td>{props.detail.type}</td>
    <td>{props.detail.location}</td>
    <td>{props.detail.reportDelay}</td>
    <td>
      <a href="#" onClick={() => { props.openDetail(props.detail._id) }}>Detaylar</a>
      <br/>
      <a href="#" onClick={() => { props.deleteDetail(props.detail._id) }}>Sil</a>
    </td>
  </tr>
)

export default class DetailsList extends Component {
  constructor(props) {
    super(props);

    this.deleteDetail = this.deleteDetail.bind(this)

    this.state = {details: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/details/')
      .then(response => {
        this.setState({ details: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  openDetail(id){
    window.location="/sensorDatas"

  }
  deleteDetail(id) {
    axios.delete('http://localhost:5000/details/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      details: this.state.details.filter(el => el._id !== id)
    })
  }

  detailList() {
    return this.state.details.map(currentdetail => {
      return <Detail detail={currentdetail} openDetail={this.openDetail} deleteDetail={this.deleteDetail} key={currentdetail._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Sensörler Özet</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Sensör Tipi</th>
              <th>Konum</th>
              <th>Sensör Raporlama Sıklığı</th>

              
              <th>Aksiyonlar</th>
            </tr>
          </thead>
          <tbody>
            { this.detailList() }
          </tbody>
        </table>
      </div>
    )
  }
}