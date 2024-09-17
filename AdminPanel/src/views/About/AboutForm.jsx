import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Http from '../../Http'

const AboutForm = () => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleTagAdd = () => {
    if (tagInput.trim()) {
      setTags((prevTags) => [...prevTags, tagInput.trim()]);
      setTagInput(''); // Clear the input after adding
    }
  };

  const handleTagKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission on Enter
      handleTagAdd();
    }
  };

  const handleTagRemove = (index) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('description', description);
    formData.append('tags', JSON.stringify(tags)); // Convert tags array to JSON string
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post(`${Http}/about`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('About document created successfully');
      setErrors([]);
      setTitle('');
      setSubtitle('');
      setDescription('');
      setTags([]);
      setImage(null);
      setImagePreview(null); // Clear the image preview after successful submission
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors([{ msg: 'An unexpected error occurred' }]);
      }
    }
  };

  useEffect(() => {
    // Cleanup function to revoke object URL when the component unmounts or image changes
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ width: '80%', maxWidth: '600px' }}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="subtitle">Subtitle:</label>
          <input
            type="text"
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleTagKeyPress}
            placeholder="Press Enter to add tags"
          />
          <button type="button" onClick={handleTagAdd}>Add Tag</button>
          <div>
            {tags.length > 0 && (
              <ul>
                {tags.map((tag, index) => (
                  <li key={index}>
                    {tag} <button type="button" onClick={() => handleTagRemove(index)}>Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="image">Image (optional):</label>
          <input
            type="file"
            id="image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {imagePreview && (
        <div style={{ marginTop: '20px' }}>
          <h2>Image Preview:</h2>
          <img src={imagePreview} alt="Image Preview" style={{ maxWidth: '300px', maxHeight: '300px' }} />
        </div>
      )}
      {errors.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Errors:</h2>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}
      {successMessage && (
        <div style={{ marginTop: '20px' }}>
          <h2>{successMessage}</h2>
        </div>
      )}
    </div>
  );
};

export default AboutForm;
