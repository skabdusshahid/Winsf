// NewsletterForm.js
import React, { useState } from 'react';
import axios from 'axios';
import Http from '../../Http';

const NewsletterForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    discountDesc: '',
    desc: '',
    ButtonText: '',
    Img: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Http}/newsletter`, formData);
      setSuccessMessage('Newsletter created successfully!');
      setErrorMessage('');
      // Clear the form fields
      setFormData({
        title: '',
        subTitle: '',
        discountDesc: '',
        desc: '',
        ButtonText: '',
        Img: ''
      });
    } catch (error) {
      setErrorMessage('Error creating newsletter: ' + error.response.data.message);
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h1>Create Newsletter</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>SubTitle:</label>
          <input
            type="text"
            name="subTitle"
            value={formData.subTitle}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Discount Description:</label>
          <input
            type="text"
            name="discountDesc"
            value={formData.discountDesc}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Button Text:</label>
          <input
            type="text"
            name="ButtonText"
            value={formData.ButtonText}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="Img"
            value={formData.Img}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default NewsletterForm;
