const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_STACK_API_KEY}&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      const {
        temperature,
        feelslike,
        weather_descriptions,
        humidity
      } = body.current;

      callback(
        undefined,
        `It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out. It's ${weather_descriptions[0].toLowerCase()} today. The humidity is ${humidity}%.`
      );
    }
  });
};

module.exports = forecast;
