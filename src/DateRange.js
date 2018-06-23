import React from 'react';

  const request_string = 'http://worldclockapi.com/api/json/utc/now';
  // const request_string = 'https://yandex.com/time/sync.json?geo=213';

export default class DateRange extends React.Component {
	constructor(props) {
    super(props);
		let xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", request_string , false );
		xmlHttp.send(null);
    // does state really must be here? In onChange it still get's new values.
		this.state = {
      // date: props.date,  // It,s possible to assign state values from props,
      // but does it really necessary?
    date: new Date(),
    periods: [],
		updateTime: new Date(JSON.parse(xmlHttp.responseText).currentDateTime)
		}

    this.renderView = this.renderView.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
	}
	
onChange() {
  const value = this.myInput.value;
  const items = this.createItems(value);
  this.setState({periods: items});

// 	let xmlHttp = new XMLHttpRequest();
// 	xmlHttp.open( "GET", request_string, false );
// 	xmlHttp.send(null);
// 
// 	if (this.state.date !== value) {
// 			this.setState({date:value})
// 	}
// 	
// 	this.setState({
// 		updateTime: new Date(JSON.parse(xmlHttp.responseText).currentFileTime)
// 	})
	
	// this.props.onChange(this.state) // wtf?
}

	render() {
		return React.createElement(this.renderView);
	}
	
// event listeners for input
onFocus() {
      this.myInput.style.backgroundColor = '#900';
}

onBlur() {
      this.myInput.style.backgroundColor = '#fff'
}
// not sure lifecicle is reuired any more.
// 	componentDidMount() {
// 		this.myInput.onFocus = function() {
//     }
// 		this.myInput.onBlur = function() {
//     }
// 	}
	

	renderItems(items) {
		return <div>{items.map((value,index)=><div key={index}>{value}</div>)}</div>
	}

moveToMonday(value) {
const date = new Date(value);
let day = date.getDay();
			switch(day) {
        case 1:
          return date; 
//           let end = new Date(date.setHours(168));
//           periods[i] = `${date.toLocaleDateString()} - ` +
//           `${end.toLocaleDateString()}`

        case 0:
          return  new Date(date.setHours(-144));
//           periods[i] = `${start.toLocaleDateString()} - ` +
//           `${date.toLocaleDateString()}`

        default:
          return new Date(date.setHours(-24 * (day - 1)));
//           end = new Date(date.setHours(168 - (24 * day)));
//           periods[i] = `${start.toLocaleDateString()} - ` +
//           `${end.toLocaleDateString()}`
      }
}

	createItems(value) {
    const  monday = this.moveToMonday(value);
    const period = this.createPeriod(monday);
    const aw = 604800000;
    const start = period.start.getTime();
    const end = period.end.getTime();
		let dates = [];
		let periods = [];

		for (let i = start; i < end; i += aw) {
		dates.push(i);
    }

		for(let i=0; i < dates.length; i++) {
			const date = new Date(dates[i]);
      periods.push(`${date.toLocaleDateString()} - ` +
      `${new Date(date.setHours(144)).toLocaleDateString()}`
      );
// 			else if (date.getDay() === 2) periods[i] = `${date.setHours(-24).toLocaleDateString()} - {date.setHours(144).toLocaleDateString()}`
// 			else if (date.getDay() === 3) periods[i] = `${date.setHours(-48).toLocaleDateString()} - {date.setHours(120).toLocaleDateString()}`
// 			else if (date.getDay() === 4) periods[i] = `${date.setHours(-48).toLocaleDateString()} - {date.setHours(120).toLocaleDateString()}`
// 			else if (date.getDay() === 5) periods[i] = `${date.setHours(-72).toLocaleDateString()} - {date.setHours(96).toLocaleDateString()}`
// 			else if (date.getDay() === 6) periods[i] = `${date.setHours(-96).toLocaleDateString()} - {date.setHours(72).toLocaleDateString()}`
// 			else if (date.getDay() === 0) periods[i] = `${date.setHours(-120).toLocaleDateString()} - {date.setHours(48).toLocaleDateString()}`
			
// 			var n = periods.length, a = periods.length, b = false;
// 			do { b = false;
// 				a /= 1.3;
// 				if (a === 9 || a === 10) a = 11;
// 				if (a < 1) a = 1;
// 				for (let i = 0; i < n-a; ++i)
// 				{ if (periods[ i ] > periods[i+a])
// 					{ b = true;
// 					   var t = periods[i+a]; periods[i+a] = periods[ i ]; periods[ i ] = t;
// 					}
// 				}
// 			} while (a > 1 || b);
		}
		return periods;
	}

	createPeriod(date) {
		let newDate = new Date(date);
		newDate.setFullYear(newDate.getFullYear() + 1);
		return {
			start: new Date(date),
			end: newDate
		}
	}
	// onChange={function(event){this.onChange(event.target.value)}}>
	renderView() {
		return (
      <div>
			<div>
      <input type="date" ref={(el) =>{ this.myInput = el}} 
      onFocus = {this.onFocus}
      onBlur = {this.onBlur}
      onChange = {this.onChange}>
      </input>
      </div> 
			<div>
      {`Последнее изменение: ${this.state.updateTime.getDate()}.` +
        `${this.state.updateTime.getMonth() < 9 ?
            `0${this.state.updateTime.getMonth() + 1}` :
            `${this.state.updateTime.getMonth() + 1}`
          }`
        }
      </div>
			<div>{this.renderItems(this.state.periods)}</div>
		</div>
    );
	}
	
}
