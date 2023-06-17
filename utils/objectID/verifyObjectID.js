// Requiring ObjectId from mongoose npm package
const ObjectId = require('mongoose').Types.ObjectId;

// Validator function
function isValidObjectId(id) {
    console.log('id = ', id);
    if (ObjectId.isValid(id)) {
        if ((String)(new ObjectId(id)) === id)
            return true;
        return false;
    }
    return false;
}

// Loading testcases into array
// const testStrings = ["594ced02ed345b2b049222c5", "geeks",
//     "toptoptoptop", "geeksfogeeks"];

// // Validating each test case
// for (const testcase of testStrings) {

//     if (isValidObjectId(testcase))
//         console.log(testcase + " is a valid MongodbID");
//     else
//         console.log(testcase + " is not a valid MongodbID");

// }

module.exports = { isValidObjectId };