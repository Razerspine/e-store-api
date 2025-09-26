let languages;

if (process.env.LANGUAGES) {
  try {
    languages = JSON.parse(process.env.LANGUAGES);
  } catch (e) {
    console.error('Error parse end LANGUAGES', e.message);
  }
} else {
  languages = [
    {key: 'en', label: 'ENG', isDefault: true}
  ];
}

module.exports = languages;
