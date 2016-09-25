import React, { Component, PropTypes } from 'react';

class ServiceItemEdit extends Component {
  constructor(props){
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }
  handleSave(){
    const title = this.refs.titleInput.value.trim();
    const featureCode = this.refs.featureCodeInput.value.trim();
    const item = { ...this.props.item, title, featureCode };

    if (item.hasOwnProperty('title') && item.title.length > 0 &&
        item.hasOwnProperty('featureCode') && item.featureCode.length > 0){
      this.props.cbSave(item);
      if (!this.props.item){
        // Clear form - needed for entry only
        this.refs.titleInput.value = '';
        this.refs.featureCodeInput.value = '';
      }
    }
  }

  render(){
    return (
      <div>
        <div>
          <input
            type="text"
            ref="titleInput"
            placeholder="Title for Service"
            defaultValue={this.props.item && this.props.item.title}
          />
        </div>
        <div>
          <input
            type="text"
            ref="featureCodeInput"
            placeholder="Feature Code"
            defaultValue={this.props.item && this.props.item.featureCode}
          />
        </div>
        <div>
          <button onClick={this.props.cbCancel}>Cancel</button>
          <button onClick={this.handleSave}>Save</button>
        </div>
      </div>
    );
  }
}

ServiceItemEdit.propTypes = {
  item: PropTypes.object,
  cbSave: PropTypes.func.isRequired,
};


export default ServiceItemEdit;
