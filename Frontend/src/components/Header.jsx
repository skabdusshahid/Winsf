// import React, { useEffect, useState } from 'react';
// import './Header.css'; 
// import axios from 'axios';

// const Header = () => {
//   const [basicData, setBasicData] = useState([]);
//   const [error, setError] = useState(null);

//  useEffect(() => {
//     // Fetch basic data from the API
//     const fetchBasicData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/basic');
//         setBasicData(response.data);
//       } catch (err) {
//         setError('Error fetching basic data');
//         console.error(err);
//       }
//     };

//     fetchBasicData();
//   }, []);

//   basicData.map((basic)=>console.log("Basic -- ", basic.count_title1));

//   const getFileNameFromPath = (filePath) => {
//     // Normalize path separators (handle Windows and UNIX-like paths)
//     const normalizedPath = filePath.replace(/\\/g, '/');
//     return normalizedPath.split('/').pop();
// };


//   return (
//     <header id="stickyHeader">
//       <div className="container">

//         {basicData.map((basic,index)=>{
//           return  <div key={index} className="top-bar">
//           <div className="logo">
//             <a href="#">
//               <img alt="logo" src={`http://localhost:5000/uploads/${getFileNameFromPath(basic.logo)}`} />
//             </a>
//           </div>
//           <nav>
//             <ul>
//               <li><a href="#about">About</a></li>
//               <li><a href="#team">Team</a></li>
//               <li><a href="#services">Services</a></li>
//               <li><a href="#pricing">Pricing</a></li>
//               <li><a href="#faqs">FAQs</a></li>
//             </ul>
//           </nav>
//           <a href="tel:+12344502086">
//             <i>
//               <svg height="112" viewBox="0 0 24 24" width="112" xmlns="http://www.w3.org/2000/svg">
//                 <g clipRule="evenodd" fill="rgb(255, 255, 255)" fillRule="evenodd">
//                   <path d="m7 2.75c-.41421 0-.75.33579-.75.75v17c0 .4142.33579.75.75.75h10c.4142 0 .75-.3358.75-.75v-17c0-.41421-.3358-.75-.75-.75zm-2.25.75c0-1.24264 1.00736-2.25 2.25-2.25h10c1.2426 0 2.25 1.00736 2.25 2.25v17c0 1.2426-1.0074 2.25-2.25 2.25h-10c-1.24264 0-2.25-1.0074-2.25-2.25z"></path>
//                   <path d="m10.25 5c0-.41421.3358-.75.75-.75h2c.4142 0 .75.33579.75.75s-.3358.75-.75.75h-2c-.4142 0-.75-.33579-.75-.75z"></path>
//                   <path d="m9.25 19c0-.4142.33579-.75.75-.75h4c.4142 0 .75.3358.75.75s-.3358.75-.75.75h-4c-.41421 0-.75-.3358-.75-.75z"></path>
//                 </g>
//               </svg>
//             </i>
//             <b> +1234 450 2086</b>
//           </a>
//         </div>
//         })}

//       </div>
//     </header>
//   );
// }

// export default Header;


import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../assets/css/jquery.fancybox.min.css';
import '../../assets/css/bootstrap.min.css';
import '../../assets/css/style.css';

import axios from 'axios';
import Http from '../Http';


const Header = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Adjust the scroll position to your needs
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [basicData, setBasicData] = useState([]);
  const [error, setError] = useState(null);
  const [footers, setFooters] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchBasicData = async () => {
      try {
        const response = await axios.get(`${Http}/basic`);
        setBasicData(response.data);
      } catch (err) {
        setError('Error fetching basic data');
        console.error(err);
      }
    };

    fetchBasicData();
  }, []);
  

  useEffect(() => {
    const fetchFooters = async () => {
      try {
        const response = await axios.get(`${Http}/footer`);
        setFooters(response.data.data);
      } catch (error) {
        setErrorMessage('Error fetching footers: ' + error.response.data.message);
      }
    };

    fetchFooters();
  }, []);


  const PhoneNo=footers.map(footer=>footer.phoneNo)


  const getFileNameFromPath = (filePath) => {
    const normalizedPath = filePath.replace(/\\/g, '/');
    return normalizedPath.split('/').pop();
  };

  return (
    <header id="stickyHeader" className={sticky ? 'slideUp' : ''}>


      {basicData.map(basic => (

        <div key={basic._id} className="container">
          <div className="top-bar">
            <div className="logo">
              <a href="#">
                {basic.logo && <img src={`${Http}/uploads/${getFileNameFromPath(basic.logo)}`} alt="Logo" />}
              </a>
            </div>
            <nav>
              {Array.isArray(basic.navbar) && basic.navbar.length > 0 && (
                <ul>
                  {basic.navbar.map((item, index) => (
                    <li key={index}>
                      <a href={`#${item}`}>{item}</a>
                    </li>
                  ))}
                </ul>
              )}

            </nav>
            <a href="tel:+12344502086">
              <i>
                <svg height="112" viewBox="0 0 24 24" width="112" xmlns="http://www.w3.org/2000/svg">
                  <g clipRule="evenodd" fill="rgb(255,255,255)" fillRule="evenodd">
                    <path d="m7 2.75c-.41421 0-.75.33579-.75.75v17c0 .4142.33579.75.75.75h10c.4142 0 .75-.3358.75-.75v-17c0-.41421-.3358-.75-.75-.75zm-2.25.75c0-1.24264 1.00736-2.25 2.25-2.25h10c1.2426 0 2.25 1.00736 2.25 2.25v17c0 1.2426-1.0074 2.25-2.25 2.25h-10c-1.24264 0-2.25-1.0074-2.25-2.25z"></path>
                    <path d="m10.25 5c0-.41421.3358-.75.75-.75h2c.4142 0 .75.33579.75.75s-.3358.75-.75.75h-2c-.4142 0-.75-.33579-.75-.75z"></path>
                    <path d="m9.25 19c0-.4142.33579-.75.75-.75h4c.4142 0 .75.3358.75.75s-.3358.75-.75.75h-4c-.41421 0-.75-.3358-.75-.75z"></path>
                  </g>
                </svg>
              </i>
              <b>{PhoneNo}</b>
            </a>
          </div>
        </div>

      ))}


    </header>
  );
};

export default Header;
