import React from 'react';

// SVG icon container it wraps path information from children classes with SVG structure.
export default class ContainerIconSVG extends React.Component {
  render() {
    return (
      <svg style={{height: '32px', width: '32px', stroke: 'none', ...this.props.svgStyle}}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 32 32"
      >
          {this.props.children}
      </svg>
    );
  }
}
