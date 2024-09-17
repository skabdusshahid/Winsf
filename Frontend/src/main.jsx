import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AppWrapper from './App'; // Import AppWrapper which includes AuthProvider

ReactDOM.render(
  <Router>
    <AppWrapper /> {/* Ensure AppWrapper is inside Router */}
  </Router>,
  document.getElementById('root')
);
