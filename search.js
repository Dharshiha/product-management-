import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function SearchProduct() {
  const [bookId, setBookId] = useState('');
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/books/${bookId}`);
      if (response.ok) {
        const data = await response.json();
        setBook(data);
        setMessage('');
      } else {
        setBook(null);
        setMessage('Book not found');
      }
    } catch (error) {
      console.error('Error searching book:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Search Book</h2>
      <Form>
        <Form.Group controlId="formSearch">
          <Form.Control
            type="text"
            placeholder="Enter ISBN to search"
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSearch} className="mt-2">
          Search
        </Button>
      </Form>
      {message && <Alert variant="danger" className="mt-3">{message}</Alert>}
      {book && (
        <Alert variant="info" className="mt-3">
          <p>Book Name: {book.Bookname}</p>
          <p>Category: {book.Category}</p>
          <p>Stock: {book.Quantity}</p>
        </Alert>
      )}
    </Container>
  );
}

export default SearchProduct;
