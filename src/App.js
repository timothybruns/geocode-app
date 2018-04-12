import React, { Component } from 'react';
import './App.css';
import AddressForm from './components/AddressForm';

class App extends Component {
  render() {
    return (
      <div className="App">
       <h1>Jump in!</h1>
       <h4>Where are we headed?</h4>
       <AddressForm />
      </div>
    );
  }
}

export default App;
