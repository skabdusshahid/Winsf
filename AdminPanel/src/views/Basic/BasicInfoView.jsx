import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditBasicInfoModal from './EditBasicInfoModal'; // Import the new modal component
import './BasicInfo.css';
import './BasicInfoView.css';
import Http from '../../Http';

const BasicInfoView = () => {
  const [basicData, setBasicData] = useState([]);
  const [error, setError] = useState(null);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [currentBasic, setCurrentBasic] = useState(null);

  const [logo, setLogo] = useState(null);
  const [heroImage, setHeroImage] = useState(null);
  const [headline, setHeadline] = useState('');
  const [desc, setDesc] = useState('');
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

  useEffect(() => {
    const fetchBasicData = async () => {
      try {
        const response = await axios.get(`${Http}/basic`);
        setBasicData(response.data);
      } catch (err) {
        setError('Error fetching basic data');
        console.error(err);
      }
    };

    fetchBasicData();
  }, [currentBasic]);

  const openEditModal = (basic) => {
    setCurrentBasic(basic);
    setLogo(null);
    setHeroImage(null);
    setHeadline(basic.headline || '');
    setDesc(basic.desc || '');
    setNavbarItems(Array.isArray(basic.navbar) ? basic.navbar : []); // Ensure navbarItems is an array
    setCountTitle1(basic.count_title1 || '');
    setCountValue1(basic.count_value1 || '');
    setCountTitle2(basic.count_title2 || '');
    setCountValue2(basic.count_value2 || '');
    setCountTitle3(basic.count_title3 || '');
    setCountValue3(basic.count_value3 || '');
    setCountTitle4(basic.count_title4 || '');
    setCountValue4(basic.count_value4 || '');
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setCurrentBasic(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Http}/basic/${id}`);
      setBasicData(basicData.filter(item => item._id !== id));
    } catch (err) {
      setError('Error deleting data');
      console.error(err);
    }
  };

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

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (logo) formData.append('logo', logo);
    if (heroImage) formData.append('heroImage', heroImage);
    formData.append('headline', headline);
    formData.append('desc', desc);
    formData.append('navbar', JSON.stringify(navbarItems));
    formData.append('count_title1', countTitle1);
    formData.append('count_value1', countValue1);
    formData.append('count_title2', countTitle2);
    formData.append('count_value2', countValue2);
    formData.append('count_title3', countTitle3);
    formData.append('count_value3', countValue3);
    formData.append('count_title4', countTitle4);
    formData.append('count_value4', countValue4);

    try {
      await axios.put(`${Http}/basic/${currentBasic._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const updatedData = basicData.map(item =>
        item._id === currentBasic._id ? { ...currentBasic, ...Object.fromEntries(formData.entries()) } : item
      );
      setBasicData(updatedData);
      closeEditModal();
    } catch (err) {
      setError('Error updating data');
      console.error(err);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (basicData.length === 0) {
    return <div>No basic data available</div>;
  }

  const getFileNameFromPath = (filePath) => {
    const normalizedPath = filePath.replace(/\\/g, '/');
    return normalizedPath.split('/').pop();
  };

  return (
    <div className="basic-info-view">
      <h1>Basic Data</h1>
      {basicData.map(basic => (
        <div key={basic._id} className="basic-info-item" style={{ marginBottom: '20px' }}>
          <h2>Basic Info</h2>
          {basic.logo && <img src={`${Http}/uploads/${getFileNameFromPath(basic.logo)}`} className="basic-info-logo" alt="Logo" />}
          <p><strong>Navbar:</strong>
            <ul className="navbar-items">
              {Array.isArray(basic.navbar) && basic.navbar.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </p>
          {basic.heroImage && <img style={{width:"200px"}} src={`${Http}/uploads/${getFileNameFromPath(basic.heroImage)}`} className="basic-info-image" alt="Hero" />}
          <p><strong>Headline:</strong> {basic.headline}</p>
          <p><strong>Description:</strong> {basic.desc}</p>


          {/* Grid Layout for Count Values */}
          <div className="count-grid">
            <div className="count-item">
              <h2>{basic.count_value1} <sup>K</sup></h2>
              <span>{basic.count_title1}</span>
            </div>
            <div className="count-item">
              <h2>{basic.count_value2} <sup>m</sup></h2>
              <span>{basic.count_title2}</span>
            </div>
            <div className="count-item">
              <h2>{basic.count_value3} <sup>+</sup></h2>
              <span>{basic.count_title3}</span>
            </div>
            <div className="count-item">
              <h2>{basic.count_value4} <sup>m</sup></h2>
              <span>{basic.count_title4}</span>
            </div>
          </div>

          <button onClick={() => openEditModal(basic)}>Edit</button>
          <button onClick={() => handleDelete(basic._id)}>Delete</button>
        </div>
      ))}

      {currentBasic && (
        <EditBasicInfoModal
          isOpen={editModalIsOpen}
          onRequestClose={closeEditModal}
          currentBasic={currentBasic}
          logo={logo}
          heroImage={heroImage}
          headline={headline}
          desc={desc}
          navbarItems={navbarItems}
          newNavbarItem={newNavbarItem}
          countTitle1={countTitle1}
          countValue1={countValue1}
          countTitle2={countTitle2}
          countValue2={countValue2}
          countTitle3={countTitle3}
          countValue3={countValue3}
          countTitle4={countTitle4}
          countValue4={countValue4}
          handleFileChange={handleFileChange}
          handleNavbarInput={handleNavbarInput}
          handleRemoveNavbarItem={handleRemoveNavbarItem}
          handleEdit={handleEdit}
          setHeadline={setHeadline}
          setDesc={setDesc}
          setNewNavbarItem={setNewNavbarItem}
          setCountTitle1={setCountTitle1}
          setCountValue1={setCountValue1}
          setCountTitle2={setCountTitle2}
          setCountValue2={setCountValue2}
          setCountTitle3={setCountTitle3}
          setCountValue3={setCountValue3}
          setCountTitle4={setCountTitle4}
          setCountValue4={setCountValue4}
        />
      )}
    </div>
  );
};

export default BasicInfoView;
