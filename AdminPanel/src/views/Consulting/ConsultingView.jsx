import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Http from '../../Http';

const ConsultingView = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    cardTitle1: '',
    cardDesc1: '',
    cardTitle2: '',
    cardDesc2: '',
    cardTitle3: '',
    cardDesc3: '',
    sponsorImg: []
  });

  // Fetching data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Http}/consulting`);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to handle edit button click
  const handleEditClick = (item) => {
    setEditItem(item);
    setFormData({
      title: item.title,
      subTitle: item.subTitle,
      cardTitle1: item.cardTitle1,
      cardDesc1: item.cardDesc1,
      cardTitle2: item.cardTitle2,
      cardDesc2: item.cardDesc2,
      cardTitle3: item.cardTitle3,
      cardDesc3: item.cardDesc3,
      sponsorImg: item.sponsorImg
    });
  };

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle file input changes
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      sponsorImg: e.target.files
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('subTitle', formData.subTitle);
    formDataToSend.append('cardTitle1', formData.cardTitle1);
    formDataToSend.append('cardDesc1', formData.cardDesc1);
    formDataToSend.append('cardTitle2', formData.cardTitle2);
    formDataToSend.append('cardDesc2', formData.cardDesc2);
    formDataToSend.append('cardTitle3', formData.cardTitle3);
    formDataToSend.append('cardDesc3', formData.cardDesc3);
    for (const file of formData.sponsorImg) {
      formDataToSend.append('sponsorImg', file);
    }

    try {
      await axios.put(`${Http}/consulting/${editItem._id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const response = await axios.get(`${Http}/consulting`);
      setData(response.data);
      setEditItem(null);
    } catch (err) {
      setError('Failed to update data');
    }
  };

  // Function to delete consulting data
  const deleteConsultingData = async (id) => {
    try {
      await axios.delete(`${Http}/consulting/${id}`);
      setData(data.filter(item => item._id !== id));
    } catch (err) {
      setError('Failed to delete data');
    }
  };

  // Helper function to extract file name from path
  const getFileNameFromPath = (filePath) => {
    const normalizedPath = filePath.replace(/\\/g, '/');
    return normalizedPath.split('/').pop();
  };

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Consulting Data</h1>
      {editItem ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2>Edit Consulting Data</h2>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            SubTitle:
            <input
              type="text"
              name="subTitle"
              value={formData.subTitle}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Card Title 1:
            <input
              type="text"
              name="cardTitle1"
              value={formData.cardTitle1}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Card Description 1:
            <input
              type="text"
              name="cardDesc1"
              value={formData.cardDesc1}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Card Title 2:
            <input
              type="text"
              name="cardTitle2"
              value={formData.cardTitle2}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Card Description 2:
            <input
              type="text"
              name="cardDesc2"
              value={formData.cardDesc2}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Card Title 3:
            <input
              type="text"
              name="cardTitle3"
              value={formData.cardTitle3}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Card Description 3:
            <input
              type="text"
              name="cardDesc3"
              value={formData.cardDesc3}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Sponsor Images:
            <input
              type="file"
              name="sponsorImg"
              multiple
              onChange={handleFileChange}
            />
          </label>
          <button type="submit">Update</button>
          <button type="button" onClick={() => setEditItem(null)}>Cancel</button>
        </form>
      ) : (
        <>
          {data.length === 0 ? (
            <p style={styles.noData}>No data available</p>
          ) : (
            <ul style={styles.list}>
              {data.map((item) => (
                <li key={item._id} style={styles.item}>
                  <h2 style={styles.itemTitle}>{item.title}</h2>
                  <h3 style={styles.itemSubTitle}>{item.subTitle}</h3>
                  <div style={styles.cardContainer}>
                    {[{title: item.cardTitle1, desc: item.cardDesc1}, 
                      {title: item.cardTitle2, desc: item.cardDesc2}, 
                      {title: item.cardTitle3, desc: item.cardDesc3}]
                      .map((card, i) => (
                        <div key={i} style={styles.card}>
                          <h4 style={styles.cardTitle}>{`Card ${i + 1}`}</h4>
                          <p>{card.title}</p>
                          <p>{card.desc}</p>
                        </div>
                    ))}
                  </div>
                  <div style={styles.sponsorContainer}>
                    <h4 style={styles.sponsorTitle}>Sponsor Images</h4>
                    {item.sponsorImg && Array.isArray(item.sponsorImg) && item.sponsorImg.map((file, i) => (
                      <img 
                        key={i} 
                        src={`${Http}/uploads/${getFileNameFromPath(file)}`} 
                        alt={`Sponsor ${i + 1}`} 
                        style={styles.sponsorImg} 
                      />
                    ))}
                  </div>
                  <button 
                    onClick={() => handleEditClick(item)} 
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteConsultingData(item._id)} 
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  noData: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#007bff',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#dc3545',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  item: {
    marginBottom: '30px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  itemTitle: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#333',
  },
  itemSubTitle: {
    fontSize: '1.2rem',
    marginBottom: '20px',
    color: '#555',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  card: {
    flex: '1 1 calc(33.333% - 20px)',
    margin: '10px',
    padding: '15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
  },
  cardTitle: {
    fontSize: '1.2rem',
    marginBottom: '10px',
    color: '#333',
  },
  sponsorContainer: {
    textAlign: 'center',
  },
  sponsorTitle: {
    fontSize: '1.2rem',
    marginBottom: '10px',
    color: '#333',
  },
  sponsorImg: {
    maxWidth: '200px',
    margin: '10px',
    borderRadius: '8px',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '10px',
    display: 'block',
    width: '100%',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '10px',
    display: 'block',
    width: '100%',
    textAlign: 'center',
  },
  form: {
    marginBottom: '20px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
};

export default ConsultingView;
