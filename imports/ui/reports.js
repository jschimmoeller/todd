import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-input-calendar';
import moment from 'moment';

class HMISSummary extends Component {
  render(){
    return (
      <div style={{width: "50%"}}>
        <div>{this.props.title}</div>
        <ul style={{listStyle: "none"}}>
          {this.props.data.map((i,index)=>{
            return (<li key={index} style={{width: "340px"}}>
            <span style={{width: "70px", display: "inline-block"}}><input ref={i.hmisId} value={i.hmisId} style={{width: "30px"}} readOnly />
              <button onClick={()=>{
                console.log('>>>', i)
                const inp = ReactDOM.findDOMNode(this.refs[i.hmisId]);
                inp.select();
                try {
                   // copy text
                   document.execCommand('copy');
                   inp.blur();
                 }
                 catch (err) {
                   alert('please press Ctrl/Cmd+C to copy');
                 }
              }}>
                <img src="clippy.svg" width="15" height="15" alt="Copy to clipboard" />
              </button>
            </span>
            <span style={{width: "200px", display: "inline-block"}}>{i.name}</span>
            <span style={{width: "70px", display: "inline-block"}}>
              <button>
                <img src="view.png" width="15" height="15" style={{paddingRight: "6px"}}></img>
              </button>
              <button onClick={()=>{
                console.log('>>>', this.refs[i.hmisId+'-svc'])
                const inp1 = ReactDOM.findDOMNode(this.refs[i.hmisId+'-svc']);
                inp1.select();
                try {
                   // copy text
                   document.execCommand('copy', false, null);
                   inp1.blur();
                 }
                 catch (err) {
                   alert('please press Ctrl/Cmd+C to copy');
                 }
              }}>
                <input ref={i.hmisId+'-svc'} readOnly value={i.svcCharString} style={{position: "absolute", left: "-10000px", top: "-1000px"}} />
                <img src="clippy.svg" width="15" height="15" alt="Copy to clipboard" />
              </button>
            </span></li>);
          })}
        </ul>
      </div>
    )
  }
}
class ReportSummary extends Component {
  render(){
    return (
      <div style={{width: "50%"}}>
        <div>{this.props.title}</div>
        <ul style={{ display: "flex", "flex": "1 1 30%",  "flexWrap": "wrap"}}>
          {Object.keys(this.props.data).map((i,index)=>{
            return (<li key={index} style={{listStyle: "none",  width: "200px"}}><span>{i}</span> - <span>{this.props.data[i]}</span></li>);
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
      <div style={{display: "flex", flex: "1", flexDirection:"column", alignItems: "center"}}>
        <div style={{alignItems: "center"}}>Report Details - {this.props.data.reportDate}</div>
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
      <div style={{display: "flex", flexDirection: "column", alignItems: "center" }}>
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
      </div>
      <div>
        {reportDetails}
      </div>
      </div>
    )
  }
}

export default Reports;
