var mongoose = require('mongoose');
var Theme = mongoose.model('themes');

module.exports.getAllTheme = function(req, res){

  Theme
    .find()
    .select('-question')
    .exec(function(err, themes){
      if(err) {
        res
          .status(500)
          .json(err);
      }
      else{
        res
          .json(themes);
      }
    });
};
module.exports.ThemeAddOne = function(req, res){

  Theme
   .create({
     name: req.body.name,

   },function(err, data){
     if(err){
       res
        .status(500)
        .json(err);
     } else {
       res
        .status(201)
        .json(data);
     }
   });

 };

module.exports.getRandomQuestion = function(req, res){
  var idTheme = req.params.idTheme;

  Theme
      .findById(idTheme)
      .exec(function(err,theme){
        if(err){
          res
            .status(500)
            .json(err)
        } else {
          res
            .status(200)
            .json(theme.question[Math.floor((Math.random() * theme.question.length)+1)]);
        }
      });
};

module.exports.QuestionAddOne = function(req, res){
 var idTheme = req.params.idTheme;

  Theme

  .findById(idTheme)
   .select('question')
   .exec(
   function(err, data){
     data.question.push({
       genres: req.body.genres,
       title: req.body.title,
       photo: req.body.photo,
       responseA: {nom: req.body.responseA.nom, vrai: req.body.responseA.vrai},
       responseB: {nom: req.body.responseB.nom, vrai: req.body.responseB.vrai},
       responseC: {nom: req.body.responseC.nom, vrai: req.body.responseC.vrai},
       responseD: {nom: req.body.responseD.nom, vrai: req.body.responseD.vrai}
     });
     data.save(function(err, questionadd){
       if(err){
         res
         .status(500)
         .json(err);
       }else{
         res
         .status(201)
         .json(questionadd.question[questionadd.question.length - 1]);
       }
     });

    });
 };

 module.exports.ThemeUpdateOne = function(req, res){
   var idTheme = req.params.idTheme;

   Theme
     .findById(idTheme)
     //.select('-reviews -rooms')
     .exec(function(err, Theme) {
       if (err) {
         res
           .status(500)
           .json(err);
           return;
       } else if(!Theme) {
         res
           .status(404)
           .json({
             "message" : "Theme ID not found " + idTheme
           });
           return;
       }

       themes.name = req.body.name


       themes
         .save(function(err, ThemeUpdateOne) {
           if(err) {
             res
               .status(500)
               .json(err);
           } else {
             res
               .status(204)
               .json();
           }
         });
     });

 };


 module.exports.QuestionUpdateOne = function(req, res){
   var idTheme = req.params.idTheme;

   Theme
     .findById(idTheme)
     .select('question')
     .exec(function(err, question) {
       if (err) {
         res
           .status(500)
           .json(err);
           return;
       } else if(!question) {
         res
           .status(404)
           .json({
             "message" : "Theme ID not found " + idTheme
           });
           return;
       }

              question.genres = req.body.genres,
              question.title = req.body.title,
              question.photo = req.body.photo,
              question.responseA = {nom: req.body.responseA.nom, vrai: req.body.responseA.vrai},
              question.responseB = {nom: req.body.responseB.nom, vrai: req.body.responseB.vrai},
              question.responseC = {nom: req.body.responseC.nom, vrai: req.body.responseC.vrai},
              question.responseD = {nom: req.body.responseD.nom, vrai: req.body.responseD.vrai}


       question
         .save(function(err, QuestionUpdateOne) {
           if(err) {
             res
               .status(500)
               .json(err);
           } else {
             res
               .status(204)
               .json();
           }
         });
     });

 };
