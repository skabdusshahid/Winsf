import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Http from '../Http';
//import './Newsletter.css'; // Import your CSS file if you have one

const Newsletter = () => {
    const [newsletters, setNewsletters] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        const fetchNewsletters = async () => {
            try {
                const response = await axios.get(`${Http}/newsletter`);
                setNewsletters(response.data.data);
            } catch (error) {
                setErrorMessage('Error fetching newsletters: ' + error.response.data.message);
            }
        };

        fetchNewsletters();
    }, []);
    return (
        <section className="newsletter">
            <div className="container">


                {newsletters.map((newsletter) => (
                    <div className="row align-items-center" key={newsletter._id}>
                        <div className="col-lg-7">
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="paper-plane-w">
                                        <img alt="paper-plane" src="assets/img/paper-plane.png" />
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="newsletter-text">
                                        <h2>{newsletter.title}</h2>
                                        <h4>
                                              {newsletter.subTitle} <span>{newsletter.discountDesc}</span>
                                        </h4>
                                        <h6>{newsletter.desc}</h6>
                                        <a href="#" className="btn">{newsletter.ButtonText}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="customize-img">
                                <img alt="customize" src={newsletter.Img} />
                            </div>
                        </div>
                    </div>



                    // <div className="newsletter-card" key={newsletter._id}>
                    //   <h2 className="newsletter-title">{newsletter.title}</h2>
                    //   <p className="newsletter-subtitle">{newsletter.subTitle}</p>
                    //   <p className="newsletter-discount">{newsletter.discountDesc}</p>
                    //   <p className="newsletter-description">{newsletter.desc}</p>
                    //   {newsletter.Img && <img src={newsletter.Img} alt={newsletter.title} className="newsletter-img" />}
                    //   <div className="newsletter-buttons">
                    //     <button className="edit-btn" onClick={() => handleEditClick(newsletter)}>Edit</button>
                    //     <button className="delete-btn" onClick={() => handleDelete(newsletter._id)}>Delete</button>
                    //   </div>
                    // </div>
                ))}


                {/* <div className="row align-items-center">
                    <div className="col-lg-7">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="paper-plane-w">
                                    <img alt="paper-plane" src="assets/img/paper-plane.png" />
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="newsletter-text">
                                    <h2>Newsletter!</h2>
                                    <h4>
                                        Subscribe and get The Special Offer <span>40% Discount</span>
                                    </h4>
                                    <h6>Let your users know a little more about your product or service.</h6>
                                    <a href="#" className="btn">Subscribe Email</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="customize-img">
                            <img alt="customize" src="assets/img/customize-3.png" />
                        </div>
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default Newsletter;
