import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Container, Row, Col, Spinner, Alert, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ExpertView.css';
import Http from '../../Http';

const ExpertList = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentExpert, setCurrentExpert] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchExperts = async () => {
      try {
        const { data } = await axios.get(`${Http}/experts`);
        setExperts(data);
      } catch (error) {
        setError('Failed to fetch experts');
      } finally {
        setLoading(false);
      }
    };

    fetchExperts();
  }, []);

  const handleEditClick = (expert) => {
    setCurrentExpert(expert);
    setFormData({ ...expert });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedData = { ...formData };
  
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('designation', formData.designation);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('fb_link', formData.fb_link);
      formDataToSend.append('x_link', formData.x_link);
      formDataToSend.append('linkedin_link', formData.linkedin_link);
  
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
  
      await axios.put(`${Http}/experts/${formData._id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setExperts((prevExperts) =>
        prevExperts.map((expert) =>
          expert._id === formData._id ? { ...updatedData, image: URL.createObjectURL(imageFile) } : expert
        )
      );
  
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating expert:', error.response ? error.response.data : error.message);
      setError('Failed to update expert');
    }
  };

  const getFileNameFromPath = (filePath) => {
    if (!filePath) return ''; // Handle null or undefined filePath
    const normalizedPath = filePath.replace(/\\/g, '/');
    return normalizedPath.split('/').pop();
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <section id="Team" className="gap">
      <Container>
        <div className="heading">
          <span>Dedicated To The People</span>
          <h2>Meet Our Expert Team</h2>
        </div>
        <Row>
          {experts.length === 0 ? (
            <Col>
              <p>No experts available.</p>
            </Col>
          ) : (
            experts.map((expert) => (
              <Col lg={4} md={6} key={expert._id}>
                <div className="team-text">
                  <div className="team-img">
                    <img
                      alt={expert.name}
                      src={expert.image ? `${Http}/uploads/${getFileNameFromPath(expert.image)}` : 'default-image-url'} // Fallback image URL
                      className="img-fluid"
                    />
                  </div>
                  <span>{expert.designation}</span>
                  <h5>{expert.name}</h5>
                  <div className="callto">
                    <i>
                      <svg
                        fill="none"
                        height="24"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipRule="evenodd" fill="rgb(0,0,0)" fillRule="evenodd">
                          <path d="m7 2.75c-.41421 0-.75.33579-.75.75v17c0 .4142.33579.75.75.75h10c.4142 0 .75-.3358.75-.75v-17c0-.41421-.3358-.75-.75-.75zm-2.25.75c0-1.24264 1.00736-2.25 2.25-2.25h10c1.2426 0 2.25 1.00736 2.25 2.25v17c0 1.2426-1.0074 2.25-2.25 2.25h-10c-1.24264 0-2.25-1.0074-2.25-2.25z"></path>
                          <path d="m10.25 5c0-.41421.3358-.75.75-.75h2c.4142 0 .75.33579.75.75s-.3358.75-.75.75h-2c-.4142 0-.75-.33579-.75-.75z"></path>
                          <path d="m9.25 19c0-.4142.33579-.75.75-.75h4c.4142 0 .75.3358.75.75s-.3358.75-.75.75h-4c-.41421 0-.75-.3358-.75-.75z"></path>
                        </g>
                      </svg>
                    </i>
                    <a href={`tel:${expert.phone}`}>{expert.phone}</a>
                  </div>
                  <div className="follow">
                    <ul className="social-media-icon">
                      {expert.fb_link && (
                        <li>
                          <a href={expert.fb_link} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebookF} className="icon" />
                          </a>
                        </li>
                      )}
                      {expert.x_link && (
                        <li>
                          <a href={expert.x_link} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} className="icon" />
                          </a>
                        </li>
                      )}
                      {expert.linkedin_link && (
                        <li>
                          <a href={expert.linkedin_link} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} className="icon" />
                          </a>
                          </li>
                      )}
                    </ul>
                    <Button variant="warning" onClick={() => handleEditClick(expert)}>
                      Edit
                    </Button>
                  </div>
                </div>
              </Col>
            ))
          )}
        </Row>
      </Container>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentExpert && (
            <Form onSubmit={handleFormSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formDesignation">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter designation"
                  name="designation"
                  value={formData.designation || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={handleFileChange}
                />
                {formData.image && <img src={formData.image} alt="Preview" className="img-fluid mt-2" />}
              </Form.Group>

              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formFbLink">
                <Form.Label>Facebook Link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Facebook link"
                  name="fb_link"
                  value={formData.fb_link || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formXLink">
                <Form.Label>Twitter Link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Twitter link"
                  name="x_link"
                  value={formData.x_link || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formLinkedinLink">
                <Form.Label>LinkedIn Link</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter LinkedIn link"
                  name="linkedin_link"
                  value={formData.linkedin_link || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default ExpertList;

