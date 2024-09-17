// ClientTestimonials.jsx

import React, { useEffect, useState } from 'react';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import OwlCarousel from 'react-owl-carousel';

import '../../assets/css/bootstrap.min.css';
import '../../assets/css/owl.carousel.min.css';
import '../../assets/css/owl.theme.default.min.css';
import '../../assets/css/jquery.fancybox.min.css';

import quoteImg from '../../assets/img/quote.png'; 

import axios from 'axios';
import Http from '../Http';

const Testimonials = () => {
  const options = {
    items: 2,
    loop: true,
    margin: 30,
    nav: true,
    autoplay: true,
    autoplayTimeout: 5000, // Adjusted time between slides
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 2
      }
    }
  };

  const [header, setHeader] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const response = await axios.get(`${Http}/testimonials-header`);
        setHeader(response.data);
      } catch (error) {
        setError('Error fetching testimonials header');
        console.error('Error fetching testimonials header:', error);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${Http}/testimonials`);
        setTestimonials(response.data);
      } catch (error) {
        setError('Error fetching testimonials');
        console.error('Error fetching testimonials:', error);
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchHeader(), fetchTestimonials()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="gap no-top">
      <div className="container">
        {header.length > 0 ? (
          header.map((head) => (
            <div key={head._id} className="heading">
              <span>{head.subTitle}</span>
              <h2>{head.title}</h2>
            </div>
          ))
        ) : (
          <p>No testimonials header available.</p>
        )}

        <OwlCarousel className="clients-slider owl-carousel owl-theme" {...options}>
          {testimonials.length > 0 ? (
            testimonials.map((testimonial) => (
              <div className="col-lg-12 item" key={testimonial._id}>
                <div className="clients">
                  <p>{testimonial.message}</p>
                  <div className="d-flex align-items-center mt-4">
                    <div>
                      <i><img alt="quote" src={quoteImg} /></i>
                    </div>
                    <div>
                      <h6>{testimonial.clientName}</h6>
                      <span>{testimonial.clientDesignation}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No testimonials available.</p>
          )}
        </OwlCarousel>
      </div>
    </section>
  );
};

export default Testimonials;
