const validator = require('validator');

exports.validateUser = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Nome e email sono richiesti' });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Email non valido' });
  }

  next();
};