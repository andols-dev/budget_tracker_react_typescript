
import { useState } from 'react';
import { Button, Container, Form, Col, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  interface IncomeCategory {
    name: string;
  }
  interface ExpenseCategory {
    name: string;
  }
  const incomeCategories: IncomeCategory[] = [
    { name: 'Salary' },
    { name: 'Bonus' },
    { name: 'Other' },
  ];
  const expenseCategories: ExpenseCategory[] = [
    { name: 'Food' },
    { name: 'Transport' },
    { name: 'Other' },
  ];
  const [selectedIncomeCategory, setSelectedIncomeCategory] = useState<string>(' ');

  const handleIncomeCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIncomeCategory(event.target.value);
  };
  return (
    <Container className="mt-5">
      <h1 className="text-center">Budget Tracker</h1>
      <p className="text-center">Manage your finances effectively</p>
      <hr />
      <Row>
      <Col md={6} className="mb-4">
      <h1>Income</h1>

      <Form>
        <Form.Group >
          <Form.Label>Income Name</Form.Label>
          <Form.Control type="text" placeholder=" Enter income" />
        </Form.Group>

        <Form.Group >
          <Form.Label>Income amount</Form.Label>
          <Form.Control type="number" placeholder="Enter income amount" />
        </Form.Group>
        
        <Form.Group >
          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Select income category"
            value={selectedIncomeCategory}
            onChange={handleIncomeCategoryChange}
            >
            <option>Select Category</option>
            {incomeCategories.map((category, index) => (
              <option key={index} value={index + 1}>{category.name}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit" style={{ marginTop: '1rem' }}>
          Add income
        </Button>
      </Form>
      </Col>
      <Col md={6} className="mb-4">
      <h1>Expense</h1>
      <Form>
        <Form.Group>
          <Form.Label>Expense name</Form.Label>
          <Form.Control type="text" placeholder="Enter expense" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Expense amount</Form.Label>
          <Form.Control type="number" placeholder="Enter expense amount" />
        </Form.Group>
        <Form.Group >
          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Default select example">
            <option>Select Category</option>
            <option value="1">Food</option>
            <option value="2">Transport</option>
            <option value="3">Other</option>
          </Form.Select>
        </Form.Group>


      <Button variant="primary" type="submit" style={{ marginTop: '1rem' }}>
        Add expense
      </Button>
      </Form>
        </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-4">
          <h1>Income List</h1>
          <ul>
            <li>Salary: 5000</li>
            <li>Bonus: 1000</li>
          </ul>
          </Col>
          <Col md={6} className="mb-4">
          <h1>Expense List</h1>
          <ul>
            <li>Food: 200</li>
            <li>Transport: 100</li>
          </ul>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-4">
          <h1>Total Income</h1>
          <p>6000</p>
          </Col>
          <Col md={6} className="mb-4">
          <h1>Total Expense</h1>
          <p>300</p>
          </Col>
        </Row>
        
        <Row>
          <Col md={12} className="mb-4">
          <h1>Income vs Expense</h1>
          <div style={{ width: '100%', height: '400px', backgroundColor: '#f0f0f0' }}>
            <p>Chart will be here</p>
          </div>
          </Col>
        </Row>

    </Container>

  );
 
}

export default App
