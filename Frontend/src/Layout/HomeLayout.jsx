import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import "bootstrap/dist/css/bootstrap.min.css";
import '../../assets/css/jquery.fancybox.min.css';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/style.css';
import Preloader from '../components/Preloader';

const HomeLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the time as needed

    // Clean up the timer
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-layout">
      {loading && <Preloader />} {/* Show preloader while loading */}
      
      <Header />
      <main className="main-content">
        {children} {/* Render any child components or content here */}
      </main>
      <Footer />
    </div>
  );
}

export default HomeLayout;
