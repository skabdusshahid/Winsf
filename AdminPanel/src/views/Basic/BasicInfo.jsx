import React, { useState } from 'react';
import axios from 'axios';
import './BasicInfo.css'; // Import the CSS file
import Http from '../../Http';

const BasicInfo = () => {
  const [logo, setLogo] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [navbarItems, setNavbarItems] = useState([]);
  const [newNavbarItem, setNewNavbarItem] = useState('');
  const [countTitle1, setCountTitle1] = useState('');
  const [countValue1, setCountValue1] = useState('');
  const [countTitle2, setCountTitle2] = useState('');
  const [countValue2, setCountValue2] = useState('');
  const [countTitle3, setCountTitle3] = useState('');
  const [countValue3, setCountValue3] = useState('');
  const [countTitle4, setCountTitle4] = useState('');
  const [countValue4, setCountValue4] = useState('');
  const [headline, setHeadline] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    if (e.target.name === 'logo') {
      setLogo(e.target.files[0]);
    } else if (e.target.name === 'heroImage') {
      setHeroImage(e.target.files[0]);
    }
  };

  const handleNavbarInput = () => {
    if (newNavbarItem.trim()) {
      setNavbarItems([...navbarItems, newNavbarItem.trim()]);
      setNewNavbarItem('');
    }
  };

  const handleRemoveNavbarItem = (index) => {
    setNavbarItems(navbarItems.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (logo) formData.append('logo', logo);
    if (heroImage) formData.append('heroImage', heroImage);
    formData.append('navbar', JSON.stringify(navbarItems));
    formData.append('count_title1', countTitle1);
    formData.append('count_value1', countValue1);
    formData.append('count_title2', countTitle2);
    formData.append('count_value2', countValue2);
    formData.append('count_title3', countTitle3);
    formData.append('count_value3', countValue3);
    formData.append('count_title4', countTitle4);
    formData.append('count_value4', countValue4);
    formData.append('headline', headline);
    formData.append('desc', desc);

    try {
      await axios.post(`${Http}/basic`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Basic info submitted successfully');
    } catch (err) {
      setError('Error submitting basic info');
      console.error(err);
    }
  };

  return (
    <div className="basic-info-container">
      <h2 className="form-title">Basic Info</h2>
      <form onSubmit={handleSubmit} className="basic-info-form">
        <div className="form-group">
          <label className="form-label">Logo:</label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleFileChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Hero Image:</label>
          <input
            type="file"
            name="heroImage"
            accept="image/*"
            onChange={handleFileChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Headline:</label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="form-input"
            placeholder="Enter headline"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="form-input"
            placeholder="Enter description"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Navbar Items:</label>
          <div className="navbar-input-container">
            <input
              type="text"
              value={newNavbarItem}
              onChange={(e) => setNewNavbarItem(e.target.value)}
              className="form-input"
              placeholder="Add navbar item"
            />
            <button type="button" onClick={handleNavbarInput} className="add-navbar-button">
              Add
            </button>
          </div>
          <ul className="navbar-list">
            {navbarItems.map((item, index) => (
              <li key={index} className="navbar-list-item">
                {item}
                <button type="button" onClick={() => handleRemoveNavbarItem(index)} className="remove-navbar-button">
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="form-group double-inputs">
          <div className="input-pair">
            <label className="form-label">Count Title 1:</label>
            <input
              type="text"
              value={countTitle1}
              onChange={(e) => setCountTitle1(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="input-pair">
            <label className="form-label">Count Value 1:</label>
            <input
              type="text"
              value={countValue1}
              onChange={(e) => setCountValue1(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        <div className="form-group double-inputs">
          <div className="input-pair">
            <label className="form-label">Count Title 2:</label>
            <input
              type="text"
              value={countTitle2}
              onChange={(e) => setCountTitle2(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="input-pair">
            <label className="form-label">Count Value 2:</label>
            <input
              type="text"
              value={countValue2}
              onChange={(e) => setCountValue2(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        <div className="form-group double-inputs">
          <div className="input-pair">
            <label className="form-label">Count Title 3:</label>
            <input
              type="text"
              value={countTitle3}
              onChange={(e) => setCountTitle3(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="input-pair">
            <label className="form-label">Count Value 3:</label>
            <input
              type="text"
              value={countValue3}
              onChange={(e) => setCountValue3(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        <div className="form-group double-inputs">
          <div className="input-pair">
            <label className="form-label">Count Title 4:</label>
            <input
              type="text"
              value={countTitle4}
              onChange={(e) => setCountTitle4(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="input-pair">
            <label className="form-label">Count Value 4:</label>
            <input
              type="text"
              value={countValue4}
              onChange={(e) => setCountValue4(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        <button type="submit" className="submit-button">Submit</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default BasicInfo;
