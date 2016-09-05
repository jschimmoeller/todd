import React, { Component } from 'react';
import Footer from './footer';
import Header from './header';

// App component - represents the whole app
export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {isSettingsOpen: false};
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
            Services
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
