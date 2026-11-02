const products = [
  { sign: 'Aries', hindi: 'मेष', file: 'Aries Jasper and Tiger-Eye Bracelet.png' },
  { sign: 'Taurus', hindi: 'वृषभ', file: 'Taurus Carnelian Bracelet on Marble.png' },
  { sign: 'Gemini', hindi: 'मिथुन', file: 'Gemini Green Gemstone Bracelet.png' },
  { sign: 'Cancer', hindi: 'कर्क', file: 'Elegant Cancer Zodiac Bracelet on Marble.png' },
  { sign: 'Leo', hindi: 'सिंह', file: 'Carnelian and Onyx Bracelet on Marble.png' },
  { sign: 'Virgo', hindi: 'कन्या' },
  { sign: 'Libra', hindi: 'तुला', file: 'Blue Aquamarine and Marble Beaded Bracelet.png' },
  { sign: 'Scorpio', hindi: 'वृश्चिक', file: 'Scorpio Beaded Bracelet on Marble.png' },
  { sign: 'Sagittarius', hindi: 'धनु', file: 'Elegant Sagittarius Beaded Bracelet.png' },
  { sign: 'Capricorn', hindi: 'मकर', file: 'Maroon Capricorn Beaded Bracelet on Marble.png' },
  { sign: 'Aquarius', hindi: 'कुंभ', file: 'Aquarius Amethyst Beaded Bracelet.png' },
  { sign: 'Pisces', hindi: 'मीन', file: 'Pisces Citrine and Tiger Eye Bracelet.png' }
];

const grid = document.querySelector('#product-grid');

products.forEach(product => {
  const card = document.createElement('article');
  card.className = 'product-card';

  const photo = document.createElement('div');
  photo.className = product.file ? 'product-image' : 'product-image placeholder';
  if (product.file) {
    const image = document.createElement('img');
    image.src = `pic/${encodeURIComponent(product.file)}`;
    image.alt = `${product.sign} rashi bracelet`;
    image.loading = 'lazy';
    image.decoding = 'async';
    photo.append(image);
  } else {
    photo.innerHTML = '<span class="placeholder-star" aria-hidden="true">✳</span>';
    photo.setAttribute('aria-label', 'Virgo bracelet photo coming soon');
  }

  const info = document.createElement('div');
  info.className = 'product-info';
  const title = document.createElement('h3');
  title.className = 'sign-name';
  title.append(document.createTextNode(product.sign));
  const hindi = document.createElement('span');
  hindi.className = 'sign-hindi';
  hindi.lang = 'hi';
  hindi.textContent = product.hindi;
  title.append(hindi);

  const category = document.createElement('div');
  category.className = 'product-category';
  category.textContent = 'Rashi bracelet';
  const price = document.createElement('div');
  price.className = 'product-price';
  price.innerHTML = '<s>₹799</s><strong>₹549</strong>';

  info.append(title, category, price);
  card.append(photo, info);
  grid.append(card);
});
