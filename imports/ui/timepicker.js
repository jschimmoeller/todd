import React from 'react';
import S2SBaseComponent from './s2s-base-class';
import Select from './select';
import 'moment-range';
import moment from 'moment';
import 'moment/locale/da';
import 'moment/locale/de';
import 'moment/locale/es';
import 'moment/locale/fr';
import 'moment/locale/id';
import 'moment/locale/it';
import 'moment/locale/pl';
import 'moment/locale/pt';
import 'moment/locale/ru';
import 'moment/locale/sv';
import 'moment/locale/zh-cn';

const propTypes = {
  cbSelectChange : React.PropTypes.func,
  compStyle : React.PropTypes.object,
  isTwelveHour : React.PropTypes.bool,
  timestamp: React.PropTypes.number,
  locale : React.PropTypes.string
};

const defaultProps = {
  isTwelveHour : true,
  locale : 'en',
  timestamp: Date.now()
};

const dateTimeMap = [
  'am', 'pm'

  // TODO: Talk to James/Tom need internationalized values  :(
];

class TimePicker extends S2SBaseComponent {
  constructor(props){
      super(props);
      this.displayName = 'TimePicker';

      this.onSelectChange = this.onSelectChange.bind(this);

  }

  getDefaultStyle(styleName) {
    const styles = {
      timeWrapper : {
        color: '#121212',
        alignItems: 'center',
        display: 'flex',
        padding: '10px'
      },
      timeFormatWrapper : {
        display: 'flex'
      },
      hour : {
        containerStyle : {
          //padding: '0px 10px 0px 10px'
        },
        outline: 'none'
      },
      minuteWrapper : {
        marginLeft : '10px',
        marginRight : '10px'
      },
      minute : {
        containerStyle : {

          padding: '0px 10px 0px 10px'
        },
        outline: 'none'
      },
      dateTime: {
        containerStyle : {
          //padding: '0px 5px 0px 5px'
        },
        outline: 'none'
      }
    };
    return (styles[styleName]);
  }

  onSelectChange(field, value) {
    //console.log('select change', field, value );
    const currentDate = new Date(this.props.timestamp);
    switch(field){
      case 'hour':

      // currentDate.getHours() >= 12  === we are in PM  ... checking for 12 hour format
      //console.log('>>>>', currentDate.getHours(), this.props.isTwelveHour === true  )
      if ( this.props.isTwelveHour === true  ){
        // must figure this out  value will between 1 -12

        if (Number(value) ===12 && currentDate.getHours() ===12  ){
          currentDate.setHours( 0 );
        } else if(currentDate.getHours() >= 12 ) {
          const h = Number(value) + 12;
            //console.log('PM ', h )
          currentDate.setHours( h === 24 ? 12 : h );
        } else {
          if (Number(value) === 12 ){
            //console.log('AM ', 0 )
            currentDate.setHours( 0 );
          } else {
            const h = Number(value);
            //console.log('AM ', h )
            currentDate.setHours( h );
          }

        }

      } else {
        currentDate.setHours(Number(value) );
      }
        break;
      case 'minute':
        currentDate.setMinutes(Number(value));
        break;
      case 'ampm':
        //console.log('AMPM', currentDate.getHours(), value);
        if (value === 'am'){
          if (currentDate.getHours() >= 12){
            //console.log('ssss', currentDate.getHours(), currentDate.getHours()-12 )
            currentDate.setHours(currentDate.getHours() - 12 ); //TODO handle 24
          }

        } else { // setting pm
          if (currentDate.getHours() <= 12){
            //console.log('ssss', currentDate.getHours(), currentDate.getHours()+12 )
            currentDate.setHours(currentDate.getHours() + 12 ); //TODO handle 24
          }
        }
        break;
    }
    //console.log(currentDate)
    this.props.cbSelectChange(currentDate.getTime());
  }

  render(){

    moment.locale(this.props.locale);

    const currentDate = new Date(this.props.timestamp);
    //console.log(currentDate.getHours());
    let dsh;
    if (this.props.isTwelveHour === false ){
      dsh = currentDate.getHours();
    } else {
      // we have 12 hour time
      if (currentDate.getHours() > 12 ){
        dsh = currentDate.getHours() -12 -1;
      } else if (currentDate.getHours() === 12 ){
        dsh = 11;
      } else if (currentDate.getHours() === 0 ){
        dsh = 11;
      } else {
        dsh = currentDate.getHours() -1;
      }
    }
    return(
      <div className = "timeWrapper" style={{...this.getStyle('timeWrapper')}}>
        <div className = "timeFormatWrapper" style={{...this.getStyle('timeFormatWrapper')}}>
          <Select
              className = "hour"
              defaultSelectedItem={dsh}
              compStyle={{...this.getStyle('hour')}}
              cbValueChanged={(v)=>{
                this.onSelectChange('hour', v);
              }}
              data={this.props.isTwelveHour === true ? '.'.repeat(11).split('.').map((v,i)=>`${i+1}`) : '.'.repeat(23).split('.').map((v,i)=>{
                const x = `0${i}`;
                return x.substring(x.length - 2);
              })}
          />
          <div
              style={{...this.getStyle('minuteWrapper')}}
          >
              <Select
                  className = "minute"
                  data={'.'.repeat(59).split('.').map((v,i)=>{
                    const x = `0${i}`;
                    return x.substring(x.length - 2);
                  })}
                  defaultSelectedItem={currentDate.getMinutes()}
                  cbValueChanged={(v)=>{
                    this.onSelectChange('minute', v);
                  }}
                  compStyle={{...this.getStyle('minute')}}
              />
          </div>
          {
            this.props.isTwelveHour === false ? undefined :
            <Select
                className = "am-pm"
                ref='ampm'
                defaultSelectedItem={currentDate.getHours() >= 12 ? 1: 0}
                data={dateTimeMap}
                cbValueChanged={(v)=>{
                  this.onSelectChange('ampm', v);
                }}
                compStyle={{...this.getStyle('dateTime')}}
            />
          }
        </div>
      </div>
    );
  }
}

TimePicker.propTypes = propTypes;
TimePicker.defaultProps = defaultProps;

export default TimePicker;
