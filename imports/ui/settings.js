import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Services } from '../api/services';

import ServiceItem from './serviceItem';
import ServiceItemEdit from './serviceItemEdit';
import { AddBorderIconSVG } from './svgs';

// App component - represents the whole app
class Settings extends Component {
  constructor(props){
    super(props);
    this.state = { editItem: undefined, isAdding: false };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.renderServices = this.renderServices.bind(this);
  }

    handleDelete(id){
      Meteor.call('services.remove', id);
    }
    handleEdit(id){
      this.setState({ ...this.state, editItem: id });
      console.log("editing", id);
    }
    handleSave(item){
      //console.log('saving item: ', item);
      if (item.hasOwnProperty('_id')){
        Meteor.call('services.update', item._id, item.title, item.featureCode );
      } else {
        Meteor.call('services.insert', item.title, item.featureCode );
      }
      this.setState({ ...this.state, status: 'showSettings', editItem: undefined, isAdding: false });
    }

    renderServices(){
      return this.props.services.map((s)=>{
        console.log('>>>', s._id, s._id == this.state.editItem, this.state.editItem)
        return (
          <ServiceItem
            key={s._id}
            item={s}
            isOpen={s._id == this.state.editItem }
            cbEdit={this.handleEdit}
            cbDelete={this.handleDelete}
            cbSave={this.handleSave}
          />
        );
      });
    }

  render(){
    let addComponent;
    if (this.state.isAdding){
      addComponent = (<ServiceItemEdit cbSave={this.handleSave} />);
    } else {
      addComponent = (
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center'
          }}
          onClick={()=>{
            this.setState({ ...this.state, isAdding: !this.state.isAdding })
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
    }

    return (
      <div className="services">
      <ul
        style={{
          color: '#fff',
          fontFamily: 'avenir',
          fontSize: '14px'
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
    services: Services.find({}, { sort: { title: 0 } }).fetch(),
  };
}, Settings);
