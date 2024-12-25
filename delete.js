import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

function DeleteBook() {
  const [isbn, setIsbn] = useState('');
  const [message, setMessage] = useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/books/${isbn}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Book deleted successfully!');
        setIsbn('');
      } else {
        setMessage('Failed to delete book.');
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Delete Book</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form>
        <Form.Group controlId="formIsbn">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ISBN to Delete"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="danger"
          onClick={handleDelete}
          className="mt-3"
        >
          Delete Book
        </Button>
      </Form>
    </Container>
  );
}

export default DeleteBook;
