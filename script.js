// Add the brand's Instagram profile URL here when it is available.
const INSTAGRAM_URL = 'https://www.instagram.com/shubhtaara.co?xtok=NnFvODY3Z25iczNr';

const products = [
  { file: 'Scorpio Beaded Bracelet on Marble.png', sign: 'Scorpio' },
  { file: 'Gemini Green Gemstone Bracelet.png', sign: 'Gemini' },
  { file: 'Aquarius Amethyst Beaded Bracelet.png', sign: 'Aquarius' },
  { file: 'Golden Pisces Gemstone Bracelet on Marble.png', sign: 'Pisces' },
  { file: 'Blue Aquamarine and Marble Beaded Bracelet.png', sign: '' },
  { file: 'Elegant Sagittarius Beaded Bracelet.png', sign: 'Sagittarius' },
  { file: 'Maroon Capricorn Beaded Bracelet on Marble.png', sign: 'Capricorn' },
  { file: 'Aries Jasper and Tiger-Eye Bracelet.png', sign: 'Aries' },
  { file: 'Elegant Cancer Zodiac Bracelet on Marble.png', sign: 'Cancer' },
  { file: 'Taurus Carnelian Bracelet on Marble.png', sign: 'Taurus' }
];

const productGrid = document.querySelector('#product-grid');
const dialog = document.querySelector('#product-dialog');
const dialogImage = document.querySelector('#dialog-image');
const dialogTitle = document.querySelector('#dialog-title');
const dialogSign = document.querySelector('#dialog-sign');
const dialogDescription = document.querySelector('.dialog-description');
const dialogOrder = dialog.querySelector('.button');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');

function productName(file) {
  return file.replace(/\.png$/i, '');
}

function webpPath(file) {
  return `pic/optimized/${file.replace(/\.png$/i, '.webp')}`;
}

function showImageFallback(image, file) {
  image.addEventListener('error', () => {
    if (image.dataset.fallback !== 'true') {
      image.dataset.fallback = 'true';
      image.src = `pic/${encodeURIComponent(file)}`;
    }
  }, { once: true });
}

products.forEach((product, index) => {
  const name = productName(product.file);
  const card = document.createElement('button');
  card.className = 'product-card';
  card.type = 'button';
  card.setAttribute('aria-label', `View details for ${name}`);

  const imageWrap = document.createElement('span');
  imageWrap.className = 'product-image';
  const badge = document.createElement('span');
  badge.className = 'product-badge';
  badge.textContent = product.sign || `Piece ${String(index + 1).padStart(2, '0')}`;
  const image = document.createElement('img');
  image.src = webpPath(product.file);
  image.alt = `${name} bracelet`;
  image.width = 900;
  image.height = 900;
  image.loading = 'lazy';
  image.decoding = 'async';
  showImageFallback(image, product.file);
  imageWrap.append(image, badge);

  const info = document.createElement('span');
  info.className = 'product-info';
  const text = document.createElement('span');
  const title = document.createElement('span');
  title.className = 'product-title';
  title.textContent = name;
  title.style.cssText = 'display:block;font:400 17px/1.3 var(--serif)';
  const category = document.createElement('span');
  category.className = 'product-category';
  category.textContent = product.sign ? `Zodiac sign · ${product.sign}` : 'Bracelet';
  category.style.cssText = 'display:block;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:#898399;margin-top:7px';
  text.append(title, category);
  const arrow = document.createElement('span');
  arrow.className = 'product-arrow';
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↗';
  info.append(text, arrow);
  card.append(imageWrap, info);
  card.addEventListener('click', () => openProduct(product));
  productGrid.append(card);
});

function openProduct(product) {
  const name = productName(product.file);
  dialogImage.src = webpPath(product.file);
  dialogImage.alt = `${name} bracelet`;
  dialogImage.dataset.fallback = 'false';
  showImageFallback(dialogImage, product.file);
  dialogTitle.textContent = name;
  dialogSign.textContent = product.sign ? `Zodiac sign · ${product.sign}` : 'SHUBHTAARA collection';
  dialogDescription.textContent = 'A bracelet made for your cosmic identity.';
  dialogOrder.href = INSTAGRAM_URL || '#collection';
  dialogOrder.setAttribute('aria-label', INSTAGRAM_URL ? `Ask about ${name} on Instagram` : 'Explore the collection');
  dialogOrder.innerHTML = INSTAGRAM_URL ? 'Ask us about this piece <span aria-hidden="true">↗</span>' : 'Explore the collection <span aria-hidden="true">↗</span>';
  if (dialog.open) dialog.close();
  dialog.showModal();
}

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => {
  dialogImage.removeAttribute('src');
});

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('is-open', !isOpen);
});
nav.addEventListener('click', event => {
  if (event.target.closest('a')) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
  }
});

document.querySelectorAll('.instagram-link').forEach(link => {
  if (INSTAGRAM_URL) {
    link.href = INSTAGRAM_URL;
  } else {
    link.href = '#collection';
    link.setAttribute('aria-label', 'Instagram order link can be configured in script.js; browse the collection meanwhile');
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
