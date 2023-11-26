import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch all books from the API
    axios.get('/api/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div>
      <h1>Library Management System</h1>
      <h2>All Books</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Author</th>
            <th>Category</th>
            <th>Year Published</th>
            <th>Book Image</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.desc}</td>
              <td>{book.author}</td>
              <td>{book.category}</td>
              <td>{book.yearPublish}</td>
              <td>
                {book.bookImage && (
                  <img
                    src={`/images/${book.bookImage}`}
                    alt={book.title}
                    style={{ width: '50px', height: '50px' }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
