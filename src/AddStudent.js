// AddStudent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';

const AddStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    studentid: '',
    email: '',
    phonenum: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/students', formData);
      console.log('Student added successfully!');
      navigate('/students');
      // You can redirect or perform other actions after successful student addition
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add New Student
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          type="text"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Last Name"
          type="text"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Student ID"
          type="text"
          name="studentid"
          value={formData.studentid}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextField
          label="Phone Number"
          type="tel"
          name="phonenum"
          value={formData.phonenum}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary">
          Add Student
        </Button>
      </form>
    </Box>
  );
};

export default AddStudent;
