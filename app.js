const COOKIES = [
  {
    id: 'oreo',
    name: 'Oreo Cookie',
    desc: 'A rich dark chocolate cookie topped with a generous swirl of cream cheese frosting and crowned with a classic Oreo. Cookies & cream in every bite.',
    price: 4.50,
    badge: 'Fan Favorite',
    images: ['images/oreo-1.jpg', 'images/oreo-2.jpg']
  },
  {
    id: 'white-oreo',
    name: 'White Oreo',
    desc: 'A golden sugar cookie drizzled with white icing and finished with a Golden Oreo on top. Light, buttery, and irresistibly sweet.',
    price: 4.50,
    badge: 'New',
    images: ['images/white-oreo-1.jpg', 'images/white-oreo-2.jpg']
  },
  {
    id: 'churro',
    name: 'Churro Cookie',
    desc: 'A thick cinnamon-spiced cookie rolled in cinnamon sugar, piled high with a silky cinnamon cream cheese frosting. Like a churro, reinvented.',
    price: 4.50,
    badge: null,
    images: ['images/churro-1.jpg', 'images/churro-2.jpg']
  },
  {
    id: 'gingerbread',
    name: 'Gingerbread',
    desc: 'A warmly-spiced gingerbread cookie with a crackly sugar crust, topped with fluffy vanilla cream cheese frosting dusted with cinnamon.',
    price: 4.50,
    badge: 'Seasonal',
    images: ['images/gingerbread-1.jpg', 'images/gingerbread-2.jpg']
  },
  {
    id: 'choc-coconut',
    name: 'Chocolate Coconut',
    desc: 'A toasty coconut macaroon-style cookie packed with shredded coconut flakes and finished with an artful lattice drizzle of rich milk chocolate.',
    price: 4.50,
    badge: null,
    images: ['images/choc-coconut-1.jpg', 'images/choc-coconut-2.jpg']
  },
  {
    id: 'lemon-cheesecake',
    name: 'Lemon Cheesecake',
    desc: 'A bright, zesty lemon sugar cookie drizzled with sweet white icing. Crisp on the edges, pillowy in the center — like cheesecake in cookie form.',
    price: 4.50,
    badge: 'Bestseller',
    images: ['images/lemon-1.jpg', 'images/lemon-2.jpg']
  },
  {
    id: 'strawberry-shortcake',
    name: 'Strawberry Shortcake',
    desc: 'A soft pink strawberry cookie piled with whipped cream frosting and crumbled graham crackers with a hint of strawberry crunch on top.',
    price: 4.50,
    badge: null,
    images: ['images/strawberry-1.jpg']
  },
  {
    id: 'twix',
    name: 'Twix Cookie',
    desc: 'A chunky shortbread cookie loaded with chocolate chips, topped with a pool of golden caramel, a dollop of silky chocolate ganache, and a sprinkle of sea salt.',
    price: 4.50,
    badge: 'Must Try',
    images: ['images/twix-1.jpg', 'images/twix-2.jpg']
  }
];

let cart = [];
let viewingCookie = null;
let viewingImgIdx = 0;

function renderCookies() {
  const grid = document.getElementById('cookieGrid');
  grid.innerHTML = COOKIES.map((c, i) => `
    <div class="cookie-card">
      <div class="cookie-img-wrap" onclick="openImgModal(${i})">
        <img src="${c.images[0]}" alt="${c.name}" loading="lazy">
        ${c.badge ? `<span class="cookie-badge">${c.badge}</span>` : ''}
      </div>
      <div class="cookie-body">
        <div class="cookie-name">${c.name}</div>
        <div class="cookie-desc">${c.desc}</div>
        <div class="cookie-footer">
          <span class="cookie-price">$${c.price.toFixed(2)}</span>
          <button class="cookie-add-btn" id="addbtn-${c.id}" onclick="addToCart('${c.id}')">
            + Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const cookie = COOKIES.find(c => c.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...cookie, qty: 1 });
  const btn = document.getElementById('addbtn-' + id);
  btn.textContent = '✓ Added!';
  btn.classList.add('added');
  setTimeout(() => { btn.textContent = '+ Add to Cart'; btn.classList.remove('added'); }, 1400);
  updateCart();
  showToast(cookie.name + ' added to cart! 🍪');
}

function updateCart() {
  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const count = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cartCount').textContent = count;
  document.getElementById('cartTotal').textContent = '$' + total.toFixed(2);
  document.getElementById('checkoutBtn').disabled = !cart.length;
  renderCartItems();
}

function renderCartItems() {
  const el = document.getElementById('cartItems');
  if (!cart.length) {
    el.innerHTML = '<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p class="cart-empty-title">Your cart is empty</p><p class="cart-empty-sub">Add some cookies!</p></div>';
    return;
  }
  el.innerHTML = cart.map((c, i) => `
    <div class="cart-item">
      <img class="cart-item-img" src="${c.images[0]}" alt="${c.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">${c.name}</div>
        <div class="cart-item-price">$${c.price.toFixed(2)} each</div>
        <div class="cart-qty">
          <button class="qty-btn" onclick="changeQty(${i}, -1)">−</button>
          <span class="qty-num">${c.qty}</span>
          <button class="qty-btn" onclick="changeQty(${i}, 1)">+</button>
        </div>
      </div>
      <div class="cart-item-total">$${(c.price * c.qty).toFixed(2)}</div>
    </div>
  `).join('');
}

function changeQty(i, d) {
  cart[i].qty += d;
  if (cart[i].qty <= 0) cart.splice(i, 1);
  updateCart();
}

function toggleCart() {
  document.getElementById('cartDrawer').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
}

function openLogin() { document.getElementById('loginModal').classList.add('open'); }
function closeLogin() { document.getElementById('loginModal').classList.remove('open'); }

function switchTab(t) {
  document.querySelectorAll('.auth-tab').forEach((b, i) => {
    b.classList.toggle('active', (t === 'login' && i === 0) || (t === 'signup' && i === 1));
  });
  document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));
  document.getElementById('panel-' + t).classList.add('active');
}

function handleLogin() { closeLogin(); showToast('Welcome back! 🍪'); }
function handleSignup() { closeLogin(); showToast('Account created! Welcome to the family 🍪'); }

function openImgModal(cookieIdx) {
  viewingCookie = cookieIdx;
  viewingImgIdx = 0;
  updateModalImg();
  document.getElementById('imgModal').classList.add('open');
}
function closeImgModal() { document.getElementById('imgModal').classList.remove('open'); }
function updateModalImg() {
  const c = COOKIES[viewingCookie];
  document.getElementById('modalImg').src = c.images[viewingImgIdx];
}
function nextImg() {
  const c = COOKIES[viewingCookie];
  viewingImgIdx = (viewingImgIdx + 1) % c.images.length;
  updateModalImg();
}
function prevImg() {
  const c = COOKIES[viewingCookie];
  viewingImgIdx = (viewingImgIdx - 1 + c.images.length) % c.images.length;
  updateModalImg();
}

document.getElementById('imgModal').addEventListener('click', function(e) {
  if (e.target === this) closeImgModal();
});
document.getElementById('loginModal').addEventListener('click', function(e) {
  if (e.target === this) closeLogin();
});

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

function submitContact(e) {
  e.preventDefault();
  showToast("Message sent! We'll be in touch soon 💌");
  e.target.reset();
}

renderCookies();
