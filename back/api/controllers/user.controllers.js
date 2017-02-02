var mongoose = require('mongoose');
var user = mongoose.model('user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

////////////////////////////////////getAll User////////////////////////////////////////////////////////////

module.exports.getAll = function(req, res){

  user
    .find()
    .exec(function(err, users){
      if(err) {
        res
          .status(500)
          .json(err);
      }
      else{
        res
          .json(users);
      }
    });
};
////////////////////////////////////GetOne User////////////////////////////////////////////////////////////

module.exports.UserGetOne = function(req, res){
  var userId = req.params.userId;

  user
    .findById(userId)
    .exec(function(err, data){
      if(err){
        res
          .status(500)
          .json(err);
      }
      else{
        res
          .json(data);
      }
    });
};

/////////////////////////////////////addOne User/////////////////////////////////////////////////////////////

module.exports.UseraddOne = function(req, res){
var password = req.body.password;
  user
   .create({
     username: req.body.username,
     lastname: req.body.lastname,
     firstname: req.body.firstname,
     email: req.body.email,
     password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
     avatar: req.body.avatar

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
//////////////////////////////////////addOne history/////////////////////////////////////////////////////////////

module.exports.historyAddOne = function(req, res){
 var userId = req.params.userId;

  user
  .findById(userId)
   .select('histories')
   .exec(
   function(err, score){
     score.histories.push({
       Theme: req.body.Theme,
       score: req.body.score,
       adversaire:req.body.AdversaireId

     });
     score.save(function(err, historiesadd){
       if(err){
         res
         .status(500)
         .json(err);
       }else{
         res
         .status(201)
         .json(historiesadd);
       }
     });

    });
 };

//////////////////////////////////////UpdateOne User/////////////////////////////////////////////////////////////

module.exports.userUpdateOne = function(req, res) {
  var userId = req.params.userId;

  user
    .findById(userId)
    //.select('-reviews -rooms')
    .exec(function(err, user) {
      if (err) {
        res
          .status(500)
          .json(err);
          return;
      } else if(!user) {
        res
          .status(404)
          .json({
            "message" : "user ID not found " + userId
          });
          return;
      }

      user.username = req.body.username,
      user.lastname = req.body.lastname,
      user.firstname = req.body.firstname,
      user.email = req.body.email,
      user.password = req.body.password,
      user.avatar = req.body.avatar,
      user.score = req.body.score


      user// attention c'est le meme que le model pour le save
        .save(function(err, userUpdateOne) {
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

//////////////////////////////////////DeleteOne User/////////////////////////////////////////////////////////////

module.exports.userDeleteOne = function(req, res) {
  var userdeleteId = req.params.userdeleteId;

  user
    .findByIdAndRemove(userdeleteId)
    .exec(function(err, deleteuser) {
      var response = {
       message: "user successfully deleted",
       id: userdeleteId
   };
      if(err){
        res
          .status(500)
          .json(err)
      }else{
        res
         .status(200)
         .json(response);
      }
    });
};

//////////////////////////////////////login/////////////////////////////////////////////////////////////


module.exports.loginUser = function(req, res){
  var email = req.body.email;
  var password = req.body.password;

  user
    .findOne({
      email: email
    })
    .exec(function(err, data){
      if(err){
        res
          .status(500)
          .json(err);
      }
      else{
        if(bcrypt.compareSync(password, data.password)){
          var token = jwt.sign({ email: data.email}, 'br5Uopnfbw9Hmk876wD', {expiresIn : 7200});
          res.status(200)
          .json({sucess: true, token: token, userId: data._id});
        }else{
          res.status(401).json('Unauthorized');
        }
      }
    });
};

//////////////////////////////////////login/////////////////////////////////////////////////////////////
