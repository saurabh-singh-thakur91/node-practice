const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOper = require('./operations'); //our file based node module

const url = 'mongodb://localhost:27017/';
const dbName = 'confusion';

mongoClient.connect(url, (err, client) => {
  assert.equal(err, null);

  console.log('Connected to the server');

  const db = client.db(dbName);

  dbOper.insertDocument (db, 'dishes', {name: "pizza", description: "Italian"}, (result) => {
    console.log('Insert document: ',result.ops);

    dbOper.findDocuments(db, 'dishes', (docs) => {
      console.log('Found documents:\n',docs);

      dbOper.updateDocument(db, 'dishes', {name: "pizza"}, {description: "Italian wood fired"}, (result) => {
        console.log('Updated document:\n',result.result);

        dbOper.findDocuments(db, 'dishes', (docs) => {
          console.log('Found documents:\n',docs);

          db.dropCollection('dishes', (err, result) => {
            assert.equal(err, null);

            console.log('Dropped collection dishes');

            client.close();

          });

        });

      });

    });

  });

}); // mongoClient.connect ends here
