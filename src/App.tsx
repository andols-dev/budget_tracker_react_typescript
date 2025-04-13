
import { useState, useEffect } from 'react';
import { Button, Container, Form,  ToastContainer, Toast,Row, Col,Card, ListGroup,Badge } from 'react-bootstrap'

import { v4 as uuid } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import IncomeVsExpenseChart from './Components/IncomeVsExpenseChart';

function App() {
  interface IncomeCategory {
    name: string;
  }
  interface ExpenseCategory {
    name: string;
  }
  interface Income {
    id: string;
    name: string;
    amount: number;
    category: string;
  }
  interface Expense {
    id: string;
    name: string;
    amount: number;
    category: string;
  }
  const incomeCategories: IncomeCategory[] = [
    { name: 'Salary' },
    { name: 'Bonus' },
    { name: 'Other' },
    { name: 'Investment' },
    { name: 'Freelancing' },
   
  ];
  const expenseCategories: ExpenseCategory[] = [
    { name: 'Food' },
    { name: 'Transport' },
    { name: 'Other' },
  ];
  type validationParams = {
    name: string;
    type: 'income' | 'expense';
    amount: string;
    category: string;
    categoryPlaceHolder: string;
/*     amount: string;
    category: string;
    categoryPlaceHolder: string;
     */
  }

  const [showToast,setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const validateBeforeSubmit = ({name,type,amount,category, categoryPlaceHolder}:validationParams) => {
    const parsedAmount = Number(amount);
    // check if name is empty
    if (name.trim() === '') {
      alert(`Please enter a ${type} name`); 
      return false;
    }
    if (amount.trim() === '') {
      alert(`Please enter a ${type} amount`); 
      return false;
    }
    
    // check if parsedAmount is NaN
    if (isNaN(parsedAmount)) {
      alert(`Please enter a valid ${type} amount`);
      return false;
    }
    if(Number(name))
    {
      alert(`Number is not a valid ${type} name`);
      return false;
    }

    // check if selectedExpenseCategory is empty
    if (category.trim() === '' || category === categoryPlaceHolder) {
      alert('Please select a valid income category');
      return false;
    } 
    return true;
  }
  const [incomeList, setIncomeList] = useState<Income[]>(() => {
    const savedIncomes = localStorage.getItem('incomeList');
    return savedIncomes ? JSON.parse(savedIncomes) : [];
  });
  const [expenseList, setExpenseList] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem('expenseList');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem('incomeList', JSON.stringify(incomeList));
  }, [incomeList]);

  useEffect(() => {
    localStorage.setItem('expenseList', JSON.stringify(expenseList));
  },[expenseList]);
  const [incomeName, setIncomeName] = useState<string>('');
  const [incomeAmount, setIncomeAmount] = useState<string>('');
  const [expenseName, setExpenseName] = useState<string>('');
  const [expenseAmount, setExpenseAmount] = useState<string>('');
  const [selectedExpenseCategory, setSelectedExpenseCategory] = useState<string>(' ');
  const totalIncome = incomeList.reduce((sum, income) => sum + income.amount, 0);
  const totalExpense = expenseList.reduce((sum, expense) => sum + expense.amount, 0);


  const [selectedIncomeCategory, setSelectedIncomeCategory] = useState<string>(' ');

  const handleIncomeCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIncomeCategory(event.target.value);
  };
  const handleIncomeNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIncomeName(event.target.value);
  };
  const handleIncomeAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIncomeAmount(event.target.value);
  };
  const handleExpenseNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseName(event.target.value);
  };
  const handleExpenseAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseAmount(event.target.value);
  };
  const handleExpenseCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExpenseCategory(event.target.value);
  };
  
  const handleIncomeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateBeforeSubmit({
      name: incomeName,
      type: 'income',
      amount: incomeAmount,
      category: selectedIncomeCategory,
      categoryPlaceHolder: 'Select income category'
    });

    if (!isValid) {
      return;
    }

    const newIncome: Income = {
      id: uuid(),
      name: incomeName,
      amount: Number(incomeAmount),
      category: selectedIncomeCategory,

    };
    setIncomeList([...incomeList, newIncome]);
    console.log('New Income:', newIncome);
    setToastMessage(`New Income added ${newIncome.name}`);
    setShowToast(true);
    // Reset form fields
    setIncomeName('');
    setIncomeAmount('');
    setSelectedIncomeCategory(' ');
  };
  const handleExpenseSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = validateBeforeSubmit({
      name: expenseName,
      type: 'expense',
      amount: expenseAmount,
      category: selectedExpenseCategory,
      categoryPlaceHolder: "Select expense category"
    });

    if (!isValid) {
      return;
    }

    const newExpense: Expense = {
      id: uuid(),
      name: expenseName,
      amount: Number(expenseAmount),
      category: selectedExpenseCategory,

    };
    setExpenseList([...expenseList, newExpense]);
    console.log('New Expense:', newExpense);
    setToastMessage(`New expense added: ${newExpense.name}`);
    setShowToast(true);
    // Reset form fields
    setExpenseName('');
    setExpenseAmount('');
    setSelectedExpenseCategory(' ');
  };

  const removeIncome = (id: string) => {
    const updatedList = incomeList.filter(item => item.id !== id);
    setIncomeList(updatedList)
  }

  const removeExpense = (id: string) => {
    const updatedList = expenseList.filter(item => item.id !== id);
    setExpenseList(updatedList);
  }
  
  const balance = totalIncome - totalExpense;

  const balanceTextColor = balance > 0 ? 'text-success' : balance < 0 ? 'text-danger' : 'text-secondary';
  return (
    <Container className="mt-5">
      <h1 className="text-center">Budget Tracker</h1>
      <p className="text-center">Manage your finances effectively</p>
      <hr />
      <Row>
      <Col md={6} className="mb-4">
      <h1>Income</h1>

      <Form onSubmit={handleIncomeSubmit}>
        <Form.Group >
          <Form.Label>Income Name</Form.Label>
          <Form.Control type="text" placeholder=" Enter income" value={incomeName} onChange={handleIncomeNameChange}/>
        </Form.Group>

        <Form.Group >
          <Form.Label>Income amount</Form.Label>
          <Form.Control type="number" placeholder="Enter income amount" value={incomeAmount} onChange={handleIncomeAmountChange} />
        </Form.Group>
        
        <Form.Group >
          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Select income category"
            value={selectedIncomeCategory}
            onChange={handleIncomeCategoryChange}
            >
            <option>Select Category</option>
            {incomeCategories.map((category, index) => (
              <option key={index} >{category.name}</option>
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
      <Form onSubmit={handleExpenseSubmit}>
        <Form.Group>
          <Form.Label>Expense name</Form.Label>
          <Form.Control type="text" 
          value={expenseName} 
          onChange={handleExpenseNameChange}  
          placeholder="Enter expense" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Expense amount</Form.Label>
          <Form.Control type="number" placeholder="Enter expense amount" 
            value={expenseAmount}
            onChange={handleExpenseAmountChange}/>
        </Form.Group>
        <Form.Group >
          <Form.Label>Category</Form.Label>
          <Form.Select 
            aria-label="Select expense category"
            value={selectedExpenseCategory}
            onChange={handleExpenseCategoryChange}
          >
            <option>Select Category</option>
            {expenseCategories.map((category, index) => (
              <option key={index} >{category.name}</option>
            ))}
          </Form.Select>
        </Form.Group>


      <Button variant="primary" type="submit" style={{ marginTop: '1rem' }}>
        Add expense
      </Button>
      </Form>
        </Col>
        </Row>
        <ToastContainer position="top-end" className="p-3">
  <Toast show={showToast} className="bg-success text-white" onClose={() => setShowToast(false)} delay={3000} autohide>
    <Toast.Body>{toastMessage}</Toast.Body>
  </Toast>
</ToastContainer>

<Row>
  <Col md={6} className="mb-4">
    <h2>Income List</h2>
    <ListGroup>
      {incomeList.map((income) => (
        <ListGroup.Item
          key={income.id}
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{income.name}</strong> - {income.amount}{' '}
            <Badge bg="success" className="ms-2">
              {income.category}
            </Badge>
          </div>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => removeIncome(income.id)}
          >
            Remove
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </Col>

  <Col md={6} className="mb-4">
    <h2>Expense List</h2>
    <ListGroup>
      {expenseList.map((expense) => (
        <ListGroup.Item
          key={expense.id}
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            <strong>{expense.name}</strong> - {expense.amount}{' '}
            <Badge bg="danger" className="ms-2">
              {expense.category}
            </Badge>
          </div>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => removeExpense(expense.id)}
          >
            Remove
          </Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </Col>
</Row>


<Row className="mb-4">
  <Col md={6}>
    <Card className="shadow-sm border-success">
      <Card.Body>
        <Card.Title className="text-success">Total Income</Card.Title>
        <Card.Text className="fs-4 fw-bold">
          {totalIncome} Sek
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>

  <Col md={6}>
    <Card className="shadow-sm border-danger">
      <Card.Body>
        <Card.Title className="text-danger">Total Expense</Card.Title>
        <Card.Text className="fs-4 fw-bold">
          {totalExpense} Sek
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
  <Col md={12} className="mt-4">
    <Card className="shadow-sm border-0 bg-light">
      <Card.Body>
        <Card.Title>Balance</Card.Title>
        <Card.Text className={`fs-3 fw-bold ${balanceTextColor}`}>
          {balance}
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
</Row>
        
        <Row>
          <Col md={12} className="mb-4">
          <h1>Income vs Expense</h1>
            <IncomeVsExpenseChart incomeList={incomeList} expenseList={expenseList} />
            
          </Col>
        </Row>

    </Container>

  );
 
}

export default App
