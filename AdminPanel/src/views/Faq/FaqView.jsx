import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FaqView.css';
import Http from '../../Http';

const FaqView = () => {
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

  const handleDelete = async (type, id) => {
    try {
      if (type === 'faq') {
        await axios.delete(`${Http}/faqs/${id}`);
        setFaqs(faqs.filter(faq => faq._id !== id));
      } else if (type === 'header') {
        await axios.delete(`${Http}/faq-headers/${id}`);
        setFaqHeaders(faqHeaders.filter(header => header._id !== id));
      }
    } catch (error) {
      setError('Error deleting data. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="faq-view-container">
      <h2>FAQ Headers</h2>
      {faqHeaders.length === 0 ? (
        <p>No FAQ Headers available</p>
      ) : (
        <ul className="faq-headers-list">
          {faqHeaders.map((header) => (
            <li key={header._id} className="faq-header-item">
              <h3>Title: {header.FaqTitle}</h3>
              <h4>Upper Sub-title: {header.FaqSubTitle}</h4>
              <button onClick={() => handleDelete('header', header._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <h2>Frequently Asked Questions</h2>
      {faqs.length === 0 ? (
        <p>No FAQs available</p>
      ) : (
        <table className="faq-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq._id}>
                <td>{faq.question}</td>
                <td>{faq.answer}</td>
                <td>
                  <button onClick={() => handleDelete('faq', faq._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FaqView;
