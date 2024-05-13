const mongoose = require('mongoose');
const path = require('path');
const User = require('./userModel'); // Adjusted require statement

// Set the absolute path to the seed script
const seedFilePath = path.resolve(__dirname, 'seed.js');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Dummy user data
const users = [
  { username: 'ram', email: 'ram@example.com' },
  { username: 'karan', email: 'karan@example.com' },
  { username: 'pawan', email: 'pawan@example.com' },
  { username: 'suman', email: 'suman@example.com' },
  // Add more dummy data as needed
];

// Seed function to insert users into the database
const seed = async () => {
  try {
    // Delete existing users
    await User.deleteMany({});
    // Insert dummy users
    await User.insertMany(users);
    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Error seeding database:', err.message);
  } finally {
    // Close database connection
    mongoose.connection.close();
  }
};

// Run seed function
seed();

// Export seed file path for reference
module.exports = seedFilePath;
