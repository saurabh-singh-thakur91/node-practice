const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbName = 'confusion';

mongoClient.connect(url, (err, client) => {
  assert.equal(err, null);

  console.log('Connected to the server');

  const db = client.db(dbName);
  const collection = db.collection('dishes');

  collection.insertOne({"name": "noodles", "description": "chinese dish"}, (err, result) => {
    assert.equal(err, null);

    console.log('Successfully inserted one record');

    console.log(result.ops); // ops: property, contains number of operations carried out

    collection.find({}).toArray((err, docs) => {
      assert.equal(err, null);

      console.log('Found: ');
      console.log(docs);

      db.dropCollection('dishes', (err, result) => {
        assert.equal(err, null);

        client.close();
      });

    }); // collection .find ends here

  }); // collection.insertOne ends here

}); // mongoClient.connect ends here
