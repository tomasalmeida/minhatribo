'use strict';

var should   = require('should');
var request  = require('supertest');
var app      = require('../../app');
var User     = require('../user/user.model');

describe('Test /api/categories', function() {
  var token;
  var user;
  var category;
  
  //define limites
  this.timeout(15000);
  
  // Clear elements before testing
  before(function(done) {
    //Create user
    User.remove(function() {
      user = new User({
        name: 'Fake User',
        email: 'test@test.com',
        password: 'password',
        role: 'user'
      });
      
      user.save(function(err, userSaved) {
        if (err) return done(err);
        user = userSaved;
        done();
      });
    });
  });
  
  // Clear users after testing
  after(function() {
    return User.remove().exec();
  });
  
  it('authenticate the user', function(done) {
    request(app)
      .post('/auth/local')
      .send({
        email: user.email,
        password: user.password
      })
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        token = res.body.token;
        done();
    });
  });

  it('should starts with 0 elements on list', function(done) {
    request(app)
      .get('/api/categories')
      .set('authorization', 'Bearer ' + token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        res.body.should.have.lengthOf(0);
        done();
    });      
  });
  
  
  it('should store one category', function(done) {
    request(app)
      .post('/api/categories')
      .send({
         name: 'category name',
         description:'this is a description'
       
      })
      .set('authorization', 'Bearer ' + token)
      .expect(201)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err){
          console.log(err);
          console.log(res.body);
          return done(err);
        } 
        should.exist(res.body);
        res.body.should.have.property('name').and.have.type('string').and.should.not.be.empty;       // jshint ignore:line   
        res.body.should.have.property('description').and.have.type('string').and.should.not.be.empty;// jshint ignore:line
        category = res.body;
        done();
    });      
  });
  
  it('should respond with categories list with 1 element', function(done) {
    request(app)
      .get('/api/categories')
      .set('authorization', 'Bearer ' + token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        res.body.should.have.lengthOf(1);
        done();
    });      
  });
  
  it('should respond with the selected category', function(done) {
    request(app)
      .get('/api/categories/' + category._id.toString())
      .set('authorization', 'Bearer ' + token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        should.exist(res.body);
        res.body.should.have.property('name').and.have.type('string').and.should.not.be.empty;       // jshint ignore:line   
        res.body.should.have.property('description').and.have.type('string').and.should.not.be.empty;// jshint ignore:line
        done();
    });      
  });  
});