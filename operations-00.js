const assert = require('assert');

exports.insertDocument = (db, collection, doc, callback) => {
  const coll = db.collection(collection);
  //.insert is deprecated use insertOne, insertMany or bulkWrite
  coll.insertOne(doc, (err, result) => {
      assert.equal(err, null);

      /*
      * result contains a property result which is a javascript object that contains a property
      * n that tells how many documents were inserted
      */
      console.log('Inserted ' + result.result.n + " documents into the collection " + collection);

      callback(result);
  });
};

exports.findDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);
  //{} empty object, finds all the documents
  coll.find({}).toArray((err, docs) => {
    assert.equal(err, null);

    callback(docs);
  });
};

exports.updateDocument = (db, collection, doc, update, callback) => {
  const coll = db.collection(collection);

  coll.updateOne(doc, {$set: update}, null, (err, result) => {
    assert.equal(err, null);

    console.log("Updated the document with: ", update);

    callback(result);
  });
};

exports.removeDocument = (db, collection, doc, callback) => {
  const coll = db.collection(collection);

  coll.deleteOne(doc, (err, result) => {
    assert.equal(err, null);

    console.log("Removed the document: ",  doc);

    callback(result);
  });
};
