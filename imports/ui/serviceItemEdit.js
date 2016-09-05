import React, { Component, PropTypes } from 'react';

// App component - represents the whole app
export default class ServiceItemEdit extends Component {
  constructor(props){
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }
  handleSave(){
    //TODO do i have data
    const title = this.refs.titleInput.value.trim();
    const featureCode = this.refs.featureCodeInput.value.trim();

    const item = { ...this.props.item, title, featureCode };
    this.props.cbSave(item);

    if (!this.props.item){
      // Clear form
      this.refs.titleInput.value = '';
      this.refs.featureCodeInput.value = '';
    }

  }
  render(){
    return (
      <div>
        <input
          type="text"
          ref="titleInput"
          placeholder="Title for Service"
          defaultValue={this.props.item && this.props.item.title}
        />
        <input
          type="text"
          ref="featureCodeInput"
          placeholder="Feature Code"
          defaultValue={this.props.item && this.props.item.featureCode}
        />
        <button onClick={this.handleSave}>Save</button>
      </div>
    );
  }
}

ServiceItemEdit.propTypes = {
  item: PropTypes.object,
  cbSave: PropTypes.func.isRequired,
};
