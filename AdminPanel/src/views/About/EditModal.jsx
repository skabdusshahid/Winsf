import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditModal.css'; // Ensure you include CSS for modal styling
import Http from '../../Http';

const EditModal = ({ isOpen, onClose, currentData, onSave }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentData) {
      setTitle(currentData.title || '');
      setSubtitle(currentData.subtitle || '');
      setDescription(currentData.description || '');
      setTags(currentData.tags || []);
      setImage(null); // Reset image state
      setImagePreview(null); // Reset image preview
    }
  }, [currentData]);

  useEffect(() => {
    if (image) {
      setImagePreview(URL.createObjectURL(image));
    }
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [image, imagePreview]);

  const handleTagAdd = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
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

  const handleSave = async () => {
    if (!title || !description) {
      setError('Title and description are required.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('subtitle', subtitle);
      formData.append('description', description);
      formData.append('tags', JSON.stringify(tags)); // Convert tags array to JSON string
      if (image) {
        formData.append('image', image);
      }

      // Attempt to save changes
      await axios.put(`${Http}/about/${currentData._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Clear error state and notify parent component on success
      setError(null);
      onSave(); // Notify parent component to refresh data
      onClose(); // Close modal
    } catch (err) {
      // Ensure error handling is accurate and specific
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to save changes');
      }
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleModalClose = () => {
    setImage(null); // Clear image state when modal is closed
    setImagePreview(null); // Clear image preview when modal is closed
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-labelledby="modal-title" aria-modal="true">
      <div className="modal-content" aria-labelledby="modal-title">
        <h2 id="modal-title">Edit About Information</h2>
        {/* {error && <div className="error-message">{error}</div>} */}
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Subtitle:
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Tags:
          <div className="tags-input">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleTagKeyPress}
              placeholder="Press Enter to add tags"
            />
            <button type="button" onClick={handleTagAdd} className="add-tag-button">
              Add Tag
            </button>
          </div>
          {tags.length > 0 && (
            <ul className="tags-list">
              {tags.map((tag, index) => (
                <li key={index} className="tag-item">
                  {tag} <button type="button" onClick={() => handleTagRemove(index)} className="remove-tag-button">Remove</button>
                </li>
              ))}
            </ul>
          )}
        </label>
        <label>
          Image:
          <input
            type="file"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div className="image-preview">
              <h3>Image Preview:</h3>
              <img src={imagePreview} alt="Image Preview" className="preview-image" />
              <button type="button" onClick={() => { setImage(null); setImagePreview(null); }} className="remove-image-button">Remove Image</button>
            </div>
          )}
        </label>
        <button onClick={handleSave} className="save-button">Save</button>
        <button onClick={handleModalClose} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
