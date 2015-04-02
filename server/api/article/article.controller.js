'use strict';

var _ = require('lodash');
var Article = require('./article.model');
var reader = require('node-readability');

// Get list of articles
exports.index = function(req, res) {
  Article.find(function (err, articles) {
    if(err) { return handleError(res, err); }
    return res.json(200, articles);
  });
};

// Get a single article
exports.show = function(req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    return res.json(article);
  });
};

// Creates a new article in the DB.
exports.create = function(req, res) {
  
  //TODO: verify if the article already exists on DB
  reader(req.body.url, function(parseError, parsedArticle, meta) {
     if(parseError) { 
       return handleError(res, err); 
     } else {
       var article = {
         creator:  {
           id: req.user._id,
           name: req.user.name
         },
         title:    parsedArticle.title,
         url:      req.body.url,
         content:  parsedArticle.content,
         category: req.body.category,
         description:  req.body.description
       };
       parsedArticle.close();
       Article.create(article, function(err, storedArticle) {
         if(err) { return handleError(res, err); }
         return res.json(201, storedArticle);
       });
     }
  });
};

// Updates an existing article in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Article.findById(req.params.id, function (err, article) {
    if (err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    var updated = _.merge(article, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, article);
    });
  });
};

// Deletes a article from the DB.
exports.destroy = function(req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    article.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}