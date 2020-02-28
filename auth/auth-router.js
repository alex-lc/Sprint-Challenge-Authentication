const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secrets = require('../config/secrets.js');

const Users = require('./auth-model');

router.post('/register', (req, res) => {

  const newUser = req.body;

  const hash = bcrypt.hashSync(newUser.password, 8);
  newUser.password = hash;
  const token = generateToken(newUser);

  Users.register(newUser)
    .then(user => {
      res.status(201).json({ token: token, id: user[0], ...newUser });
    })
    .catch(err => {
      res.status(400).json({ error: 'User could not be registered.' });
    })

});

router.post('/login', (req, res) => {

  const { username, password } = req.body;
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(201).json({ success: 'You have logged in.', token });
      }
      else {
        res.status(401).json({ error: 'Invalid credentials. Please try again.' });
      }
    })
    .catch(err => {
      res.status(400).json({ error: 'There was an error logging in.' });
    })

});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1d'
  }

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
