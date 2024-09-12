const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// MongoDB connection URI and database name
const uri = 'mongodb+srv://roei159963:3akHuZrNcA83MyPo@cluster0.1ymzk.mongodb.net/';
const dbName = 'testdb';
const client = new MongoClient(uri);

// MongoDB Atlas connection
let db;
async function connectToMongoDB() {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log('Connected to MongoDB');

  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
}

//start the connection to the database
connectToMongoDB();

// Function to insert data
async function insertData(data) {
    try {
      const collection = db.collection('orders'); // collection name
      const result = await collection.insertOne(data);
      return result;
    } catch (err) {
      console.error('Failed to insert data', err);
      throw err;
    }
  }

// Function to check if user exists in the database
async function IsInDatabase(loginInfo, collectionName) {
  try {
      const collection = db.collection(collectionName); // Reference to the 'users' collection
      const user = await collection.findOne({ username: loginInfo.username, password: loginInfo.password });
      return user;  // Return the user document if found
  } catch (err) {
      console.error('Error finding user in database', err);
      throw err;
  }
}

module.exports = { insertData, IsInDatabase };  // Exporting functions