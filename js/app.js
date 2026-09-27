import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// ===================== DATA =====================
const CARS = [
  { id: 'civic-rs', brand: 'Honda', name: 'Civic RS', price: 9899000, hp: 178, fuel: 'Petrol', trans: 'CVT', color: '#c0c0c0' },
  { id: 'city', brand: 'Honda', name: 'City', price: 5890000, hp: 119, fuel: 'Petrol', trans: 'CVT', color: '#1e3a5f' },
  { id: 'brv', brand: 'Honda', name: 'BR-V', price: 6990000, hp: 119, fuel: 'Petrol', trans: 'CVT', color: '#2d5016' },
  { id: 'corolla', brand: 'Toyota', name: 'Corolla Altis', price: 7299000, hp: 168, fuel: 'Petrol', trans: 'CVT', color: '#8b0000' },
  { id: 'yaris', brand: 'Toyota', name: 'Yaris', price: 4799000, hp: 106, fuel: 'Petrol', trans: 'CVT', color: '#f5f5f5' },
  { id: 'fortuner', brand: 'Toyota', name: 'Fortuner', price: 18999000, hp: 201, fuel: 'Diesel', trans: 'Automatic', color: '#1a1a1a' },
  { id: 'swift', brand: 'Suzuki', name: 'Swift', price: 4950000, hp: 82, fuel: 'Petrol', trans: 'Manual', color: '#c41e3a' },
  { id: 'alto', brand: 'Suzuki', name: 'Alto', price: 2749000, hp: 68, fuel: 'Petrol', trans: 'Manual', color: '#4169e1' },
  { id: 'cultus', brand: 'Suzuki', name: 'Cultus', price: 3890000, hp: 68, fuel: 'Petrol', trans: 'Manual', color: '#228b22' },
  { id: 'sportage', brand: 'Kia', name: 'Sportage', price: 9990000, hp: 154, fuel: 'Petrol', trans: 'Automatic', color: '#4a4a4a' },
  { id: 'stonic', brand: 'Kia', name: 'Stonic', price: 5490000, hp: 99, fuel: 'Petrol', trans: 'Automatic', color: '#ff6b35' },
  { id: 'elantra', brand: 'Hyundai', name: 'Elantra', price: 7990000, hp: 150, fuel: 'Petrol', trans: 'CVT', color: '#0d47a1' },
  { id: 'tucson', brand: 'Hyundai', name: 'Tucson', price: 10990000, hp: 154, fuel: 'Petrol', trans: 'Automatic', color: '#263238' },
];

const PAINTS = [
  { id: 'white', name: 'White', hex: '#f5f5f5', price: 0 },
  { id: 'black', name: 'Black', hex: '#1a1a1a', price: 0 },
  { id: 'red', name: 'Red', hex: '#c41e3a', price: 0 },
  { id: 'blue', name: 'Blue', hex: '#1e3a8a', price: 0 },
  { id: 'silver', name: 'Silver', hex: '#c0c0c0', price: 0 },
  { id: 'gray', name: 'Gray', hex: '#6b7280', price: 0 },
  { id: 'matte-black', name: 'Matte Black', hex: '#111111', price: 75000, finish: 'matte' },
  { id: 'pearl-white', name: 'Pearl White', hex: '#f8f8ff', price: 75000, finish: 'pearl' },
  { id: 'candy-red', name: 'Candy Red', hex: '#e63946', price: 95000, finish: 'metallic' },
  { id: 'metallic-blue', name: 'Metallic Blue', hex: '#2563eb', price: 85000, finish: 'metallic' },
];

const FINISHES = [
  { id: 'gloss', name: 'Gloss', price: 0 },
  { id: 'matte', name: 'Matte', price: 45000 },
  { id: 'metallic', name: 'Metallic', price: 35000 },
  { id: 'pearl', name: 'Pearlescent', price: 55000 },
];

const TINTS = [
  { id: 'none', name: 'No Tint', price: 0 },
  { id: 'light', name: 'Light', price: 25000 },
  { id: 'medium', name: 'Medium', price: 40000 },
  { id: 'dark', name: 'Dark', price: 55000 },
];

const SUNROOFS = [
  { id: 'none', name: 'None', price: 0 },
  { id: 'standard', name: 'Standard', price: 120000 },
  { id: 'panoramic', name: 'Panoramic', price: 280000 },
];

const WHEEL_STYLES = [
  { id: 'sport', name: 'Sport', price: 0 },
  { id: 'luxury', name: 'Luxury', price: 85000 },
  { id: 'racing', name: 'Racing', price: 180000 },
  { id: 'chrome', name: 'Chrome', price: 95000 },
  { id: 'black', name: 'Black', price: 65000 },
  { id: 'gold', name: 'Gold', price: 120000 },
  { id: 'gunmetal', name: 'Gunmetal', price: 75000 },
];

const WHEEL_SIZES = [
  { id: '16', name: '16"', price: 0 },
  { id: '17', name: '17"', price: 45000 },
  { id: '18', name: '18"', price: 95000 },
  { id: '19', name: '19"', price: 145000 },
  { id: '20', name: '20"', price: 220000 },
];

const CALIPERS = [
  { id: 'black', name: 'Black', hex: '#1a1a1a', price: 0 },
  { id: 'red', name: 'Red', hex: '#dc2626', price: 35000 },
  { id: 'yellow', name: 'Yellow', hex: '#eab308', price: 35000 },
  { id: 'blue', name: 'Blue', hex: '#2563eb', price: 35000 },
  { id: 'green', name: 'Green', hex: '#16a34a', price: 35000 },
];

const SEATS = [
  { id: 'black', name: 'Black', hex: '#1a1a1a', price: 0 },
  { id: 'brown', name: 'Brown', hex: '#5d4037', price: 150000 },
  { id: 'cream', name: 'Cream', hex: '#f5e6d3', price: 120000 },
  { id: 'red', name: 'Red', hex: '#9b1c1c', price: 180000 },
  { id: 'white', name: 'White', hex: '#f0f0f0', price: 140000 },
];

const DASH = [
  { id: 'standard', name: 'Standard', price: 0 },
  { id: 'wood', name: 'Wood', price: 65000 },
  { id: 'carbon', name: 'Carbon Fiber', price: 95000 },
  { id: 'leather', name: 'Leather', price: 75000 },
  { id: 'piano', name: 'Piano Black', price: 55000 },
];

const AMBIENT = [
  { id: 'blue', name: 'Blue', price: 0 },
  { id: 'purple', name: 'Purple', price: 25000 },
  { id: 'green', name: 'Green', price: 25000 },
  { id: 'orange', name: 'Orange', price: 25000 },
  { id: 'white', name: 'White', price: 15000 },
];

const ENGINES = [
  { id: 'base', name: '1.5L Base', price: 0 },
  { id: '2.0', name: '2.0L', price: 250000 },
  { id: 'turbo', name: 'Turbo', price: 450000 },
  { id: 'hybrid', name: 'Hybrid', price: 650000 },
];

const TRANSMISSIONS = [
  { id: 'manual', name: 'Manual', price: 0 },
  { id: 'auto', name: 'Automatic', price: 120000 },
  { id: 'cvt', name: 'CVT', price: 95000 },
];

const ACCESSORIES = [
  { id: 'spoiler', name: 'Spoiler', price: 60000 },
  { id: 'bodykit', name: 'Body Kit', price: 185000 },
  { id: 'roof-rack', name: 'Roof Rack', price: 45000 },
  { id: 'chrome', name: 'Chrome Package', price: 75000 },
  { id: 'side-steps', name: 'Side Steps', price: 55000 },
  { id: 'sports-exhaust', name: 'Sports Exhaust', price: 95000 },
];

// ===================== STATE =====================
let currentCar = CARS[0];
let config = {
  paint: 'pearl-white',
  finish: 'pearl',
  tint: 'none',
  sunroof: 'none',
  wheelStyle: 'sport',
  wheelSize: '18',
  caliper: 'red',
  seat: 'brown',
  dash: 'standard',
  ambient: 'blue',
  engine: 'base',
  transmission: 'cvt',
  accessories: [],
};

// ===================== UTILS =====================
function formatPKR(n) {
  return 'PKR ' + n.toLocaleString('en-PK');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.opacity = '1';
  setTimeout(() => t.style.opacity = '0', 2200);
}

function calcPrice() {
  let total = currentCar.price;
  const paint = PAINTS.find(p => p.id === config.paint);
  if (paint) total += paint.price;
  const finish = FINISHES.find(f => f.id === config.finish);
  if (finish) total += finish.price;
  const tint = TINTS.find(t => t.id === config.tint);
  if (tint) total += tint.price;
  const sun = SUNROOFS.find(s => s.id === config.sunroof);
  if (sun) total += sun.price;
  const ws = WHEEL_STYLES.find(w => w.id === config.wheelStyle);
  if (ws) total += ws.price;
  const wsz = WHEEL_SIZES.find(w => w.id === config.wheelSize);
  if (wsz) total += wsz.price;
  const cal = CALIPERS.find(c => c.id === config.caliper);
  if (cal) total += cal.price;
  const seat = SEATS.find(s => s.id === config.seat);
  if (seat) total += seat.price;
  const dash = DASH.find(d => d.id === config.dash);
  if (dash) total += dash.price;
  const amb = AMBIENT.find(a => a.id === config.ambient);
  if (amb) total += amb.price;
  const eng = ENGINES.find(e => e.id === config.engine);
  if (eng) total += eng.price;
  const tr = TRANSMISSIONS.find(t => t.id === config.transmission);
  if (tr) total += tr.price;
  config.accessories.forEach(id => {
    const a = ACCESSORIES.find(x => x.id === id);
    if (a) total += a.price;
  });
  return total;
}

function updatePriceUI() {
  const total = calcPrice();
  document.getElementById('total-price').textContent = formatPKR(total);
  document.getElementById('base-price-label').textContent = `Base: ${formatPKR(currentCar.price)}`;
  const paint = PAINTS.find(p => p.id === config.paint)?.name || '';
  const wheel = WHEEL_SIZES.find(w => w.id === config.wheelSize)?.name + ' ' + (WHEEL_STYLES.find(w => w.id === config.wheelStyle)?.name || '');
  const seat = SEATS.find(s => s.id === config.seat)?.name || '';
  document.getElementById('config-summary').textContent = `${paint} • ${wheel} • ${seat}`;
}

// ===================== PAGE NAV =====================
window.showPage = function(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  const el = document.getElementById('page-' + page);
  if (el) {
    el.classList.remove('hidden');
    el.classList.add('fade-in');
  }
  document.querySelectorAll('.nav-link').forEach(a => {
    a.classList.toggle('active', a.dataset.page === page);
  });
  if (page === 'configurator') {
    setTimeout(() => { resizeRenderer(); animate(); }, 50);
  }
  if (page === 'models') renderModels();
  if (page === 'compare') renderCompare();
};

// ===================== MODELS GRID =====================
function renderModels(brand = 'all') {
  const grid = document.getElementById('models-grid');
  const list = brand === 'all' ? CARS : CARS.filter(c => c.brand === brand);
  grid.innerHTML = list.map(car => `
    <div class="glass rounded-2xl overflow-hidden card-hover border border-white/5">
      <div class="h-40 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
        <div class="absolute inset-0 opacity-30" style="background: radial-gradient(circle at 50% 60%, ${car.color}44, transparent 70%)"></div>
        <div class="text-6xl opacity-20 font-black">${car.brand[0]}</div>
        <div class="absolute bottom-3 left-3 text-[10px] font-medium px-2 py-0.5 rounded bg-black/50">${car.brand}</div>
      </div>
      <div class="p-4">
        <h3 class="font-bold text-lg">${car.name}</h3>
        <div class="text-green-400 font-semibold price mt-1">${formatPKR(car.price)}</div>
        <div class="flex gap-3 mt-3 text-[11px] text-gray-500">
          <span>${car.hp} HP</span>
          <span>•</span>
          <span>${car.fuel}</span>
          <span>•</span>
          <span>${car.trans}</span>
        </div>
        <button onclick="selectCar('${car.id}')" class="mt-4 w-full bg-green-600 hover:bg-green-500 text-white text-sm font-semibold py-2.5 rounded-xl transition">
          Configure
        </button>
      </div>
    </div>
  `).join('');
}

document.getElementById('brand-filters')?.addEventListener('click', e => {
  const btn = e.target.closest('.brand-btn');
  if (!btn) return;
  document.querySelectorAll('.brand-btn').forEach(b => {
    b.classList.remove('active', 'bg-green-600', 'text-white');
    b.classList.add('glass');
  });
  btn.classList.add('active', 'bg-green-600', 'text-white');
  btn.classList.remove('glass');
  renderModels(btn.dataset.brand);
});

window.selectCar = function(id) {
  currentCar = CARS.find(c => c.id === id) || CARS[0];
  document.getElementById('current-model-name').textContent = `${currentCar.brand} ${currentCar.name}`;
  // reset some defaults based on car color
  const matchingPaint = PAINTS.find(p => p.hex.toLowerCase() === currentCar.color.toLowerCase());
  if (matchingPaint) config.paint = matchingPaint.id;
  updateCarColor();
  updatePriceUI();
  showPage('configurator');
};

// ===================== CONFIG UI =====================
function makeOptionBtn(text, active, onClick, extra = '') {
  return `<button class="option-btn px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 ${active ? 'active' : 'glass hover:bg-white/5'}" ${extra}>${text}</button>`;
}

function renderConfigUI() {
  // Paint
  document.getElementById('paint-swatches').innerHTML = PAINTS.map(p => `
    <div class="swatch w-9 h-9 rounded-full border-2 border-white/20 ${config.paint === p.id ? 'active' : ''}"
         style="background:${p.hex}; color:${p.hex}"
         title="${p.name}${p.price ? ' +' + formatPKR(p.price) : ''}"
         onclick="setPaint('${p.id}')"></div>
  `).join('');

  document.getElementById('finish-options').innerHTML = FINISHES.map(f =>
    makeOptionBtn(f.name + (f.price ? ` +${(f.price/1000).toFixed(0)}k` : ''), config.finish === f.id, null, `onclick="setFinish('${f.id}')"`)
  ).join('');

  document.getElementById('tint-options').innerHTML = TINTS.map(t =>
    makeOptionBtn(t.name, config.tint === t.id, null, `onclick="setTint('${t.id}')"`)
  ).join('');

  document.getElementById('sunroof-options').innerHTML = SUNROOFS.map(s =>
    makeOptionBtn(s.name + (s.price ? ` +${(s.price/1000).toFixed(0)}k` : ''), config.sunroof === s.id, null, `onclick="setSunroof('${s.id}')"`)
  ).join('');

  document.getElementById('wheel-styles').innerHTML = WHEEL_STYLES.map(w =>
    makeOptionBtn(w.name + (w.price ? ` +${(w.price/1000).toFixed(0)}k` : ''), config.wheelStyle === w.id, null, `onclick="setWheelStyle('${w.id}')"`)
  ).join('');

  document.getElementById('wheel-sizes').innerHTML = WHEEL_SIZES.map(w =>
    makeOptionBtn(w.name, config.wheelSize === w.id, null, `onclick="setWheelSize('${w.id}')"`)
  ).join('');

  document.getElementById('caliper-colors').innerHTML = CALIPERS.map(c =>
    `<div class="swatch w-8 h-8 rounded-full border-2 border-white/20 ${config.caliper === c.id ? 'active' : ''}"
          style="background:${c.hex}; color:${c.hex}" title="${c.name}"
          onclick="setCaliper('${c.id}')"></div>`
  ).join('');

  document.getElementById('seat-swatches').innerHTML = SEATS.map(s =>
    `<div class="swatch w-9 h-9 rounded-full border-2 border-white/20 ${config.seat === s.id ? 'active' : ''}"
          style="background:${s.hex}; color:${s.hex}" title="${s.name}${s.price ? ' +' + formatPKR(s.price) : ''}"
          onclick="setSeat('${s.id}')"></div>`
  ).join('');

  document.getElementById('dash-options').innerHTML = DASH.map(d =>
    makeOptionBtn(d.name, config.dash === d.id, null, `onclick="setDash('${d.id}')"`)
  ).join('');

  document.getElementById('ambient-options').innerHTML = AMBIENT.map(a =>
    makeOptionBtn(a.name, config.ambient === a.id, null, `onclick="setAmbient('${a.id}')"`)
  ).join('');

  document.getElementById('engine-options').innerHTML = ENGINES.map(e => `
    <button class="option-btn w-full text-left px-3 py-2 rounded-lg text-xs font-medium border border-white/10 ${config.engine === e.id ? 'active' : 'glass hover:bg-white/5'}"
            onclick="setEngine('${e.id}')">
      <span>${e.name}</span>
      <span class="float-right text-gray-400">${e.price ? '+' + formatPKR(e.price) : 'Included'}</span>
    </button>
  `).join('');

  document.getElementById('trans-options').innerHTML = TRANSMISSIONS.map(t =>
    makeOptionBtn(t.name, config.transmission === t.id, null, `onclick="setTrans('${t.id}')"`)
  ).join('');

  document.getElementById('accessory-options').innerHTML = ACCESSORIES.map(a => {
    const checked = config.accessories.includes(a.id);
    return `
      <label class="flex items-center gap-3 px-3 py-2 rounded-lg glass hover:bg-white/5 cursor-pointer text-xs">
        <input type="checkbox" ${checked ? 'checked' : ''} onchange="toggleAccessory('${a.id}')" class="accent-green-500">
        <span class="flex-1">${a.name}</span>
        <span class="text-gray-400">+${formatPKR(a.price)}</span>
      </label>
    `;
  }).join('');
}

// Setters
window.setPaint = (id) => { config.paint = id; updateCarColor(); renderConfigUI(); updatePriceUI(); };
window.setFinish = (id) => { config.finish = id; updateCarColor(); renderConfigUI(); updatePriceUI(); };
window.setTint = (id) => { config.tint = id; renderConfigUI(); updatePriceUI(); };
window.setSunroof = (id) => { config.sunroof = id; renderConfigUI(); updatePriceUI(); };
window.setWheelStyle = (id) => { config.wheelStyle = id; updateWheels(); renderConfigUI(); updatePriceUI(); };
window.setWheelSize = (id) => { config.wheelSize = id; updateWheels(); renderConfigUI(); updatePriceUI(); };
window.setCaliper = (id) => { config.caliper = id; updateWheels(); renderConfigUI(); updatePriceUI(); };
window.setSeat = (id) => { config.seat = id; renderConfigUI(); updatePriceUI(); };
window.setDash = (id) => { config.dash = id; renderConfigUI(); updatePriceUI(); };
window.setAmbient = (id) => { config.ambient = id; renderConfigUI(); updatePriceUI(); };
window.setEngine = (id) => { config.engine = id; renderConfigUI(); updatePriceUI(); };
window.setTrans = (id) => { config.transmission = id; renderConfigUI(); updatePriceUI(); };
window.toggleAccessory = (id) => {
  const i = config.accessories.indexOf(id);
  if (i >= 0) config.accessories.splice(i, 1);
  else config.accessories.push(id);
  renderConfigUI(); updatePriceUI();
};

window.resetConfig = () => {
  config = {
    paint: 'pearl-white', finish: 'pearl', tint: 'none', sunroof: 'none',
    wheelStyle: 'sport', wheelSize: '18', caliper: 'red',
    seat: 'brown', dash: 'standard', ambient: 'blue',
    engine: 'base', transmission: 'cvt', accessories: [],
  };
  updateCarColor(); updateWheels(); renderConfigUI(); updatePriceUI();
  showToast('Configuration reset');
};

window.saveConfig = () => {
  const data = { car: currentCar.id, config, total: calcPrice(), savedAt: new Date().toISOString() };
  localStorage.setItem('pakdrive-config', JSON.stringify(data));
  showToast('Configuration saved locally');
};

window.downloadJSON = () => {
  const data = {
    car: `${currentCar.brand} ${currentCar.name}`,
    basePrice: currentCar.price,
    configuration: config,
    totalPrice: calcPrice(),
    exportedAt: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `pakdrive-${currentCar.id}-config.json`;
  a.click();
  showToast('JSON downloaded');
};

// Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => {
      b.classList.remove('bg-green-600', 'text-white');
      b.classList.add('text-gray-400');
    });
    btn.classList.add('bg-green-600', 'text-white');
    btn.classList.remove('text-gray-400');
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.getElementById('tab-' + btn.dataset.tab)?.classList.remove('hidden');
  });
});

// ===================== COMPARE =====================
function renderCompare() {
  const grid = document.getElementById('compare-grid');
  const popular = [CARS[0], CARS[3], CARS[6], CARS[9]];
  grid.innerHTML = popular.map(car => `
    <div class="glass rounded-2xl p-5 border border-white/5">
      <div class="flex items-center justify-between mb-4">
        <div>
          <div class="text-xs text-gray-500">${car.brand}</div>
          <div class="font-bold text-lg">${car.name}</div>
        </div>
        <button onclick="selectCar('${car.id}')" class="text-xs bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-lg">Configure</button>
      </div>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between"><span class="text-gray-500">Price</span><span class="font-semibold text-green-400 price">${formatPKR(car.price)}</span></div>
        <div class="flex justify-between"><span class="text-gray-500">Horsepower</span><span>${car.hp} HP</span></div>
        <div class="flex justify-between"><span class="text-gray-500">Fuel</span><span>${car.fuel}</span></div>
        <div class="flex justify-between"><span class="text-gray-500">Transmission</span><span>${car.trans}</span></div>
      </div>
    </div>
  `).join('');
}

// ===================== THREE.JS =====================
let scene, camera, renderer, controls, carGroup, bodyMesh, wheelMeshes = [], caliperMeshes = [];
let autoRotate = false;
let animId = null;

function initThree() {
  const container = document.getElementById('canvas-container');
  const canvas = document.getElementById('car-canvas');

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0b0b12);
  scene.fog = new THREE.Fog(0x0b0b12, 12, 28);

  camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(4.5, 2.2, 5.5);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  // Environment
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  // Lights
  const amb = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(amb);
  const dir = new THREE.DirectionalLight(0xffffff, 1.2);
  dir.position.set(5, 10, 7);
  dir.castShadow = true;
  scene.add(dir);
  const fill = new THREE.DirectionalLight(0x88aaff, 0.35);
  fill.position.set(-5, 3, -5);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0xffffff, 0.25);
  rim.position.set(0, 5, -8);
  scene.add(rim);

  // Floor
  const floorGeo = new THREE.CircleGeometry(12, 64);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x111118, metalness: 0.6, roughness: 0.35,
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  floor.receiveShadow = true;
  scene.add(floor);

  // Grid helper subtle
  const grid = new THREE.GridHelper(20, 40, 0x222230, 0x16161e);
  grid.position.y = 0.01;
  scene.add(grid);

  // Controls
  controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 3;
  controls.maxDistance = 14;
  controls.maxPolarAngle = Math.PI / 2 - 0.05;
  controls.target.set(0, 0.6, 0);

  buildCar();
  resizeRenderer();
  window.addEventListener('resize', resizeRenderer);
}

function buildCar() {
  if (carGroup) scene.remove(carGroup);
  carGroup = new THREE.Group();
  wheelMeshes = [];
  caliperMeshes = [];

  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: 0xf8f8ff,
    metalness: 0.75,
    roughness: 0.25,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.2,
  });

  // Main body (simplified sedan)
  const body = new THREE.Group();

  // Lower body
  const lower = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.7, 1.9), bodyMat);
  lower.position.y = 0.55;
  lower.castShadow = true;
  body.add(lower);

  // Cabin
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.85, 1.75), bodyMat);
  cabin.position.set(-0.15, 1.25, 0);
  cabin.castShadow = true;
  body.add(cabin);

  // Hood slope
  const hood = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.35, 1.85), bodyMat);
  hood.position.set(1.55, 0.85, 0);
  hood.rotation.z = -0.12;
  hood.castShadow = true;
  body.add(hood);

  // Trunk
  const trunk = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.4, 1.85), bodyMat);
  trunk.position.set(-1.7, 0.85, 0);
  trunk.castShadow = true;
  body.add(trunk);

  // Windows (dark glass)
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x111122, metalness: 0.1, roughness: 0.05,
    transparent: true, opacity: 0.55, transmission: 0.4,
  });
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.7, 1.6), glassMat);
  windshield.position.set(0.95, 1.3, 0);
  windshield.rotation.z = -0.35;
  body.add(windshield);

  const rearGlass = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.55, 1.55), glassMat);
  rearGlass.position.set(-1.25, 1.25, 0);
  rearGlass.rotation.z = 0.25;
  body.add(rearGlass);

  // Side windows
  const sideGlassL = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.55, 0.06), glassMat);
  sideGlassL.position.set(-0.15, 1.3, 0.88);
  body.add(sideGlassL);
  const sideGlassR = sideGlassL.clone();
  sideGlassR.position.z = -0.88;
  body.add(sideGlassR);

  bodyMesh = body;
  carGroup.add(body);

  // Wheels
  const wheelPositions = [
    [1.35, 0.38, 0.95], [1.35, 0.38, -0.95],
    [-1.35, 0.38, 0.95], [-1.35, 0.38, -0.95],
  ];
  wheelPositions.forEach(pos => {
    const wheel = createWheel();
    wheel.position.set(...pos);
    carGroup.add(wheel);
    wheelMeshes.push(wheel);
  });

  // Headlights
  const headMat = new THREE.MeshStandardMaterial({ color: 0xffffee, emissive: 0xffffaa, emissiveIntensity: 0.6 });
  const hl1 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.2, 0.35), headMat);
  hl1.position.set(2.12, 0.65, 0.65);
  carGroup.add(hl1);
  const hl2 = hl1.clone();
  hl2.position.z = -0.65;
  carGroup.add(hl2);

  // Taillights
  const tailMat = new THREE.MeshStandardMaterial({ color: 0xff0000, emissive: 0xff0000, emissiveIntensity: 0.5 });
  const tl1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.18, 0.4), tailMat);
  tl1.position.set(-2.12, 0.7, 0.7);
  carGroup.add(tl1);
  const tl2 = tl1.clone();
  tl2.position.z = -0.7;
  carGroup.add(tl2);

  scene.add(carGroup);
  updateCarColor();
  updateWheels();
}

function createWheel() {
  const group = new THREE.Group();
  // Tire
  const tire = new THREE.Mesh(
    new THREE.CylinderGeometry(0.38, 0.38, 0.28, 32),
    new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.7 })
  );
  tire.rotation.z = Math.PI / 2;
  tire.castShadow = true;
  group.add(tire);

  // Rim
  const rim = new THREE.Mesh(
    new THREE.CylinderGeometry(0.26, 0.26, 0.3, 24),
    new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9, roughness: 0.2 })
  );
  rim.rotation.z = Math.PI / 2;
  group.add(rim);

  // Caliper
  const cal = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.18, 0.08),
    new THREE.MeshStandardMaterial({ color: 0xdc2626, metalness: 0.5, roughness: 0.4 })
  );
  cal.position.set(0, 0.12, 0.12);
  group.add(cal);
  caliperMeshes.push(cal);

  return group;
}

function updateCarColor() {
  if (!bodyMesh) return;
  const paint = PAINTS.find(p => p.id === config.paint) || PAINTS[0];
  const finish = config.finish;
  bodyMesh.traverse(child => {
    if (child.isMesh && child.material && child.material.type === 'MeshPhysicalMaterial') {
      child.material.color.set(paint.hex);
      if (finish === 'matte') {
        child.material.metalness = 0.2;
        child.material.roughness = 0.75;
        child.material.clearcoat = 0.1;
      } else if (finish === 'metallic') {
        child.material.metalness = 0.95;
        child.material.roughness = 0.2;
        child.material.clearcoat = 0.8;
      } else if (finish === 'pearl') {
        child.material.metalness = 0.7;
        child.material.roughness = 0.15;
        child.material.clearcoat = 1.0;
        child.material.clearcoatRoughness = 0.05;
      } else {
        child.material.metalness = 0.75;
        child.material.roughness = 0.25;
        child.material.clearcoat = 1.0;
      }
      child.material.needsUpdate = true;
    }
  });
}

function updateWheels() {
  const sizeMap = { '16': 0.9, '17': 0.95, '18': 1.0, '19': 1.08, '20': 1.15 };
  const scale = sizeMap[config.wheelSize] || 1;
  const styleColors = {
    sport: 0xcccccc, luxury: 0xe8e8e8, racing: 0x222222,
    chrome: 0xffffff, black: 0x1a1a1a, gold: 0xd4af37, gunmetal: 0x4a4a4a,
  };
  const rimColor = styleColors[config.wheelStyle] || 0xcccccc;
  const cal = CALIPERS.find(c => c.id === config.caliper);

  wheelMeshes.forEach((w, i) => {
    w.scale.set(scale, scale, scale);
    w.children.forEach(c => {
      if (c.material && c.geometry?.type === 'CylinderGeometry' && c.geometry.parameters.radiusTop < 0.3) {
        c.material.color.setHex(rimColor);
        c.material.metalness = config.wheelStyle === 'chrome' ? 1 : 0.85;
      }
    });
  });
  caliperMeshes.forEach(c => {
    if (cal) c.material.color.set(cal.hex);
  });
}

function resizeRenderer() {
  const container = document.getElementById('canvas-container');
  if (!container || !renderer) return;
  const w = container.clientWidth;
  const h = container.clientHeight;
  if (w === 0 || h === 0) return;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h, false);
}

function animate() {
  animId = requestAnimationFrame(animate);
  if (autoRotate && controls) {
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.5;
  } else if (controls) {
    controls.autoRotate = false;
  }
  controls?.update();
  // subtle wheel spin when auto
  if (autoRotate) {
    wheelMeshes.forEach(w => { w.rotation.x -= 0.04; });
  }
  renderer?.render(scene, camera);
}

window.setCamera = function(mode) {
  if (!camera || !controls) return;
  const targets = {
    front: { pos: [0, 1.2, 6.5], target: [0, 0.7, 0] },
    side: { pos: [6.5, 1.5, 0], target: [0, 0.7, 0] },
    rear: { pos: [0, 1.4, -6.5], target: [0, 0.7, 0] },
    top: { pos: [0, 9, 0.1], target: [0, 0, 0] },
    interior: { pos: [0.3, 1.4, 0.5], target: [0.8, 1.1, 0] },
  };
  const t = targets[mode] || targets.front;
  // simple lerp
  const startPos = camera.position.clone();
  const startTarget = controls.target.clone();
  const endPos = new THREE.Vector3(...t.pos);
  const endTarget = new THREE.Vector3(...t.target);
  let k = 0;
  function lerpCam() {
    k += 0.04;
    if (k > 1) k = 1;
    camera.position.lerpVectors(startPos, endPos, k);
    controls.target.lerpVectors(startTarget, endTarget, k);
    controls.update();
    if (k < 1) requestAnimationFrame(lerpCam);
  }
  lerpCam();
};

window.toggleAutoRotate = function() {
  autoRotate = !autoRotate;
  document.getElementById('auto-btn').textContent = autoRotate ? 'Stop Rotate' : 'Auto Rotate';
};

// ===================== INIT =====================
renderModels();
renderConfigUI();
updatePriceUI();
initThree();
showPage('home');
