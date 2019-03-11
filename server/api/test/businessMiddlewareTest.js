var chai = require('chai');
var expect  = chai.expect;
var business = require('../../middleware/businessMiddleware')

  describe('validateAge', function() {
    it('Should be true', function() {
        var date = new Date("1970-01-18T23:09:37.440Z");
        var age = business.validateAge(date)
        expect(age).to.be.equal(true);
    });

    it('Should be false', function() {
        var date = new Date("2015-01-18T23:09:37.440Z");
        var age = business.validateAge(date)
        expect(age).to.be.equal(false);
    });

    it('Should be false', function() {
        var date = new Date("1920-01-18T23:09:37.440Z");
        var age = business.validateAge(date)
        expect(age).to.be.equal(false);
    });
  });

  describe('valite90days', function() {
    it('Should be true', function() {
      var date = new Date("2019-03-10T23:09:37.440Z");
      var now = new Date("2018-08-10T23:09:37.440Z")
      var ret = business.validate90days(date, now)
      expect(ret).to.be.equal(true);
    });
      it('Should be false', function() {
      var date = new Date("2019-03-10T23:09:37.440Z");
      var now = new Date("2019-08-10T23:09:37.440Z")
      var age = business.validate90days(date, now)
      expect(age).to.be.equal(false);
    });
  });