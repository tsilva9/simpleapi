const express = require('express');
const swaggerUi = require('swagger-ui-express');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const authenticateToken = require('./middleware/auth');
const swaggerSpec = require('../swagger');

const app = express();

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// New route for "/"
app.get('/', (req, res) => {
  res.send('hello omninext');
});

// Authentication routes (unprotected)
app.use('/auth', authRoutes);

// Protected routes
app.use('/users', authenticateToken, userRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not Found!' });
});

module.exports = app;