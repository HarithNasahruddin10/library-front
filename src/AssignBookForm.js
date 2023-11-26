// src/components/AssignBookForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssignBookForm() {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedBook, setSelectedBook] = useState('');

  useEffect(() => {
    // Fetch students and books data for dropdowns
    // Replace the URLs with the endpoints of your Spring Boot backend
    axios.get('http://localhost:8080/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching students:', error));

    axios.get('http://localhost:8080/api/books?available=true')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching available books:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace the URL with the endpoint of your Spring Boot backend
      await axios.post('http://localhost:8080/api/assigned-books', {
        dateBorrow: new Date().toISOString().split('T')[0],
        dateReturn: '', // Set the return date logic as needed
        isReturned: false,
        student: {
          id: parseInt(selectedStudent, 10),
        },
        book: {
          id: parseInt(selectedBook, 10),
        },
      });
      alert('Book assigned successfully!');
    } catch (error) {
      console.error('Error assigning book:', error);
      alert('Failed to assign book. Check the console for details.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Student:
        <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} required>
          <option value="" disabled>Select a student</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>{`${student.firstName} ${student.lastName}`}</option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Select Book:
        <select value={selectedBook} onChange={(e) => setSelectedBook(e.target.value)} required>
          <option value="" disabled>Select a book</option>
          {books.map(book => (
            <option key={book.id} value={book.id}>{book.title}</option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Assign Book</button>
    </form>
  );
}

export default AssignBookForm;
