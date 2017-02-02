var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var history = new mongoose.Schema({
    Theme: String,
    score: Number,
    adversaire: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    } // relation reference ligne 49 de
});

var user = new mongoose.Schema({

    username: String,
    lastname: String,
    firstname: String,
    password: {
      type: String,
      required: true
    },
    email: {
    type: String,
    unique: true,
    required: true
    },
    avatar: {image: String},
    histories: [history]
    //object date
    //test: [testScore]
    //, type: 'image/png',
    //profil: ? pour resevoir les bon themes
    //history: ? theme,
});

mongoose.model('user', user);
