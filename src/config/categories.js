let categories;

if (process.env.CATEGORIES) {
  try {
    categories = JSON.parse(process.env.CATEGORIES);
  } catch (e) {
    console.error('Error parse end CATEGORIES', e.message);
  }
} else {
  categories = [
    {label: 'All', value: 'all'},
  ];
}

module.exports = categories;
