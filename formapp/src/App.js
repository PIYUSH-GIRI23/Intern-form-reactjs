import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Form} from 'react-router-dom';
import Navbar from './components/Navbar';
import Formdata from './components/Formdata';
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar />
          <Formdata />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
