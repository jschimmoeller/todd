import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Services } from '../api/services.js';

import Footer from './footer';
import Header from './header';

// App component - represents the whole app
class App extends Component {
  constructor(props){
    super(props);

    this.state = {isSettingsOpen: false};
  }

  renderServices(){
    return this.props.services.map((s)=>{
      console.log('>>>>', s);
      return (
        <li key={s._id} style={{listStyle: "none"}}>
          {s.title} - {s.featureCode}
          <button onClick={()=>{
            console.log('dddd');
            Meteor.call('services.remove', s._id);
          }}>Delete</button>
        </li>
      );
    });
  }

  render(){
    const settingsComponent = <img src='./settings.png' width="25px" height="25px" onClick={()=>{
      console.log('services');
      this.setState({isSettingsOpen: !this.state.isSettingsOpen});
    }}/>;

    if (this.state.isSettingsOpen){
      const backComponent = <img src='./arrowleft.png' width="25px" height="25px" onClick={()=>{
        console.log('back');
        this.setState({isSettingsOpen: !this.state.isSettingsOpen});
      }}/>;
      return (
        <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
          <Header title="TODD Settings" componentLeft={backComponent}  componentRight={settingsComponent} />
          <div style={{ margin: "auto", flex: "5 100%"}}>
              <input
                type="text"
                ref="titleInput"
                placeholder="Title for Service"
              />
              <input
                type="text"
                ref="featureCodeInput"
                placeholder="Feature Code"
              />
              <button onClick={()=>{
                //TODO do i have data
                const title = this.refs.titleInput.value.trim();
                const featureCode = this.refs.featureCodeInput.value.trim();


                Meteor.call('services.insert', title, featureCode);

                // Clear form
                this.refs.titleInput.value = '';
                this.refs.featureCodeInput.value = '';

                console.log('submitting new form')
              }}>Save</button>

            <ul>
              {this.renderServices()}
            </ul>
          </div>
          <Footer />
        </div>
      );
    } else {


      return (
        <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
          <Header title="TODD" componentRight={settingsComponent}/>
          <div style={{ margin: "auto", flex: "5 100%"}}>App is here </div>
          <Footer />
        </div>
      );    }


  }
}
App.propTypes = {
  services: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    services: Services.find({}).fetch(),
  };
}, App);
