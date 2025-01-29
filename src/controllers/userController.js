const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const saltRounds = 10;

exports.createUser = (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: 'Password hash non riuscito ' });
    }

    userModel.create(name, email, hash, (err, id) => {
      if (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'Email già esistente' });
        }
        return res.status(500).json({ error: "Errore nella creazione dell'utente" });
      }
      res.status(201).json({ message: 'Utente creato con successo', id });
    });
  });
};


exports.getUserById = (req, res) => {
  const { id } = req.params;
  userModel.findById(id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Errore nel recupero dell'utente" });
    }
    if (!user) {
      return res.status(404).json({ error: "Utente non trovato" });
    }
    res.json(user);
  });
};
