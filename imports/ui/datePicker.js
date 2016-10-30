import React from 'react';
import S2SBaseComponent from './s2s-base-class';
import {CalendarIconSVG } from './svgs';
import moment from 'moment';
import Calendar from './calendar';
import TimePicker from './timepicker';
import Radium from 'radium';
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
  dateType : React.PropTypes.oneOf(['date','dateRange']),
  disabled : React.PropTypes.bool,
  displayTime : React.PropTypes.bool,
  endTimestamp : React.PropTypes.number,
  format: React.PropTypes.string,
  isTwelveHour : React.PropTypes.bool,
  maxDate: React.PropTypes.any,// TODO: number
  minDate: React.PropTypes.any,// TODO: number
  cbOnChange: React.PropTypes.func, // TODO: needs to be cbChange
  placeholder: React.PropTypes.string,
  setDate: React.PropTypes.func,
  startTimestamp : React.PropTypes.number,
  svgDisplayed : React.PropTypes.bool,
  svgPosition : React.PropTypes.oneOf(['left', 'right'])
};

const defaultProps = {
  dateType : 'date',
  disabled : false,
  displayTime : false,
  endTimestamp: Date.now(),
  isTwelveHour : true,
  startTimestamp: Date.now(),
  svgDisplayed: true,
  svgPosition: 'left'
};

var momentLocale;

class DatePicker extends S2SBaseComponent {
  constructor(props){
      super(props);
      this.displayName = 'DatePicker';

      this.format;
      if (props.hasOwnProperty('format')) {
        this.format = props.format;
      } else {
        this.format = props.displayTime === true ? (props.isTwelveHour === true ? 'MM/DD/YYYY h:mm a' : 'MM/DD/YYYY HH:mm') : 'MM/DD/YYYY' ;
      }

      console.log('format:', this.format, props);

      let inputValue = moment(props.startTimestamp).format(this.format);
      if(props.dateType === 'dateRange') {
        inputValue += ' - ' + moment(props.endTimestamp).format(this.format);
      }

      this.state = {
        calendarDisplayed : false,
        inputValue: inputValue,
        endTimestamp: this.props.endTimestamp,
        startTimestamp: this.props.startTimestamp
      };

      this.generateInput = this.generateInput.bind(this);
      this.generateCalendarArea = this.generateCalendarArea.bind(this);
      this.generateTimeArea = this.generateTimeArea.bind(this);
      this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
      this.handleChangeEndTime = this.handleChangeEndTime.bind(this);

  }

  componentWillReceiveProps(nextProps){
    this.format;
    if (nextProps.hasOwnProperty("format")){
      this.format = nextProps.format;
    } else {
      this.format = nextProps.displayTime === true ? (nextProps.isTwelveHour === true ? 'MM/DD/YYYY h:mm a' : 'MM/DD/YYYY HH:mm') : 'MM/DD/YYYY' ;
    }

    let inputValue = moment(nextProps.startTimestamp).format(this.format);
    if(nextProps.dateType === 'dateRange') {
      inputValue += ' - ' + moment(nextProps.endTimestamp).format(this.format);
    }
    this.setState({ ...this.state,
      inputValue: inputValue,
      startTimestamp: nextProps.startTimestamp,
      endTimestamp: nextProps.endTimestamp });
  }

  getDefaultStyle(styleName) {
    const styles = {
      datePicker : {
        alignItems: 'center',
        color: '#121212',
        cursor: 'pointer',
        border: '1px solid #B7B7B7',
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        fontFamily: 'avenir'
      },
      dateInputContainer: {
        alignItems: 'center',
        borderBottom: !this.state.calendarDisplayed ? 'none' : '1px solid #B7B7B7',
        color: 'inherit',
        display: 'flex',
        fontFamily: 'inherit',
        width: '100%'
      },
      svgContainer : {
        padding: '5px'
      },
      svg : {
        height: '24px',
        width: '24px'
      },
      inputArea: {
        border: 'none',
        flex: '1',
        outline: 'none',
        paddingLeft: '10px'
      },
      calendarArea: {
        //backgroundColor: 'pink',
        color: '#121212',
        display: this.state.calendarDisplayed ? 'flex' : 'none',
        //padding: '10px',
        //width: '100%'
      },
      timeArea: {
        //backgroundColor: 'red',
        //display: 'flex',
        //flex: '1',
        //justifyContent: 'space-around',
        //padding: '10px',
        //width: '100%'
      }

    };
    return (styles[styleName]);
  }

  handleChangeStartTime(newDate){
    let inputValue = moment(newDate).format(this.format);
    if(this.props.dateType === 'dateRange') {
      inputValue += ' - ' + moment(this.state.endTimestamp).format(this.format);
    }

    setTimeout(()=>{
      //console.log('>>>', this.state);
      this.setState({...this.state, inputValue: inputValue, startTimestamp: newDate, calendarDisplayed: false });
    }, 0)
    if (this.props.cbOnChange){
      console.log('2')
       this.props.cbOnChange(newDate, this.state.endTimestamp);
    }

  }

  handleChangeEndTime(newDate){
    let inputValue = moment(this.state.startTimestamp).format(this.format);
    if(this.props.dateType === 'dateRange') {
      inputValue += ' - ' + moment(newDate).format(this.format);
    }
    this.setState({...this.state, inputValue: inputValue, endTimestamp: newDate });
    if (this.props.cbOnChange){
      console.log('3')
       this.props.cbOnChange( this.state.startTimestamp, newDate );
    }
  }

  generateInput() {
    const dInput = (
      <input
          value={this.state.inputValue}
          name={this.props.inputName}
          id={this.props.inputFieldId}
          onChange={(v)=>{
            const newValue = v.nativeEvent.target.value;
            let startTime=this.state.startTimestamp, endTime=this.state.endTimestamp;
            if (this.props.dateType === 'dateRange'){
              //compute start and  end

              const ta = newValue.split(' - ');
              if (moment(ta[0], this.format).isValid())
                startTime= moment(ta[0], this.format).valueOf();
              if (moment(ta[1], this.format).isValid())
                endTime= moment(ta[1], this.format).valueOf();

            } else {
              // just start
              if (moment(newValue, this.format).isValid())
                startTime = moment(newValue, this.format).valueOf();
            }
            this.setState({ ...this.state, inputValue: newValue, startTimestamp: startTime, endTimestamp: endTime });
            if (this.props.cbOnChange){
              console.log('1')
              this.props.cbOnChange(startTime, endTime);
            }
          }}

          onClick={()=>{
            this.setState({...this.state, calendarDisplayed: !this.state.calendarDisplayed });
          }}
          type="text"
          ref="dateVal"
          style={{...this.getStyle('inputArea')}}
      />
    );

      const svgCal=(
        <div
            style={{...this.getStyle('svgContainer')}}
            onClick={()=>{
              console.log(this.state.calendarDisplayed,'<<<<<')
              this.setState({...this.state, calendarDisplayed: !this.state.calendarDisplayed });
            }}
        >
          <CalendarIconSVG
            svgStyle={{...this.getStyle('svg')}}
          />
        </div>
      );
      const dateInputContainer = (
        <div
            className={`dpInput-${this.props.svgPosition}`}
            style={{...this.getStyle('dateInputContainer')}}
        >
          {this.props.svgDisplayed === true && this.props.svgPosition ==='left' ? svgCal : undefined}
          {dInput}
          {this.props.svgDisplayed === true && this.props.svgPosition ==='right' ? svgCal : undefined}
        </div>
      );


    return (dateInputContainer);
  }

  generateCalendarArea() {
    let endCalendar = undefined;
    if(this.props.dateType == 'dateRange') {
      endCalendar = (
        <div
            style={{...this.getStyle('calendarArea')}}
        >
            <Calendar
                key="endCalendar"
                locale={momentLocale}
                timestamp={this.state.endTimestamp}
                setDate={this.setDate}
                minDate={this.state.startTimestamp}
                prevView={this.prevView}
                nextView={this.nextView}
                cbChange={this.handleChangeEndTime}
            />
      </div>
      );
    }
    const calendarReturn = (
          <div style={{...this.getStyle('calendarArea')}}>
            <div
                style={{...this.getStyle('calendarArea')}}
            >
                <Calendar
                    key="startCalendar"
                    locale={momentLocale}
                    timestamp={this.state.startTimestamp}
                    setDate={this.setDate}
                    maxDate={this.props.dateType === 'dateRange' ? this.state.endTimestamp : undefined}
                    prevView={this.prevView}
                    nextView={this.nextView}
                    cbChange={this.handleChangeStartTime}
                />
          </div>
          {endCalendar}
        </div>
      );

    return calendarReturn;
  }

  generateTimeArea() {

    let timeReturn = undefined;
    if(!this.props.displayTime ){
      return timeReturn;
    }
    //ok got by so now i have time to display
    let endCalendar = undefined;
    if(this.props.dateType == 'dateRange') {
      endCalendar = (
        <TimePicker
            cbSelectChange={this.handleChangeEndTime}
            isTwelveHour={this.props.isTwelveHour}
            locale={momentLocale}
            timestamp={this.state.endTimestamp}
        />
      );
    }
    timeReturn = (
      <div style={{...this.getStyle('timeArea')}}>
        <TimePicker
            cbSelectChange={this.handleChangeStartTime}
            isTwelveHour={this.props.isTwelveHour}
            locale={momentLocale}
            timestamp={this.state.startTimestamp}
        />
        {endCalendar}
      </div>
    );
    return timeReturn;
  }

  render(){
    let momentLocale = 'en';
    if(this.props.intl){
      if(this.props.intl.locale == "zh"){
        momentLocale = "zh-cn";
      }else{
        momentLocale = this.props.intl.locale;
      }
    }

    moment.locale(momentLocale);

    return(
      <div
          className="datePicker"
          style={{...this.getStyle('datePicker')}}
      >
          {this.generateInput()}
          {this.state.calendarDisplayed === true && this.generateCalendarArea()}
          {this.state.calendarDisplayed === true && this.generateTimeArea()}
      </div>
    );
  }
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default Radium(DatePicker);
