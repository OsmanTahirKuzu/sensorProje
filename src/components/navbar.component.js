import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Sensör Simülasyonu</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
        
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Harita oluştur</Link>
          </li>

          <li className="navbar-item">
          <Link to="/details" className="nav-link">Sensör Oluştur</Link>
          </li>


          <li className="navbar-item">
          <Link to="/" className="nav-link">Sensör Listesi</Link>
          </li>
          
      
          <li className="navbar-item">
          <Link to="/sensorDatas" className="nav-link">Sensör Detayları</Link>
          </li>
          
        </ul>
        </div>
      </nav>
    );
  }
}