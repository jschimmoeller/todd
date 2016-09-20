import React, { Component, PropTypes } from 'react';
import ServiceItemEdit from './serviceItemEdit';

class ServiceItem extends Component {
  constructor(props){
    super(props);

  }
  getStyle(cName){
    let sReturn;
    switch(cName){
      case 'edit':
        sReturn ={
          //width: "17.5px",
          //height:" 9px",
          fontSize: "10px",
          //fontWeight: "900",
          fontStyle: "normal",
          //fontStretch: "normal",
          //lineHeight: "1",
          width: "50px",
          border: "0px",
          margin: "5px 10px 5px 10px",
          padding: "0px",
          height: "20px",
          borderRadius: "50px",
          backgroundColor: "#ffffff",
          color: "#25a586"
        }
        break;
      case 'delete':
        sReturn ={
          //width: "17.5px",
          //height:" 9px",
          fontSize: "10px",
          //fontWeight: "900",
          fontStyle: "normal",
          //fontStretch: "normal",
          //lineHeight: "1",
          width: "50px",
          border: "0px",
          margin: "5px 10px 5px 10px",
          padding: "0px",
          height: "20px",
          borderRadius: "50px",
          border: "solid 0.5px #ffffff",
          backgroundColor: '#239d82',
          color: "#ffffff"
        }
        break;
      default:
        console.log('missing: ', cName);

    }

    return sReturn;
  }

  render(){
    let editComponent;
    if (this.props.isOpen){
      editComponent = <ServiceItemEdit item={this.props.item} cbSave={this.props.cbSave} />
    }

    return (
      <li
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          listStyle: "none",
          padding: '5px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: '1',
            justifyContent: 'space-between'
          }}
        >
        {this.props.item.title}
        <div>
        <button
            onClick={()=>{
              this.props.cbEdit(this.props.item._id);
            }}
            style={{
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '50px',
              color: '#25a586',
              fontSize: '14px',
              height: '30px',
              marginRight: '10px',
              width: '70px'
            }}
        >
            Edit
        </button>
        <button
            onClick={()=>{
              this.props.cbDelete(this.props.item._id);
            }}
            style={{
              backgroundColor: '#239d82',
              border: 'solid 0.5px #fff',
              borderRadius: '50px',
              color: '#fff',
              fontSize: '14px',
              height: '30px',
              width: '70px'
            }}
        >
            Delete
        </button>
        </div>
        </div>
      </li>
    );
  }
}

ServiceItem.propTypes = {
  item: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  cbEdit: PropTypes.func.isRequired,
  cbDelete: PropTypes.func.isRequired,
  cbSave: PropTypes.func.isRequired,
};

export default ServiceItem;
