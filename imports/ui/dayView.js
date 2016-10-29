import React from 'react';
import S2SBaseComponent from './s2s-base-class';
import Cell from './cell';
import cs from 'classnames';
import ViewHeader from './viewHeader';
import moment from 'moment';
import 'moment-range';
import Radium from 'radium';

const propTypes = {
  date: React.PropTypes.object.isRequired,
  minDate: React.PropTypes.any,
  maxDate: React.PropTypes.any,
  setDate: React.PropTypes.func,
  nextView: React.PropTypes.func
};

const defaultProps = {

};

// Day View is a normal calendar.

class DayView extends S2SBaseComponent {
  constructor(props){
      super(props);
      this.displayName = 'DayView';

      this.state = { 'selectedDate': false  };

      this.cellClick = this.cellClick.bind(this);
      this.getDays = this.getDays.bind(this);
      this.getDaysTitles = this.getDaysTitles.bind(this);
      this.next = this.next.bind(this);
      this.prev = this.prev.bind(this);
  }


  getDefaultStyle(styleName) {
    const styles = {
      daysTitleWrapper : {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        marginBottom: '5px'
      },
      daysTitle : {
        alignItems: 'center',
        display: 'flex',
        flex: 1,
        fontWeight: '500',
        justifyContent: 'center'
      },
      viewHeader : {
        viewHeader : {

        },
        back : {
          ':hover':{
            color: '#4ab7e2'
          }
        },
        header : {
          ':hover':{
            color: '#4ab7e2'
          }
        },

        next: {
          ':hover':{
            color: '#4ab7e2'
          }
        }
      },
      daysWrapper: {
        display: 'flex',
        flex: '1',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      },
      // days that do not belong to month being displayed
      lonerDays : {
        color: '#bbb'
      },
      selectedDay : {
        // backgroundColor: '#4ab7e2',
        // color: '#fff'
      },
      days : {
        // border: '1px solid transparent',
        // borderRadius: '2px',
        // alignItems: 'center',
        // display: 'flex',
        // flex: '1 1 13%',
        // height: '30px',
        // justifyContent: 'center',
        // ':hover':{
        //   backgroundColor: '#fbfbfb',
        //   border: '1px solid #efefef',
        //   color: '#4ab7e2'
        //}
      }
    };
    return (styles[styleName]);
  }

  cellClick(e) {
    //console.log('cellclick')
    let cell = e.target;
    let date = parseInt(cell.innerHTML, 10);
    let newDate = this.props.date ? this.props.date.clone() : moment();

    if (isNaN(date)) return;

    if (cell.className.indexOf('prev') > -1 ) {
      newDate.subtract(1, 'months');
    } else if (cell.className.indexOf('next') > -1) {
      newDate.add(1, 'months');
    }

    newDate.date(date);
    this.props.setDate(newDate, true);

  }

  getDays() {
    let now = this.props.date ? this.props.date : moment();
    let start = now.clone().startOf('month').weekday(0);
    let end = now.clone().endOf('month').weekday(6);
    let minDate = this.props.minDate;
    let maxDate = this.props.maxDate;
    let month = now.month();
    let today = moment();
    let currDay = now.date();
    let year = now.year();
    let days = [];

    moment()
      .range(start, end)
      .by('days', day => {
        days.push({
          label: day.format('D'),
          prev: (day.month() < month && !(day.year() > year)) || day.year() < year ,
          next: day.month() > month || day.year() > year,
          disabled: day.isBefore(minDate, 'day') || day.isAfter(maxDate, 'day'),
          curr: day.date() === currDay && day.month() === month,
          today: day.date() === today.date() && day.month() === today.month() && day.year() === today.year()
        });
      });
    return days;
  }


  getDaysTitles() {
    let now = moment();
    return [0,1,2,3,4,5,6].map(i => {
      let weekday = now.weekday(i).format('dd');
      return { val: weekday, label: weekday }; // val is not val anymore
    });
  }

  next() {
    let nextDate = this.props.date.clone().add(1, 'months');
    if (this.props.maxDate && nextDate.isAfter(this.props.maxDate, 'day')) {
      nextDate = this.props.maxDate;
    }
    this.props.setDate(nextDate);
  }

  prev () {
    let prevDate = this.props.date.clone().subtract(1, 'months');
    if (this.props.minDate && prevDate.isBefore(this.props.minDate, 'day')) {
      prevDate = this.props.minDate;
    }
    this.props.setDate(prevDate);
  }

  render(){
    let _class;

    let titles = this.getDaysTitles().map((item, i) => {
      return (
        <Cell
            classes="day title"
            key={i}
            compStyle={{cellWrapper : {...this.getStyle('daysTitle')}}}
            dateVal={item.label}
        />);
    });

    let days = this.getDays().map((item, i) => {
      _class = cs({
        day: true,
        next: item.next,
        prev: item.prev,
        current: item.curr,
        today: item.today
      });

      let style;
      if(_class.indexOf('prev') > -1 || _class.indexOf('next') > -1) {
        style = ({ cellWrapper : {...this.getStyle('lonerDays') }});
      } else {
        style = undefined;
      }

      return (
        <Cell
            classes={_class}
            key={i}
            isSelected={_class.indexOf('current') > -1}
            compStyle={style}
            dateVal={item.label} />
        );
    });

    let currentDate = this.props.date ? this.props.date.format('MMMM YYYY') : moment().format('MMMM YYYY');

    return(
      <div
          className="view days-view"
          onKeyDown={this.keyDown}
          style={{...this.getStyle('daysView')}}
      >
        <ViewHeader
            key="ViewHeader - Day"
            headerData={currentDate}
            cbNext={this.next}
            cbPrevious={this.prev}
            cbTitleAction={this.props.nextView}
            compStyle={{...this.getStyle('viewHeader')}}
        />
        <div
            className="days-title"
            style={{...this.getStyle('daysTitleWrapper')}}
        >
          {titles}
        </div>
        <div
            className="days"
            onClick={this.cellClick}
            style={{...this.getStyle('daysWrapper')}}
        >
          {days}
        </div>
     </div>
    );
  }
}

DayView.propTypes = propTypes;
DayView.defaultProps = defaultProps;
export default Radium(DayView);
export let undecorated = DayView;
