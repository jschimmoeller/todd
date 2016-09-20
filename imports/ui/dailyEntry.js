import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Services } from '../api/services';
import { HMIS } from '../api/hmis';
import { Daily } from '../api/daily';
import { browserHistory } from 'react-router';
import NumericInput from 'react-numeric-input';


//TODO: style info area better...style hmis name.
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
      <div
        style={{
          color: '#fff',
          fontFamily: 'avenir',
          fontSize: '14px',
          marginTop: '20px'
          //backgroundColor: '#29b794'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: '550',
                paddingBottom: '30px'
              }}
          >
            HMIS Info
          </div>
          <div
              style={{
                alignItems: 'center',
                fontSize: '18px',
                fontWeight: '550',
                display: 'flex',
                flex: '1',
                flexDirection: 'column'
              }}
          >
            <div>
              <span
                   style={{
                     paddingRight: '10px'
                   }}
                >
                Name:
              </span>
              <span>
                {this.state.hmis.firstname + ' ' + (this.state.hmis.middleInitial ? (this.state.hmis.middleInitial + ' ') : '') +  this.state.hmis.lastname}
              </span>
            </div>
            <div>Gender:
              <span
                   style={{
                     paddingLeft: '10px'
                   }}>
                {this.state.hmis.gender}
              </span>
            </div>
            <div>
              Race:
              <span
                  style={{
                    paddingLeft: '10px'
                  }}
              >
                {this.state.hmis.race}
              </span>
            </div>
          </div>
        </div>
        <ul
          style={{
            listStyle: 'none'
          }}
        >
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
                  <label>
                      <input
                        type="checkbox"
                        onChange={(e)=>{this.handleChange(e,s)}}
                        checked
                        style={{

                        }}
                      />
                      {s.title}
                    </label>
                  {sQuantity}
                </li>
              );
            } else {
              // nto checked
              //console.log('NOT checked:', s.title);
              return (
                <li key={s._id}>
                  <label>
                    <span style={{paddingRight: '15px'}}>
                      <input type="checkbox" onChange={(e)=>{this.handleChange(e,s)}} />
                    </span>
                    <span style={{fontWeight: '550', fontSize: '18px', paddingRight: '10px'}}>
                      {s.title}
                    </span>
                  </label>
                  {sQuantity}
                </li>
              );
            }
          })}
        </ul>
        <div
          style={{
            display: 'flex',
            flex: '1',
            justifyContent: 'space-between',
            padding: '10px'
          }}
        >
          <button
          onClick={()=>{
            Meteor.call('daily.save', this.state.hmis, this.state.hmisServices );
            browserHistory.push('/');
          }}
          style={{
            backgroundColor: '#fff',
            border: 'none',
            borderRadius: '50px',
            color: '#25a586',
            fontSize: '18px',
            height: '30px',
            marginRight: '10px',
            flex: '4 0 ',
            fontFamily: 'Avenir',
            lineHeight: '1',
            marginBottom: '10px',
            outline: 'none',
            paddingLeft: '10px',
            paddingRight: '10px',
            width: '75px'
          }}
          >
            Save
          </button>
          <button
          onClick={()=>{
            browserHistory.push('/');
          }}
          style={{
            backgroundColor: '#29b794',
            border: 'solid 0.5px #fff',
            borderRadius: '50px',
            color: '#fff',
            height: '30px',
            flex: '4',
            fontFamily: 'Avenir',
            fontSize: '18px',
            lineHeight: '1',
            marginBottom: '10px',
            outline: 'none',
            paddingLeft: '10px',
            paddingRight: '10px',
            width: '75px'
          }}
          >
            Cancel
          </button>
        </div>
      </div>
    );

  }
}
export default createContainer(() => {
  return {
    services: Services.find({}, { sort: { title: 0 } }).fetch(),
  };
}, DailyEntry);
