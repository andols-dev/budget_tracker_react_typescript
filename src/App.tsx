import { useState } from 'react'
import { Button, Container, Form, Col, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
  return (
    <Container className="mt-5">
      <Row>
      <Col md={6} className="mb-4">
      <h1>Income</h1>

      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </Col>
      <Col md={6} className="mb-4">
      <h1>Expense</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
        </Col>
        </Row>
    </Container>

  );
 
}

export default App
