// FooterView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FooterView.css';
import Http from '../../Http';

const FooterView = () => {
  const [footers, setFooters] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editingFooter, setEditingFooter] = useState(null);
  const [editFormData, setEditFormData] = useState({
    InfoMsg: '',
    email: '',
    phoneNo: '',
    Tag: '',
    TagDesc: '',
    ButtonText: ''
  });

  useEffect(() => {
    const fetchFooters = async () => {
      try {
        const response = await axios.get(`${Http}/footer`);
        setFooters(response.data.data);
      } catch (error) {
        setErrorMessage('Error fetching footers: ' + error.response.data.message);
      }
    };

    fetchFooters();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Http}/footer/${id}`);
      setFooters(footers.filter(footer => footer._id !== id));
    } catch (error) {
      setErrorMessage('Error deleting footer: ' + error.response.data.message);
    }
  };

  const handleEditClick = (footer) => {
    setEditingFooter(footer);
    setEditFormData({
      InfoMsg: footer.InfoMsg,
      email: footer.email,
      phoneNo: footer.phoneNo,
      Tag: footer.Tag,
      TagDesc: footer.TagDesc,
      ButtonText: footer.ButtonText
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${Http}/footer/${editingFooter._id}`, editFormData);
      const updatedFooter = response.data.data;
      setFooters(footers.map(footer =>
        footer._id === updatedFooter._id ? updatedFooter : footer
      ));
      setEditingFooter(null);
      setEditFormData({
        InfoMsg: '',
        email: '',
        phoneNo: '',
        Tag: '',
        TagDesc: '',
        ButtonText: ''
      });
    } catch (error) {
      setErrorMessage('Error updating footer: ' + error.response.data.message);
    }
  };

  const closeModal = () => {
    setEditingFooter(null);
  };

  return (
    <div className="footer-view-container">
      <h1>Footer List</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {footers.length === 0 ? (
        <p>No footers available.</p>
      ) : (
        <ul className="footer-list">
          {footers.map((footer) => (
            <li key={footer._id} className="footer-item">
              <h2>{footer.InfoMsg}</h2>
              <p>Email: {footer.email}</p>
              <p>Phone Number: {footer.phoneNo}</p>
              <p>Tag: {footer.Tag}</p>
              <p>Tag Description: {footer.TagDesc}</p>
              <p>Button Text: {footer.ButtonText}</p>
              <button className="edit-button" onClick={() => handleEditClick(footer)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(footer._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {editingFooter && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>&times;</button>
            <h2>Edit Footer</h2>
            <form onSubmit={handleEditSubmit} className="edit-form">
              <div className="form-group">
                <label>Info Message:</label>
                <input
                  type="text"
                  name="InfoMsg"
                  value={editFormData.InfoMsg}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="text"
                  name="phoneNo"
                  value={editFormData.phoneNo}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Tag:</label>
                <input
                  type="text"
                  name="Tag"
                  value={editFormData.Tag}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form-group">
                <label>Tag Description:</label>
                <input
                  type="text"
                  name="TagDesc"
                  value={editFormData.TagDesc}
                  onChange={handleEditChange}
                />
              </div>
              <div className="form-group">
                <label>Button Text:</label>
                <input
                  type="text"
                  name="ButtonText"
                  value={editFormData.ButtonText}
                  onChange={handleEditChange}
                />
              </div>
              <button type="submit" className="save-button">Save Changes</button>
              <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterView;
