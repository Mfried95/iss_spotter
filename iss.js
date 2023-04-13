const request = require("request");

// Fetches your IP Address
const fetchMyIP = function(callback) {
  
  let url = `https://api.ipify.org?format=json`;

  request(url,function(error, response, body) {

    if (error) {
      callback(error, null);
      return;
    }

    const data = JSON.parse(body);
    const ip = data.ip;
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, ip);
    return;

  });
  
};



// Uses your IP address found from the function above ^^ and returns the latitude and longitude for it
const fetchCoordsByIP  = function(callback, ip) {

  let url = `http://ipwho.is/${ip}`;

  request(url, function(error, response, body) {

    if (error) {
      callback(error, null);
      return;
    }

    const data = JSON.parse(body);
    const ip = data.ip;
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, ip);
    return;

  });

};




module.exports = { fetchMyIP, fetchCoordsByIP  };