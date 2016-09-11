import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-input-calendar';
import moment from 'moment';


// App component - represents the whole app
class Reports extends Component {
  constructor(props){
    super(props);
    this.state={reportDate: moment().format('MM-DD-YYYY') }
  }

  render(){
    return (
      <div>
        <div>reports</div>
        <Calendar format='MM-DD-YYYY' date={this.state.reportDate} onChange={(d)=>{
          console.log('Date Changed:', d);
          this.setState({ ...this.state, reportDate: d });
        }}/>
        <button onClick={()=>{
          console.log('clicking retrieve', this.state.reportDate);
        }} >Retrieve</button>
      </div>
    )
  }
}

export default Reports;
