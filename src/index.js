import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import DateRange from './DateRange';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<DateRange />, document.getElementById('date_range'));
registerServiceWorker();
