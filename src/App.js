import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p className="App-intro">
          В этом компоненте в календаре выбирается дата и по ней отображается
      список периодов. Периоды это недельные промежутки с понедельника по
      воскресенье, входящие в годовой отрезок времени, начинающийся с
      выбранного числа.</p>
      </div>
    );
  }
}

export default App;
