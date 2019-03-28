import React, { Component } from 'react';
import './App.css';
import RepoCards from './components/repocards/repocards';

class App extends Component {
  render() {
    return (
      <div className="App">
          <RepoCards/>
      </div>
    );
  }
}

export default App;
