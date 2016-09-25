import React, { Component, PropTypes } from 'react';

class ServiceItemEdit extends Component {
  constructor(props){
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }
  handleSave(){
    const title = this.refs.titleInput.value.trim();
    const featureCode = this.refs.featureCodeInput.value.trim();
    //console.log('SSSAVE:', this.refs.hasQuantity.value );
    const item = { ...this.props.item, title, featureCode, hasQuantity: this.refs.hasQuantity.value };

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
    //console.log('>>>>', this.props.item)
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
          <select
            ref="hasQuantity"
            defaultValue={this.props.item && this.props.item.hasQuantity}
          >
          <option value={true} >True</option>
          <option value={false}>False</option>
          </select>
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
