
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function getAllExpenses(sortBy = 'id', sortOrder = 'asc') {
  // Returns all expenses from the database, sorted
  return await prisma.expense.findMany({
    orderBy: { [sortBy]: sortOrder }
  });
}

async function addExpense(expense) {
  // Adds a new expense to the database
  // Remove id if present, let DB autoincrement
  const { id, ...expenseData } = expense;
  // Ensure amount is a number
  if (typeof expenseData.amount !== 'number') {
    expenseData.amount = parseFloat(expenseData.amount) || 0;
  }
  // Ensure date is a JS Date object
  if (typeof expenseData.date === 'string') {
    // If only a date is provided, add time to make it ISO
    if (/^\d{4}-\d{2}-\d{2}$/.test(expenseData.date)) {
      expenseData.date = new Date(expenseData.date + 'T00:00:00.000Z');
    } else {
      expenseData.date = new Date(expenseData.date);
    }
  }
  // Validate required fields
  if (!expenseData.date || !expenseData.description || !expenseData.payer || isNaN(expenseData.amount)) {
    throw new Error('Missing or invalid expense data');
  }
  console.log('Saving expense:', expenseData);
  const created = await prisma.expense.create({
    data: expenseData
  });
  return created;
}

// Optionally, you can keep resetExpenses for local dev, but it won't affect DB
function resetExpenses() {
  return [];
}

module.exports = {
  getAllExpenses,
  addExpense,
  resetExpenses,
};
