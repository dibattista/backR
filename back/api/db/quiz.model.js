var mongoose = require('mongoose');


/*var responseSchema = new mongoose.Schema({
  responseA: String
});*/

var questionSchema = new mongoose.Schema({
  genres : String,
  title: String,
  photo: String,
  responseA : {nom: String, vrai: Boolean},
  responseB : {nom: String, vrai: Boolean},
  responseC : {nom: String, vrai: Boolean},
  responseD : {nom: String, vrai: Boolean}
});


var themes = new mongoose.Schema({
  name : String,
  question : [questionSchema]
});



mongoose.model('themes', themes, "quiz");//lier avec controller var Quiz = mongoose.model('themes');


/// date de creation
// date de modification
// id create
// id modificateur
