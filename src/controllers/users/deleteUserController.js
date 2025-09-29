const User = require('../../models/User');

module.exports = async (req, res) => {
  try {
    const userIds = req.body;
    if (!Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({message: 'User id`s must be an array!'});
    }

    const users = await User.find({_id: {$in: userIds}});

    if (!users?.length) {
      return res.status(404).json({message: 'Users not found!'});
    }

    await User.deleteMany({_id: {$in: userIds}});
    res.status(200).json({message: 'Users deleted successfully!'});
  } catch (error) {
    console.error('Error deleting users:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};
