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
        <div>
          <select
            ref="hasQuantity"
            defaultValue={this.props.item && this.props.item.hasQuantity}
          >
          <option value={true} >True</option>
          <option value={false}>False</option>
          </select>
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
