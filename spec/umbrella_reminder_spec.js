const assert = require("assert");
const { getCity, getCityId, getRain } = require("../lib/umbrella_reminder");

describe("Umbrella Reminder", () => {
  // getCity should get user input (string) from form
  describe("getCity", () => {
    const city = getCity();
    it('should return a string', () => {
      assert.equal(typeof city, 'string');
    });
    it('should return capitalized string', () => {
      assert.equal(city[0], city[0].toUpperCase());
    });
  });

  describe("getCityId", () => {
    // getKey should get city id from AccuWeather API
    it("should return city id for given city", () => {
      assert.equal(getKey('Agadir'), '245771');
    });
  });

  describe("getRain", () => {
    // getRain should return a rain probability
    const rainProbability = getRain();
    it("should return rain probability for given city as Number", () => {
      assert.equal(typeof rainProbability, 'number');
    });
  });
});

// should display 'you (don't) need an umbrella'
// (should send push notification if umbrella is needed?)
