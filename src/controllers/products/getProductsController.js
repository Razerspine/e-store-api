const Product = require('../../models/Product');

module.exports = async (req, res) => {
  const {q, active, limit = 20, page = 1} = req.query;

  const filter = {};
  if (active !== undefined) filter.isActive = active === 'true';
  if (q) {
    const regex = new RegExp(q, 'i');
    filter.$or = [
      {'name.en': regex},
      {'name.uk': regex},
      {'description.en': regex},
      {'description.uk': regex}
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Product.find(filter).sort({createdAt: -1}).skip(skip).limit(Number(limit)),
    Product.countDocuments(filter)
  ]);

  res.json({
    items,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit))
    }
  });
};
