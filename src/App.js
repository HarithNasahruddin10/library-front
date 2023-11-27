// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import BookList from './BookList';
import StudentList from './StudentList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/book" element={<BookList />} />
        <Route path="/student" element={<StudentList />} />
      </Routes>
    </Router>
  );
};

export default App;
