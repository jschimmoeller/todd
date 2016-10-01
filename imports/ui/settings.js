import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Services } from '../api/services';

import Modal from 'react-modal';

import ServiceItem from './serviceItem';
import ServiceItemEdit from './serviceItemEdit';

import { AddBorderIconSVG, CloseIconSVG } from './svgs';


const modalStyles = {
  overlay : {
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
    backgroundColor : '#29b794',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    padding: '0px',
    top : '50%',
    left : '50%',
    right : 'auto',
    bottom : 'auto',
    marginRight : '-50%',
    transform : 'translate(-50%, -50%)'
  }
};



// App component - represents the whole app
class Settings extends Component {
  constructor(props){
    super(props);
    this.state = { editItem: undefined, isAdding: false };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.renderServices = this.renderServices.bind(this);
  }

    handleDelete(id){
      Meteor.call('services.remove', id);
    }
    handleEdit(item){
      this.setState({ ...this.state, editItem: item });
      console.log("editing", item);
    }
    handleCancel() {
      this.setState({...this.state, editItem: undefined, isAdding: false});
    }
    handleSave(item){
      console.log('saving item: ', item);
      if (item.hasOwnProperty('_id')){
        Meteor.call('services.update', item._id, item.title, item.featureCode, item.hasQuantity );
      } else {
        Meteor.call('services.insert', item.title, item.featureCode, item.hasQuantity );
      }
      this.setState({ ...this.state, status: 'showSettings', editItem: undefined, isAdding: false });
    }
    handleCancel(){
      //console.log('cancel item: ', item);
      this.setState({ ...this.state, status: 'showSettings', editItem: undefined, isAdding: false });
    }

    renderServices(){
      return this.props.services.map((s)=>{
        //console.log('>>>', s._id, s._id == this.state.editItem, this.state.editItem)
        return (
          <ServiceItem
              key={s._id}
              item={s}
              cbEdit={this.handleEdit}
              cbDelete={this.handleDelete}
              cbSave={this.handleSave}
          />
        );
      });
    }

  render(){
    const addComponent = (
        <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center'
            }}
            onClick={()=>{
              this.setState({ ...this.state, isAdding: !this.state.isAdding });
            }}
        >
          <AddBorderIconSVG
              title="add"
              description="add"
              svgStyle={{
                fill: "#fff",
                width: "24px",
                height: "24px"}}
          />
        </div>
      );

    return (
      <div className="services">
        <Modal isOpen={this.state.editItem !== undefined || this.state.isAdding}
            style={modalStyles}
            onRequestClose={this.handleCancel}
        >
          <div style={{cursor: "pointer"}} onClick={this.handleCancel}>
            <CloseIconSVG title="add"
                description="add"
                svgStyle={{
                  fill: "#fff",
                  width: "24px",
                  height: "24px"}}
            />
          </div>
          <ServiceItemEdit item={this.state.editItem} cbSave={this.handleSave} cbCancel={this.handleCancel} />
        </Modal>

        <ul
            style={{
              color: '#fff',
              fontFamily: 'avenir',
              fontSize: '14px',
              display: 'flex',
              flex: "1 1 30%",
              flexWrap: "wrap"
            }}
        >
            {this.renderServices()}
        </ul>
        {addComponent}
      </div>
    );
  }
}
export default createContainer(() => {
  return {
    services: Services.find({}, { sort: { title: 0 } }).fetch()
  };
}, Settings);
