import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Http from '../../Http';

const TestimonialsView = () => {
  const [header, setHeader] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [editingHeader, setEditingHeader] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  useEffect(() => {
    // Fetch the testimonials header
    const fetchHeader = async () => {
      try {
        const response = await axios.get(`${Http}/testimonials-header`);
        setHeader(response.data);
      } catch (error) {
        console.error('Error fetching testimonials header:', error);
      }
    };

    // Fetch the testimonials
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${Http}/testimonials`);
        setTestimonials(response.data);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchHeader();
    fetchTestimonials();
  }, []);

  const handleDeleteHeader = async (id) => {
    try {
      await axios.delete(`${Http}/testimonials-header/${id}`);
      setHeader(header.filter((head) => head._id !== id));
      alert('Header deleted successfully');
    } catch (error) {
      console.error('Error deleting header:', error);
      alert('Error deleting header');
    }
  };

  const handleDeleteTestimonial = async (id) => {
    try {
      await axios.delete(`${Http}/testimonials/${id}`);
      setTestimonials(testimonials.filter((testimonial) => testimonial._id !== id));
      alert('Testimonial deleted successfully');
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Error deleting testimonial');
    }
  };

  const handleEditHeader = (header) => {
    setEditingHeader(header);
  };

  const handleEditTestimonial = (testimonial) => {
    setEditingTestimonial(testimonial);
  };

  const handleUpdateHeader = async () => {
    try {
      await axios.put(`${Http}/testimonials-header/${editingHeader._id}`, editingHeader);
      setHeader(header.map((head) => (head._id === editingHeader._id ? editingHeader : head)));
      setEditingHeader(null);
      alert('Header updated successfully');
    } catch (error) {
      console.error('Error updating header:', error);
      alert('Error updating header');
    }
  };

  const handleUpdateTestimonial = async () => {
    try {
      await axios.put(`${Http}/testimonials/${editingTestimonial._id}`, editingTestimonial);
      setTestimonials(testimonials.map((testimonial) => (testimonial._id === editingTestimonial._id ? editingTestimonial : testimonial)));
      setEditingTestimonial(null);
      alert('Testimonial updated successfully');
    } catch (error) {
      console.error('Error updating testimonial:', error);
      alert('Error updating testimonial');
    }
  };

  const handleChangeHeader = (e) => {
    const { name, value } = e.target;
    setEditingHeader({ ...editingHeader, [name]: value });
  };

  const handleChangeTestimonial = (e) => {
    const { name, value } = e.target;
    setEditingTestimonial({ ...editingTestimonial, [name]: value });
  };

  return (
    <div>
      <h2>Testimonials Header</h2>
      {header.length > 0 ? (
        header.map((head) => (
          <div key={head._id}>
            <h1>Testimonial Title: {head.title}</h1>
            <h2>Testimonial SubTitle: {head.subTitle}</h2>
            <button onClick={() => handleEditHeader(head)}>Edit Header</button>
            <button onClick={() => handleDeleteHeader(head._id)}>Delete Header</button>
          </div>
        ))
      ) : (
        <p>No testimonials header available.</p>
      )}
      {editingHeader && (
        <div>
          <h3>Edit Header</h3>
          <input
            type="text"
            name="title"
            value={editingHeader.title}
            onChange={handleChangeHeader}
          />
          <input
            type="text"
            name="subTitle"
            value={editingHeader.subTitle}
            onChange={handleChangeHeader}
          />
          <button onClick={handleUpdateHeader}>Update Header</button>
          <button onClick={() => setEditingHeader(null)}>Cancel</button>
        </div>
      )}
      <div>
        <h3>Testimonials</h3>
        {testimonials.length === 0 ? (
          <p>No testimonials available.</p>
        ) : (
          testimonials.map((testimonial) => (
            <div key={testimonial._id}>
              <h5>Client Name: {testimonial.clientName}</h5>
              <h6>Client Designation: {testimonial.clientDesignation}</h6>
              <p>Testimonial Message: {testimonial.message}</p>
              <button onClick={() => handleEditTestimonial(testimonial)}>Edit Testimonial</button>
              <button onClick={() => handleDeleteTestimonial(testimonial._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
      {editingTestimonial && (
        <div>
          <h3>Edit Testimonial</h3>
          <input
            type="text"
            name="clientName"
            value={editingTestimonial.clientName}
            onChange={handleChangeTestimonial}
          />
          <input
            type="text"
            name="clientDesignation"
            value={editingTestimonial.clientDesignation}
            onChange={handleChangeTestimonial}
          />
          <textarea
            name="message"
            value={editingTestimonial.message}
            onChange={handleChangeTestimonial}
          />
          <button onClick={handleUpdateTestimonial}>Update Testimonial</button>
          <button onClick={() => setEditingTestimonial(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default TestimonialsView;
