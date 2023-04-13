const { fetchMyIP, fetchCoordsByIP } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned IP:", ip);
});


fetchCoordsByIP((error, data) => {
  if (error) {
    console.log("It did not work");
    return;
  }

  console.log(`it worked! Return corodinates`, data);
  return;
});
