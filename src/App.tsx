
import { useState } from 'react';
import { Button, Container, Form, Col, Row } from 'react-bootstrap'
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
  const [incomeList, setIncomeList] = useState<Income[]>([]);
  const [expenseList, setExpenseList] = useState<Expense[]>([]);
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
    const parsedAmount = Number(incomeAmount); 

        // check if expenseName is empty
        if (incomeName.trim() === '') {
          alert('Please enter an income name');
          return; // stop further execution
        }
        // check if parsedAmount is empty
        if (incomeAmount.trim() === '') {
          alert('Please enter an income amount');
          return; // stop further execution
        }
        // check if parsedAmount is NaN
        if (isNaN(parsedAmount)) {
          alert('Please enter a valid income amount');
          return;
        }
        if(Number(incomeName))
        {
          alert('Number is not a valid income name');
        }
        
        // check if selectedExpenseCategory is empty
        if (selectedIncomeCategory.trim() === '' || selectedIncomeCategory === 'Select income category') {
          alert('Please select a valid income category');
          return;
        }


  
    const newIncome: Income = {
      id: uuid(),
      name: incomeName,
      amount: parsedAmount,
      category: selectedIncomeCategory,

    };
    setIncomeList([...incomeList, newIncome]);
    console.log('New Income:', newIncome);
    // Reset form fields
    setIncomeName('');
    setIncomeAmount('');
    setSelectedIncomeCategory(' ');
  };
  const handleExpenseSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedAmount = Number(expenseAmount);
    
    // check if expenseName is empty
    if (expenseName.trim() === '') {
      alert('Please enter an expense name');
      return; // stop further execution
    }
    // check if parsedAmount is empty
    if (expenseAmount.trim() === '') {
      alert('Please enter an expense amount');
      return; // stop further execution
    }
    // check if parsedAmount is NaN
    if (isNaN(parsedAmount)) {
      alert('Please enter a valid expense amount');
      return;
    }
    if(Number(expenseName))
    {
      alert('Number is not a valid expense name');
    }
    
    // check if selectedExpenseCategory is empty
    if (selectedExpenseCategory.trim() === '' || selectedExpenseCategory === 'Select expense category') {
      alert('Please select a valid expense category');
      return;
    }
    
    const newExpense: Expense = {
      id: uuid(),
      name: expenseName,
      amount: parsedAmount,
      category: selectedExpenseCategory,
    };
    
    setExpenseList([...expenseList, newExpense]);
    console.log('New Expense:', newExpense);
    
    // Reset form fields
    setExpenseName('');
    setExpenseAmount('');
    setSelectedExpenseCategory('');
  };
  
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

        <Row>
          <Col md={6} className="mb-4">
          <h1>Income List</h1>
          <ul>
            {incomeList.map((income) => (
              <li key={income.id}>
                {income.name} - {income.amount} - {income.category}
              </li>
            ))}
          </ul>
          </Col>
          <Col md={6} className="mb-4">
          <h1>Expense List</h1>
          <ul>
            {expenseList.map((expense) => (
              <li key={expense.id}>
                {expense.name} - {expense.amount} - {expense.category}
              </li>
            ))}
          </ul>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="mb-4">
          <h1>Total Income</h1>
          <p>{totalIncome}</p>
          </Col>
          <Col md={6} className="mb-4">
          <h1>Total Expense</h1>
          <p>{totalExpense}</p>
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
