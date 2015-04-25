'use strict';

var should   = require('should');
var request  = require('supertest');
var app      = require('../../app');
var User     = require('../user/user.model');
var Category = require('../category/category.model');
var Article  = require('./article.model');

describe('Test /api/articles', function() {
  var token;
  var user;
  var category;
  var article;
  
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
  before(function(done) {
    Category.remove(function() {
      category = new Category({
        name: 'category name',
        description: 'category description'
      });
      
      category.save(function(err, categorySaved) {
        if (err) return done(err);
        category = categorySaved;
        done();
      });
    });
  });
  before(function(done) {
    //Delete all articles
    Article.remove(function() {
      done();      
    });
  });
  
  // Clear users after testing
  after(function() {
    return User.remove().exec() &&
           Category.remove().exec();
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
      .get('/api/articles')
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
  
  
  it('should store one article', function(done) {
    
    request(app)
      .post('/api/articles')
      .send({
         url: 'https://github.com/shouldjs/should.js/wiki/Breaking-changes',
         category: category,
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
        res.body.should.have.property('url', 'https://github.com/shouldjs/should.js/wiki/Breaking-changes');
        res.body.should.have.property('creation').and.should.not.be.empty; // jshint ignore:line
        res.body.should.have.property('title').and.have.type('string').and.should.not.be.empty; // jshint ignore:line
        res.body.should.have.property('content').and.have.type('string').and.should.not.be.empty;    // jshint ignore:line   
        res.body.should.have.property('description').and.have.type('string').and.should.not.be.empty;// jshint ignore:line
        res.body.should.have.propertyByPath('creator','id').equal(user._id.toString());
        res.body.should.have.propertyByPath('creator','name').equal(user.name);
        res.body.should.have.propertyByPath('category','id').equal(category._id.toString());
        res.body.should.have.propertyByPath('category','name').equal(category.name);
        article = res.body;
        done();
    });      
  });
  
  it('should respond with articles list with 1 element', function(done) {
    request(app)
      .get('/api/articles')
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
  
  it('should respond with the selected article', function(done) {
    request(app)
      .get('/api/articles/' + article._id.toString())
      .set('authorization', 'Bearer ' + token)
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        should.exist(res.body);
        res.body.should.have.property('url', 'https://github.com/shouldjs/should.js/wiki/Breaking-changes');
        res.body.should.have.property('creation').and.should.not.be.empty; // jshint ignore:line
        res.body.should.have.property('title').and.have.type('string').and.should.not.be.empty; // jshint ignore:line
        res.body.should.have.property('content').and.have.type('string').and.should.not.be.empty;    // jshint ignore:line   
        res.body.should.have.property('description').and.have.type('string').and.should.not.be.empty;// jshint ignore:line
        res.body.should.have.propertyByPath('creator','id').equal(user._id.toString());
        res.body.should.have.propertyByPath('creator','name').equal(user.name);
        res.body.should.have.propertyByPath('category','id').equal(category._id.toString());
        res.body.should.have.propertyByPath('category','name').equal(category.name);
        done();
    });      
  });  
});