var express = require('express');
var router = express.Router();

var ctrlQuiz = require('../controllers/quiz.controllers.js');
var ctrlUser = require('../controllers/user.controllers.js');

router
  .route('/quiz')
  .get(ctrlQuiz.getAllTheme)
  .post(ctrlQuiz.ThemeAddOne);

router
  .route('/quiz/:idTheme')
  .put(ctrlQuiz.ThemeUpdateOne);

router
  .route('/quiz/:idTheme/question')
  .post(ctrlQuiz.QuestionAddOne)
  .put(ctrlQuiz.QuestionUpdateOne);

router
  .route('/quiz/:idTheme/randomQuestion')
  .get(ctrlQuiz.getRandomQuestion);

router
  .route('/user')
  .post(ctrlUser.UseraddOne)
  .get(ctrlUser.getAll);

router
  .route('/user/login')
  .post(ctrlUser.loginUser);

router
    .route('/user/:userId/histories')
    .post(ctrlUser.historyAddOne);

router
  .route('/user/:userId')
  .get(ctrlUser.UserGetOne)
  .put(ctrlUser.userUpdateOne)
  .delete(ctrlUser.userDeleteOne);




module.exports = router;
