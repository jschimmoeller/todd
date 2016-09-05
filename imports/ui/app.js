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

    this.state = {isSettingsOpen: false, status: "showEntry" };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.getBody = this.getBody.bind(this);
    this.renderServices = this.renderServices.bind(this);
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
    this.setState({ ...this.state, status: 'showSettings', editItem: undefined, isAdding: false });
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
  /* <button onClick={()=>{
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

  */
  renderTempButtons(){
    return (
      <span>
        <button onClick={()=>{
          const x = HMIS.find({hmisId: Number(this.refs.hmisId.value)}).fetch();
          console.log('>>>>', this.refs, this.refs.hmisId.value,  x);
          if (x.length === 0){
            // add one
            // const h = {};
            // h.hmisId = Number(this.refs.hmisId.value);
            // h.firstname = 'Lena';
            // h.middleInitial = 'K';
            // h.lastname = 'Smith';
            // h.dob= new Date();
            // h.race='b';
            // h.gender ='F';
            // h.firstVisit = new Date();
            // Meteor.call('hmis.insert', h);
            console.log('Not Found')
            this.setState({ ...this.state,  status: "showNotFound", hmisId: undefined});
            this.refs.hmisId.value = '';
            this.refs.hmisId.focus();
          } else {
            console.log('Found IT')
            this.setState({ ...this.state,  status: "showServices", hmisId: Number(this.refs.hmisId.value)});
          }
        }} >find hmis</button>
        <button onClick={()=>{
          const x = HMIS.find({}).fetch();
          console.log('^^^^', x)
        }} >list hmis</button>
      </span>
    );
  }

  getBody(){
    switch(this.state.status){
      case 'showEntry':
        console.log('entry');
        return(
          <div style={{ margin: "auto", flex: "5 100%"}}>
            <input ref="hmisId" defaultValue={this.state.hmisId} />
            {this.renderTempButtons()}
          </div>
        );
      case 'showServices':
        console.log('services ');
        return(
          <div style={{ margin: "auto", flex: "5 100%"}}>
            <div>services here </div>
            <button onClick={()=>{
              this.setState({ ...this.state, status: 'showEntry', hmisId: undefined })
            }}>Cancel</button>
            <button onClick={()=>{
              console.log('TODO save services ');
              this.setState({ ...this.state, status: 'showEntry', hmisId: undefined })
            }}>Save</button>
          </div>
        );
      case 'showNotFound':
        console.log('showing not found ');
        return(
          <div style={{ margin: "auto", flex: "5 100%"}}>
            <input ref="hmisId" />
            {this.renderTempButtons()}
            <div>NOT Found</div>
          </div>
        );
      case 'showSettings':
        let addComponent;
        if (this.state.isAdding){
          addComponent = (<ServiceItemEdit cbSave={this.handleSave} />);
        } else {
          addComponent = (
            <img src='/add.png' width="30" height="30" onClick={()=>{
              this.setState({ ...this.state, isAdding: !this.state.isAdding })
            }} />
          );
        }
        return (
          <div style={{ margin: "auto", flex: "5 100%"}}>
            <ul>
              {this.renderServices()}
            </ul>
            {addComponent}
          </div>
        );

      default:
        console.log('NOT NOT NOT Found');
        break;
    }
  }

  render(){
    console.log('>>> RENDERING: ', this.state);

    // always need settings component
    const settingsComponent = <img src='./settings.png' width="25px" height="25px" onClick={()=>{
      if (this.state.status === "showSettings"){
        this.setState({ ...this.state, status: 'showEntry', editItem: undefined, isAdding: false });
      } else {
        this.setState({ ...this.state, status: "showSettings"});
      }
    }}/>;

    //compute headerComponent
    let HeaderComponent;
    switch(this.state.status){
      case 'showEntry':
      case 'showServices':
      case 'showNotFound':
        HeaderComponent = (<Header title={"TODD - "+moment().format('MMM D, YYYY')} componentRight={settingsComponent}/>);
        break;
      case 'showSettings':
        const backComponent = (<img src='./arrowleft.png' width="25px" height="25px" onClick={()=>{
          //console.log('back');
          this.setState({ ...this.state, status: 'showEntry', editItem: undefined, isAdding: false });
        }}/>);
        HeaderComponent = (<Header title="TODD Settings" componentLeft={backComponent}  componentRight={settingsComponent} />);
        break;
      default:
        console.log('NOT NOT NOT Found');
        break;
    }
    // main return here
    return (
      <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
        {HeaderComponent}
        {this.getBody()}
        <Footer hmisCount={this.props.hmisCount}/>
      </div>
    );
  }
}
App.propTypes = {
  services: PropTypes.array.isRequired,
};

export default createContainer(() => {
  let today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1 );
  tomorrow.setHours(0);
  tomorrow.setMinutes(0);
  tomorrow.setSeconds(0);

  const hmisDaily =  Daily.find({ createdAt: {
    $gte: today,
    $lt: tomorrow
  }}).fetch();

  return {
    services: Services.find({}, { sort: { title: 0 } }).fetch(),
    hmisCount: hmisDaily.length,
  };
}, App);
