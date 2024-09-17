import React, { useState } from 'react';
import axios from 'axios';
import Http from '../../Http';

const ConsultingForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    subTitle: '',
    cardTitle1: '',
    cardDesc1: '',
    cardTitle2: '',
    cardDesc2: '',
    cardTitle3: '',
    cardDesc3: '',
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Update state with the new files and previews
    setFiles(prevFiles => [...prevFiles, ...selectedFiles]);

    // Generate previews for selected files
    const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
  };

  const handleRemoveImage = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setPreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    for (const file of files) {
      formDataToSend.append('sponsorImg', file);
    }

    try {
      await axios.post(`${Http}/consulting`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Consulting data created successfully');
    } catch (error) {
      console.error('Error creating consulting data:', error);
      alert('Error creating consulting data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />
      </label>
      <br />
      <label>
        SubTitle:
        <input type="text" name="subTitle" value={formData.subTitle} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Card Title 1:
        <input type="text" name="cardTitle1" value={formData.cardTitle1} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Card Description 1:
        <textarea name="cardDesc1" value={formData.cardDesc1} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Card Title 2:
        <input type="text" name="cardTitle2" value={formData.cardTitle2} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Card Description 2:
        <textarea name="cardDesc2" value={formData.cardDesc2} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Card Title 3:
        <input type="text" name="cardTitle3" value={formData.cardTitle3} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Card Description 3:
        <textarea name="cardDesc3" value={formData.cardDesc3} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Sponsor Images:
        <input type="file" multiple onChange={handleFileChange} />
      </label>
      <br />
      {previews.length > 0 && (
        <div>
          <h3>Image Previews:</h3>
          {previews.map((preview, index) => (
            <div key={index} style={{ display: 'inline-block', margin: '5px', position: 'relative' }}>
              <img
                src={preview}
                alt={`Preview ${index + 1}`}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  cursor: 'pointer',
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ConsultingForm;
