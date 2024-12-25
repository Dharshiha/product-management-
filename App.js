import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddBooks from './pages/add';
import SearchProduct from './pages/search';
import Display from './pages/display';
import Delete from './pages/delete';
import Update from './pages/update';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="app-background"> 

       
        <div className="info-bar">
          <p className="info-text">
            <strong>DHARSHIHA D K</strong> | Email: deepshiha@gmail.com | Contact: +123 456 7890
          </p>
        </div>

        <Container className="mt-4">
          {/* Main Title */}
          <h1>DHARSHI'S BOOK STORE</h1>

          {/* Navigation Links as Cards */}
          <Row className="g-4">
            <Col sm={12} md={4} lg={3}>
              <Card className="shadow-sm">
                <Card.Header>Add Book</Card.Header>
                <Card.Body>
                  <Link to="/add">
                    <Button variant="primary">Add Book</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={4} lg={3}>
              <Card className="shadow-sm">
                <Card.Header>Search Book</Card.Header>
                <Card.Body>
                  <Link to="/search">
                    <Button variant="info">Search Book</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={4} lg={3}>
              <Card className="shadow-sm">
                <Card.Header>Display Books</Card.Header>
                <Card.Body>
                  <Link to="/display">
                    <Button variant="success">Display Books</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={4} lg={3}>
              <Card className="shadow-sm">
                <Card.Header>Delete Book</Card.Header>
                <Card.Body>
                  <Link to="/delete">
                    <Button variant="danger">Delete Book</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12} md={4} lg={3}>
              <Card className="shadow-sm">
                <Card.Header>Update Book</Card.Header>
                <Card.Body>
                  <Link to="/update">
                    <Button variant="warning">Update Book</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Routes */}
        <Routes>
          <Route path="/add" element={<AddBooks />} />
          <Route path="/search" element={<SearchProduct />} />
          <Route path="/display" element={<Display />} />
          <Route path="/delete" element={<Delete />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
