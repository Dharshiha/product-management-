import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';

function Display() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/books');
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Books Collection</h2>
      <Row>
        {books.map((book) => (
          <Col sm={6} md={4} lg={3} key={book.Isbn} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{book.Bookname}</Card.Title>
                <Card.Text>Category: {book.Category}</Card.Text>
                <Card.Text>Stock: {book.Quantity}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Display;
