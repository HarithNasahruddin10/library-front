// StudentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  TextField,
  Button,
  Box,
  Pagination,
  Grid,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddStudent from './AddStudent';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [openAddStudentDialog, setOpenAddStudentDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Adjust as needed

  useEffect(() => {
    axios.get('http://localhost:8080/api/students')
      .then(response => {
        setStudents(response.data);
        setFilteredStudents(response.data);
      })
      .catch(error => console.error('Error fetching students:', error));
  }, []);

  useEffect(() => {
    // Apply filters whenever searchTerm or categoryFilter change
    applyFilters();
  }, [searchTerm, categoryFilter, students, currentPage]);

  const applyFilters = () => {
    // Filter students based on search term and category
    const filtered = students.filter(student =>
      (student.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
       student.lastname.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter === '' || student.studentid === categoryFilter)
    );
    setFilteredStudents(filtered);
  };

  const handleClearFilters = () => {
    // Reset both filters to default values
    setCategoryFilter('');
  };

  const handleOpenAddStudentDialog = () => {
    setOpenAddStudentDialog(true);
  };

  const handleCloseAddStudentDialog = () => {
    setOpenAddStudentDialog(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Function to render student cards
  const renderStudentCards = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentStudents = filteredStudents.slice(startIndex, endIndex);

    return currentStudents.map(student => (
      // Customize the Card component based on your data
      <Grid item key={student.id} xs={12} sm={6} md={4} lg={3}>
        <Card>
          <CardContent>
            <Typography variant="h6">{`${student.firstname} ${student.lastname}`}</Typography>
            <Typography variant="body2" color="textSecondary">{`Student ID: ${student.studentid}`}</Typography>
            <Typography variant="body2" color="textSecondary">{`Email: ${student.email}`}</Typography>
            <Typography variant="body2" color="textSecondary">{`Phone Number: ${student.phonenum}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <Box>
      {/* Filters Section */}
      <Typography variant="h5" gutterBottom>
        Filters
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <MenuItem value="">Select a category</MenuItem>
          {/* Add options based on your data */}
        </Select>
      </FormControl>
      <Button variant="outlined" onClick={handleClearFilters} sx={{ marginTop: 2 }}>
        Clear Filters
      </Button>

      {/* Student List Section */}
      <Box display="flex" justifyContent="flex-end" marginTop={3} paddingRight={2}>
        <Button variant="contained" color="primary" onClick={handleOpenAddStudentDialog}>
          Add Student
        </Button>
      </Box>

      {/* Student Cards Section */}
      <Grid container spacing={3} marginTop={3}>
        {renderStudentCards()}
      </Grid>

      {/* Pagination Section */}
      <Box display="flex" justifyContent="center" marginTop={3}>
        <Pagination
          count={Math.ceil(filteredStudents.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>

      {/* Add Student Dialog */}
      <Dialog open={openAddStudentDialog} onClose={handleCloseAddStudentDialog}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          {/* Include the content of AddStudent component here */}
          <AddStudent />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddStudentDialog} color="primary">
            Cancel
          </Button>
          {/* Add any additional actions if needed */}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentList;
