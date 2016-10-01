import React, { Component, PropTypes } from 'react';

class ServiceItemEdit extends Component {
  constructor(props){
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.toggleCheckBox = this.toggleCheckBox.bind(this);
    this.state = { "isChecked": this.props.item.hasQuantity};

  }

  handleSave(){
    const title = this.refs.titleInput.value.trim();
    const featureCode = this.refs.featureCodeInput.value.trim();
    console.log('SSSAVE:', this.refs.hasQuantity.checked );
    const item = { ...this.props.item, title, featureCode, hasQuantity: this.refs.hasQuantity.checked };

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

  toggleCheckBox() {
    const newValue = !this.state.isChecked;
    this.setState({...this.state, "isChecked": newValue});
    //this.props.cbChanged && this.props.cbChanged(newValue);
  }

  render(){
    //console.log('>>>>', this.props.item)
    return (
      <div style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        margin: "10px"
      }}>
        <div>
          <input
            type="text"
            ref="titleInput"
            placeholder="Title for Service"
            defaultValue={this.props.item && this.props.item.title}
            style={{backgroundColor: "#239d82", borderRadius:"50px", border: "none", fontSize: "18px", lineHeight: "30px", padding: "0px 10px", width: "140px"}}
          />
          <input
            type="text"
            ref="featureCodeInput"
            placeholder="Feature Code"
            defaultValue={this.props.item && this.props.item.featureCode}
            style={{backgroundColor: "#239d82", borderRadius:"50px", border: "none", fontSize: "18px", lineHeight: "30px", marginLeft: "10px", padding: "0px 10px", width: "140px"}}

          />
        </div>
        <div style={{alignSelf: "flex-start", flex:"1", fontSize: "18px", margin: "20px 0px 0px 12px"}}>
          <label>Has Quantity? </label>
          <input
            type="checkbox"
            ref="hasQuantity"
            defaultChecked={this.state.isChecked}
            onClick={this.toggleCheckBox}
          />
        </div>
        <div style={{marginTop: "25px"}}>
          <button onClick={this.props.cbCancel}
              style={{
                backgroundColor: '#fff',
                border: 'none',
                borderRadius: '50px',
                color: '#25a586',
                cursor: 'pointer',
                fontSize: '14px',
                height: '30px',
                marginRight: '10px',
                width: '70px'
              }}
          >
            Cancel
          </button>
          <button onClick={this.handleSave}
              style={{
                backgroundColor: '#239d82',
                border: 'solid 0.5px #fff',
                borderRadius: '50px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px',
                height: '30px',
                width: '70px'
              }}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

ServiceItemEdit.propTypes = {
  cbCancel: PropTypes.func.isRequired,
  cbSave: PropTypes.func.isRequired,
  item: PropTypes.object
};


export default ServiceItemEdit;
