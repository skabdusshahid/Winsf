import React, { useState } from 'react';
import axios from 'axios';
import Http from '../../Http';

const ExpertForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    phone: '',
    email: '',
    fb_link: '',
    linkedin_link: '',
    x_link: '',
    other_link: ''
  });

  // State to store the image file
  const [image, setImage] = useState(null);

  // State to store errors
  const [errors, setErrors] = useState('');

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.name || !formData.designation || !formData.phone || !formData.email) {
      setErrors('Please fill in all required fields');
      return;
    }

    // Create FormData object to send both form data and image
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('designation', formData.designation);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('fb_link', formData.fb_link);
    formDataToSend.append('linkedin_link', formData.linkedin_link);
    formDataToSend.append('x_link', formData.x_link);
    formDataToSend.append('other_link', formData.other_link);

    if (image) {
      formDataToSend.append('image', image);
    }

    try {
      // Post data to the server
      const response = await axios.post(`${Http}/experts`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Expert added successfully!');
      // Clear form data
      setFormData({
        name: '',
        designation: '',
        phone: '',
        email: '',
        fb_link: '',
        linkedin_link: '',
        x_link: '',
        other_link: ''
      });
      setImage(null); // Clear the image
      setErrors('');
    } catch (error) {
      console.error('Error adding expert:', error);
      setErrors('Failed to add expert. Please try again.');
    }
  };

  return (
    <div>
      <h1>Add Expert</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Designation</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Facebook Link</label>
          <input
            type="text"
            name="fb_link"
            value={formData.fb_link}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>LinkedIn Link</label>
          <input
            type="text"
            name="linkedin_link"
            value={formData.linkedin_link}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>X (formerly Twitter) Link</label>
          <input
            type="text"
            name="x_link"
            value={formData.x_link}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Other Link</label>
          <input
            type="text"
            name="other_link"
            value={formData.other_link}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {errors && <p style={{ color: 'red' }}>{errors}</p>}
        <button type="submit">Add Expert</button>
      </form>
    </div>
  );
};

export default ExpertForm;
