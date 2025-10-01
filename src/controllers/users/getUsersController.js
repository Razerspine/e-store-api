const User = require('../../models/User');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
  const {search, role, limit = 20, page = 1} = req.query;

  const filter = {};
  if (search) {
    const regex = new RegExp(search, 'i');
    filter.$or = [];

    if (mongoose.Types.ObjectId.isValid(search)) {
      filter.$or.push({_id: new mongoose.Types.ObjectId(search)});
    }

    filter.$or.push(
      {email: regex},
      {role: regex}
    );
  }

  if (role) {
    if (filter.$or) {
      filter.$and = [{ $or: filter.$or }, { role }];
      delete filter.$or;
    } else {
      filter.role = role;
    }
  }

  const skip = (Number(page) - 1) * Number(limit);

  const [items, total] = await Promise.all([
    User.find(filter)
      .sort({createdAt: -1})
      .skip(skip)
      .limit(Number(limit)),
    User.countDocuments(filter)
  ]);

  res.json({
    items: items.map(item => item.toPrivateJSON()),
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit)),
    }
  });
};
