import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { HMIS } from '../api/hmis';
import { browserHistory } from 'react-router';


// TODO : Add a contact icon and position inside of input area.
// Update placeholder text color
// Discuss sizes with Brian adjust accordingly

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
    const NotFound = this.state.notFound ? (
      <div style={{
        alignSelf: 'center',
        color: '#239d82',
        fontFamily: 'avenir',
        fontSize: '18px',
        fontWeight: '700'
      }}>
        No HMIS with that ID Found
      </div>)
      : undefined;
    return (
      <div
          style={{
            color: '#29b794',
            display: 'flex',
            flex: "1",
            flexDirection: 'column',
            fontFamily: 'avenir',
            margin: "auto",
            marginTop: '75px'
            }}
      >
        <input
            ref="hmisId"
            placeholder="Find HMIS"
            onKeyDown={(e)=>{
              //console.log('EEE: ', e.charCode, e.keyCode, e);
              if (e.keyCode === 13){
                this.handleSubmit();
              }
            }}
            style={{
              backgroundColor: '#239d82',
              border: 'none',
              borderRadius: '50px',
              color: '#29b794',
              fontSize: '18px',
              height: '30px',
              outline: 'none',
              paddingLeft: '10px',
              paddingRight: '10px'
              //width: '300px'
            }}
        />
        <span
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px'
            //width: '100%'
          }}
        >
          <button
            onClick={this.handleSubmit}
            style={{
              backgroundColor: '#fff',
              border: 'none',
              borderRadius: '50px',
              color: '#29b794',
              height: '30px',
              width: '300px',
              flex: '1',
              fontFamily: 'Avenir',
              fontSize: '18px',
              lineHeight: '1',
              marginBottom: '10px',
              outline: 'none',
              paddingLeft: '10px',
              paddingRight: '10px',
              fontWeight: '600'
            }}
          >
            Submit
          </button>
          {NotFound}
        </span>
      </div>
    )
  }
}

export default FindHmis;
