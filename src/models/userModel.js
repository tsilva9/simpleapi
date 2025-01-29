const db = require('../config/database');

exports.create = (name, email, password, callback) => {
  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.run(query, [name, email, password], function(err) {
    callback(err, this.lastID);
  });
};

exports.findById = (id, callback) => {
  const query = 'SELECT id, name, email FROM users WHERE id = ?';
  db.get(query, [id], callback);
};

exports.findByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.get(query, [email], callback);
};