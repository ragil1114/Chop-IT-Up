const router = require('express').Router();
const { Chatbox, Post, Comment, Vote } = require('../../models');
//const sequelize = require('../config/connection');
//const { Post, User, Comment, Vote } = require('../models');

router.post('/', (req, res) => {
  console.log(req.body);
  Chatbox.create({
    chat_text: req.body.chat_text,
    user_id: req.session.user_id,
  })
    .then(dbChatData => {
      res.json(dbChatData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;