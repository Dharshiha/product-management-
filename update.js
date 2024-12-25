import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function UpdateBook() {
  const [isbn, setIsbn] = useState('');
  const [book, setBook] = useState({
    Bookname: '',
    Category: '',
    Quantity: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/books/${isbn}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        setMessage('Book updated successfully!');
        setBook({ Bookname: '', Category: '', Quantity: '' });
        setIsbn('');
      } else {
        setMessage('Failed to update book.');
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Update Book</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formIsbn">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBookname">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter New Book Name"
            name="Bookname"
            value={book.Bookname}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter New Category"
            name="Category"
            value={book.Category}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter New Quantity"
            name="Quantity"
            value={book.Quantity}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Update Book
        </Button>
      </Form>
    </Container>
  );
}

export default UpdateBook;
