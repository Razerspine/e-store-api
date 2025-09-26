const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/auth.routes');
const publicRoutes = require('./routes/public.routes');
const privateRoutes = require('./routes/private.routes');
const healthRoutes = require('./routes/health.routes');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({limit: '2mb'}));
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/private', privateRoutes);
app.use('/api', healthRoutes);

app.use(errorHandler);

module.exports = app;
