import React, { Component, PropTypes } from 'react';
import ServiceItemEdit from './serviceItemEdit';

class ServiceItem extends Component {
  constructor(props){
    super(props);

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
        {editComponent}
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
