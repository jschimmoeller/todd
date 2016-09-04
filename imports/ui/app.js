import React, { Component } from 'react';
import Footer from './footer';
import Header from './header';

// App component - represents the whole app
export default class App extends Component {
  render(){
    return (
      <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
        <Header />
        <div style={{ margin: "auto", flex: "5 100%"}}>App is here </div>
        <Footer />
      </div>
    );
  }
}
