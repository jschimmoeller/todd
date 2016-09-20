import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { CalendarIconSVG } from './svgs';

// App component - represents the whole app
export default class Header extends Component {
  render(){
    return (
      <div
          style={{
            backgroundColor: '#239d82',
            color: 'white',
            display: 'flex',
            direction: "row",
            height: "100px" }}
      >
        <div
            style={{
              margin: "auto",
              left: "10px",
              top: "8px",
              position: "absolute"}}
        >
          {this.props.componentLeft}
        </div>
        <div
            style={{
              margin: "auto" }}
        >
          <Link
              to="/reports"
              style={{
                display: 'flex',
                flexDirection:'column',
                alignItems: 'center',
                color: '#fff',
                textDecoration: 'none',
                fontFamily: 'avenir',
                fontSize: '18px',
                fontStretch: 'normal',
                fontWeight: '900'}}
          >
            <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50px',
                  backgroundColor: '#25a586'}}
            >
              <CalendarIconSVG
                  svgStyle={{
                    width: '24px',
                    height: '24px',
                    fill: '#ffffff'}}
              />
            </div>
            {this.props.title}
          </Link>
        </div>
        <div
            style={{
              margin: "auto",
              right: "10px",
              top: "8px",
              position: "absolute"
            }}
        >
          {this.props.componentRight}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  componentLeft: PropTypes.object,
  componentRight: PropTypes.object,
  title: PropTypes.string.isRequired
};
