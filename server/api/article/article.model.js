'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  creation: { type: Date, required: true, default: Date.now},
  creator: { 
    id: { type: Schema.Types.ObjectId, required: true},
    name: { type: String, required: true},
  },
  category: { 
    id: { type: Schema.Types.ObjectId, required: true},
    name: { type: String, required: true}
  },
  title: { type: String, required: true},
  url: { type: String, required: true},
  content: { type: String, required: true},
  description: { type: String, required: true}
});

module.exports = mongoose.model('Article', ArticleSchema);