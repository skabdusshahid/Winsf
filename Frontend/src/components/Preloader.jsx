import React from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import '../../assets/css/jquery.fancybox.min.css';
import '../../assets/css/bootstrap.min.css'
import '../../assets/css/style.css'


// Preloader Component
const Preloader = () => (
  <div className="preloader">
    <div className="loading-text">
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </div>
  </div>
);

export default Preloader;
