import React, { useState } from 'react';
import axios from 'axios';
import Http from '../../Http';

const TestimonialsForm = () => {
  const [formData, setFormData] = useState({
    testimonialsHeader: { title: '', subTitle: '' },
    testimonials: { clientName: '', clientDesignation: '', message: '' },
  });

  const handleInputChange = (e) => {
    const { name, value, dataset } = e.target;
    if (dataset.type === 'header') {
      setFormData({
        ...formData,
        testimonialsHeader: { ...formData.testimonialsHeader, [name]: value },
      });
    } else {
      setFormData({
        ...formData,
        testimonials: { ...formData.testimonials, [name]: value },
      });
    }
  };

  const handleHeaderSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(`${Http}/testimonials-header`, formData.testimonialsHeader);
      alert('Testimonials Header submitted successfully');
    } catch (error) {
      console.error('Error submitting Testimonials Header:', error);
      alert('Error submitting Testimonials Header');
    }
  };

  const handleTestimonialsSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post(`${Http}/testimonials`, formData.testimonials);
      alert('Testimonials submitted successfully');
    } catch (error) {
      console.error('Error submitting Testimonials:', error);
      alert('Error submitting Testimonials');
    }
  };

  return (
    <form>
      <h2>Testimonials Header</h2>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={formData.testimonialsHeader.title}
          onChange={handleInputChange}
          data-type="header"
        />
      </label>
      <br />
      <label>
        Subtitle:
        <input
          type="text"
          name="subTitle"
          value={formData.testimonialsHeader.subTitle}
          onChange={handleInputChange}
          data-type="header"
        />
      </label>
      <br />
      <button type="button" onClick={handleHeaderSubmit}>Submit Header</button>

      <h2>Testimonials</h2>
      <label>
        Client Name:
        <input
          type="text"
          name="clientName"
          value={formData.testimonials.clientName}
          onChange={handleInputChange}
          data-type="testimonial"
        />
      </label>
      <br />
      <label>
        Client Designation:
        <input
          type="text"
          name="clientDesignation"
          value={formData.testimonials.clientDesignation}
          onChange={handleInputChange}
          data-type="testimonial"
        />
      </label>
      <br />
      <label>
        Message:
        <textarea
          name="message"
          value={formData.testimonials.message}
          onChange={handleInputChange}
          data-type="testimonial"
        />
      </label>
      <br />
      <button type="button" onClick={handleTestimonialsSubmit}>Submit Testimonials</button>
    </form>
  );
};

export default TestimonialsForm;
