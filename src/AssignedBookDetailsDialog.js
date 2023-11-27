import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Button,
} from '@mui/material';

const AssignedBookDetailsDialog = ({ assignedBookDetails, onClose }) => {
  return (
    <Dialog open={Boolean(assignedBookDetails)} onClose={onClose} maxWidth="md" fullWidth>
      {assignedBookDetails && (
        <>
          <DialogTitle>Assigned Book Details</DialogTitle>
          <DialogContent>
            <Box>
              <Typography variant="h5" gutterBottom>
                {assignedBookDetails.bookTitle}
              </Typography>
              <Typography color="text.secondary">
                Author: {assignedBookDetails.bookAuthor}
              </Typography>
              <Typography color="text.secondary">
                Description: {assignedBookDetails.bookDesc}
              </Typography>
              <Typography color="text.secondary">
                Year Publish: {assignedBookDetails.bookYearPublish}
              </Typography>
              <Typography color="text.secondary">
                Status: {assignedBookDetails.isReturned ? 'Returned' : 'Checked Out'}
              </Typography>
              <Typography color="text.secondary">
                Student: {assignedBookDetails.studentFirstName} {assignedBookDetails.studentLastName}
              </Typography>
              <Typography color="text.secondary">
                Student ID: {assignedBookDetails.studentStudentId}
              </Typography>
              <Typography color="text.secondary">
                Student Email: {assignedBookDetails.studentEmail}
              </Typography>
              <Typography color="text.secondary">
                Student Phone: {assignedBookDetails.studentPhoneNum}
              </Typography>
              <Typography color="text.secondary">
                Date Borrowed: {assignedBookDetails.dateBorrow}
              </Typography>
              {assignedBookDetails.isReturned && (
                <Typography color="text.secondary">
                  Date Returned: {assignedBookDetails.dateReturn}
                </Typography>
              )}
              <img
                src={`http://localhost:8080/api/books/image/${assignedBookDetails.bookId}`}
                alt={`Cover for ${assignedBookDetails.bookTitle}`}
                style={{ width: '100%', height: 'auto', marginTop: 2 }}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Close</Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default AssignedBookDetailsDialog;
