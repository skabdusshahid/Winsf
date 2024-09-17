import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditModal from './EditModal'; // Import the modal component
import "bootstrap/dist/css/bootstrap.min.css";
import './AboutView.css'; // Make sure this file contains the necessary styles
import Http from '../../Http';
import checkImg from './check-b.png'; // Adjust the path if necessary

const AboutView = () => {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingData, setEditingData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to fetch data
  const fetchAboutData = async () => {
    try {
      const response = await axios.get(`${Http}/about`);
      setAboutData(response.data); // Assuming response.data is an array
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchAboutData();
  }, [editingData]);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Http}/about/${id}`);
      setAboutData(aboutData.filter(data => data._id !== id)); // Update the state
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  // Handle edit
  const handleEdit = (data) => {
    setEditingData(data);
    setIsModalOpen(true);
  };

  // Close modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingData(null);
  };

  // Handle save from modal
  const handleSave = async (updatedData) => {
    try {
      const formData = new FormData();
      formData.append('title', updatedData.title);
      formData.append('subtitle', updatedData.subtitle);
      formData.append('description', updatedData.description);
      formData.append('tags', JSON.stringify(updatedData.tags));
      if (updatedData.image) {
        formData.append('image', updatedData.image);
      }

      await axios.put(`${Http}/about/${updatedData._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update the local state
      setAboutData(aboutData.map(item => (item._id === updatedData._id ? updatedData : item)));
      setIsModalOpen(false);
      setEditingData(null);
      setError(null); // Clear error state
    } catch (err) {
      setError('Failed to save changes');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (aboutData.length === 0) {
    return <div className="no-data">No data available</div>;
  }

  const getFileNameFromPath = (filePath) => {
    const normalizedPath = filePath.replace(/\\/g, '/');
    return normalizedPath.split('/').pop();
  };

  return (
    <section id="AboutView">
      <div className="container">
        <h1 className="heading">About Information</h1>
        {aboutData.map((data) => (
          <div key={data._id} className="card mb-4">
            <div className="row align-items-center">
              <div className="col-lg-7">
                {data.image && (
                  <div className="image-container mb-3">
                    <img
                      src={`${Http}/uploads/${getFileNameFromPath(data.image)}`}
                      alt="About"
                      className="img-fluid"
                    />
                  </div>
                )}
              </div>
              <div className="col-lg-5">
                <div className="content">
                  <h2 className="title">{data.title || 'No title available'}</h2>
                  <h3 className="subtitle">{data.subtitle || 'No subtitle available'}</h3>
                  <p className="description">
                    {data.description || 'No description available'}
                  </p>

                  {Array.isArray(data.tags) && data.tags.length > 0 ? (
                    <ul className="list-unstyled">
                      {data.tags.map((tag, index) => (
                        <li key={index} className="tag-item">
                          <img alt="check" src={checkImg} className="check-icon" />
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>No tags</span>
                  )}
                  <div className="actions mt-3">
                    <button className="btn btn-primary" onClick={() => handleEdit(data)}>
                      Edit
                    </button>
                    <button className="btn btn-danger ms-2" onClick={() => handleDelete(data._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {editingData && (
          <EditModal
            isOpen={isModalOpen}
            onClose={handleModalClose}
            currentData={editingData}
            onSave={handleSave}
          />
        )}
      </div>
    </section>
  );
};

export default AboutView;
