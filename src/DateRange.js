import React from 'react';

  const request_string = 'http://worldclockapi.com/api/json/utc/now';
  // const request_string = 'https://yandex.com/time/sync.json?geo=213';


export default class DateRange extends React.Component {
constructor(props) {
    super(props);
		this.state = {
    date: new Date(),
    periods: [],
    updateTime: new Date('1970-1-1'),
		}

    this.renderView = this.renderView.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
	}
	
getDate() {
  return new Promise((resolve, reject) => {
const xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = () => { 
if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
resolve(xmlhttp.responseText);
}
};
xmlhttp.onerror = () => reject(new Error());
xmlhttp.open( "GET", request_string , true );
xmlhttp.send(null);
});
}

componentDidMount() {
    this.getDate().then((res) => {
this.setState(
  {
		updateTime: new Date(JSON.parse(res).currentDateTime)
  }
);
    
    })
    .catch((e) => {
      this.setState({
        updateTime: new Date('1975-5-3')
      });
    });
}

onChange() {
  const value = this.myInput.value;
  const items = this.createItems(value);
  this.setState({periods: items});
}

	render() {
		return React.createElement(this.renderView);
	}
	
onFocus() {
      this.myInput.style.backgroundColor = '#900';
}

onBlur() {
      this.myInput.style.backgroundColor = '#fff'
}

	renderItems(items) {
		return <div>{items.map((value,index)=><div key={index}>{value}</div>)}</div>
	}

moveToMonday(value) {
const date = new Date(value);
let day = date.getDay();
			switch(day) {
        case 1:
          return date; 

        case 0:
          return  new Date(date.setHours(-144));

        default:
          return new Date(date.setHours(-24 * (day - 1)));
      }
}

	createItems(value) {
    const  monday = this.moveToMonday(value);
    const period = this.createPeriod(monday);
    const aw = 604800000;
    const start = period.start.getTime();
    const end = period.end.getTime();
    const options =
      {day: 'numeric', month: 'long', year: 'numeric'};
		let dates = [];
		let periods = [];

		for (let i = start; i < end; i += aw) {
		dates.push(i);
    }

		for(let i=0; i < dates.length; i++) {
			const date = new Date(dates[i]);
      periods.push(`${date.toLocaleDateString('ru-RU', options)} - ` +
      `${new Date(date.setHours(144)).toLocaleDateString('ru-RU', options)}`
      );
		}
		return periods;
	}

	createPeriod(date) {
		return {
      start: new Date(date),
			end: new Date(date.setFullYear(date.getFullYear() + 1))
		}
	}

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
