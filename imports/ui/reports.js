import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Calendar from 'react-input-calendar';
import DatePicker from './datePicker';
import moment from 'moment';
import Modal from 'react-modal';
import { Meteor } from 'meteor/meteor';
import { CloseIconSVG } from './svgs';

const modalStyles = {
  overlay : {
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
    backgroundColor : '#29b794',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingLeft: '50px',
    paddingRight: "50px",
    top : '50%',
    left : '50%',
    right : 'auto',
    bottom : 'auto',
    marginRight : '-50%',
    transform : 'translate(-50%, -50%)'
  }
};
class HMISSummary extends Component {
  constructor(props){
    super(props);
    this.state={showModal: false, data: undefined, summaryData: this.props.data, title: undefined };
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.hasOwnProperty('data')){
      this.setState({...this.state, summaryData: nextProps.data});
    }
  }
  handleCancel() {
    this.setState({...this.state, showModal: false, data: undefined });
  }
  render(){
    return (
      <div style={{width: "50%"}}>
        <Modal isOpen={this.state.showModal}
            style={modalStyles}
            onRequestClose={this.handleCancel}
        >
          <div style={{cursor: "pointer"}} onClick={this.handleCancel}>
            <CloseIconSVG title="close"
                description="close"
                svgStyle={{
                  fill: "#fff",
                  width: "24px",
                  height: "24px"}}
            />
          </div>
          <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div style={{color: "white", fontWeight: "bold", paddingBottom: "10px", fontSize: "24px"}}>HMIS Details - {this.state.title}</div>
            <div style={{paddingRight: "20px", paddingLeft: "20px"}}>
              {this.state.data}
            </div>
          </div>
        </Modal>
        <div>{this.props.title}</div>
        <ul style={{listStyle: "none"}}>
          {this.state.summaryData.map((i,index)=>{
            console.log('>>>>', i);
            return (<li key={index} style={{width: "340px"}}>
            <span style={{width: "70px", display: "inline-block"}}>{i.hmisId}
            <input ref={i.hmisId} value={i.hmisId} style={{position: "absolute", left: "-10000px", top: "-1000px"}} readOnly />
              <button onClick={()=>{
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
            <span style={{width: "150px", display: "inline-block"}}>{i.name}</span>
            <span style={{width: "70px", display: "inline-block"}}>
              <button onClick={()=>{
                //console.log('>>>', this.refs[i.hmisId+'-svc'])
                this.setState({...this.state, showModal: true, data: i.svcCharString, title: i.name  });
              }}>
                <img src="view.png" width="15" height="15" style={{paddingRight: "6px"}}></img>
              </button>
              <button onClick={()=>{
                //console.log('>>>', this.refs[i.hmisId+'-svc'])
                const inp1 = ReactDOM.findDOMNode(this.refs[i.hmisId+'-svc']);
                inp1.select();
                try {
                   // copy text
                   document.execCommand('copy', false, null);
                   inp1.blur();
                   Meteor.call('daily.copied', i.id);

                   const newData = this.state.summaryData.map( (j)=>{
                     if (j.id === i.id){
                       j.copied = true;
                     }
                     return j;
                   });

                   this.setState({...this.state, summaryData: newData });
                 }
                 catch (err) {
                   alert('please press Ctrl/Cmd+C to copy');
                 }
              }}>
                <input ref={i.hmisId+'-svc'} readOnly value={i.svcCharString} style={{position: "absolute", left: "-10000px", top: "-1000px"}} />
                <img src="clippy.svg" width="15" height="15" alt="Copy to clipboard" />
              </button>
            </span>
            <span>{i.copied === true ?
              <img src='check.png' width="15" height="15" />
              : ''}</span>
            </li>);
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
    if (this.props.data.hmisSummary.length === 0 ){
      return (
        <div style={{display: "flex", flex: "1", flexDirection:"column", alignItems: "center"}}>
          <div style={{alignItems: "center"}}>No Report Details for {this.props.data.reportDate}</div>
        </div>);
    } else {
      return (
        <div style={{display: "flex", flex: "1", flexDirection:"column", alignItems: "center"}}>
          <div style={{alignItems: "center"}}>Report Details - {this.props.data.reportDate}</div>
          <div style={{paddingBottom: "40px"}}>Total Served: - {this.props.data.hmisSummary.length}</div>
          <ReportSummary title="Race Summary" data={this.props.data.raceSummary} />
          <ReportSummary title="Gender Summary" data={this.props.data.genderSummary} />
          <ReportSummary title="Service Summary" data={this.props.data.servicesSummary} />
          <HMISSummary title="HMIS Report Data" data={this.props.data.hmisSummary} />
        </div>);
    }

  }
}


// App component - represents the whole app
class Reports extends Component {
  constructor(props){
    super(props);
    this.state={reportDate: Number(moment().format('x')) }
    console.log('>>>>>', this.state);
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
            justifyContent: 'center'
          }}
      >
          Reports
      </div>
      <div style={{display: "flex", justifyContent: "center" }}>
        <span
             style={{
               display: 'flex',
               justifyContent: 'center',
               width: "250px"
             }}>
        <DatePicker
            svgPosition="right"
            cbSelectChange={(s,e)=>{
              console.log('Date Select Changed:', s,e);
              //this.setState({ ...this.state, reportDate: d });
            }}
            cbOnChange={(s,e )=>{
              console.log('>>>> Date On Changed:', s,e);
              this.setState({ ...this.state, reportDate: s })
            }}
            format='MM-DD-YYYY'
            displayTime={false}
            startTimestamp={this.state.reportDate}
        />
        </span>
        <button
            onClick={()=>{
              //console.log('clicking retrieve', this.state.reportDate);
              Meteor.call('daily.reportTotals', moment(this.state.reportDate).format('MM-DD-YYYY'), (e, data)=>{
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
              width: '100px',
              //flex: '1',
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
