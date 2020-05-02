const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const mongoose = require('mongoose');
const configDB = require('./config/database.js');

// configuration ===============================================================

const connectDB = async () => {
  await mongoose.connect(
    configDB.url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (error) => {
      if (error) console.log('error :', error);
      else console.log('Connect successfully');
    }
  );
  mongoose.set('useCreateIndex', true);

  // For this example, need to explicitly create a collection, otherwise
  // you get "MongoError: cannot open $changeStream for non-existent database: test"
  await mongoose.connection.createCollection('Person');

  // Create a new mongoose model
  const personSchema = new mongoose.Schema({
    name: String,
  });
  const Person = mongoose.model('Person', personSchema, 'Person');

  // Create a change stream. The 'change' event gets emitted when there's a
  // change in the database
  Person.watch().on('change', (data) => console.log(new Date(), data));

  // Insert a doc, will trigger the change stream handler above
  console.log(new Date(), 'Inserting doc');
  await Person.create({ name: 'Alibaba' });
  console.log(new Date(), 'Inserted doc');
};

connectDB().catch((error) => console.error(error));
// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
