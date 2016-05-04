var express = require('express');
var strftime = require('strftime');
var app = express();
var onlyDigitsRegex = /^\d+$/;

app.get('*', function(request, response) {

  var param = unescape(request.path).substr(1);
  var isUnix = param.match(onlyDigitsRegex) !== null;
  var dateObj;

  if (isUnix)
    dateObj = new Date(parseInt(param, 10) * 1000);
  else
    dateObj = new Date(param);

  var isValidDate = !isNaN(dateObj.getTime());
  var toReturn = {unix: null, natural: null};

  if (isValidDate) {
    // Prepare the date string
    toReturn.unix = dateObj.getTime() / 1000;
    toReturn.natural = strftime('%B %d, %Y', dateObj);

  }
  response.send(JSON.stringify(toReturn));
});

app.listen(process.env.PORT, function() {
  console.log('Listening on port: '+process.env.PORT);
});
