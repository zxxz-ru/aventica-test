import React from 'react';

  const request_string = 'http://worldclockapi.com/api/json/utc/now';
  // const request_string = 'https://yandex.com/time/sync.json?geo=213';
export default class DateRange extends React.Component {
	constructor(props) {
    super(props);
		let xmlHttp = new XMLHttpRequest();
		xmlHttp.open( "GET", request_string , false );
		xmlHttp.send(null);
console.log(JSON.parse(xmlHttp.responseText));
		this.state = {
//			date: props.date, 
    date: new Date(),
		updateTime: new Date(JSON.parse(xmlHttp.responseText).currentFileTime)
		}
    this.renderView = this.renderView.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
	}
	
onChange(value) {
	let xmlHttp = new XMLHttpRequest();
	xmlHttp.open( "GET", request_string, false );
	xmlHttp.send(null);

	if (this.state.date !== value) {
			this.setState({date:value})
	}
	
	this.setState({
		updateTime: new Date(JSON.parse(xmlHttp.responseText).currentFileTime)
	})
	
	// this.props.onChange(this.state) // wtf?
}

	render() {
		return React.createElement(this.renderView, {
			period: this.createPeriod(this.state.date),
			updateTime: this.state.updateTime,
			onChange: this.onChange.bind(this)
		})
	}
	
onFocus() {
      this.myInput.style.backgroundColor = '#900';
}

onBlur() {
      this.myInput.style.backgroundColor = '#fff'
}
// 	componentDidMount() {
// 		this.myInput.onFocus = function() {
//     }
// 		this.myInput.onBlur = function() {
//     }
// 	}
	
	renderItems(items) {
		return <div>{items.map((value,index)=><div key={index}>{value}</div>)}</div>
	}
	
	createItems(period) {
		let dates = [];
		let periods = [];
		for (let i = +period.start; i < +period.end; i+= 3600000 * 168)
		dates.push(i)
		for(let i=0;i<dates.length;i++) {
			let date = new Date(dates[i]);
			if (date.getDay() === 1) period = `${date.toLocaleDateString()} - {date.setHours(168).toLocaleDateString()}`
			else if (date.getDay() === 2) period[i] = `${date.setHours(-24).toLocaleDateString()} - {date.setHours(144).toLocaleDateString()}`
			else if (date.getDay() === 3) period[i] = `${date.setHours(-48).toLocaleDateString()} - {date.setHours(120).toLocaleDateString()}`
			else if (date.getDay() === 4) period[i] = `${date.setHours(-48).toLocaleDateString()} - {date.setHours(120).toLocaleDateString()}`
			else if (date.getDay() === 5) period[i] = `${date.setHours(-72).toLocaleDateString()} - {date.setHours(96).toLocaleDateString()}`
			else if (date.getDay() === 6) period[i] = `${date.setHours(-96).toLocaleDateString()} - {date.setHours(72).toLocaleDateString()}`
			else if (date.getDay() === 0) period[i] = `${date.setHours(-120).toLocaleDateString()} - {date.setHours(48).toLocaleDateString()}`
			
			var n = periods.length, a = periods.length, b = false;
			do { b = false;
				a /= 1.3;
				if (a === 9 || a === 10) a = 11;
				if (a < 1) a = 1;
				for (let i = 0; i < n-a; ++i)
				{ if (periods[ i ] > periods[i+a])
					{ b = true;
					   var t = periods[i+a]; periods[i+a] = periods[ i ]; periods[ i ] = t;
					}
				}
			} while (a > 1 || b);
		}
		return periods;
	}

	createPeriod(date) {
		let newDate = date;
		newDate.setFullYear(newDate.getFullYear() + 1);
		return {
			start: date,
			end: newDate
		}
	}
	
	renderView() {
		return (
      <div>
			<div>
      <input type="date" ref={(el) =>{ this.myInput = el}} 
      onFocus = {this.onFocus}
      onBlur = {this.onBlur}
      onChange={function(event){this.onChange(event.target.value)}}></input>
      </div> 
			<div>
      {`Последнее изменение: ${this.state.updateTime.getDate() + '.' + 
          this.state.updateTime.getMonth() > 9 ? '0'+this.state.updateTime.getMonth() :
          this.state.updateTime.getMonth()}`}
      </div>
			<div>
				{
			// 	this.renderItems(this.createItems(props.period))
				
			}
			</div>
		</div>
    );
	}
	
}
