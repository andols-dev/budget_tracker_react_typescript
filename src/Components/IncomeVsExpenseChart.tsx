import { Line } from 'react-chartjs-2'; // Importera Line-diagrammet från react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const IncomeVsExpenseChart = ({ incomeList, expenseList }: { incomeList: Income[], expenseList: Expense[] }) => {
  // Beräkna totala inkomster och utgifter per månad (eller använd annan logik)
  const totalIncome = incomeList.reduce((sum, income) => sum + income.amount, 0);
  const totalExpense = expenseList.reduce((sum, expense) => sum + expense.amount, 0);

  // Data som kommer att visas i grafen
  const data = {
    labels: ['Total Income', 'Total Expense'], // X-axel etiketter
    datasets: [
      {
        label: 'Income vs Expense',
        data: [totalIncome, totalExpense], // Data för inkomster och utgifter
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1, // Gör linjen lite mjukare
      },
    ],
  };

  // Diagrammets alternativ (kan anpassas)
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Income vs Expense Comparison',
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default IncomeVsExpenseChart;