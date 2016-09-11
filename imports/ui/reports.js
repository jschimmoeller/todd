import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-input-calendar'


// App component - represents the whole app
class Reports extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <div>reports</div>
        <Calendar format='DD/MM/YYYY' />
      </div>
    )
  }
}

export default Reports;
