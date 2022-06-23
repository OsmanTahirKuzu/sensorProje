import React, { Component } from 'react';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateSensor extends Component {
  constructor(props) {
    super(props);

    this.onChangecenterPoint = this.onChangecenterPoint.bind(this);
    this.onChangeradius = this.onChangeradius.bind(this);
    this.onChangesensorCount = this.onChangesensorCount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      centerPoint: 0,
      radius: 0,
      sensorCount: 0,
    }
  }

  onChangecenterPoint(e) {
    this.setState({
      centerPoint: e.target.value
    })
  }

  onChangeradius(e) {
    this.setState({
      radius: e.target.value
    })
  }


  onChangesensorCount(e) {
    this.setState({
      sensorCount: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const sensor = {
     
      centerPoint: this.state.centerPoint,
      radius: this.state.radius,
      sensorCount: this.state.sensorCount
    }

    console.log(sensor);

    axios.post('http://localhost:5000/sensors/add', sensor)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3></h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Harita merkez nokta koordinatları: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.centerPoint}
              onChange={this.onChangecenterPoint}/>
              
        </div>
        <div className="form-group"> 
          <label>Harita yarıçapı: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.radius}
              onChange={this.onChangeradius}
              />
        </div>
       
         <div className="form-group">
          <label>Sensör sayısı: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.sensorCount}
              onChange={this.onChangesensorCount}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Gönder" className="btn btn-primary" />
        </div> 
      </form>
    </div>
    )
  }
}