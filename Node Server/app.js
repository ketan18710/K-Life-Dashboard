const os = require('os');
const fs = require('fs');

console.log(os.totalmem());
console.log(os.userInfo());

console.log(
  fs.readdir('./', function(error, files) {
    if (error) console.log('ERROR ', error);
    else console.log('FILES', files);
  }),
  //   if file is there this will return file else return error
);
