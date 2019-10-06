const assert = require('assert');

/*
 Using promises instead of callbacks
*/

exports.insertDocument = (db, collection, doc, callback) => {
  const coll = db.collection(collection);
  //.insert is deprecated use insertOne, insertMany or bulkWrite
  //mongoClient provides promises support, call to insertOne and other functions returns a promise
  return coll.insertOne(doc);
};

exports.findDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);
  //{} empty object, finds all the documents
  return coll.find({}).toArray();
};

exports.updateDocument = (db, collection, doc, update, callback) => {
  const coll = db.collection(collection);

  return coll.updateOne(doc, {
    $set: update
  }, null);
};

exports.removeDocument = (db, collection, doc, callback) => {
  const coll = db.collection(collection);

  return coll.deleteOne(doc);
};
