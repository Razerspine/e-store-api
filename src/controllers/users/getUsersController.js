const User = require('../../models/User');

module.exports = async (req, res) => {
  const {search, limit = 20, page = 1} = req.query;

  const filter = {};
  if (search) {
    const regex = new RegExp(search, 'i');
    filter.$or = [
      {userId: regex},
      {email: regex},
      {role: regex}
    ];
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
