require('dotenv').config();

const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    const passwordlength = req.body.password.length;
    console.log(passwordlength);
    if(passwordlength < 7){
      return res.status(401).json({
        message :'mot de passe trop court, 7 caracteres requis'
      });
    }else{
    bcrypt.hash( req.body.password , 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(
            () => {
              res.status(201).json({
                message: 'Utilisateur crée !'
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                message : 'utilisateur deja existant'
              });
            }
          )})
    .catch(
        (error) => {
            res.status(400).json({
            error: error
            });
        })
      }
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(
        (user) => {
          if (!user) {
            return res.status(401).json({
              error: new Error('User not found!')
            });
          }
          bcrypt.compare(req.body.password, user.password)
          .then((valid) => {
              if (!valid) {
                return res.status(401).json({
                  error: new Error('Incorrect password!')
                });
              }
              const token = jwt.sign(
                { userId: user._id },
                process.env.AUTH_KEY,
                { expiresIn: process.env.AUTH_TIME});
              res.status(200).json({
                userId: user._id,
                token: token
              });
            }
          ).catch(
            (error) => {
              res.status(500).json({
                error: error
              });
            }
          );
        }
      ).catch(
        (error) => {
          res.status(500).json({
            error: error
          });
        }
      );
};