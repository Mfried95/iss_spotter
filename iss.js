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


// Uses your IP address found from the function above ^ and returns the latitude and longitude for it


const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    const parsedBody = JSON.parse(body);

    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    const { latitude, longitude } = parsedBody;

    callback(null, {latitude, longitude});
  });
};



const fetchISSFlyOverTimes = function(coords, callback) {
  
  let url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};




module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes  };