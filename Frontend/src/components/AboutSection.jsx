import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import customizeImg from '../../assets/img/customize.png'; // Adjust the path based on your project structure
import checkImg from '../../assets/img/check-b.png'; // Adjust the path based on your project structure
import "bootstrap/dist/css/bootstrap.min.css";
import Http from '../Http';

const AboutSection = () => {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get(`${Http}/about`);
        setAboutData(response.data); // Assuming response.data is an array
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  const getFileNameFromPath = (filePath) => {
    const normalizedPath = filePath.replace(/\\/g, '/');
    return normalizedPath.split('/').pop();
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <section id="About" className="gap">
      {aboutData.length > 0 ? (
        aboutData.map((data) => (
          <div key={data._id} className="container">
            <div className="heading">
              <span>{data.subtitle || 'No subtitle available'}</span>
              <h2>{data.title || 'No title available'}</h2>
            </div>
            <div className="row align-items-center">
              <div className="col-lg-7">
                {data.image && (
                  <div className="customize-img">
                    <img
                      src={`${Http}/uploads/${getFileNameFromPath(data.image)}`}
                      alt="About"
                    />
                  </div>
                )}
              </div>
              <div className="col-lg-5">
                <div className="customize-text">
                  <p>
                    {data.description || 'No description available'}
                  </p>

                  {Array.isArray(data.tags) && data.tags.length > 0 ? (
                    <ul>
                      {data.tags.map((tag, index) => (
                        <li key={index}>
                          <img alt="check" src={checkImg} />
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>No tags</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-data">No data available</div>
      )}
    </section>
  );
};

export default AboutSection;
