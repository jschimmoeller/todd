import React from 'react';
import S2SBaseComponent from './s2s-base-class';
import Radium from 'radium';

const propTypes = {
  cbNext : React.PropTypes.func,
  cbPrevious : React.PropTypes.func,
  cbTitleAction: React.PropTypes.func,
  compStyle: React.PropTypes.object,
  headerData : React.PropTypes.string.isRequired
};

const defaultProps = {

};

// Header that changes values depending on view type.

class ViewHeader extends S2SBaseComponent {
  constructor(props){
      super(props);
      this.displayName = 'ViewHeader';

  }


  getDefaultStyle(styleName) {
    const styles = {
      viewHeader : {
        display: 'flex',
        fontSize: '18px',
        justifyContent: 'space-around',
        paddingBottom: '10px',
        userSelect: 'none'
      },
      back : {
        // ':hover':{
        //   color: '#4ab7e2'
        // }
      },
      header : {
        // ':hover':{
        //   color: '#4ab7e2'
        // }
      },

      next: {
        // ':hover':{
        //   color: '#4ab7e2'
        // }
      }

    };
    return (styles[styleName]);
  }

  render(){

    return(
      <div
        style={{...this.getStyle('viewHeader')}}
        className="navigation-wrapper"
      >
        <span
            className="icon"
            onClick={this.props.cbPrevious}
            style={{...this.getStyle('back')}}
            key="back"
        >
            &lt;
        </span>
        <span
            className="navigation-title"
            onClick={this.props.cbTitleAction}
            style={{...this.getStyle('header')}}
            key="header"
        >
            {this.props.headerData}
        </span>
        <span
            className="icon"
            onClick={this.props.cbNext}
            style={{...this.getStyle('next')}}
            key="next"
        >
            &gt;
        </span>
      </div>
    );
  }
}

ViewHeader.propTypes = propTypes;
ViewHeader.defaultProps = defaultProps;
export default Radium(ViewHeader);
