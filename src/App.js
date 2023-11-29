// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import BookList from './BookList';
import StudentList from './StudentList';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AssignedBookList from './AssignedBookList';

const App = () => {
  return (
    <>
    <ToastContainer position="bottom-left"
     closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={2} />
    <Router>
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/student" element={<StudentList />} />
        <Route path="/assigned-book" element={<AssignedBookList/>} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
