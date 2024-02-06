import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Form} from 'react-router-dom';
import Navbar from './components/Navbar';
import Formdata from './components/Formdata';
import Admin from './components/Admin';
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Navbar />} />
            <Route path="/Admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
