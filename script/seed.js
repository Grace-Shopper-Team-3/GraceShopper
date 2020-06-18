//seed.js
'use strict'
const {green, red} = require('chalk')
const db = require('../server/db')
const {User, Product, Order, ProductOrder} = require('../server/db/models')
const {makeManyPlants} = require('../server/db/seed_methods')

const users = [
  {
    firstName: 'Danielle',
    lastName: 'Sisk',
    email: 'ds@hotmail.com',
    password: 'thisiscool',
    googleId: null,
    address: '77 Hanover Square',
    isAdmin: true
  },
  {
    firstName: 'Lisa',
    lastName: 'Diaz',
    email: 'ld@yahoo.com',
    password: 'super',
    googleId: null,
    address: '20 Hanover Square',
    isAdmin: false
  },
  {
    firstName: 'Kelsey',
    lastName: 'Wallace',
    email: 'k9@aol.com',
    password: 'k9',
    googleId: null,
    address: '1 Hanover Square',
    isAdmin: false
  },
  {
    firstName: 'Santa',
    lastName: 'Clause',
    email: 'lily@yahoo.com',
    password: 'imlily',
    googleId: null,
    address: '4 Hanover Square',
    isAdmin: true
  },
  {
    firstName: 'Kate',
    lastName: 'Norton',
    email: 'kate@yahoo.com',
    password: 'teamthree!',
    googleId: null,
    address: '9 Hanover Square',
    isAdmin: true
  },
  {
    firstName: 'Veronica',
    lastName: 'Miller',
    email: 'vv@aol.com',
    password: 'HELLO',
    googleId: null,
    address: '5 Hanover Square',
    isAdmin: true
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  // users
  const seedUsers = await Promise.all(users.map(user => User.create(user)))
  console.log(`seeded ${seedUsers.length} users`)

  // products
  const manyProducts = makeManyPlants(101)
  const seedProducts = await Promise.all(
    manyProducts.map(plant => Product.create(plant))
  )
  console.log(`seeded ${seedProducts.length} products`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
