console.log("Notes file is loaded");

const num = 10;
var _ = require('lodash');

const addNumbers = (a,b) => {
    return a+b;
}

const arr = [10,10,20,10,5];
console.log(_.drop(arr,3));


module.exports = {
    num,
    addNumbers
}