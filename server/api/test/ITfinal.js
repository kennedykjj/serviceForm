var app = require('../../../server');
var request = require('supertest');
var mongoose = require('mongoose');

describe('POST/final', function(){
  let datafull = {
    "productId": "3",
    "name": "nome",
    "email": "kennedyfernando.kj@gmail.com",
    "cpf": "39342761801",
    "birthdate": "1992-01-09T01:05:24.610Z",
    "phone": "phone",
    "sessionId": "sessionId1"
  };
  it('responde with 200 and return the json with',function(done){
    request(app)
    .post('/api/forms/final')
    .send(datafull)
    .set('Accept', 'application/json')
    .expect(200)
    .end(function(err, res) {
    if (err) return done(err);
      done();
    });
  });
});

afterEach( (done) => {
  mongoose.connection.collections.formfinals.drop(() => {
    //ready to run the next test
    done();
  });
});