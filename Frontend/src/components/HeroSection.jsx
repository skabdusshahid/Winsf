// import React, { useState } from 'react';
// import './HeroSection.css';
// import "bootstrap/dist/css/bootstrap.min.css";

// const HeroSection = () => {
//   // Define state for form data
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phoneNumber: '',
//     method: 'Virtual'
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/request-quote', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       });
//       if (response.ok) {
//         alert('Quote request submitted successfully');
//         setFormData({
//           name: '',
//           email: '',
//           phoneNumber: '',
//           method: 'Virtual'
//         });
//       } else {
//         alert('Failed to submit quote request');
//       }
//     } catch (error) {
//       console.error('Error submitting quote request:', error);
//       alert('Error submitting quote request');
//     }
//   };

//   return (
//     <section className="hero-section" style={{ backgroundImage: 'url(assets/img/line-img.png)' }}>
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-6">
//             <div className="hero-text">
//               <h2>Great Ways to Show Your <span>Best Services</span></h2>
//               <div className="d-flex listing">
//                 <p>Enim ad minim veniam, quis nostrud exercitat ullrem ipsum dolor sit amet, consece adipising elit, o eiusmod tempor incididunt.</p>
//               </div>
//               <div className="video">
//                 <a data-fancybox="" href="https://www.youtube.com/watch?v=1La4QzGeaaQ">
//                   <i>
//                     <svg width="15" height="22" viewBox="0 0 11 17" xmlns="http://www.w3.org/2000/svg">
//                       <path d="M11 8.5L0.5 0.272758L0.5 16.7272L11 8.5Z" fill="#000"/>
//                     </svg>
//                   </i>
//                   watch video
//                 </a>
//               </div>
//               <img src="assets/img/girl.webp" alt="girl" className="heroimg"/>
//             </div>
//             <div className="review">
//               <img alt="img" src="assets/img/google.png"/>
//               <h6>4.9 <span>out of 5</span></h6>
//               <ul className="star">
//                 {[...Array(5)].map((_, index) => (
//                   <li key={index}><i className="fa-solid fa-star"></i></li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//           <div className="col-lg-6">
//             <form role="form" className="get-a-quote" id="contact-form" onSubmit={handleSubmit}>
//               <div>
//                 <h3 style={{ color: "black" }}>Request a Quote</h3>
//                 <h6 style={{ color: "black" }}>Marketing Business campaign</h6>
//               </div>
//               <div className="group-img">
//                 <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M15.364 11.636C14.3837 10.6558 13.217 9.93013 11.9439 9.49085C13.3074 8.55179 14.2031 6.9802 14.2031 5.20312C14.2031 2.33413 11.869 0 9 0C6.131 0 3.79688 2.33413 3.79688 5.20312C3.79688 6.9802 4.69262 8.55179 6.05609 9.49085C4.78308 9.93013 3.61631 10.6558 2.63605 11.636C0.936176 13.3359 0 15.596 0 18H1.40625C1.40625 13.8128 4.81279 10.4062 9 10.4062C13.1872 10.4062 16.5938 13.8128 16.5938 18H18C18 15.596 17.0638 13.3359 15.364 11.636ZM9 9C6.90641 9 5.20312 7.29675 5.20312 5.20312C5.20312 3.1095 6.90641 1.40625 9 1.40625C11.0936 1.40625 12.7969 3.1095 12.7969 5.20312C12.7969 7.29675 11.0936 9 9 9Z" fill="#555555"></path>
//                 </svg>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   placeholder="Complete Name"
//                   required
//                 />
//               </div>
//               <div className="group-img">
//                 <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M15.8649 18H6.13513C2.58377 18 0.540527 15.9568 0.540527 12.4054V5.5946C0.540527 2.04324 2.58377 0 6.13513 0H15.8649C19.4162 0 21.4595 2.04324 21.4595 5.5946V12.4054C21.4595 15.9568 19.4162 18 15.8649 18ZM6.13513 1.45946C3.35242 1.45946 1.99999 2.81189 1.99999 5.5946V12.4054C1.99999 15.1881 3.35242 16.5406 6.13513 16.5406H15.8649C18.6476 16.5406 20 15.1881 20 12.4054V5.5946C20 2.81189 18.6476 1.45946 15.8649 1.45946H6.13513Z" fill="#444444"></path>
//                   <path d="M10.9988 9.8465C10.1815 9.8465 9.35452 9.59352 8.72208 9.07785L5.67668 6.64539C5.36532 6.39241 5.30696 5.93511 5.55992 5.62376C5.8129 5.31241 6.2702 5.25403 6.58155 5.50701L9.62695 7.93947C10.3664 8.53298 11.6215 8.53298 12.361 7.93947L15.4064 5.50701C15.7178 5.25403 16.1848 5.30268 16.428 5.62376C16.681 5.93511 16.6324 6.40214 16.3113 6.64539L13.2659 9.07785C12.6432 9.59352 11.8161 9.8465 10.9988 9.8465Z" fill="#444444"></path>
//                 </svg>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Email Address"
//                   required
//                 />
//               </div>
//               <div className="group-img">
//                 <svg fill="none" height="112" viewBox="0 0 24 24" width="112" xmlns="http://www.w3.org/2000/svg">
//                   <g clipRule="evenodd" fill="rgb(0,0,0)" fillRule="evenodd">
//                     <path d="m7 2.75c-.41421 0-.75.33579-.75.75v17c0 .4142.33579.75.75.75h10c.4142 0 .75-.3358.75-.75v-17c0-.41421-.3358-.75-.75-.75zm-2.25.75c0-1.24264 1.00736-2.25 2.25-2.25h10c1.2426 0 2.25 1.00736 2.25 2.25v17c0 1.2426-1.0074 2.25-2.25 2.25h-10c-1.24264 0-2.25-1.0074-2.25-2.25z"></path>
//                     <path d="m10.25 5c0-.41421.3358-.75.75-.75h2c.4142 0 .75.33579.75.75s-.3358.75-.75.75h-2c-.4142 0-.75-.33579-.75-.75z"></path>
//                     <path d="m9.25 19c0-.4142.33579-.75.75-.75h4c.4142 0 .75.3358.75.75s-.3358.75-.75.75h-4c-.41421 0-.75-.3358-.75-.75z"></path>
//                   </g>
//                 </svg>
//                 <input
//                   type="number"
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                   placeholder="Phone No"
//                   required
//                 />
//               </div>
//               <p>Preferred Consult Method: </p>
//               <div className="d-flex align-items-center">
//                 <div className="radio-button">
//                   <input
//                     type="radio"
//                     id="Virtual"
//                     name="method"
//                     value="Virtual"
//                     checked={formData.method === 'Virtual'}
//                     onChange={handleChange}
//                   />
//                   <label htmlFor="Virtual" style={{ color: "black" }}>Virtual</label>
//                 </div>
//                 <div className="radio-button">
//                   <input
//                     type="radio"
//                     id="In-Office"
//                     name="method"
//                     value="In-Office"
//                     checked={formData.method === 'In-Office'}
//                     onChange={handleChange}
//                   />
//                   <label htmlFor="In-Office" style={{ color: "black" }}>In-Office</label>
//                 </div>
//               </div>
//               <button type="submit" className="btn button">Start Free Trial</button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default HeroSection;


import React from 'react';
//import { Fancybox } from "@fancybox/react"; // Ensure you have fancybox for video functionality
//import "bootstrap/dist/css/bootstrap.min.css";
import '../../assets/css/jquery.fancybox.min.css';
import '../../assets/css/bootstrap.min.css'
import '../../assets/css/style.css'

const HeroSection = () => {
  return (
    <section className="hero-section" style={{ backgroundImage: 'url(assets/img/line-img.png)' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="hero-text">
              <h2>Great Ways to Show Your <span>Best Services</span></h2>
              <div className="d-flex listing">
                <p>Enim ad minim veniam, quis nostrud exercitat ullrem ipsum dolor sit amet, consece adipising elit, o eiusmod tempor incididunt.</p>
              </div>

              <div className="video">
                <a data-fancybox="" href="https://www.youtube.com/watch?v=1La4QzGeaaQ">
                  <i>
                    <svg width="15" height="22" viewBox="0 0 11 17" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 8.5L0.5 0.272758L0.5 16.7272L11 8.5Z" fill="#000"/>
                    </svg>
                  </i>
                  watch video
                </a>
              </div>
              <img src="assets/img/girl.webp" alt="girl" className="heroimg" />
            </div>
            <div className="review">
              <img alt="img" src="assets/img/google.png" />
              <h6>4.9 <span>out of 5</span></h6>
              <ul className="star">
                <li><i className="fa-solid fa-star"></i></li>
                <li><i className="fa-solid fa-star"></i></li>
                <li><i className="fa-solid fa-star"></i></li>
                <li><i className="fa-solid fa-star"></i></li>
                <li><i className="fa-solid fa-star"></i></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-5">
            <form role="form" className="get-a-quote" id="contact-form" method="post">
              <div>
                <h3>Request a Quote</h3>
                <h6>Marketing Business campaign</h6>
              </div>
              <div className="group-img">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.364 11.636C14.3837 10.6558 13.217 9.93013 11.9439 9.49085C13.3074 8.55179 14.2031 6.9802 14.2031 5.20312C14.2031 2.33413 11.869 0 9 0C6.131 0 3.79688 2.33413 3.79688 5.20312C3.79688 6.9802 4.69262 8.55179 6.05609 9.49085C4.78308 9.93013 3.61631 10.6558 2.63605 11.636C0.936176 13.3359 0 15.596 0 18H1.40625C1.40625 13.8128 4.81279 10.4062 9 10.4062C13.1872 10.4062 16.5938 13.8128 16.5938 18H18C18 15.596 17.0638 13.3359 15.364 11.636ZM9 9C6.90641 9 5.20312 7.29675 5.20312 5.20312C5.20312 3.1095 6.90641 1.40625 9 1.40625C11.0936 1.40625 12.7969 3.1095 12.7969 5.20312C12.7969 7.29675 11.0936 9 9 9Z" fill="#555555" />
                </svg>
                <input type="text" name="Complete Name" placeholder="Complete Name" required />
              </div>
              <div className="group-img">
                <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.8649 18H6.13513C2.58377 18 0.540527 15.9568 0.540527 12.4054V5.5946C0.540527 2.04324 2.58377 0 6.13513 0H15.8649C19.4162 0 21.4595 2.04324 21.4595 5.5946V12.4054C21.4595 15.9568 19.4162 18 15.8649 18ZM6.13513 1.45946C3.35242 1.45946 1.99999 2.81189 1.99999 5.5946V12.4054C1.99999 15.1881 3.35242 16.5406 6.13513 16.5406H15.8649C18.6476 16.5406 20 15.1881 20 12.4054V5.5946C20 2.81189 18.6476 1.45946 15.8649 1.45946H6.13513Z" fill="#444444" />
                  <path d="M10.9988 9.8465C10.1815 9.8465 9.35452 9.59352 8.72208 9.07785L5.67668 6.64539C5.36532 6.39241 5.30696 5.93511 5.55992 5.62376C5.8129 5.31241 6.2702 5.25403 6.58155 5.50701L9.62695 7.93947C10.3664 8.53298 11.6215 8.53298 12.361 7.93947L15.4064 5.50701C15.7178 5.25403 16.1848 5.30268 16.428 5.62376C16.681 5.93511 16.6324 6.40214 16.3113 6.64539L13.2659 9.07785C12.6432 9.59352 11.8161 9.8465 10.9988 9.8465Z" fill="#444444" />
                </svg>
                <input type="email" name="Email Address" placeholder="Email Address" required />
              </div>
              <div className="group-img">
                <svg fill="none" height="112" viewBox="0 0 24 24" width="112" xmlns="http://www.w3.org/2000/svg">
                  <g clipRule="evenodd" fill="rgb(0,0,0)" fillRule="evenodd">
                    <path d="m7 2.75c-.41421 0-.75.33579-.75.75v17c0 .4142.33579.75.75.75h10c.4142 0 .75-.3358.75-.75v-17c0-.41421-.3358-.75-.75-.75zm-2.25.75c0-1.24264 1.00736-2.25 2.25-2.25h10c1.2426 0 2.25 1.00736 2.25 2.25v17c0 1.2426-1.0074 2.25-2.25 2.25h-10c-1.24264 0-2.25-1.0074-2.25-2.25z"></path>
                    <path d="m10.25 5c0-.41421.3358-.75.75-.75h2c.4142 0 .75.33579.75.75s-.3358.75-.75.75h-2c-.4142 0-.75-.33579-.75-.75z"></path>
                    <path d="m9.25 19c0-.4142.33579-.75.75-.75h4c.4142 0 .75.3358.75.75s-.3358.75-.75.75h-4c-.41421 0-.75-.3358-.75-.75z"></path>
                  </g>
                </svg>
                <input type="number" name="Phone No" placeholder="Phone No" required />
              </div>
              <p>Preferred Consult Method: </p>
              <div className="d-flex align-items-center">
                <div className="radio-button">
                  <input type="radio" id="Virtual" name="fav_language" value="Virtual" />
                  <label htmlFor="Virtual">Virtual</label>
                </div>
                <div className="radio-button">
                  <input type="radio" id="In-Office" name="fav_language" value="In-Office" />
                  <label htmlFor="In-Office">In-Office</label>
                </div>
              </div>
              <button type="submit" className="btn batton">Start Free Trial</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
