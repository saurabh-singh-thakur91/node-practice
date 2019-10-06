const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOper = require('./operations'); //our file based node module

const url = 'mongodb://localhost:27017/';
const dbName = 'confusion';

mongoClient.connect(url)
  .then((client) => {
    console.log('Connected to the server');

    const db = client.db(dbName);

    dbOper.insertDocument(db, 'dishes', {
        name: "pizza",
        description: "Italian"
      })
      .then((result) => {
        console.log('Insert document: ', result.ops);

        return dbOper.findDocuments(db, 'dishes');
      })
      .then((docs) => {
        console.log('Found documents:\n', docs);

        return dbOper.updateDocument(db, 'dishes', {
          name: "pizza"
        }, {
          description: "Italian wood fired"
        });
      })
      .then((result) => {
        console.log('Updated document:\n', result.result);

        return dbOper.findDocuments(db, 'dishes');
      })
      .then((docs) => {
        console.log('Found documents:\n', docs);

        return db.dropCollection('dishes');
      })
      .then((result) => {
        console.log('Dropped collection dishes');

        client.close();

      });
  })
  .catch((err) => console.log(err)); // mongoClient.connect ends here
