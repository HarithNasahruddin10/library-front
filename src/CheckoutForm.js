// CheckoutForm.jsx
import React, { useState } from 'react';
import { TextField, Button, DialogContent } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const CheckoutForm = ({ selectedBook,handleCloseCheckoutForm, studentId, setStudentId, isValidStudentId, setIsValidStudentId, setShouldRefresh }) => {
  const [selectBook, setSelectBook] = useState(selectedBook);
 

  const handleCheckout = async () => {
    try {
      // Check the validity of the student ID
      // const isValid = await checkStudentValidity(studentId);

      // if (!isValid) {
      //   // Set the state to indicate an invalid student ID
      //   setIsValidStudentId(false);
      //   return;
      // }

      // Proceed with the checkout if the student ID is valid
      const response = await axios.post(
        'http://localhost:8080/api/assigned-books/checkout',
        {
          bookId: selectBook.id,
          studentId: studentId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Handle the response as needed
      console.log('Checkout successful:', response.data);
      toast.success('Checkout successful, Book borrowed: ', response.data);
      

      // Reset state after successful checkout
      setSelectBook(null);
      setStudentId('');
      handleCloseCheckoutForm(); // Close the checkout form modal
      setIsValidStudentId(true); // Reset the validity state
      setShouldRefresh(true); // Reset the validity state
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error('Error during checkout');
    }
  };

  return (
    <DialogContent>
      <form>
        <TextField
          label="Student ID"
          type="text"
          fullWidth
          value={studentId}
          onChange={(e) => {
            setStudentId(e.target.value);
            // Reset the validity state when the user changes the student ID
            setIsValidStudentId(true);
          }}
          sx={{ marginBottom: 2 }}
          error={!isValidStudentId}
          helperText={!isValidStudentId && 'Invalid student ID'}
        />
        <Button variant="contained" onClick={handleCheckout} fullWidth>
          Confirm Checkout
        </Button>
      </form>
    </DialogContent>
  );
};

export default CheckoutForm;
