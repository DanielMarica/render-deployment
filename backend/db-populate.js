const { PrismaClient } = require('./generated/prisma');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

function toISODate(dateStr) {
  // If already ISO, return as is
  if (dateStr.includes('T')) return dateStr;
  // Convert "YYYY-MM-DD" to "YYYY-MM-DDT00:00:00.000Z"
  return new Date(dateStr).toISOString();
}

async function main() {
  try {
    const dataPath = path.join(__dirname, 'data', 'expenses.json');
    let expenses = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    // Vider la table existante pour éviter les doublons
    console.log('Suppression des données existantes...');
    await prisma.expense.deleteMany({});
    
    // Transformer les données SANS les IDs (auto-increment)
    const expensesWithoutIds = expenses.map(exp => ({
      date: new Date(toISODate(exp.date)),
      description: exp.description,
      payer: exp.payer,
      amount: exp.amount
    }));
    
    console.log('Insertion des nouvelles données...');
    const result = await prisma.expense.createMany({
      data: expensesWithoutIds
    });
    
    console.log(`✅ ${result.count} dépenses ajoutées avec succès !`);
    
    // Afficher les données pour vérifier
    const allExpenses = await prisma.expense.findMany({
      orderBy: { id: 'asc' }
    });
    
    console.log('\n📋 Données dans la base :');
    console.table(allExpenses);
    
  } catch (error) {
    console.error('❌ Erreur lors du peuplement de la base :', error);
    throw error;
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });