import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import {
  Container,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import Navbar from './Navbar';

const AssignedBookList = () => {
  const [assignedBooks, setAssignedBooks] = useState([]);

  useEffect(() => {
    const fetchAssignedBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/assigned-books');
        setAssignedBooks(response.data);
      } catch (error) {
        console.error('Error fetching assigned books:', error);
      }
    };

    fetchAssignedBooks();
  }, []);

  const columns = [
    // { field: 'assignedBookId', headerName: 'ID', width: 70 },
    { field: 'dateBorrow', headerName: 'Date Borrow', width: 150 },
    { field: 'dateReturn', headerName: 'Date Return', width: 150 },
    { field: 'isReturned', headerName: 'Returned', width: 120 },
    { field: 'studentFirstName', headerName: 'Student First Name', width: 200 },
    { field: 'studentLastName', headerName: 'Student Last Name', width: 200 },
    { field: 'studentStudentId', headerName: 'Student ID', width: 150 },
    { field: 'studentEmail', headerName: 'Student Email', width: 200 },
    { field: 'studentPhoneNum', headerName: 'Student Phone Number', width: 200 },
    { field: 'bookTitle', headerName: 'Book Title', width: 200 },
    // { field: 'bookDesc', headerName: 'Book Description', width: 300 },
    // { field: 'bookAuthor', headerName: 'Book Author', width: 200 },
    { field: 'bookCategory', headerName: 'Book Category', width: 150 },
    { field: 'bookStatus', headerName: 'Book Status', width: 150 },
    // { field: 'bookYearPublish', headerName: 'Year Published', width: 150 },
    // { field: 'bookImage', headerName: 'Book Image', width: 200 },
  ];

  const getRowId = (row) => row.assignedBookId;

  return (
    <>
      <Navbar />
      
        <Box sx={{ width: '100%', mt: 3 }}>
          <Typography variant="h4" component="div" gutterBottom>
            Assigned Books List
          </Typography>
          <Paper elevation={3}>
            <DataGrid
              rows={assignedBooks}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
              pagination
              getRowId={getRowId}
            />
          </Paper>
        </Box>
      
    </>
  );
};

export default AssignedBookList;
