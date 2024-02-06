import React, { Component } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
