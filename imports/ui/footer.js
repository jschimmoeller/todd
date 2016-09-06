import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';

class Footer extends Component {
  render(){
    const count = 'Served Today: ' + this.props.hmisCount;
    return (
      <div style={{ display: 'flex', direction: "row",  height: "50px", margin: "auto" }}>
        <div style={{margin: "auto"}}>
          {count}
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  hmisCount: PropTypes.number.isRequired,
};
export default Footer
