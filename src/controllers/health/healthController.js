const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;

module.exports = async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    let cloudinaryStatus;
    try {
      await cloudinary.api.ping();
      cloudinaryStatus = 'connected';
    } catch {
      cloudinaryStatus = 'error';
    }
    res.json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      database: dbState,
      cloudinary: cloudinaryStatus,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};
