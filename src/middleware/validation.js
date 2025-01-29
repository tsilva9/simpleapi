const validator = require('validator');

exports.validateUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nome, email e password sono richiesti' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Email non valido' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'La password deve essere di almeno 8 caratteri' });
  }

  next();
};