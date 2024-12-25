import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function AddBooks() {
  const [book, setBook] = useState({
    Isbn: '',
    Bookname: '',
    Category: '',
    Quantity: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        setMessage('Book added successfully!');
        setBook({ Isbn: '', Bookname: '', Category: '', Quantity: '' });
      } else {
        setMessage('Failed to add book.');
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add a New Book</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formIsbn">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ISBN"
            name="Isbn"
            value={book.Isbn}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBookname">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Book Name"
            name="Bookname"
            value={book.Bookname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Category"
            name="Category"
            value={book.Category}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Quantity"
            name="Quantity"
            value={book.Quantity}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default AddBooks;
