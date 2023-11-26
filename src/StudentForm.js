import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = ({ setStudents }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newStudent = {
      firstName,
      lastName,
      studentId,
      email,
      phoneNum
    };

    // Send the new student data to the server
    axios.post('/api/students', newStudent)
      .then(response => {
        setStudents(prevStudents => [...prevStudents, response.data]);
        // Clear the form
        setFirstName('');
        setLastName('');
        setStudentId('');
        setEmail('');
        setPhoneNum('');
      })
      .catch(error => console.error('Error creating student:', error));
  };

  return (
    <div>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields for student details */}
        {/* ... */}
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default StudentForm;
