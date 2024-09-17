import React, { useState } from 'react';
import axios from 'axios';
import Http from '../../Http';

const FooterForm = () => {
  const [formData, setFormData] = useState({
    InfoMsg: '',
    email: '',
    phoneNo: '',
    Tag: '',
    TagDesc: '',
    ButtonText: ''
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
      const response = await axios.post(`${Http}/footer`, formData);
      setSuccessMessage('Footer created successfully!');
      setErrorMessage('');
      setFormData({
        InfoMsg: '',
        email: '',
        phoneNo: '',
        Tag: '',
        TagDesc: '',
        ButtonText: ''
      });
    } catch (error) {
      setErrorMessage('Error creating footer: ' + error.response.data.message);
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h1>Create Footer</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Info Message:</label>
          <input
            type="text"
            name="InfoMsg"
            value={formData.InfoMsg}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Tag:</label>
          <input
            type="text"
            name="Tag"
            value={formData.Tag}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Tag Description:</label>
          <input
            type="text"
            name="TagDesc"
            value={formData.TagDesc}
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
        <button type="submit">Submit</button>
      </form>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default FooterForm;
