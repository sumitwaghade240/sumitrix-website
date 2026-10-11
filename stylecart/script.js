/**
 * ============================================================================
 * StyleCart — Boutique Fashion Catalogue & WhatsApp Checkout Engine
 * ============================================================================
 * 
 * CONFIGURATION:
 * Replace '91XXXXXXXXXX' with the shop owner's WhatsApp number in international
 * digits-only format (e.g., 919876543210 for an Indian number: 91 + 10 digits).
 */
const SHOP_WHATSAPP_NUMBER = "91XXXXXXXXXX";

/** Free shipping minimum order threshold in INR */
const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;

// ============================================================================
// Sample Products Dataset (Clearly marked as demo catalogue items)
// ============================================================================
const PRODUCTS = [
  {
    id: "sc-01",
    name: "Heavyweight Boxy Fit Tee",
    category: "streetwear",
    categoryLabel: "Streetwear",
    price: 899,
    mrp: 1499,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    alt: "Boxy fit minimalist cotton t-shirt",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Washed Black", hex: "#1c1c1c" },
      { name: "Vintage Bone", hex: "#e5ded4" },
      { name: "Olive Mist", hex: "#5b6655" }
    ]
  },
  {
    id: "sc-02",
    name: "Resort Cuban Collar Linen Shirt",
    category: "shirts",
    categoryLabel: "Shirts & Polos",
    price: 1399,
    mrp: 2199,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    alt: "Casual resort linen shirt with relaxed collar",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Oatmeal", hex: "#d8cfc4" },
      { name: "Sage Green", hex: "#8a9a86" },
      { name: "Sky Blue", hex: "#a4b9c9" }
    ]
  },
  {
    id: "sc-03",
    name: "Relaxed Pleated Chino Trousers",
    category: "streetwear",
    categoryLabel: "Streetwear",
    price: 1699,
    mrp: 2699,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    alt: "Tailored relaxed fit pleated chino trousers",
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Sand Khaki", hex: "#c7b79e" },
      { name: "Muted Charcoal", hex: "#383838" },
      { name: "Midnight Navy", hex: "#1d2636" }
    ]
  },
  {
    id: "sc-04",
    name: "Drop-Shoulder French Terry Hoodie",
    category: "outerwear",
    categoryLabel: "Outerwear",
    price: 1899,
    mrp: 2999,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    alt: "Cozy drop shoulder minimalist hoodie",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Cocoa Brown", hex: "#4a3528" },
      { name: "Heather Grey", hex: "#9a9a9a" },
      { name: "Pitch Black", hex: "#111111" }
    ]
  },
  {
    id: "sc-05",
    name: "Retro Wool-Blend Bomber Jacket",
    category: "outerwear",
    categoryLabel: "Outerwear",
    price: 2499,
    mrp: 3999,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    alt: "Vintage classic cut bomber jacket",
    sizes: ["M", "L", "XL"],
    colors: [
      { name: "Forest & Cream", hex: "#223d2f" },
      { name: "Deep Navy", hex: "#17223b" }
    ]
  },
  {
    id: "sc-06",
    name: "Textured Ribbed Knit Polo",
    category: "shirts",
    categoryLabel: "Shirts & Polos",
    price: 1199,
    mrp: 1899,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
    alt: "Fine textured knit polo shirt",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Terracotta", hex: "#b85d43" },
      { name: "Off-White", hex: "#f3ede3" },
      { name: "Jet Black", hex: "#141414" }
    ]
  },
  {
    id: "sc-07",
    name: "Washed Cargo Utility Pants",
    category: "streetwear",
    categoryLabel: "Streetwear",
    price: 1799,
    mrp: 2799,
    image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80",
    alt: "Modern utility cargo pants with deep pockets",
    sizes: ["30", "32", "34", "36"],
    colors: [
      { name: "Olive Drab", hex: "#4b533a" },
      { name: "Washed Slate", hex: "#484f56" },
      { name: "Desert Tan", hex: "#bda88a" }
    ]
  },
  {
    id: "sc-08",
    name: "Linen Lounge Co-ord Set (Shirt & Shorts)",
    category: "coord",
    categoryLabel: "Co-ord Sets",
    price: 2299,
    mrp: 3499,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    alt: "Breathable summer linen matching two-piece set",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Natural Flax", hex: "#dfd5c4" },
      { name: "Muted Terracotta", hex: "#9b604b" },
      { name: "Pure Chalk", hex: "#f9f8f5" }
    ]
  }
];

// ============================================================================
// Application State
// ============================================================================
let cart = [];
let activeCategory = "all";
// Store user selected size and color per product card: { [productId]: { size, color } }
const productSelections = {};

// Initialize default selections for each product
PRODUCTS.forEach(p => {
  productSelections[p.id] = {
    size: p.sizes[0],
    color: p.colors[0].name
  };
});

// DOM Elements
const productGrid = document.getElementById("product-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-drawer-overlay");
const cartCountBadge = document.getElementById("cart-count-badge");
const drawerItemCount = document.getElementById("drawer-item-count");
const cartEmptyState = document.getElementById("cart-empty-state");
const cartActiveState = document.getElementById("cart-active-state");
const cartItemsList = document.getElementById("cart-items-list");
const summarySubtotal = document.getElementById("summary-subtotal");
const summaryShipping = document.getElementById("summary-shipping");
const summaryTotal = document.getElementById("summary-total");
const shippingNote = document.getElementById("shipping-note");
const emptyShopBtn = document.getElementById("empty-shop-btn");
const sendWhatsAppOrderBtn = document.getElementById("send-whatsapp-order-btn");
const cartValidationMsg = document.getElementById("cart-validation-msg");
const toastContainer = document.getElementById("toast-container");

// Preview Modal Elements
const previewModal = document.getElementById("preview-modal");
const closePreviewModalBtn = document.getElementById("close-preview-modal-btn");
const previewMessageContent = document.getElementById("preview-message-content");
const modalCopyBtn = document.getElementById("modal-copy-btn");
const modalLaunchBtn = document.getElementById("modal-launch-btn");
let pendingWhatsAppUrl = "";

// Set copyright year
document.getElementById("year").textContent = new Date().getFullYear();

// ============================================================================
// Render Product Cards
// ============================================================================
function renderProducts() {
  const filtered = activeCategory === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  productGrid.innerHTML = "";

  if (filtered.length === 0) {
    productGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
        <p>No products found in this category.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.dataset.id = product.id;

    const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
    const currentSelection = productSelections[product.id];

    // Build Size Chips HTML
    const sizesHtml = product.sizes.map(size => `
      <button type="button" 
              class="size-chip ${size === currentSelection.size ? 'selected' : ''}" 
              data-size="${size}"
              aria-label="Select size ${size}">
        ${size}
      </button>
    `).join("");

    // Build Color Chips HTML
    const colorsHtml = product.colors.map(col => `
      <button type="button" 
              class="color-chip ${col.name === currentSelection.color ? 'selected' : ''}" 
              data-color="${col.name}"
              aria-label="Select colour ${col.name}">
        <span class="color-swatch-dot" style="background-color: ${col.hex};"></span>
        <span>${col.name}</span>
      </button>
    `).join("");

    card.innerHTML = `
      <div class="product-image-wrap">
        <img class="product-image" src="${product.image}" alt="${product.alt}" loading="lazy">
        <span class="category-badge">${product.categoryLabel}</span>
        <span class="sale-pill">${discount}% OFF</span>
      </div>

      <div class="product-info">
        <h3 class="product-title">${product.name} <small class="demo-tag" style="font-size:0.68rem;font-weight:600;color:var(--text-muted);">(Demo Item)</small></h3>
        
        <div class="product-pricing">
          <span class="price-current">₹${product.price.toLocaleString("en-IN")} <small style="font-size:0.68rem;font-weight:500;color:var(--text-muted);">(Demo Price)</small></span>
          <span class="price-mrp">₹${product.mrp.toLocaleString("en-IN")}</span>
        </div>

        <!-- Size Options -->
        <div class="selector-block">
          <div class="selector-label">
            <span>Size</span>
            <span class="selected-val size-display">${currentSelection.size}</span>
          </div>
          <div class="size-chips" role="group" aria-label="Select size">
            ${sizesHtml}
          </div>
        </div>

        <!-- Colour Options -->
        <div class="selector-block">
          <div class="selector-label">
            <span>Colour</span>
            <span class="selected-val color-display">${currentSelection.color}</span>
          </div>
          <div class="color-chips" role="group" aria-label="Select colour">
            ${colorsHtml}
          </div>
        </div>

        <!-- Add to Bag Button -->
        <button type="button" class="add-to-cart-btn" data-id="${product.id}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <span>Add to Bag</span>
        </button>
      </div>
    `;

    // Attach Event Listeners for Card Interaction
    attachCardListeners(card, product);
    productGrid.appendChild(card);
  });
}

function attachCardListeners(card, product) {
  const sizeChips = card.querySelectorAll(".size-chip");
  const sizeDisplay = card.querySelector(".size-display");
  const colorChips = card.querySelectorAll(".color-chip");
  const colorDisplay = card.querySelector(".color-display");
  const addBtn = card.querySelector(".add-to-cart-btn");

  // Size chip click
  sizeChips.forEach(chip => {
    chip.addEventListener("click", () => {
      sizeChips.forEach(c => c.classList.remove("selected"));
      chip.classList.add("selected");
      const chosenSize = chip.dataset.size;
      productSelections[product.id].size = chosenSize;
      sizeDisplay.textContent = chosenSize;
    });
  });

  // Color chip click
  colorChips.forEach(chip => {
    chip.addEventListener("click", () => {
      colorChips.forEach(c => c.classList.remove("selected"));
      chip.classList.add("selected");
      const chosenColor = chip.dataset.color;
      productSelections[product.id].color = chosenColor;
      colorDisplay.textContent = chosenColor;
    });
  });

  // Add to Bag click
  addBtn.addEventListener("click", () => {
    const sel = productSelections[product.id];
    addToCart(product, sel.size, sel.color);

    // Micro-feedback on button
    addBtn.classList.add("added-state");
    const originalText = addBtn.innerHTML;
    addBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
      <span>Added!</span>
    `;
    setTimeout(() => {
      addBtn.classList.remove("added-state");
      addBtn.innerHTML = originalText;
    }, 1200);

    showToast(`Added ${product.name} (${sel.size}, ${sel.color}) to your bag`);
  });
}

// ============================================================================
// Category Filters
// ============================================================================
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    renderProducts();
  });
});

// Update filter counts
function updateFilterCounts() {
  const counts = {
    all: PRODUCTS.length,
    streetwear: PRODUCTS.filter(p => p.category === "streetwear").length,
    shirts: PRODUCTS.filter(p => p.category === "shirts").length,
    outerwear: PRODUCTS.filter(p => p.category === "outerwear").length,
    coord: PRODUCTS.filter(p => p.category === "coord").length
  };

  for (const [cat, count] of Object.entries(counts)) {
    const el = document.getElementById(`count-${cat}`);
    if (el) el.textContent = count;
  }
}

// ============================================================================
// Cart Logic
// ============================================================================
function addToCart(product, size, color) {
  const existingIndex = cart.findIndex(item => 
    item.productId === product.id && item.size === size && item.color === color
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += 1;
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: size,
      color: color,
      quantity: 1
    });
  }

  updateCartUI();
}

function updateQuantity(index, delta) {
  if (cart[index]) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    updateCartUI();
  }
}

function removeFromCart(index) {
  if (cart[index]) {
    const removedName = cart[index].name;
    cart.splice(index, 1);
    updateCartUI();
    showToast(`Removed ${removedName} from bag`);
  }
}

function updateCartUI() {
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountBadge.textContent = totalItemsCount;
  drawerItemCount.textContent = `${totalItemsCount} ${totalItemsCount === 1 ? 'item' : 'items'}`;

  if (cart.length === 0) {
    cartEmptyState.style.display = "flex";
    cartActiveState.style.display = "none";
    return;
  }

  cartEmptyState.style.display = "none";
  cartActiveState.style.display = "block";

  // Render items
  cartItemsList.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    subtotal += itemSubtotal;

    const itemRow = document.createElement("div");
    itemRow.className = "cart-item";
    itemRow.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-details">
        <h4 class="cart-item-title">${item.name}</h4>
        <div class="cart-item-meta">
          <span>Size: <strong>${item.size}</strong></span>
          <span>Colour: <strong>${item.color}</strong></span>
        </div>
        <div class="cart-item-price">
          ₹${item.price.toLocaleString("en-IN")} × ${item.quantity} = ₹${itemSubtotal.toLocaleString("en-IN")}
        </div>
        <div class="qty-controller">
          <button type="button" class="qty-btn dec-btn" data-index="${index}" aria-label="Decrease quantity">−</button>
          <span class="qty-val">${item.quantity}</span>
          <button type="button" class="qty-btn inc-btn" data-index="${index}" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <div class="cart-item-actions">
        <button type="button" class="remove-item-btn" data-index="${index}" aria-label="Remove item">Remove</button>
      </div>
    `;

    // Listeners for quantity and remove
    itemRow.querySelector(".dec-btn").addEventListener("click", () => updateQuantity(index, -1));
    itemRow.querySelector(".inc-btn").addEventListener("click", () => updateQuantity(index, 1));
    itemRow.querySelector(".remove-item-btn").addEventListener("click", () => removeFromCart(index));

    cartItemsList.appendChild(itemRow);
  });

  // Calculate Shipping & Total
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const grandTotal = subtotal + shippingFee;

  summarySubtotal.textContent = `₹${subtotal.toLocaleString("en-IN")}`;
  summaryShipping.textContent = isFreeShipping ? "FREE" : `₹${shippingFee}`;
  summaryTotal.textContent = `₹${grandTotal.toLocaleString("en-IN")}`;

  if (isFreeShipping) {
    shippingNote.textContent = "🎉 Free local delivery applied!";
    shippingNote.style.color = "#198754";
  } else {
    const needed = FREE_SHIPPING_THRESHOLD - subtotal;
    shippingNote.textContent = `Add ₹${needed.toLocaleString("en-IN")} more to qualify for FREE delivery!`;
    shippingNote.style.color = "#b85d43";
  }

  // Clear any validation warning once user adds or changes items
  cartValidationMsg.style.display = "none";
}

// Drawer Open / Close Functions
function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  cartOverlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartOverlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

openCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
emptyShopBtn.addEventListener("click", () => {
  closeCart();
  const cat = document.getElementById("catalogue");
  if (cat) cat.scrollIntoView({ behavior: "smooth" });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && cartDrawer.classList.contains("open")) {
    closeCart();
  }
});

// ============================================================================
// WhatsApp Order Generator & Validation
// ============================================================================
sendWhatsAppOrderBtn.addEventListener("click", handleWhatsAppCheckout);

function handleWhatsAppCheckout() {
  if (cart.length === 0) {
    showCartError("Your shopping bag is empty. Please add items before placing an order.");
    return;
  }

  const custNameInput = document.getElementById("cust-name");
  const custAddressInput = document.getElementById("cust-address");
  const custName = custNameInput.value.trim();
  const custPhone = document.getElementById("cust-phone").value.trim();
  const custAddress = custAddressInput.value.trim();
  const custPayment = document.getElementById("cust-payment").value;
  const custNotes = document.getElementById("cust-notes").value.trim();

  // Reset aria-invalid
  custNameInput.removeAttribute("aria-invalid");
  custAddressInput.removeAttribute("aria-invalid");

  // Validate mandatory fields
  if (!custName) {
    showCartError("Please enter your Full Name so the store knows who to address.");
    custNameInput.setAttribute("aria-invalid", "true");
    custNameInput.focus();
    return;
  }

  if (!custAddress) {
    showCartError("Please enter your complete Delivery Address & City.");
    custAddressInput.setAttribute("aria-invalid", "true");
    custAddressInput.focus();
    return;
  }

  // Calculate totals
  let subtotal = 0;
  let totalItemsCount = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    totalItemsCount += item.quantity;
  });

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = isFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const grandTotal = subtotal + shippingFee;

  // Build clean, readable formatted WhatsApp message
  const lines = [
    "🛍️ *NEW ORDER REQUEST — STYLECART BOUTIQUE (DEMO)*",
    "----------------------------------------",
    `*Items Ordered (${totalItemsCount} total):*`
  ];

  cart.forEach((item, idx) => {
    const lineTotal = item.price * item.quantity;
    lines.push(
      `\n${idx + 1}. *${item.name}*`,
      `   • Size: ${item.size} | Colour: ${item.color}`,
      `   • Qty: ${item.quantity} × ₹${item.price.toLocaleString("en-IN")} = ₹${lineTotal.toLocaleString("en-IN")}`
    );
  });

  lines.push(
    "\n----------------------------------------",
    `*Items Subtotal:* ₹${subtotal.toLocaleString("en-IN")}`,
    `*Delivery Fee:* ${isFreeShipping ? "FREE (Applied)" : `₹${shippingFee}`}`,
    `*Estimated Total:* ₹${grandTotal.toLocaleString("en-IN")}`,
    "----------------------------------------",
    "\n📍 *CUSTOMER & DELIVERY DETAILS:*",
    `• Name: ${custName}`,
    custPhone ? `• Contact: ${custPhone}` : "",
    `• Address: ${custAddress}`,
    `• Preferred Payment: ${custPayment}`,
    custNotes ? `• Note: ${custNotes}` : "",
    "\n💬 _Order generated via StyleCart WhatsApp Demo. Please confirm availability & dispatch timing._"
  );

  // Filter out any blank lines
  const cleanMessage = lines.filter(l => l !== "").join("\n");
  const encodedText = encodeURIComponent(cleanMessage);

  // Validate WhatsApp Number format (supports 10-15 digits international E.164 without '+')
  const isNumberConfigured = /^\d{10,15}$/.test(SHOP_WHATSAPP_NUMBER) && !SHOP_WHATSAPP_NUMBER.includes("X");
  pendingWhatsAppUrl = isNumberConfigured
    ? `https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodedText}`
    : `https://wa.me/?text=${encodedText}`;

  if (!isNumberConfigured) {
    // Show Preview Modal with instructions so client/teacher can inspect the generated message
    showPreviewModal(
      cleanMessage,
      "Demo Configuration Note: Replace '91XXXXXXXXXX' in stylecart/script.js with the boutique owner's real 10–15 digit WhatsApp number without '+' or spaces (e.g., 919876543210 for India). You can preview the exact message generated below or launch it to any contact!"
    );
  } else {
    // Open directly in WhatsApp
    window.open(pendingWhatsAppUrl, "_blank", "noopener,noreferrer");
    showToast("Opening WhatsApp with your order summary...");
  }
}

function showCartError(msg) {
  cartValidationMsg.textContent = msg;
  cartValidationMsg.style.display = "block";
  cartValidationMsg.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ============================================================================
// Preview Modal Handlers
// ============================================================================
function showPreviewModal(messageText, infoText) {
  previewMessageContent.textContent = messageText;
  if (infoText) {
    document.querySelector(".modal-info").textContent = infoText;
  }
  previewModal.style.display = "flex";
}

function closePreviewModal() {
  previewModal.style.display = "none";
}

closePreviewModalBtn.addEventListener("click", closePreviewModal);
previewModal.addEventListener("click", (e) => {
  if (e.target === previewModal) closePreviewModal();
});

modalCopyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(previewMessageContent.textContent).then(() => {
    modalCopyBtn.textContent = "Copied! ✓";
    setTimeout(() => { modalCopyBtn.textContent = "Copy Message Text"; }, 1800);
    showToast("Message copied to clipboard!");
  });
});

modalLaunchBtn.addEventListener("click", () => {
  if (pendingWhatsAppUrl) {
    window.open(pendingWhatsAppUrl, "_blank", "noopener,noreferrer");
  }
});

// ============================================================================
// Notification Toast
// ============================================================================
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "all 0.2s ease";
    setTimeout(() => toast.remove(), 250);
  }, 2600);
}

// ============================================================================
// Initial Run
// ============================================================================
renderProducts();
updateFilterCounts();
updateCartUI();
