import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import { AvatarIconSVG } from './svgs';

class Footer extends Component {
  render(){
    // TODO: Figure out why ContactsIconSVG is being a jerk. :(
    const count = 'Served ' + this.props.hmisCount ;
    return (
      <div
          style={{
            backgroundColor: '#239d82',
            color: '#fff',
            display: 'flex',
            direction: "row",
            fontFamily: 'Avenir',
            fontSize: '18px',
            fontWeight: '900',
            height: "50px",
            margin: "auto",
            width: '100%'
           }}
      >
        <div
            style={{
              margin: "auto"}}
        >
          {count}
          <AvatarIconSVG
              svgStyle={{
                fill: '#fff',
                height: '18px',
                paddingLeft: '5px',
                paddingRight: '5px',
                width: '18px'
              }}
          />
          Today
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  hmisCount: PropTypes.number.isRequired
};
export default Footer;
