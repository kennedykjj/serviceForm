var app = require('../../../server');
var request = require('supertest');
var mongoose = require('mongoose');
var config = require('../../config/config');

before(function(done){
  mongoose.connect(config.db.url);
  mongoose.connection
  .once('open', () =>{done();})
  .on('error,', (error) =>{
    console.warn('Error',error);
  })
});

describe('POST/partial', function(){
  let dataalmostempty = {
    "productId": "3",
    "name": "nome",
    "sessionId": "sessionId1"
  };
  it('responde with 200 and return the json with',function(done){
    request(app)
    .post('/api/forms/partial')
    .send(dataalmostempty)
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
      if (err) return done(err);
      done();
    });
  });
});

afterEach( (done) => {
  mongoose.connection.collections.formpartials.drop(() => {
    //ready to run the next test
    done();
  });
});