const mongoose = require('mongoose');
const User = require('../models/userModel');
const { connectDB, disconnectDB } = require('../config/db');

// Sample user data with various ages
const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 25
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    age: 40
  },
  {
    name: 'Alice Williams',
    email: 'alice@example.com',
    age: 35
  },
  {
    name: 'Young User',
    email: 'young@example.com',
    age: 18  // Under 21, won't be returned by API
  }
];

// Seed database function
async function seedDatabase() {
  try {
    // Connect to the database
    await connectDB();
    
    // Check if the database already has users
    const count = await User.countDocuments();
    
    if (count > 0) {
      console.log(`Database already has ${count} users. Clearing existing data...`);
      await User.deleteMany({});
    }
    
    // Insert sample users
    const result = await User.insertMany(users);
    
    console.log(`Database seeded with ${result.length} users:`);
    result.forEach(user => {
      console.log(`- ${user.name} (${user.email}): age ${user.age}, ID: ${user._id}`);
    });
    
    // Disconnect from the database
    await disconnectDB();
    
    return result;
  } catch (error) {
    console.error('Error seeding database:', error);
    // Disconnect from the database on error
    await disconnectDB();
    throw error;
  }
}

// Run seeding if this script is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Database seeding completed successfully');
      process.exit(0);
    })
    .catch(error => {
      console.error('Database seeding failed:', error);
      process.exit(1);
    });
}

module.exports = seedDatabase; 