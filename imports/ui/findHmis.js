import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { HMIS } from '../api/hmis';
import { browserHistory } from 'react-router';


// App component - represents the whole app
class FindHmis extends Component {
  constructor(props){
    super(props);
    this.state={notFound: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    this.refs.hmisId.focus();
  }

  handleSubmit(){
    const x = HMIS.find({hmisId: Number(this.refs.hmisId.value)}).fetch();

    //console.log('>>>>', this.refs, this.refs.hmisId.value,  x);
    if (x.length === 0){
      //console.log('Not Found')
      this.refs.hmisId.value = '';
      this.refs.hmisId.focus();
      this.setState({ ...this.state, notFound: true});
      setTimeout(()=>{
        this.setState({ ...this.state, notFound: false });
      }, 3000);
    } else {
      //console.log('Found IT');
      browserHistory.push('/daily/'+this.refs.hmisId.value);
    }
  }

  render(){
    const NotFound = this.state.notFound ? (<div>Not Found</div>):undefined
    return (
      <div style={{ margin: "auto", flex: "1"}}>
        <input ref="hmisId" onKeyDown={(e)=>{
          //console.log('EEE: ', e.charCode, e.keyCode, e);
          if (e.keyCode === 13){
            this.handleSubmit();
          }
        }}/>
        <span>
          <button onClick={this.handleSubmit} >find hmis</button>
          {NotFound}
        </span>
      </div>
    )
  }
}

export default FindHmis;
