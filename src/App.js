import React, { useState } from "react";


// import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import SensorsList from "./components/sensor-list.component";
import CreateSensor from "./components/create-map.component";
import SensorDatas from "./components/sensorDatas.component";
import DynamicForm from "./components/dynamicForm.component";


function App() {

 
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={SensorsList} />
      <Route path="/create" component={CreateSensor} />
      <Route path="/sensorDatas" exact component={SensorDatas} />
      <Route path="/details" exact component={DynamicForm} />
      
      </div>
      
    </Router>
  );
}

export default App;