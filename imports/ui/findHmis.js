import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { HMIS } from '../api/hmis';
import { browserHistory } from 'react-router';


// App component - represents the whole app
class FindHmis extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    this.refs.hmisId.focus();
  }

  render(){
    return (
      <div style={{ margin: "auto", flex: "1"}}>
        <input ref="hmisId" />
        <span>
          <button onClick={()=>{
            const x = HMIS.find({hmisId: Number(this.refs.hmisId.value)}).fetch();

            //console.log('>>>>', this.refs, this.refs.hmisId.value,  x);
            if (x.length === 0){
              //console.log('Not Found')
              this.refs.hmisId.value = '';
              this.refs.hmisId.focus();
            } else {
              //console.log('Found IT');
              browserHistory.push('/daily/'+this.refs.hmisId.value);
            }
          }} >find hmis</button>

        </span>
      </div>
    )
  }
}

export default FindHmis;
