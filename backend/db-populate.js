const { PrismaClient } = require('./generated/prisma');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🧹 Suppression des données existantes...');
    // Supprimer dans le bon ordre (à cause des clés étrangères)
    await prisma.transfer.deleteMany({});
    await prisma.expense.deleteMany({});
    await prisma.user.deleteMany({});
    
    console.log('👥 Création des utilisateurs...');
    const users = await Promise.all([
      prisma.user.create({
        data: {
          name: 'Alice',
          email: 'alice@expenso.dev',
          bankAccount: 'FR76 1234 5678 9012 3456 7890'
        }
      }),
      prisma.user.create({
        data: {
          name: 'Bob',
          email: 'bob@expenso.dev',
          bankAccount: 'FR76 0987 6543 2109 8765 4321'
        }
      }),
      prisma.user.create({
        data: {
          name: 'Charlie',
          email: 'charlie@expenso.dev',
          bankAccount: 'FR76 5555 4444 3333 2222 1111'
        }
      })
    ]);
    
    console.log(`✅ ${users.length} utilisateurs créés !`);
    
    console.log('💰 Création des dépenses...');
    const expenses = await Promise.all([
      prisma.expense.create({
        data: {
          description: 'Restaurant italien',
          amount: 85.50,
          date: new Date('2025-01-15'),
          payerId: users[0].id, // Alice
          participants: {
            connect: [{ id: users[0].id }, { id: users[1].id }] // Alice et Bob
          }
        }
      }),
      prisma.expense.create({
        data: {
          description: 'Course Uber',
          amount: 25.30,
          date: new Date('2025-01-16'),
          payerId: users[1].id, // Bob
          participants: {
            connect: [{ id: users[0].id }, { id: users[1].id }, { id: users[2].id }] // Tous
          }
        }
      }),
      prisma.expense.create({
        data: {
          description: 'Cinéma',
          amount: 45.00,
          date: new Date('2025-01-17'),
          payerId: users[2].id, // Charlie
          participants: {
            connect: [{ id: users[1].id }, { id: users[2].id }] // Bob et Charlie
          }
        }
      }),
      prisma.expense.create({
        data: {
          description: 'Supermarché',
          amount: 120.75,
          date: new Date('2025-01-18'),
          payerId: users[0].id, // Alice
          participants: {
            connect: [{ id: users[0].id }, { id: users[2].id }] // Alice et Charlie
          }
        }
      })
    ]);
    
    console.log(`✅ ${expenses.length} dépenses créées !`);
    
    console.log('💸 Création des virements...');
    const transfers = await Promise.all([
      prisma.transfer.create({
        data: {
          amount: 42.75, // Bob rembourse Alice pour le restaurant (85.50 / 2)
          date: new Date('2025-01-19'),
          sourceId: users[1].id, // Bob
          targetId: users[0].id  // Alice
        }
      }),
      prisma.transfer.create({
        data: {
          amount: 8.43, // Alice rembourse Bob pour Uber (25.30 / 3)
          date: new Date('2025-01-20'),
          sourceId: users[0].id, // Alice
          targetId: users[1].id  // Bob
        }
      }),
      prisma.transfer.create({
        data: {
          amount: 22.50, // Bob rembourse Charlie pour le cinéma (45.00 / 2)
          date: new Date('2025-01-21'),
          sourceId: users[1].id, // Bob
          targetId: users[2].id  // Charlie
        }
      })
    ]);
    
    console.log(`✅ ${transfers.length} virements créés !`);
    
    // Afficher un résumé complet
    console.log('\n📊 RÉSUMÉ DES DONNÉES :');
    
    console.log('\n👥 Utilisateurs :');
    const allUsers = await prisma.user.findMany();
    console.table(allUsers);
    
    console.log('\n💰 Dépenses avec participants :');
    const allExpenses = await prisma.expense.findMany({
      include: {
        payer: { select: { name: true } },
        participants: { select: { name: true } }
      }
    });
    console.table(allExpenses.map(e => ({
      id: e.id,
      description: e.description,
      amount: e.amount,
      payer: e.payer.name,
      participants: e.participants.map(p => p.name).join(', ')
    })));
    
    console.log('\n� Virements :');
    const allTransfers = await prisma.transfer.findMany({
      include: {
        source: { select: { name: true } },
        target: { select: { name: true } }
      }
    });
    console.table(allTransfers.map(t => ({
      id: t.id,
      amount: t.amount,
      from: t.source.name,
      to: t.target.name,
      date: t.date.toISOString().split('T')[0]
    })));
    
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