import React, { Component } from 'react';
import Message from './components/Message'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Message from the backend</h1>
          <Message msg={this.state.message} />
        </header>
      </div>
    );
  }

  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then((data) => {
        this.setState({ message: data[0].name })
      })
      .catch(console.log)
  }
}

export default App;
