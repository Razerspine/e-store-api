let currencies;

if (process.env.CURRENCIES) {
  try {
    currencies = JSON.parse(process.env.CURRENCIES);
  } catch (e) {
    console.error('Error parse end CURRENCIES', e.message);
  }
} else {
  currencies = [
    {key: 'USD', symbol: '$', isDefault: true},
  ];
}

module.exports = currencies;
