import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Services } from '../api/services';
import { HMIS } from '../api/hmis';
import { Daily } from '../api/daily';
import { browserHistory } from 'react-router';
import NumericInput from 'react-numeric-input';

// App component - represents the whole app
class DailyEntry extends Component {
  constructor(props){
    super(props);
    this.state = {hmis: {}, hmisServices:[] };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    //console.log('MMMMM', this.props.params);
    Meteor.call('hmis.find', Number(this.props.params.hmisId), (e, data)=>{
      //console.log('>>>', e, data);
      this.setState({ ...this.state, hmis: data});
    });
    Meteor.call('daily.findToday', Number(this.props.params.hmisId), (e, data)=>{
      //console.log('>>>', e, data);
      this.setState({ ...this.state, hmisServices: data && data.services ? data.services : [] });
    });
  }

  handleQuantity(d, s){
    const newServices =  this.state.hmisServices.map((u)=>{
      if (u._id == s._id){
        u.quantity = d;
      }
      return u;
    });
    this.setState({ ...this.state, hmisServices: newServices });
  }

  handleChange(e, s){
    //console.log('unchecked', e.target.checked, e.target);
    if (e.target.checked){
      this.setState({ ...this.state, hmisServices: this.state.hmisServices.concat(s)});
    } else {
      const f = this.state.hmisServices.filter((u)=>{
        //console.log(u._id, s._id, u._id != s._id )
        return u._id != s._id;
       }) ;
      //console.log('FFFF', f);
      this.setState({ ...this.state, hmisServices: f });
    }
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
            let sQuantity;
            if (s.hasQuantity){
              const q = this.state.hmisServices.reduce((p, u)=>{
                if (u._id === s._id && u.quantity){
                  return u.quantity;
                } else {
                  return p;
                }
              }, 1);
              sQuantity = (
                <NumericInput onChange={(d)=>{
                  //console.log('DDDDD', d);
                  this.handleQuantity(d, s);
                }} min={1} max={6} value={q} />
              );
            }
            //console.log('this.state', this.state.hmisServices );
            if (this.state.hmisServices.filter((cs)=>{
              return cs._id === s._id;
            }).length >0){
              // checked
              //console.log('checked:', s.title);
              return (
                <li key={s._id}>
                  <label><input type="checkbox" onChange={(e)=>{this.handleChange(e,s)}} checked  />{s.title}</label>
                  {sQuantity}
                </li>
              );
            } else {
              // nto checked
              //console.log('NOT checked:', s.title);
              return (
                <li key={s._id}>
                  <label><input type="checkbox" onChange={(e)=>{this.handleChange(e,s)}} />{s.title}</label>
                  {sQuantity}
                </li>
              );
            }
          })}
        </ul>
        <button onClick={()=>{
          browserHistory.push('/');
        }}>Cancel</button>
        <button onClick={()=>{
          Meteor.call('daily.save', this.state.hmis, this.state.hmisServices );
          browserHistory.push('/');
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
