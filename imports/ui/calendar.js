import React from 'react';
import S2SBaseComponent from './s2s-base-class';
import moment from 'moment';
import 'moment-range';
import DayView from './dayView';
import MonthView from './monthView';
import YearView from './yearView';
import Radium from 'radium';

const propTypes = {
  setDate: React.PropTypes.func, // TODO: needs to be standardized
  closeOnSelect: React.PropTypes.bool,
  computableFormat: React.PropTypes.string,
  timestamp: React.PropTypes.number,
  minDate: React.PropTypes.number,
  maxDate: React.PropTypes.number,
  format: React.PropTypes.string,
  minView: React.PropTypes.number,
  cbChange: React.PropTypes.func,
  todayText: React.PropTypes.string,
  disabled: React.PropTypes.bool
};

const defaultProps = {
  locale : 'en',
  timestamp: Date.now()
};
class Calendar extends S2SBaseComponent {
  constructor(props, context) {
    super(props, context);
    this.displayName = 'Calendar';
    const minDate = props.minDate ? moment(props.minDate) : null; // TODO Pull min/max props out of constructor and into default props.
    const maxDate = props.maxDate ? moment(props.maxDate) : null;

    this.state = {
       timestamp: props.timestamp,
       views: ['days', 'months', 'years'],
       currentView: 0, // days view should be by default
       isVisible: true,
       minDate,
       maxDate
    };
    this.checkIfDateDisabled = this.checkIfDateDisabled.bind(this);
    this.cellClick = this.cellClick.bind(this);
    this.todayClick = this.todayClick.bind(this);
    this.nextView = this.nextView.bind(this);
    this.prevView = this.prevView.bind(this);
    this.setDate = this.setDate.bind(this);

  }

  componentWillReceiveProps(nextProps){
    const minDate = nextProps.minDate ? moment(nextProps.minDate) : null;
    const maxDate = nextProps.maxDate ? moment(nextProps.maxDate) : null;
    this.setState({...this.state, timestamp: nextProps.timestamp, minDate, maxDate});
  }

  getDefaultStyle(styleName) {
    const styles = {
      calendarWrapper : {
        padding: '10px',
        userSelect: 'none'
      },
      todayWrapper : {

      },
      today : {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center',
        padding: '5px',
        ':hover':{
          color: '#4ab7e2'
        }
      }
    };
    return (styles[styleName]);
  }

  cellClick (e) {
    let cell = e.target
    let date = parseInt(cell.innerHTML, 10)
    let newDate = this.props.date ? this.props.date.clone() : moment()

    if (isNaN(date)) return

    if (cell.className.indexOf('prev') > -1 ) {
      newDate.subtract(1, 'months')
    } else if (cell.className.indexOf('next') > -1) {
      newDate.add(1, 'months')
    }

    newDate.date(date)
    this.props.setDate(newDate, true)
  }


  todayClick(){
    const today = moment();

    if (this.checkIfDateDisabled(today)) return;

    this.setState({
      ...this.state,
      timestamp: today.valueOf()
    });

    if (this.props.cbChange) {
      this.props.cbChange(today.valueOf());
    }
  }

  checkIfDateDisabled(date) {
    return date && this.state.minDate && date.isBefore(this.state.minDate, 'day')
      || date && this.state.maxDate && date.isAfter(this.state.maxDate, 'day');
  }

  nextView (){

    if (this.checkIfDateDisabled(this.state.date)) return;
    this.setState({...this.state, currentView: ++this.state.currentView });
  }

  prevView(date){
    let newDate = date;
    if (this.state.minDate && date.isBefore(this.state.minDate, 'day')) {
      newDate = this.state.minDate.clone();
    }

    if (this.state.maxDate && date.isAfter(this.state.maxDate, 'day')) {
      newDate = this.state.maxDate.clone();
    }

    if (this.state.currentView === this.state.minView) {
      this.setState({
        ...this.state,
        timestamp: newDate.valueOf(),
        inputValue: date.format(this.state.format),
        calendarDisplayed: false
      });
      if (this.props.cbChange) {
        this.props.cbChange(date.format(this.state.computableFormat));
      }
    } else {
      this.setState({
        ...this.state,
        timestamp: date.valueOf(),
        currentView: --this.state.currentView
      });
    }
  }

  setDate(date, isDayView = false) {
    if (this.checkIfDateDisabled(date)) return;
    this.setState({
      ...this.state,
      timestamp: date.valueOf(),
      inputValue: date.format(this.state.format),
      calendarDisplayed: this.props.closeOnSelect
        && isDayView ? !this.state.calendarDisplayed : this.state.calendarDisplayed
    });

    if (this.props.cbChange) {
      this.props.cbChange(date.valueOf() );
    }
  }


  render() {
    // its ok for this.state.date to be null, but we should never
    // pass null for the date into the calendar pop up, as we want
    // it to just start on todays date if there is no date set
    let calendarDate = moment(this.state.timestamp).isValid()?  moment(this.state.timestamp) : moment();

    let view;
    switch (this.state.currentView) {
      case 0:
        view = (<DayView
            date={calendarDate}
            nextView={this.nextView}
            maxDate={this.state.maxDate}
            minDate={this.state.minDate}
            prevView={this.prevView}
            setDate={this.setDate}
        />);
        break;
      case 1:
        view = (<MonthView
            date={calendarDate}
            nextView={this.nextView}
            maxDate={this.state.maxDate}
            minDate={this.state.minDate}
            prevView={this.prevView}
            setDate={this.setDate}
        />);
        break;
      case 2:
        view = (<YearView
            date={calendarDate}
            maxDate={this.state.maxDate}
            minDate={this.state.minDate}
            prevView={this.prevView}
            setDate={this.setDate}
        />);
        break;
      default:
        view = (<DayView
            date={calendarDate}
            nextView={this.nextView}
            maxDate={this.state.maxDate}
            minDate={this.state.minDate}
            setDate={this.setDate}
        />);
    }

    //TODO fix
    let todayText = this.props.todayText || (moment.locale() === 'de' ? 'Heute' : 'Today');

    let calendar = !this.state.isVisible || this.props.disabled ? '' :
      (<div
          style={{...this.getStyle('todayWrapper')}}
      >
        {view}
        <span
            onClick={this.todayClick}
            style={{...this.getStyle('today')}}
        >
            {todayText}
        </span>
      </div>);

    return (
      <div
          className="input-calendar"
          style={{...this.getStyle('calendarWrapper')}}
      >
          {calendar}
      </div>
    );
  }
}

Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;
export default Radium(Calendar);
