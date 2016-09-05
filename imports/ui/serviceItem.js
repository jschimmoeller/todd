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
      <li style={{listStyle: "none"}}>
        <div>
        {this.props.item.title}
        <button onClick={()=>{this.props.cbEdit(this.props.item._id)}}>Edit</button>
        <button onClick={()=>{this.props.cbDelete(this.props.item._id)}}>Delete</button>
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
