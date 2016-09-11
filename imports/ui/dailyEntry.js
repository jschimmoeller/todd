import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Services } from '../api/services';
import { HMIS } from '../api/hmis';
import { Daily } from '../api/daily';
import { browserHistory } from 'react-router';

// App component - represents the whole app
class DailyEntry extends Component {
  constructor(props){
    super(props);
    this.state = {hmis: {}, hmisServices:[] };
  }

  componentDidMount(){
    //console.log('MMMMM', this.props.params);
    Meteor.call('hmis.find', Number(this.props.params.hmisId), (e, data)=>{
      //console.log('>>>', e, data);
      this.setState({ ...this.state, hmis: data});
    });
    Meteor.call('daily.findToday', Number(this.props.params.hmisId), (e, data)=>{
      //console.log('>>>', e, data);
      this.setState({ ...this.state, hmisServices: data.services});
    });
  }

  render(){
    return (
      <div>
        <div>
          <div>HMIS Info</div>
          <div>
            <div>Name: {this.state.hmis.firstname + ' ' + (this.state.hmis.middleInitial ? (this.state.hmis.middleInitial + ' ') : '') +  this.state.hmis.lastname}</div>
            <div>Gender: {this.state.hmis.gender}</div>
            <div>Race: {this.state.hmis.race}</div>
          </div>
        </div>
        <ul>
          {this.props.services.map((s)=>{
            if (this.state.hmisServices.filter((cs)=>{
              return cs._id === s._id;
            }).length >0){
              // checked
              //console.log('checked:', s.title);
              return (
                <li key={s._id}>
                  <label><input type="checkbox" ref={"cb_"+s.title} defaultChecked="checked" />{s.title}</label>
                </li>
              );
            } else {
              // nto checked
              //console.log('NOT checked:', s.title);
              return (
                <li key={s._id}>
                  <label><input type="checkbox" ref={"cb_"+s.title} />{s.title}</label>
                </li>
              );
            }
          })}
        </ul>
        <button onClick={()=>{
          browserHistory.push('/');
        }}>Cancel</button>
        <button onClick={()=>{
          const usedServices = Object.keys(this.refs).filter((rf)=>{
            if (rf.indexOf('cb_') > -1){
              //console.log('service is: ', rf.substring(3), this.refs[rf].checked );
              return this.refs[rf].checked;
            }
          }).map((zUsed)=>{
            //console.log(zUsed, zUsed.substring(3))
            return this.props.services.filter((s)=>{
              return s.title === zUsed.substring(3);
            })[0];

          });
          //console.log('USED: ', usedServices);
          if (usedServices.length > 0){
            Meteor.call('daily.save', this.state.hmis, usedServices );
            browserHistory.push('/');
          } else {
            alert('Must have one service selected ')
          }
        }}>Save</button>
      </div>
    );

  }
}
export default createContainer(() => {
  return {
    services: Services.find({}, { sort: { title: 0 } }).fetch(),
  };
}, DailyEntry);
