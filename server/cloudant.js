const log4js = require('log4js');
const logger = log4js.getLogger('[ CLOUDANT ]');
const chalk = require('chalk');
const dotenv = require('dotenv');

dotenv.config();

const Cloudant = require('@cloudant/cloudant');

const cloudant = new Cloudant({
    url: process.env.CLOUDANT_HOST,
    plugins: {
        iamauth: {
            iamApiKey: process.env.CLOUDANT_API_KEY
        }
    }
})
const dbname = process.env.CLOUDANT_DB_NAME
const db = cloudant.db.use(dbname);

// let create_index = {
//     "index": {
//        "fields": [
//           "email"
//        ]
//     },
//     "name": "email-json-index",
//     "type": "json"
//  }

// db.index(create_index, function(err, response) {
//   if (err) {
//     throw err;
//   }
//   logger.error('Index creation result: %s', response.result);
// });

// create a document
const createDocument = function (document) {
    logger.info(`${chalk.green('[ CREATE DOCUMENT CLOUDANT ]')}`);
    return db.insert(document);
};

// read a document
const readDocument = function (partition, query) {
    logger.info(`${chalk.green('[READ DOCUMENT CLOUDANT]')}`);
    return db.partitionedFind(partition, query);
};

// read a document
const findDocument = function (partition, query) {
    logger.info(`${chalk.green('[FIND DOCUMENT CLOUDANT]')}`);
    return new Promise((resolve, reject) => {
        db.partitionedFind(partition, query).then((result) => {
            resolve(result.docs[0])
        }).catch((err) => {
            reject(err)
        })
    });

};

// update a document
const updateDocument = function (document) {
    logger.info(`${chalk.green('[UPDATE DOCUMENT CLOUDANT]')}`);
    return db.insert(document);
};



const bulkDocument = function (array) {
    return new Promise((resolve, reject) => {
        db.bulk({ docs: array   })
        .then((body) => {
          resolve(body);
        })
        .catch((error) => {
          reject(error);
        });
    });

};


const partitionInfo = function (partition) {
    return new Promise((resolve, reject) => {
        db.partitionInfo(partition)
        .then((body) => {
          resolve(body.doc_count + 1);
        })
        .catch((error) => {
          reject(error);
        });
    });

};


module.exports = {
    createDocument,
    readDocument,
    updateDocument,
    findDocument,
    bulkDocument,
    partitionInfo
}