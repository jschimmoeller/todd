import React from 'react';
import ReactDOM from 'react-dom';
import BaseComponent from './s2s-base-class';
import { CaretDownIconSVG } from './svgs';
import Radium from 'radium';


const propTypes = {
  data: React.PropTypes.array,
  defaultSelectedItem: React.PropTypes.number,
  cbOnClick: React.PropTypes.func,
  cbValueChanged: React.PropTypes.func,
  compStyle: React.PropTypes.object,
  isOpen: React.PropTypes.bool
};
const defaultProps = {
  data: ['first item 1','second item 2'],
  defaultSelectedItem: 0,
  isOpen: false,
  cbOnClick: ()=>{}
};


class Select extends BaseComponent {
  constructor(props){
      super(props);
      this.displayName = 'Select';
      this.state={isOpen: this.props.isOpen, selectedItem: this.props.defaultSelectedItem };
      this.toggleSelect = this.toggleSelect.bind(this);
      this.selectItem = this.selectItem.bind(this);
      this.handleKeyDownMenu = this.handleKeyDownMenu.bind(this);
      this.handleKeyDownDropDownItem = this.handleKeyDownDropDownItem.bind(this);
      this.onBlurToggle = this.onBlurToggle.bind(this);
  }

  getDefaultStyle(styleName) {
      const styles = {
        containerStyle:{
          alignItems: 'center',
          borderTop: '1px solid #B7B7B7',
          borderLeft: '1px solid #B7B7B7',
          borderRight: '1px solid #B7B7B7',
          borderBottom: '1px solid #B7B7B7',
          display: 'flex',
          fontSize: '14px'
        },
        dropDown:{
          backgroundColor: '#fff',
          borderTop: '0px',
          borderLeft: '1px solid #B7B7B7',
          borderBottom: '1px solid #B7B7B7',
          borderRight: '1px solid #B7B7B7',
          cursor: 'pointer',
          visibility: this.state.isOpen ? 'visible' : 'hidden',
          fontSize: '14px',
          maxHeight: '75px',// this causes the drop down to be scrollable if there is more then 5 items
          overflow: 'auto',
          paddingTop: '5px',
          paddingRight: '0px',
          paddingBottom: '5px',
          paddingLeft: '0px',
          position: 'absolute',
          width: 'calc(100% - 2px)',
          top: '36px',
          zIndex: '10'
        },
        dropDownItem:{
          paddingTop: '5px',
          paddingRight: '0px',
          paddingBottom: '5px',
          paddingLeft: '0px',
          lineHeight: '25px',
          marginTop: '0px',
          marginRight: '3px',
          marginBottom: '0px',
          marginLeft: '3px',
          ':hover':{
            backgroundColor: '#ddd'
          }
        },
        selectStyle:{
          alignItems: 'center',
          cursor: 'pointer',
          display: 'flex',
          paddingTop: '5px',
          paddingRight: '0px',
          paddingBottom: '5px',
          paddingLeft: '5px',
          // width: '100%'
          justifyContent: 'space-between'
        },
        svgContainerStyle:{
          // marginLeft: 'auto',
          // marginRight: '5px'
        },
        svgStyles:{
          height: '24px',
          width: '24px'
        },
        controlStyle:{
          width: '100%'
        },
        menuOptionStyle:{
          width: '100%',
          position: 'relative'
        }
      };
      return (styles[styleName]);
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.hasOwnProperty('isOpen')){
      this.setState({ ...this.state, isOpen: nextProps.isOpen});
    }
    if(nextProps.hasOwnProperty('defaultSelectedItem')){
      this.setState({ ...this.state, selectedItem: nextProps.defaultSelectedItem});
    }
  }

  toggleSelect(){
    ///console.log('ccc');
    this.setState({ ...this.state, isOpen: !this.state.isOpen});
    setTimeout(()=>{this.props.cbOnClick();}, 0);
  }

  selectItem(i){
    //console.log('iii', i);
    this.setState({ ...this.state, selectedItem: i,isOpen: !this.state.isOpen  });
    if (this.props.cbValueChanged){
      this.props.cbValueChanged(this.props.data[i]);
    }
  }

  onBlurToggle(){
    if (this.state.isOpen){
      this.setState({ ...this.state, isOpen: !this.state.isOpen});
    }
  }

  handleKeyDownMenu(e){
    switch (e.keyCode){
      case 32: // enter
        this.toggleSelect();
        break;
      case 13: // spacebar
        this.toggleSelect();
        break;
      case 40: // down arrow
        this.toggleSelect();

          e.preventDefault();
          console.log (this.refs['item0']);
          //the down arrow needs to be pressed twice to successfuly move focus to the item in the list
          ReactDOM.findDOMNode(this.refs['item0']).focus();
          this.setState({ ...this.state, isOpen: true}); //this is to combat the quickness of the onblur function causeing the component to close

        break;
    }
  }


  handleKeyDownDropDownItem(e, index){
    switch (e.keyCode){
      case 9: // tab
      case 32: // enter
      case 13: // spacebar
        this.selectItem(index);
        break;
      case 40: // down arrow
        if(ReactDOM.findDOMNode(this.refs['item'+index]).nextSibling){
          //The preventDefault() method cancels the event if it is cancelable // cancelling onBlurToggle
          e.preventDefault();
          // findDOMNode finds dom with specific ref.
          // nextSibling returns the next item
          // focus gives focus to that next item
          ReactDOM.findDOMNode(this.refs['item'+index]).nextSibling.focus();
          this.setState({ ...this.state, isOpen: true}); //this is to combat the quickness of the onblur function causeing the component to close
        }
        break;
      case 38: // up arrow
        if(ReactDOM.findDOMNode(this.refs['item'+index]).previousSibling){
          e.preventDefault();
          ReactDOM.findDOMNode(this.refs['item'+index]).previousSibling.focus();
          this.setState({ ...this.state, isOpen: true}); //this is to combat the quickness of the onblur function causeing the component to close
        }
        break;
    }
  }

  // componentDidUpdate(prevProps, prevState){
  //
  //  console.log('##### componentDidUpdate', prevProps, prevState);
  //  // if prevState.isOpen, call focus() on this.refs['item'+selectedItem]
  //  if (prevState.isOpen && this.refs.item0 != undefined && document.activeElement.className != 'menuItem') {
  //    console.log('this.refs', this.refs);
  //    ReactDOM.findDOMNode(this.refs['item'+prevState.selectedItem]).focus();
  //  }
  //
  // }

  render(){
    //let displayItems;
    //if (this.state.isOpen) {
      let displayItems = (
        <div style={this.getStyle('dropDown')} ref='list'>
          {this.props.data.map((item, index)=>{
                return (
                  <div
                      onMouseDown={()=>{this.selectItem(index);}}
                      key={index}
                      ref ={'item'+index}
                      onKeyDown={(e)=>{this.handleKeyDownDropDownItem(e, index);}}
                      role="menuitem"
                      style={this.getStyle('dropDownItem')}
                      tabIndex="0"
                  >
                  {item}
                  </div>
                );
              })}
        </div>);
    //}
//  onBlur={this.onBlurToggle}
    return (
      <div style={this.getStyle('menuOptionStyle')}
          onBlur={this.onBlurToggle}
      >
        <div style={this.getStyle('containerStyle')} >
          <div style={this.getStyle('controlStyle')} >
            <div
                aria-label="drop down menu"
                style={this.getStyle('selectStyle')}
                role="menu"
                tabIndex="0"
                ref = "dropDownMenu"
                onMouseDown={this.toggleSelect}
                aria-haspopup='true'
                onKeyDown={this.handleKeyDownMenu}
              >
              {this.props.data[this.state.selectedItem]}
              <span
                  style={this.getStyle('svgContainerStyle')}
                >
                <CaretDownIconSVG svgStyle={this.getStyle('svgStyles')}/>
              </span>
            </div>
          </div>
        </div>
        {displayItems}
      </div>);
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Radium(Select);
