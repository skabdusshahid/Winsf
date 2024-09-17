// EditBasicInfoModal.js
import React from 'react';
import Modal from 'react-modal';
import './BasicInfo.css'; 
import './BasicInfoView.css'; 

const EditBasicInfoModal = ({
  isOpen,
  onRequestClose,
  currentBasic,
  logo,
  heroImage,
  headline,
  desc,
  navbarItems,
  newNavbarItem,
  countTitle1,
  countValue1,
  countTitle2,
  countValue2,
  countTitle3,
  countValue3,
  countTitle4,
  countValue4,
  handleFileChange,
  handleNavbarInput,
  handleRemoveNavbarItem,
  handleEdit,
  setHeadline,
  setDesc,
  setNewNavbarItem,
  setCountTitle1,
  setCountValue1,
  setCountTitle2,
  setCountValue2,
  setCountTitle3,
  setCountValue3,
  setCountTitle4,
  setCountValue4
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Basic Data"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          width: '80%',
          maxWidth: '700px',
          height: 'auto',
          maxHeight: '500px',
          overflowY: 'auto',
          backgroundColor: '#fff',
        },
      }}
    >
      <h2 className="form-title">Edit Basic Data</h2>
      <form onSubmit={handleEdit} className="basic-info-form">
        <div className="form-group">
          <label className="form-label">Logo:</label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleFileChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Hero Image:</label>
          <input
            type="file"
            name="heroImage"
            accept="image/*"
            onChange={handleFileChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Headline:</label>
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Navbar Items:</label>
          <div className="navbar-input-container">
            <input
              type="text"
              value={newNavbarItem}
              onChange={(e) => setNewNavbarItem(e.target.value)}
              className="form-input"
              placeholder="Add navbar item"
            />
            <button type="button" onClick={handleNavbarInput} className="add-navbar-button">
              Add
            </button>
          </div>
          <ul className="navbar-list">
            {navbarItems.map((item, index) => (
              <li key={index} className="navbar-list-item">
                {item}
                <button type="button" onClick={() => handleRemoveNavbarItem(index)} className="remove-navbar-button">
                  &times;
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="form-group double-inputs">
          <div className="input-pair">
            <label className="form-label">Count Title 1:</label>
            <input
              type="text"
              value={countTitle1}
              onChange={(e) => setCountTitle1(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="input-pair">
            <label className="form-label">Count Value 1:</label>
            <input
              type="text"
              value={countValue1}
              onChange={(e) => setCountValue1(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        <div className="form-group double-inputs">
          <div className="input-pair">
            <label className="form-label">Count Title 2:</label>
            <input
              type="text"
              value={countTitle2}
              onChange={(e) => setCountTitle2(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="input-pair">
            <label className="form-label">Count Value 2:</label>
            <input
              type="text"
              value={countValue2}
              onChange={(e) => setCountValue2(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        <div className="form-group double-inputs">
          <div className="input-pair">
            <label className="form-label">Count Title 3:</label>
            <input
              type="text"
              value={countTitle3}
              onChange={(e) => setCountTitle3(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="input-pair">
            <label className="form-label">Count Value 3:</label>
            <input
              type="text"
              value={countValue3}
              onChange={(e) => setCountValue3(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        <div className="form-group double-inputs">
          <div className="input-pair">
            <label className="form-label">Count Title 4:</label>
            <input
              type="text"
              value={countTitle4}
              onChange={(e) => setCountTitle4(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="input-pair">
            <label className="form-label">Count Value 4:</label>
            <input
              type="text"
              value={countValue4}
              onChange={(e) => setCountValue4(e.target.value)}
              className="form-input"
            />
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">Save</button>
          <button type="button" onClick={onRequestClose} className="cancel-button">Cancel</button>
        </div>
      </form>
    </Modal>
  );
};

export default EditBasicInfoModal;
