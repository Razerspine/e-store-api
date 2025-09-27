const Product = require('../../models/Product');
const languages = require('../../config/languages');

module.exports = async (req, res) => {
  const {search, active, limit = 20, page = 1} = req.query;

  const filter = {};
  if (active !== undefined) filter.isActive = active === 'true';
  if (search) {
    const regex = new RegExp(search, 'i');
    filter.$or = [];

    for (const lang of languages) {
      filter.$or.push({[`name.${lang.key}`]: regex});
    }

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(search);

    if (isUuid) {
      filter.$or.push({uuid: search});
    }
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    Product.find(filter).sort({createdAt: -1}).skip(skip).limit(Number(limit)),
    Product.countDocuments(filter)
  ]);

  res.json({
    items: items.map(item => item?.toPrivateJSON()),
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      pages: Math.ceil(total / Number(limit))
    }
  });
};
