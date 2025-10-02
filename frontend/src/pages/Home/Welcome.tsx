import { useContext } from 'react';
import { PageContext } from '../../App.tsx';

export default function Welcome() {
  const { setCurrentPage } = useContext(PageContext);
  
  return (
    <div className="welcome-page">
      <h1>Welcome to Expenso</h1>
      <p>Track and manage your shared expenses with Alice and Bob.</p>
      <button onClick={() => setCurrentPage('List')}>View Expenses</button>
      <button onClick={() => setCurrentPage('Add')}>Add New Expense</button>
    </div>
  );
}
