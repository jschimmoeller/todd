import React from 'react';
import S2SBaseComponent from './s2s-base-class';
import 'moment-range';
import Radium from 'radium';

const propTypes = {
  //  This fun little prop matters trust me. DayView component uses the class of cell to determine if the day is the month before of month after
  classes : React.PropTypes.string,
  compStyle : React.PropTypes.object,
  dateVal : React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
  isSelected : React.PropTypes.bool
};

const defaultProps = {
};

// Cell is an area that has a value

class Cell extends S2SBaseComponent {
  constructor(props){
      super(props);
      this.displayName = 'Cell';
  }

  getDefaultStyle(styleName) {
    const styles = {
      cellWrapper : {
        border: '1px solid transparent',
        borderRadius: '2px',
        alignItems: 'center',
        display: 'flex',
        flex: '1 1 13%',
        height: '30px',
        justifyContent: 'center',
        ':hover':{
          backgroundColor: '#fbfbfb',
          border: '1px solid #efefef',
          color: '#4ab7e2'
        }
      },
      isSelected : {
        backgroundColor: '#4ab7e2',
        color: '#fff'
      },

    };
    return (styles[styleName]);
  }

  render(){
    return(
      <div
          className={this.props.classes}
          style={this.props.isSelected ? {...this.getStyle('cellWrapper'), ...this.getStyle('isSelected') }: {...this.getStyle('cellWrapper')}}
      >
          {this.props.dateVal}
      </div>
    );
  }
}

Cell.propTypes = propTypes;
Cell.defaultProps = defaultProps;
export default Radium(Cell);
