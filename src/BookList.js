import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Container,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  Pagination,
} from '@mui/material';
import AddBook from './AddBook';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { toast } from 'react-toastify';
import CheckoutForm from './CheckoutForm';

const BookList = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [openCheckoutDialog, setOpenCheckoutDialog] = useState(false);
  const [openAddBookDialog, setOpenAddBookDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const [selectedBookDetails, setSelectedBookDetails] = useState(null);
const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
const [latestCheckedOutBookDetails, setLatestCheckedOutBookDetails] = useState(null);
const [openLatestCheckedOutDialog, setOpenLatestCheckedOutDialog] = useState(false);
const [isValidStudentId, setIsValidStudentId] = useState(true);
const [shouldRefresh, setShouldRefresh] = useState(false);



useEffect(() => {
  axios.get('http://localhost:8080/api/books')
    .then(response => {
      setBooks(response.data);
      setFilteredBooks(response.data);
      setShouldRefresh(false);
    })
    .catch(error => console.error('Error fetching books:', error));
}, [shouldRefresh]);

  useEffect(() => {
    // Apply filters whenever searchTerm, selectedCategory, or selectedStatus change
    applyFilters();
  }, [searchTerm, selectedCategory, selectedStatus, books, currentPage]);

  const checkAvailability = async (bookId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/books/availability/${bookId}`);
      return response.data;
    } catch (error) {
      console.error('Error checking availability:', error);
      return false;
    }
  };

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
          bookId: selectedBook.id,
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
      toast.success('Checkout successful, Book borrowed: ', response.data)
      navigate('/', { replace: true }); 

  
      // Reset state after successful checkout
      setSelectedBook(null);
      setStudentId('');
      handleCloseCheckoutForm(); // Close the checkout form modal
      setIsValidStudentId(true); 
      setShouldRefresh(true)// Reset the validity state
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error('Error during checkout');
    }
  };
  
  // Function to check the validity of the student ID
  const checkStudentValidity = async (studentId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/students/${studentId}`);
      return response.data.isValid; // Assuming the API returns a boolean indicating validity
    } catch (error) {
      console.error('Error checking student validity:', error);
      return false;
    }
  };

  const openCheckoutForm = (book) => {
    setSelectedBook(book);
    setOpenCheckoutDialog(true); // Open the checkout form modal
  };

  const handleCloseCheckoutForm = () => {
    setOpenCheckoutDialog(false); // Close the checkout form modal
  };

  const applyFilters = () => {
    let filtered = books;

    // Filter by search term
    filtered = filtered.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(book => book.category === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(book => book.status === selectedStatus.toUpperCase());
    }

    // Pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredBooks(filtered.slice(startIndex, endIndex));
  };

  const handleClearFilters = () => {
    // Reset both filters to default values
    setSelectedCategory('all');
    setSelectedStatus('all');
  };

  const handleOpenAddBookDialog = () => {
    setOpenAddBookDialog(true);
  };

  const handleCloseAddBookDialog = () => {
    setOpenAddBookDialog(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleReturn = async (bookId) => {
    try {
        await axios.post('http://localhost:8080/api/assigned-books/return', null, {
            params: {
                bookId: bookId,
            },
        });

        // Handle success (e.g., show a success message)
        console.log('Book returned successfully');
        navigate('/');
        // You may want to update the UI or reload the book list after a successful return
    } catch (error) {
        console.error('Error returning book:', error);
        // Handle error (e.g., show an error message)
    }
};
const fetchBookDetails = async (bookId) => {
  try {
      const response = await axios.get(`http://localhost:8080/api/books/${bookId}`);
      setSelectedBookDetails(response.data);
      setOpenDetailsDialog(true);
  } catch (error) {
      console.error('Error fetching book details:', error);
  }
};

const fetchLatestCheckedOutBookDetails = async (bookId) => {
  try {
      const response = await axios.get(`http://localhost:8080/api/assigned-books/checked-out/${bookId}`);
      setLatestCheckedOutBookDetails(response.data);
      setOpenLatestCheckedOutDialog(true);
  } catch (error) {
      console.error('Error fetching latest checked-out book details:', error);
  }
};
      
  
     

  return (
    <>
        <Navbar/>
    <Container>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={3}>
          {/* Filters Section (Left Side) */}
          <Grid item xs={12} md={3} marginTop={3}>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2 }}>
              Filters
            </Typography>
            <TextField
              label="Search"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ marginBottom: 2 }}
            />

            {/* Category Radio Group */}
            <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
              <FormLabel component="legend">Category</FormLabel>
              <RadioGroup
                row
                aria-label="category"
                name="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel value="LITERATURE" control={<Radio />} label="Literature" />
                <FormControlLabel value="FICTION" control={<Radio />} label="Fiction" />
                {/* Add other categories as needed */}
              </RadioGroup>
            </FormControl>

            {/* Status Radio Group */}
            <FormControl component="fieldset">
              <FormLabel component="legend">Status</FormLabel>
              <RadioGroup
                row
                aria-label="status"
                name="status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel value="AVAILABLE" control={<Radio />} label="Available" />
                <FormControlLabel value="CHECKED_OUT" control={<Radio />} label="Checked Out" />
              </RadioGroup>
            </FormControl>
            <Button variant="outlined" onClick={handleClearFilters} sx={{ marginTop: 2 }}>
              Clear Filters
            </Button>
          </Grid>

          {/* Book List Section (Right Side) */}
          <Grid item xs={12} md={9}>
            <Box display="flex" justifyContent="flex-end" marginTop={3} paddingRight={2}>
              <Button variant="contained" color="primary" onClick={handleOpenAddBookDialog}>
                Add Book
              </Button>
            </Box>
            <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ marginBottom: 2 }}>
              Book List
            </Typography>
            <Grid container spacing={3}>
              {filteredBooks.map(book => (
                <Grid item key={book.id} xs={12} sm={6} md={3}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: 4,
                      transition: 'box-shadow 0.3s ease-in-out',
                      '&:hover': {
                        boxShadow: 8,
                      },
                      marginBottom: 2, // Adjust the spacing between cards
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {book.title}
                      </Typography>
                      <Typography color="text.secondary">
                        {book.author}
                      </Typography>
                      <img
                        src={`http://localhost:8080/api/books/image/${book.id}`}
                        alt={`Cover for ${book.title}`}
                        style={{ width: '100%', height: 'auto', marginTop: 2 }}
                      />
                    </CardContent>
                    
                    <CardActions style={{ marginTop: 'auto' }}>
                    
                    {book.status === 'AVAILABLE' && (
                      <>
                        <Button size="small" onClick={() => fetchBookDetails(book.id)}>
                        View Details
                     </Button>
                        <Button
                          size="small"
                          onClick={() => openCheckoutForm(book)}
                          disabled={book.status !== 'AVAILABLE'}
                        >
                          Checkout
                        </Button>
                        </>
                      )}
                      {book.status === 'CHECKED_OUT' && (
                          <>
                        <Button
                        size="small"
                        onClick={() => fetchLatestCheckedOutBookDetails(book.id)}
                        disabled={book.status !== 'CHECKED_OUT'}
                        >
                        View Checked-Out Details
                        </Button>
                        <Button
                          size="small"
                          onClick={() => handleReturn(book.id)}
                          disabled={book.status !== 'CHECKED_OUT'}
                          color='warning'
                        >
                          Return Now
                        </Button>
                        </>
                      )}
                        
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box display="flex" justifyContent="center" marginTop={3}>
              <Pagination
                count={Math.ceil(filteredBooks.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
              />
            </Box>
          </Grid>
        </Grid>

        {/* Checkout Form */}
        <Dialog open={openCheckoutDialog} onClose={handleCloseCheckoutForm} maxWidth="xs" fullWidth>
  <DialogTitle>Checkout Form</DialogTitle>
  <CheckoutForm
          selectedBook={selectedBook}
          handleCloseCheckoutForm={() => setOpenCheckoutDialog(false)}
          studentId={studentId}
          setStudentId={setStudentId}
          isValidStudentId={isValidStudentId}
          setIsValidStudentId={setIsValidStudentId}
          setShouldRefresh={setShouldRefresh}
        />
  {/* <DialogContent> */}

    {/* <form>
      <TextField
        label="Student ID"
        type="text"
        fullWidth
        value={studentId}
        onChange={(e) => {
          setStudentId(e.target.value);
          setIsValidStudentId(true); // Reset the validity state when the user changes the student ID
        }}
        sx={{ marginBottom: 2 }}
        error={!isValidStudentId} // Apply error styling if the student ID is invalid
        helperText={!isValidStudentId && 'Invalid student ID'} // Display an error message if the student ID is invalid
      />
      <Button variant="contained" onClick={handleCheckout} fullWidth>
        Confirm Checkout
      </Button>
    </form> */}
  {/* </DialogContent> */}
  <DialogActions>
    <Button onClick={handleCloseCheckoutForm}>Cancel</Button>
  </DialogActions>
</Dialog>
        {/* Book Details Dialog */}
<Dialog open={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)} maxWidth="md" fullWidth>
    <DialogTitle>Book Details</DialogTitle>
    <DialogContent>
        {selectedBookDetails && (
            <div>
                <Typography variant="h5" gutterBottom>
                    {selectedBookDetails.title}
                </Typography>
                <Typography color="text.secondary">
                    Author: {selectedBookDetails.author}
                </Typography>
                <Typography color="text.secondary">
                    Description: {selectedBookDetails.desc}
                </Typography>
                <Typography color="text.secondary">
                    Year Publish: {selectedBookDetails.yearPublish}
                </Typography>
                <Typography color="text.secondary">
                    status: {selectedBookDetails.status}
                </Typography>
                <img
                        src={`http://localhost:8080/api/books/image/${selectedBookDetails.id}`}
                        alt={`Cover for ${selectedBookDetails.title}`}
                        style={{ width: '100%', height: 'auto', marginTop: 2 }}
                      />
                {/* Include other details as needed */}
            </div>
        )}
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setOpenDetailsDialog(false)}>Close</Button>
    </DialogActions>
</Dialog>

        {/* Add Book Form */}
        <Dialog open={openAddBookDialog} onClose={handleCloseAddBookDialog} maxWidth="xs" fullWidth>
          <DialogTitle>Add Book</DialogTitle>
          <DialogContent>
            <AddBook />
          </DialogContent>
        </Dialog>
      </Box>
    </Container>

    <Dialog
        open={openLatestCheckedOutDialog}
        onClose={() => setOpenLatestCheckedOutDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {latestCheckedOutBookDetails && (
          <>
            <DialogTitle>Latest Checked-Out Book Details</DialogTitle>
            <DialogContent>
              <Box display="flex" alignItems="center" justifyContent="center">
                <img
                  src={`http://localhost:8080/api/books/image/${latestCheckedOutBookDetails.id}`}
                  alt={`Cover for ${latestCheckedOutBookDetails.title}`}
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Box>
              <Typography variant="h5" gutterBottom>
                {latestCheckedOutBookDetails.title}
              </Typography>
              <Typography color="text.secondary">
                Author: {latestCheckedOutBookDetails.author}
              </Typography>
              <Typography color="text.secondary">
                Description: {latestCheckedOutBookDetails.desc}
              </Typography>
              {/* Include other details as needed */}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenLatestCheckedOutDialog(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Latest Checked-Out Details Dialog */}
  <Dialog
    open={openLatestCheckedOutDialog}
    onClose={() => setOpenLatestCheckedOutDialog(false)}
    maxWidth="md"
    fullWidth
  >
    {latestCheckedOutBookDetails && (
      <>
        <DialogTitle>Latest Checked-Out Book Details</DialogTitle>
        <DialogContent>
          <Box display="flex" alignItems="center" justifyContent="center">
            <img
              src={`http://localhost:8080/api/books/image/${latestCheckedOutBookDetails.bookId}`}
              alt={`Cover for ${latestCheckedOutBookDetails.bookTitle}`}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Box>
          <Typography variant="h5" gutterBottom>
            {latestCheckedOutBookDetails.bookTitle}
          </Typography>
          <Typography color="text.secondary">
            Author: {latestCheckedOutBookDetails.bookAuthor}
          </Typography>
          <Typography color="text.secondary">
            Description: {latestCheckedOutBookDetails.bookDesc}
          </Typography>
          <Typography color="text.secondary">
            Year Publish: {latestCheckedOutBookDetails.bookYearPublish}
          </Typography>
          <Typography color="text.secondary">
            Status: {latestCheckedOutBookDetails.bookStatus}
          </Typography>
          <Typography color="text.secondary">
            Student: {`${latestCheckedOutBookDetails.studentFirstName} ${latestCheckedOutBookDetails.studentLastName}`}
          </Typography>
          <Typography color="text.secondary">
            Student ID: {latestCheckedOutBookDetails.studentStudentId}
          </Typography>
          {/* Include other details as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLatestCheckedOutDialog(false)}>Close</Button>
        </DialogActions>
      </>
    )}
  </Dialog>
      
    </>

    
  );
  
}

export default BookList;
