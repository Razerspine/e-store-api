require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});
const app = require('./app');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000;

(async () => {
  await connectDB(process.env.MONGODB_URI);

  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

  const shutdown = () => {
    console.log('🛑 Shutting down server...');
    server.close(() => {
      mongoose.connection.close(false, () => {
        console.log('🔌 MongoDB connection closed');
        process.exit(0);
      });
    });
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
})();
