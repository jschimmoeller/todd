import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { Daily } from '../api/daily';

import Footer from './footer';
import Header from './header';
import { AddBorderIconSVG, SettingsIconSVG, BackIconSVG } from './svgs';
import { browserHistory } from 'react-router'


// App component - represents the whole app
class App extends Component {
  constructor(props){
    super(props);
  }

  render(){
    // always need settings component
    const settingsComponent = (
      <div onClick={()=>{
        //console.log('cccccllllick', location.href )
        if (location.href.indexOf('settings') > -1){
          browserHistory.push('/');
        } else {
          browserHistory.push('/settings');
        }

      }}>
        <SettingsIconSVG
            title="settings"
            description="settings"
            svgStyle={{
              width: "32px",
              fill: '#fff',
              height: "32px"
            }}
          />
      </div>
    );
    let backComponent;
    if (location.href.indexOf('settings') > -1 || location.href.indexOf('entry') > -1 || location.href.indexOf('reports') > -1  || location.href.indexOf('daily') > -1   ){
      backComponent = (
        <div onClick={()=>{
          //console.log('cccccllllick', location.href )
          browserHistory.push('/');
        }}>
          <BackIconSVG
            title="back"
            description="back"
            svgStyle={{
              width: "32px",
              fill: '#fff',
              height: "32px"
            }}
          />
        </div>
      );
    }

    //compute headerComponent
    let HeaderComponent = (<Header title={"TODD - "+moment().format('MMM D, YYYY')} componentLeft={backComponent} componentRight={settingsComponent}/>);

    // main return here
    return (
      <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
        {HeaderComponent}
        <div style={{flex:1, margin: "auto"}} >
          {this.props.children}
        </div>
        <Footer hmisCount={this.props.hmisCount}/>
      </div>
    );
  }
}

export default createContainer(() => {
  let today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1 );
  tomorrow.setHours(0);
  tomorrow.setMinutes(0);
  tomorrow.setSeconds(0);

  const hmisDaily =  Daily.find({ createdAt: {
    $gte: today,
    $lt: tomorrow
  }}).fetch();

  return {
    hmisCount: hmisDaily.length,
  };
}, App);
