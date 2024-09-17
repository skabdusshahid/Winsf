import React, { useState } from 'react';
import './Faq.css'; // Make sure to create this CSS file for styling
import { useEffect } from 'react';
import axios from 'axios';
import Http from '../Http';


const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);


  const [faqs, setFaqs] = useState([]);
  const [faqHeaders, setFaqHeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch FAQ and FAQ Header data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch FAQs
        const faqsResponse = await axios.get(`${Http}/faqs`);
        setFaqs(faqsResponse.data);

        // Fetch FAQ Headers
        const headersResponse = await axios.get(`${Http}/faq-headers`);
        setFaqHeaders(headersResponse.data);

        setLoading(false);
      } catch (error) {
        setError('Error fetching data. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="Faq's" className="gap">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">

            {faqHeaders.length === 0 ? (
              <p>No FAQ Headers available</p>
            ) : (
              <ul className="faq-headers-list">
                {faqHeaders.map((header, index) => (
                  <div key={index} className="heading">
                    <span>{header.FaqSubTitle}</span>
                    <h2>{header.FaqTitle}</h2>
                  </div>
                ))}
              </ul>
            )}


            {faqs.map((faq, index) => (
              <div key={faq._id} className="accordion">
                <div className={`accordion-item ${activeIndex === index ? 'active' : ''}`}>
                  <a className="heading" onClick={() => toggleAccordion(index)}>
                    <div className="icon"></div>
                    <div className="title">{faq.question}</div>
                  </a>
                  <div className="content" style={{ display: activeIndex === index ? 'block' : 'none' }}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}




            {/* <div className={`accordion-item ${activeIndex === 1 ? 'active' : ''}`}>
                <a className="heading" onClick={() => toggleAccordion(1)}>
                  <div className="icon"></div>
                  <div className="title">I need a business consulting service?</div>
                </a>
                <div className="content" style={{ display: activeIndex === 1 ? 'block' : 'none' }}>
                  <p>Enim ad minim veniam, quis nostrud exercitat ullrem ipsum dolor sit amet, consece adipising elit, o eiusmod tempor incididunt ut labore bit of how ther chancer flat bogeo viele marioa.</p>
                </div>
              </div>

              <div className={`accordion-item ${activeIndex === 2 ? 'active' : ''}`}>
                <a className="heading" onClick={() => toggleAccordion(2)}>
                  <div className="icon"></div>
                  <div className="title">Donate or fundraise</div>
                </a>
                <div className="content" style={{ display: activeIndex === 2 ? 'block' : 'none' }}>
                  <p>Enim ad minim veniam, quis nostrud exercitat ullrem ipsum dolor sit amet, consece adipising elit, o eiusmod tempor incididunt ut labore bit of how ther chancer flat bogeo viele marioa.</p>
                </div>
              </div>

              <div className={`accordion-item ${activeIndex === 3 ? 'active' : ''}`}>
                <a className="heading" onClick={() => toggleAccordion(3)}>
                  <div className="icon"></div>
                  <div className="title">How do you price your services?</div>
                </a>
                <div className="content" style={{ display: activeIndex === 3 ? 'block' : 'none' }}>
                  <p>Enim ad minim veniam, quis nostrud exercitat ullrem ipsum dolor sit amet, consece adipising elit, o eiusmod tempor incididunt ut labore bit of how ther chancer flat bogeo viele marioa.</p>
                </div>
              </div> */}



          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
