import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  TextField,
  TextareaAutosize,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Box,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

const AddBook = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    author: '',
    category: '',
    yearPublish: '',
    bookImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setFormData({
      ...formData,
      bookImage: selectedImage,
    });

    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (selectedImage) {
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithImage = new FormData();
    formDataWithImage.append('title', formData.title);
    formDataWithImage.append('desc', formData.desc);
    formDataWithImage.append('author', formData.author);
    formDataWithImage.append('category', formData.category);
    formDataWithImage.append('yearPublish', formData.yearPublish);
    formDataWithImage.append('bookImage1', formData.bookImage); // Use 'bookImage1' to match the backend

    try {
      await axios.post('http://localhost:8080/api/books', formDataWithImage);
      console.log('Book added successfully!');
      navigate('/');
      // You can redirect or perform other actions after successful book addition
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Add New Book
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <TextareaAutosize
          minRows={3}
          placeholder="Description"
          name="desc"
          value={formData.desc}
          onChange={handleChange}
          required
          maxLength={255} // Set maximum length to 255 characters
          style={{ width: '100%', marginBottom: '16px', resize: 'none' }} // Disable resizing
        />

        <TextField
          label="Author"
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <MenuItem value="">Select a category</MenuItem>
            <MenuItem value="LITERATURE">Literature</MenuItem>
            <MenuItem value="FICTION">Fiction</MenuItem>
            <MenuItem value="BIOGRAPHY">Biography</MenuItem>
            <MenuItem value="DRAMA">Drama</MenuItem>
            <MenuItem value="MYSTERY">Mystery</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Year Published"
          type="number"
          name="yearPublish"
          value={formData.yearPublish}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Book Image</InputLabel>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            style={{ marginBottom: '16px' }}
          />
        </FormControl>

        {imagePreview && (
          <Card style={{ maxWidth: 300, marginBottom: '16px' }}>
            <CardMedia
              component="img"
              alt="Book Preview"
              height="140"
              image={imagePreview}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Image Preview
              </Typography>
            </CardContent>
          </Card>
        )}

        <Button type="submit" variant="contained" color="primary">
          Add Book
        </Button>
      </form>
    </Box>
  );
};

export default AddBook;
