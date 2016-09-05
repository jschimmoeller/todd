import React, { Component, PropTypes } from 'react';

// App component - represents the whole app
export default class Header extends Component {
  render(){
    return (
      <div style={{ display: 'flex', direction: "row",  height: "50px", margin: "auto" }}>
      <div style={{margin: "auto", left: "10px", top: "8px", position: "absolute"}}>
        {this.props.componentLeft}
      </div>
        <div style={{margin: "auto"}}>{this.props.title}</div>
        <div style={{margin: "auto", right: "10px", top: "8px", position: "absolute"}}>
          {this.props.componentRight}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  title: PropTypes.string.isRequired,
  componentLeft: PropTypes.object,
  componentRight: PropTypes.object,
};
