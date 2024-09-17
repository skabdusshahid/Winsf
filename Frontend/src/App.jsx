// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Login';
// import AdminPanel from './components/AdminPanel';

// import Header from './components/Header';
// import Footer from './components/Footer';
// import Home from './Page/Home';

// const App = () => (
//   <Router>
//     <main>
//       <Routes>

//       <Route path="/" element={<Home />} />


//         <Route path="/login" element={<Login />} />
//         <Route path="/admin" element={<AdminPanel />} />  
//       </Routes>
//     </main>
//   </Router>
// );

// export default App;


import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import Home from './Page/Home';
import Admin from './AdminPanel/Admin';

// import '../assets/css/owl.carousel.min.css';
// import '../assets/css/owl.theme.default.min.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/css/jquery.fancybox.min.css';
import '../assets/css/bootstrap.min.css'
import '../assets/css/style.css'

import './App.css'



const App = () => {
  const { isAuthenticated } = React.useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />


      <Route path="/login" element={isAuthenticated ? <Navigate to="/admin" /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/admin" /> : <Register />} />
      <Route path="/admin" element={isAuthenticated ? <AdminPanel /> : <Navigate to="/login" />} />
    </Routes>
  );
};

// Wrap App component with AuthProvider
const AppWrapper = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWrapper;
