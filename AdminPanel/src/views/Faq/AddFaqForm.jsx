import React, { useState } from 'react';
import axios from 'axios';
import "./FaqForm.css";
import Http from '../../Http';

const AddFaqForm = () => {
  const [faqData, setFaqData] = useState({
    question: '',
    answer: '',
  });

  const [faqHeaderData, setFaqHeaderData] = useState({
    FaqTitle: '',
    FaqSubTitle: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFaqChange = (e) => {
    const { name, value } = e.target;
    setFaqData({ ...faqData, [name]: value });
  };

  const handleFaqHeaderChange = (e) => {
    const { name, value } = e.target;
    setFaqHeaderData({ ...faqHeaderData, [name]: value });
  };

  const handleFaqSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Make an API request to add FAQ
      const response = await axios.post(`${Http}/faqs`, faqData);
      if (response.status === 201) {
        setSuccess('FAQ added successfully');
        setFaqData({
          question: '',
          answer: '',
        });
      }
    } catch (error) {
      setError('Error adding FAQ. Please try again.');
    }
  };

  const handleFaqHeaderSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Make an API request to add FAQ Header
      const response = await axios.post(`${Http}/faq-headers`, faqHeaderData);
      if (response.status === 201) {
        setSuccess('FAQ Header added successfully');
        setFaqHeaderData({
          FaqTitle: '',
          FaqSubTitle: '',
        });
      }
    } catch (error) {
      setError('Error adding FAQ Header. Please try again.');
    }
  };

  return (
    <div className="faq-form-container">
      <h2>Add New FAQ</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}

      <form onSubmit={handleFaqSubmit}>
        <div className="form-group">
          <label>Question</label>
          <input
            type="text"
            name="question"
            value={faqData.question}
            onChange={handleFaqChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Answer</label>
          <textarea
            name="answer"
            value={faqData.answer}
            onChange={handleFaqChange}
            required
          ></textarea>
        </div>

        <button type="submit">Add FAQ</button>
      </form>

      <h2>Add New FAQ Header</h2>
      <form onSubmit={handleFaqHeaderSubmit}>
        <div className="form-group">
          <label>FAQ Title</label>
          <input
            type="text"
            name="FaqTitle"
            value={faqHeaderData.FaqTitle}
            onChange={handleFaqHeaderChange}
            required
          />
        </div>

        <div className="form-group">
          <label>FAQ Subtitle</label>
          <input
            type="text"
            name="FaqSubTitle"
            value={faqHeaderData.FaqSubTitle}
            onChange={handleFaqHeaderChange}
            required
          />
        </div>

        <button type="submit">Add FAQ Header</button>
      </form>
    </div>
  );
};

export default AddFaqForm;
