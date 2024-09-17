import React, { useEffect, useState } from 'react';
import './FeaturesView.css';
import Http from '../../Http';

const FeaturesView = () => {
  const [features, setFeatures] = useState([]);
  const [editFeature, setEditFeature] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    cardTitle1: '',
    cardDesc1: '',
    cardTitle2: '',
    cardDesc2: '',
    cardTitle3: '',
    cardDesc3: '',
    email: ''
  });

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch(`${Http}/features`);
        if (response.ok) {
          const data = await response.json();
          setFeatures(data);
        } else {
          console.error('Failed to fetch features');
        }
      } catch (error) {
        console.error('Error fetching features:', error);
      }
    };

    fetchFeatures();
  }, []);

  const handleEditClick = (feature) => {
    setEditFeature(feature._id);
    setFormData({
      title: feature.title,
      subTitle: feature.subTitle,
      cardTitle1: feature.cardTitle1,
      cardDesc1: feature.cardDesc1,
      cardTitle2: feature.cardTitle2,
      cardDesc2: feature.cardDesc2,
      cardTitle3: feature.cardTitle3,
      cardDesc3: feature.cardDesc3,
      email: feature.email
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (featureId) => {
    try {
      const response = await fetch(`${Http}/features/${featureId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        const updatedFeature = await response.json();
        setFeatures(features.map(feature => feature._id === featureId ? updatedFeature : feature));
        setEditFeature(null);
      } else {
        console.error('Failed to update feature');
      }
    } catch (error) {
      console.error('Error updating feature:', error);
    }
  };

  return (
    <div className="features-view-container">
      <h2>Features</h2>
      <div className="features-grid">
        {features.length > 0 ? (
          features.map(feature => (
            <div key={feature._id} className="feature-card">
              {editFeature === feature._id ? (
                <div className="edit-form">
                  <h3>Edit Feature</h3>
                  <label>
                    Title:
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                  </label>
                  <label>
                    Subtitle:
                    <input type="text" name="subTitle" value={formData.subTitle} onChange={handleInputChange} />
                  </label>
                  <label>
                    Card Title 1:
                    <input type="text" name="cardTitle1" value={formData.cardTitle1} onChange={handleInputChange} />
                  </label>
                  <label>
                    Card Description 1:
                    <input type="text" name="cardDesc1" value={formData.cardDesc1} onChange={handleInputChange} />
                  </label>
                  <label>
                    Card Title 2:
                    <input type="text" name="cardTitle2" value={formData.cardTitle2} onChange={handleInputChange} />
                  </label>
                  <label>
                    Card Description 2:
                    <input type="text" name="cardDesc2" value={formData.cardDesc2} onChange={handleInputChange} />
                  </label>
                  <label>
                    Card Title 3:
                    <input type="text" name="cardTitle3" value={formData.cardTitle3} onChange={handleInputChange} />
                  </label>
                  <label>
                    Card Description 3:
                    <input type="text" name="cardDesc3" value={formData.cardDesc3} onChange={handleInputChange} />
                  </label>
                  <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                  </label>
                  <button onClick={() => handleUpdate(feature._id)}>Save</button>
                  <button onClick={() => setEditFeature(null)}>Cancel</button>
                </div>
              ) : (
                <div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <h4 className="feature-subtitle">{feature.subTitle}</h4>
                  <div className="feature-card-content">
                    <div className="card-item">
                      <h5>{feature.cardTitle1}</h5>
                      <p>{feature.cardDesc1}</p>
                    </div>
                    <div className="card-item">
                      <h5>{feature.cardTitle2}</h5>
                      <p>{feature.cardDesc2}</p>
                    </div>
                    <div className="card-item">
                      <h5>{feature.cardTitle3}</h5>
                      <p>{feature.cardDesc3}</p>
                    </div>
                  </div>
                  <h6>{feature.email}</h6>
                  <button onClick={() => handleEditClick(feature)}>Edit</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No features available.</p>
        )}
      </div>
    </div>
  );
};

export default FeaturesView;
