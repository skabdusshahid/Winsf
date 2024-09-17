import React, { useEffect, useState } from 'react';
import './Footer.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import Http from '../Http';

const Footer = () => {
  const [basicData, setBasicData] = useState([]);
  const [error, setError] = useState(null);
  const [footers, setFooters] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchFooters = async () => {
      try {
        const response = await axios.get(`${Http}/footer`);
        if (response.data && response.data.data) {
          setFooters(response.data.data);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (error) {
        setErrorMessage('Error fetching footers: ' + (error.response?.data?.message || error.message));
      }
    };

    fetchFooters();
  }, []);

  useEffect(() => {
    const fetchBasicData = async () => {
      try {
        const response = await axios.get(`${Http}/basic`);
        setBasicData(response.data || []);
      } catch (err) {
        setError('Error fetching basic data');
        console.error(err);
      }
    };

    fetchBasicData();
  }, []);

  const getFileNameFromPath = (filePath) => {
    if (typeof filePath !== 'string') {
      console.warn('Expected filePath to be a string, but got:', filePath);
      return '';
    }
    const normalizedPath = filePath.replace(/\\/g, '/');
    return normalizedPath.split('/').pop();
  };

  const logo = basicData.length > 0 ? basicData[0].logo : '';

  return (
    <>
      <footer className="gap no-bottom" style={{ backgroundImage: 'url(assets/img/line-img.png)' }}>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {footers.length === 0 ? (
          <p>No footers available.</p>
        ) : (
          <ul className="footer-list">
            {footers.map((footer) => (
              <div key={footer._id} className="container">
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <div className="logo">
                      <a href="#">
                        {logo && (
                          <img src={`${Http}/uploads/${getFileNameFromPath(logo)}`} alt="Logo" />
                        )}
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="links">
                      <h5>Information</h5>
                      <div className="line"></div>
                      <p>{footer.InfoMsg}</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="links">
                      <h5>Contact Us</h5>
                      <div className="line"></div>
                      <span>Phone: <a href={`tel:${footer.phoneNo}`}>{footer.phoneNo}</a></span> <br />
                      <span className="mt-3 d-flex">Email: <a href={`mailto:${footer.email}`}>{footer.email}</a></span>
                    </div>
                  </div>
                </div>
                <div className="footer-bottom">
                  <h3>{footer.Tag}</h3>
                  <p>{footer.TagDesc}</p>
                  <a href="#" className="btn">{footer.ButtonText}</a>
                </div>
                <div className="footer-end">
                  <p>2024 © Gipix | Consulting Business HTML Landing Page</p>
                </div>
              </div>
            ))}
          </ul>
        )}

        <div className="footer-shapes">
          {/* Add shapes or design elements here if needed */}
        </div>
      </footer>
      <div id="progress">
        <span id="progress-value">
          <i className="fa-solid fa-arrow-up"></i>
        </span>
      </div>
    </>
  );
};

export default Footer;
