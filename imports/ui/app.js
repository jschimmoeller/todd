import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { Services } from '../api/services';
import { HMIS } from '../api/hmis';
import { Daily } from '../api/daily';

import Footer from './footer';
import Header from './header';
import ServiceItem from './serviceItem';
import ServiceItemEdit from './serviceItemEdit';

// App component - represents the whole app
class App extends Component {
  constructor(props){
    super(props);

    this.state = {isSettingsOpen: false};
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleDelete(id){
    Meteor.call('services.remove', id);
  }
  handleEdit(id){
    this.setState({ ...this.state, editItem: id });
    //console.log("editing", id);
  }
  handleSave(item){
    //console.log('saving item: ', item);
    if (item.hasOwnProperty('_id')){
      Meteor.call('services.update', item._id, item.title, item.featureCode );
    } else {
      Meteor.call('services.insert', item.title, item.featureCode );
    }
    this.reset();
  }

  reset(){
    this.setState({ ...this.state, editItem: undefined, isAdding: false });
  }

  renderServices(){
    return this.props.services.map((s)=>{
      return (
        <ServiceItem key={s._id} item={s}
          isOpen={s._id === this.state.editItem }
          cbEdit={this.handleEdit}
          cbDelete={this.handleDelete}
          cbSave={this.handleSave} />
      );
    });
  }

  //TODO remove
  renderTempButtons(){
    return (
      <span>
      <button onClick={()=>{
        const x = HMIS.find({hmisId: 5}).fetch();
        console.log('>>>>', x);
        if (x.length === 0){
          // add one
          const h = {};
          h.hmisId = 5;
          h.firstname = 'Lena';
          h.middleInitial = 'K';
          h.lastname = 'Smith';
          h.dob= new Date();
          h.race='b';
          h.gender ='F';
          h.firstVisit = new Date();
          Meteor.call('hmis.insert', h);
          console.log('inserted')
        } else {
          const h = { ...x[0] };
          h.race='w';
          Meteor.call('hmis.update', x[0]._id, h);
          console.log('updated')
        }

      }} >find hmis</button>
      <button onClick={()=>{
        const x = HMIS.find({}).fetch();
        console.log('^^^^', x)

      }} >list hmis</button>
      <button onClick={()=>{
        const x = HMIS.find({}).fetch();
        x.map((h)=>{
          Meteor.call('hmis.remove', h._id);

        })
        console.log('all removed');
      }} >remove All hmis</button>
      <br />
      <button onClick={()=>{
        const x = HMIS.find({}).fetch();
        x.map((h)=>{
          //console.log('hhhhh', h._id);
          const services = Services.find({}).fetch();
          Meteor.call('daily.insert', h, services);

        });
      }} >add service </button>
      <button onClick={()=>{
        const x = Daily.find({}).fetch();
        console.log('daily: ', x );
      }} >list daily </button>
      <button onClick={()=>{
        Meteor.call('daily.findToday', 5, function(error, data){
          console.log('FINDING Daily  : ', error, data );
        });

      }} >Find daily </button>
      <button onClick={()=>{
        const x = Daily.find({}).fetch();
        x.map((d)=>{
          Meteor.call('daily.remove', d._id);
        })
        console.log('removed all Daily entries');
      }} >remove ALL daily </button>
      </span>
    );
  }

  render(){
    const settingsComponent = <img src='./settings.png' width="25px" height="25px" onClick={()=>{
      this.setState({isSettingsOpen: !this.state.isSettingsOpen});
      if (this.state.isSettingsOpen){
        setTimeout(this.reset, 100); //must be on timer or will wipe out above state being set
      }
    }}/>;

    if (this.state.isSettingsOpen){
      const backComponent = <img src='./arrowleft.png' width="25px" height="25px" onClick={()=>{
        //console.log('back');
        this.setState({isSettingsOpen: !this.state.isSettingsOpen});
        if (this.state.isSettingsOpen){
          setTimeout(this.reset, 100); //must be on timer or will wipe out above state being set
        }
      }}/>;
      let addComponent;
      if (this.state.isAdding){
        addComponent = <ServiceItemEdit cbSave={this.handleSave} />;
      } else {
        addComponent = (
          <img src='/add.png' width="30" height="30" onClick={()=>{
            this.setState({ ...this.state, isAdding: !this.state.isAdding })
          }} />
        );
      }
      return (
        <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
          <Header title="TODD Settings" componentLeft={backComponent}  componentRight={settingsComponent} />
          <div style={{ margin: "auto", flex: "5 100%"}}>
            <ul>
              {this.renderServices()}
            </ul>
            {addComponent}
          </div>
          <Footer />
        </div>
      );
    } else {
      return (
        <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
          <Header title={"TODD - "+moment().format('MMM D, YYYY')} componentRight={settingsComponent}/>
          <div style={{ margin: "auto", flex: "5 100%"}}>
            {this.renderTempButtons()}
          </div>
          <Footer />
        </div>
      );
    }
  }
}
App.propTypes = {
  services: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    services: Services.find({}, { sort: { title: 0 } }).fetch(),
  };
}, App);
