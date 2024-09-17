import React, { useState } from 'react';
import './FeatureForm.css';
import Http from '../../Http';

const FeaturesForm = () => {
  const [formData, setFormData] = useState({
    subTitle: '',
    title: '',
    cardTitle1: '',
    cardDesc1: '',
    cardTitle2: '',
    cardDesc2: '',
    cardTitle3: '',
    cardDesc3: '',
    email: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    // Basic validation
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key]) newErrors[key] = 'This field is required';
    });
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email address';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`${Http}/features`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccessMessage('Feature created successfully!');
        setFormData({
          subTitle: '',
          title: '',
          cardTitle1: '',
          cardDesc1: '',
          cardTitle2: '',
          cardDesc2: '',
          cardTitle3: '',
          cardDesc3: '',
          email: ''
        });
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors || {});
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ global: 'An error occurred. Please try again.' });
    }
  };

  return (
    <div className="feature-form-container">
      <h2>Create New Feature</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.global && <p className="error-message">{errors.global}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subTitle">Subtitle:</label>
          <input
            type="text"
            id="subTitle"
            name="subTitle"
            value={formData.subTitle}
            onChange={handleChange}
          />
          {errors.subTitle && <span className="error-text">{errors.subTitle}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error-text">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="cardTitle1">Card Title 1:</label>
          <input
            type="text"
            id="cardTitle1"
            name="cardTitle1"
            value={formData.cardTitle1}
            onChange={handleChange}
          />
          {errors.cardTitle1 && <span className="error-text">{errors.cardTitle1}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="cardDesc1">Card Description 1:</label>
          <textarea
            id="cardDesc1"
            name="cardDesc1"
            value={formData.cardDesc1}
            onChange={handleChange}
          />
          {errors.cardDesc1 && <span className="error-text">{errors.cardDesc1}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="cardTitle2">Card Title 2:</label>
          <input
            type="text"
            id="cardTitle2"
            name="cardTitle2"
            value={formData.cardTitle2}
            onChange={handleChange}
          />
          {errors.cardTitle2 && <span className="error-text">{errors.cardTitle2}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="cardDesc2">Card Description 2:</label>
          <textarea
            id="cardDesc2"
            name="cardDesc2"
            value={formData.cardDesc2}
            onChange={handleChange}
          />
          {errors.cardDesc2 && <span className="error-text">{errors.cardDesc2}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="cardTitle3">Card Title 3:</label>
          <input
            type="text"
            id="cardTitle3"
            name="cardTitle3"
            value={formData.cardTitle3}
            onChange={handleChange}
          />
          {errors.cardTitle3 && <span className="error-text">{errors.cardTitle3}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="cardDesc3">Card Description 3:</label>
          <textarea
            id="cardDesc3"
            name="cardDesc3"
            value={formData.cardDesc3}
            onChange={handleChange}
          />
          {errors.cardDesc3 && <span className="error-text">{errors.cardDesc3}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default FeaturesForm;
