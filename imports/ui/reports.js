import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-input-calendar';
import moment from 'moment';

class HMISSummary extends Component {
  render(){
    return (
      <div>
        <div>{this.props.title}</div>
        <ul>
          {this.props.data.map((i,index)=>{
            return (<li key={index}><span>{i.hmisId}</span> <span>{i.name}</span> <span>{i.svcCharString}</span></li>);
          })}
        </ul>
      </div>
    )
  }
}
class ReportSummary extends Component {
  render(){
    return (
      <div>
        <div>{this.props.title}</div>
        <ul>
          {Object.keys(this.props.data).map((i,index)=>{
            return (<li key={index}><span>{i}</span> - <span>{this.props.data[i]}</span></li>);
          })}
        </ul>
      </div>

    );
  }
}

class ReportDetail extends Component {
  render(){
    console.log('PPP', this.props.data)
    return (
      <div>
        <div>Report Details - {this.props.data.reportDate}</div>
        <div>Total Served: - {this.props.data.hmisSummary.length}</div>
        <ReportSummary title="Race Summary" data={this.props.data.raceSummary} />
        <ReportSummary title="Gender Summary" data={this.props.data.genderSummary} />
        <ReportSummary title="Service Summary" data={this.props.data.servicesSummary} />
        <HMISSummary title="HMIS Report Data" data={this.props.data.hmisSummary} />
      </div>);
  }
}


// App component - represents the whole app
class Reports extends Component {
  constructor(props){
    super(props);
    this.state={reportDate: moment().format('MM-DD-YYYY') }
  }

  render(){
    let reportDetails;
    if (this.state.reportData){
      reportDetails = (<ReportDetail data={this.state.reportData} />);
    }
    return (
      <div>
        <div
            style={{
              display: 'flex',
              color: '#fff',
              fontFamily: 'avenir',
              fontSize: '18px',
              fontWeight: '700',
              justifyContent: 'center',
              marginTop: '75px'
            }}
        >
            Reports
        </div>
        <span
             style={{
               display: 'flex',
               justifyContent: 'center'
             }}>
        <Calendar
            format='MM-DD-YYYY'
            date={this.state.reportDate}
            onChange={(d)=>{
              //console.log('Date Changed:', d);
              this.setState({ ...this.state, reportDate: d });
            }}
        />
        </span>
        <button
            onClick={()=>{
              //console.log('clicking retrieve', this.state.reportDate);
              Meteor.call('daily.reportTotals', this.state.reportDate, (e, data)=>{
                //console.log('Report Data: ', e, data);
                this.setState({ ...this.state, reportData: data});
              });
            }}
            style={{
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '50px',
              color: '#29b794',
              height: '30px',
              width: '300px',
              flex: '1',
              fontFamily: 'Avenir',
              fontSize: '18px',
              lineHeight: '1',
              marginBottom: '10px',
              outline: 'none',
              paddingLeft: '10px',
              paddingRight: '10px'
            }}
        >
            Retrieve
        </button>
        {reportDetails}
      </div>
    )
  }
}

export default Reports;
