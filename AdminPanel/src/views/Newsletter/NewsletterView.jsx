import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsletterView.css'; // Import CSS file for styling
import Http from '../../Http';

const NewsletterView = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editingNewsletter, setEditingNewsletter] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    subTitle: '',
    discountDesc: '',
    desc: '',
    ButtonText: '',
    Img: ''
  });

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const response = await axios.get(`${Http}/newsletter`);
        setNewsletters(response.data.data);
      } catch (error) {
        setErrorMessage('Error fetching newsletters: ' + (error.response?.data?.message || 'Unknown error'));
      }
    };

    fetchNewsletters();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Http}/newsletter/${id}`);
      setNewsletters(newsletters.filter(newsletter => newsletter._id !== id));
    } catch (error) {
      setErrorMessage('Error deleting newsletter: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  const handleEditClick = (newsletter) => {
    setEditingNewsletter(newsletter);
    setEditFormData({
      title: newsletter.title,
      subTitle: newsletter.subTitle,
      discountDesc: newsletter.discountDesc,
      desc: newsletter.desc,
      ButtonText: newsletter.ButtonText,
      Img: newsletter.Img
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
      const response = await axios.put(`${Http}/newsletter/${editingNewsletter._id}`, editFormData);
      const updatedNewsletter = response.data.data;
      setNewsletters(newsletters.map(newsletter =>
        newsletter._id === updatedNewsletter._id ? updatedNewsletter : newsletter
      ));
      setEditingNewsletter(null);
      setEditFormData({
        title: '',
        subTitle: '',
        discountDesc: '',
        desc: '',
        ButtonText: '',
        Img: ''
      });
    } catch (error) {
      setErrorMessage('Error updating newsletter: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="newsletter-view-container">
      <section className="newsletter-view-section">
        <div className="container">
          <h1 className="title">Newsletter List</h1>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {newsletters.length === 0 ? (
            <p className="no-newsletters">No newsletters available.</p>
          ) : (
            <div className="newsletter-list">
              {newsletters.map((newsletter) => (
                <div className="row align-items-center newsletter-card" key={newsletter._id}>
                  <div className="col-lg-7">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="paper-plane-w">
                          <img alt="paper-plane" src="assets/img/paper-plane.png" />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="newsletter-text">
                          <h2>{newsletter.title}</h2>
                          <h4>
                            {newsletter.subTitle} <span>{newsletter.discountDesc}</span>
                          </h4>
                          <h6>{newsletter.desc}</h6>
                          <a href="#" className="btn">{newsletter.ButtonText}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="customize-img">
                      <img alt="customize" src={newsletter.Img} />
                    </div>
                  </div>
                  <div className="newsletter-buttons">
                    <button className="edit-btn" onClick={() => handleEditClick(newsletter)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(newsletter._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {editingNewsletter && (
            <div className="edit-form-container">
              <h2>Edit Newsletter</h2>
              <form className="edit-form" onSubmit={handleEditSubmit}>
                <div className="form-group">
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>SubTitle:</label>
                  <input
                    type="text"
                    name="subTitle"
                    value={editFormData.subTitle}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label>Discount Description:</label>
                  <input
                    type="text"
                    name="discountDesc"
                    value={editFormData.discountDesc}
                    onChange={handleEditChange}
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    name="desc"
                    value={editFormData.desc}
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
                <div className="form-group">
                  <label>Image URL:</label>
                  <input
                    type="text"
                    name="Img"
                    value={editFormData.Img}
                    onChange={handleEditChange}
                  />
                </div>
                <button type="submit" className="save-btn">Save Changes</button>
                <button type="button" className="cancel-btn" onClick={() => setEditingNewsletter(null)}>Cancel</button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsletterView;
