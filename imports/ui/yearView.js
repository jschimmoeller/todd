import React from 'react';
import S2SBaseComponent from './s2s-base-class';
import moment from 'moment';
import 'moment-range';
import Cell from './cell';
import ViewHeader from './viewHeader';


const propTypes = {
  changeView: React.PropTypes.func, // TODO standardized
  compStyle: React.PropTypes.object,
  date: React.PropTypes.object, // TODO better name
  maxDate: React.PropTypes.any, // TODO type number
  minDate: React.PropTypes.any // TODO type number
};

class YearView extends S2SBaseComponent {
  constructor(props){
      super(props);
      this.displayName = 'YearView';

      this.state = { years: [] };
      this.cellClick = this.cellClick.bind(this);
      this.checkIfYearDisabled = this.checkIfYearDisabled.bind(this);
      this.getYears = this.getYears.bind(this);
      this.next = this.next.bind(this);
      this.prev = this.prev.bind(this);
      this.rangeCheck = this.rangeCheck.bind(this);
  }

  componentWillMount() {
    this.getYears();
  }

  componentWillReceiveProps() {
    this.getYears();
  }

  getDefaultStyle(styleName) {
    const styles = {
      yearWrapper : {
        display: 'flex',
        flex: '1',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
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
      year : {
        flex: '1 1 30%'
      }
    };
    return (styles[styleName]);
  }

  cellClick (e) {
    const year = parseInt(e.target.innerHTML, 10);
    const date = this.props.date.clone().year(year);
    if (this.checkIfYearDisabled(date)) return;
    this.props.prevView(date);
  }

  checkIfYearDisabled (year) {
    return year.clone().endOf('year').isBefore(this.props.minDate, 'day') ||
      year.clone().startOf('year').isAfter(this.props.maxDate, 'day');
  }

  getYears() {
    let now = this.props.date;
    let start = now.clone().subtract(5, 'year');
    let end = now.clone().add(6, 'year');
    let currYear = now.year();
    let items = [];
    let inRange = this.rangeCheck(currYear);

    const { years } = this.state;

    if (years.length > 0 && inRange) {
      return years;
    }

    moment()
      .range(start, end)
      .by('years', year => {
        items.push({
          label: year.format('YYYY'),
          disabled: this.checkIfYearDisabled(year),
          curr: currYear === year.year()
        });
      });

    this.setState({ years: items });

    return items;
  }

  next () {
    let nextDate = this.props.date.clone().add(10, 'years');
    if (this.props.maxDate && nextDate.isAfter(this.props.maxDate, 'day')) {
      nextDate = this.props.maxDate;
    }
    this.props.setDate(nextDate);
  }

  prev (){
    let prevDate = this.props.date.clone().subtract(10, 'years');
    if (this.props.minDate && prevDate.isBefore(this.props.minDate, 'day')) {
      prevDate = this.props.minDate;
    }
    this.props.setDate(prevDate);
  }

  rangeCheck(currYear) {
    const { years } = this.state;
    if (years.length == 0) {
      return false;
    }
    return years[0].label <= currYear && years[years.length-1].label >= currYear;
  }

  render() {
    const years = this.state.years;
    //const currYear = this.props.date.year();

    let yearsCells = years.map((item, i) => {
      return (
        <Cell
            dateVal={item.label}
            key={i}
            compStyle={{ cellWrapper : {...this.getStyle('year')}}}
        />
      );
    });
    const currentDate = [years[0].label, years[years.length-1].label].join('-');
    return (
      <div className="years-view">
        <ViewHeader
            compStyle={{...this.getStyle('viewHeader')}}
            headerData={currentDate}
            cbNext={this.next}
            cbPrevious={this.prev}
        />
        <div
            className="years"
            onClick={this.cellClick}
            style={{...this.getStyle('yearWrapper')}}
        >
          {yearsCells}
        </div>
      </div>
    );
  }
}

YearView.propTypes = propTypes;

export default YearView;
