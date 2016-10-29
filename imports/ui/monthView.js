import React from 'react';
import S2SBaseComponent from './s2s-base-class';
import moment from 'moment';
import 'moment-range';
import Cell from './cell';
import Radium from 'radium';
import ViewHeader from './viewHeader';

const propTypes = {
    date: React.PropTypes.object.isRequired, // TODO better name
    maxDate: React.PropTypes.number,
    minDate: React.PropTypes.number
};

class MonthView extends S2SBaseComponent {
  constructor(props){
      super(props);
      this.displayName = 'MonthView';
      this.cellClick = this.cellClick.bind(this);
      this.checkIfMonthDisabled = this.checkIfMonthDisabled.bind(this);
      this.getMonth = this.getMonth.bind(this);
      this.next = this.next.bind(this);
      this.prev = this.prev.bind(this);
  }

  getDefaultStyle(styleName) {
    const styles = {
      monthWrapper : {
        display: 'flex',
        flex: '1',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
      },
      month : {
        flex: '1 1 30%'
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
      }
    };
    return (styles[styleName]);
  }

  cellClick(e) {
    const month = e.target.innerHTML;
    if (this.checkIfMonthDisabled(month)) return;

    const date = this.props.date.clone().month(month);
    this.props.prevView(date);
  }

  checkIfMonthDisabled(month) {
    const now = this.props.date;
    return now.clone().month(month).endOf('month').isBefore(this.props.minDate, 'day') ||
      now.clone().month(month).startOf('month').isAfter(this.props.maxDate, 'day');
  }

  getMonth() {
    const month = this.props.date.month();
    return moment.monthsShort().map((item, i) => {
      return {
        label: item,
        disabled: this.checkIfMonthDisabled(i),
        curr: i === month
      };
    });
  }

  next () {
    let nextDate = this.props.date.clone().add(1, 'years');
    if (this.props.maxDate && nextDate.isAfter(this.props.maxDate, 'day')) {
      nextDate = this.props.maxDate;
    }
    this.props.setDate(nextDate);
  }

  prev (){
    let prevDate = this.props.date.clone().subtract(1, 'years');
    if (this.props.minDate && prevDate.isBefore(this.props.minDate, 'day')) {
      prevDate = this.props.minDate;
    }
    this.props.setDate(prevDate);
  }

  render() {
    const currentDate = this.props.date.format('YYYY');
    let months = this.getMonth().map((item, i) => {
      return (
        <Cell
            key={i}
            dateVal={item.label}
            compStyle={{ cellWrapper : {...this.getStyle('month')}}}
        />);
    });

    return (
      <div
          className="months-view"
      >
        <ViewHeader
            key="ViewHeader - Month"
            headerData={currentDate}
            cbNext={this.next}
            cbPrevious={this.prev}
            cbTitleAction={this.props.nextView}
            compStyle={{...this.getStyle('viewHeader')}}
        />
        <div
            className="months"
            onClick={this.cellClick}
            style={{...this.getStyle('monthWrapper')}}
        >
          {months}
        </div>
      </div>
    );
  }
}

MonthView.propTypes = propTypes;
export default Radium(MonthView);
export let undecorated = MonthView;
