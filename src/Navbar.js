// src/components/Home.js
import React from 'react';
import Navbar from './Navbar';
import BookList from './BookList';
import AddStudentForm from './AddStudentForm';
import AddBookForm from './AddBookForm';
import AssignBookForm from './AssignBookForm';

function Home() {
  return (
    <div>
      <Navbar />
      <h1>Library Management App</h1>
      <h2>Book List</h2>
      <BookList />
      <h2>Add Student</h2>
      <AddStudentForm />
      <h2>Add Book</h2>
      <AddBookForm />
      <h2>Assign Book</h2>
      <AssignBookForm />
    </div>
  );
}

export default Home;
