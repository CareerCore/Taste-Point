// Taste Point - Main JavaScript
// ==============================================

// --- Data (Menu Items) ---
const menuItems = [
    { id: 1, name: "Classic Cheese Burger", description: "Juicy beef patty with melted cheddar, fresh lettuce, tomato, pickles on a brioche bun.", price: 8.99, category: "burgers", image: "images/food-burger.jpg" },
    { id: 2, name: "BBQ Bacon Burger", description: "Smoky BBQ sauce, crispy bacon, onion rings, and sharp cheddar on a toasted bun.", price: 10.99, category: "burgers", image: "images/BBQ Bacon Angus Burger (McDonald’s Style).jfif" },
    { id: 3, name: "Pepperoni Pizza", description: "Classic hand-tossed dough with rich tomato sauce, mozzarella, and spicy pepperoni.", price: 12.99, category: "pizza", image: "images/food-pizza.jpg" },
    { id: 4, name: "Margherita Pizza", description: "Fresh tomatoes, basil, and mozzarella on a wood-fired crust with olive oil.", price: 11.99, category: "pizza", image: "images/Simple Margarita Flatbread.jfif" },
    { id: 5, name: "Chicken Alfredo Pasta", description: "Creamy Alfredo sauce with grilled chicken, parmesan, and fettuccine pasta.", price: 13.99, category: "pasta", image: "images/food-pasta.jpg" },
    { id: 6, name: "Seafood Marinara", description: "Spaghetti tossed with shrimp, mussels, calamari in a rich tomato basil sauce.", price: 15.99, category: "pasta", image: "images/Shrimp and Marinara Sauce (The Secret to Perfect Flavor_).jfif" },
    { id: 7, name: "Loaded Fries", description: "Crispy golden fries topped with melted cheese, jalapenos, sour cream, and chives.", price: 6.99, category: "appetizers", image: "images/Cheesy Carnival-Style Loaded Waffle Fries.jfif" },
    { id: 8, name: "Chicken Wings", description: "10 pieces of crispy chicken wings tossed in your choice of BBQ or Buffalo sauce.", price: 9.99, category: "appetizers", image: "images/Crispy Fried Chicken Wings Recipe_ A Simple, Flavorful Treat for Any Occasion.jfif" },
    { id: 9, name: "Chocolate Lava Cake", description: "Warm chocolate cake with a molten center, served with vanilla ice cream.", price: 7.99, category: "desserts", image: "images/food-dessert.jpg" },
    { id: 10, name: "Cheesecake", description: "Classic New York style cheesecake with a graham cracker crust and berry compote.", price: 6.99, category: "desserts", image: "images/Creamy, Amazing New York Cheesecake - Pretty_ Simple. Sweet_" },
    { id: 11, name: "Fresh Mojito", description: "Refreshing blend of lime juice, mint leaves, sugar, and soda water.", price: 4.99, category: "beverages", image: "images/food-drink.jpg" },
    { id: 12, name: "Iced Caramel Latte", description: "Espresso with caramel syrup, milk, and ice topped with whipped cream.", price: 5.49, category: "beverages", image: "images/Iced Caramel Vanilla Latte – Sweet, Creamy & Café-Style at Home.jfif" }
];

function formatPrice(amount) {
    return `$${amount.toFixed(2)}`;
}

// --- Cart Management ---
let cart = JSON.parse(localStorage.getItem('tastePointCart')) || [];

function saveCart() {
    localStorage.setItem('tastePointCart', JSON.stringify(cart));
    updateCartCount();
}

function getCartCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(el => {
        el.textContent = getCartCount();
        el.classList.add('pop');
        setTimeout(() => el.classList.remove('pop'), 350);
    });
}

function addToCart(itemId) {
    const existingItem = cart.find(item => item.id === itemId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id: itemId, quantity: 1 });
    }
    saveCart();
    showToast('Item added to cart!');
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    renderCart();
}

function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            saveCart();
            renderCart();
        }
    }
}

function getCartTotal() {
    return cart.reduce((total, cartItem) => {
        const item = menuItems.find(m => m.id === cartItem.id);
        return total + (item.price * cartItem.quantity);
    }, 0);
}

// --- UI Rendering ---

function renderFeaturedMenu() {
    const container = document.getElementById('featuredMenu');
    if (!container) return;

    const featuredIds = [1, 3, 5, 9, 11];
    const featuredItems = menuItems.filter(item => featuredIds.includes(item.id));

    container.innerHTML = featuredItems.map(item => `
        <div class="menu-card reveal">
            <div class="menu-card-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="menu-card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-card-footer">
                    <span class="price">${formatPrice(item.price)}</span>
                    <button class="btn btn-primary" style="padding: 8px 15px; font-size: 0.85rem;" onclick="addToCart(${item.id})">
                        <i class="fas fa-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    observeRevealTargets();
}

function renderFullMenu(category = 'all') {
    const container = document.getElementById('menuGrid');
    if (!container) return;

    const filteredItems = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);

    container.innerHTML = filteredItems.map(item => `
        <div class="menu-card reveal">
            <div class="menu-card-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="menu-card-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="menu-card-footer">
                    <span class="price">${formatPrice(item.price)}</span>
                    <button class="btn btn-primary" style="padding: 8px 15px; font-size: 0.85rem;" onclick="addToCart(${item.id})">
                        <i class="fas fa-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    observeRevealTargets();
}

const showcaseData = [1, 3, 5, 7, 9, 12, 8].map(id => menuItems.find(item => item.id === id)).filter(Boolean);
let showcaseActiveIndex = 0;
let showcaseInterval;

function renderShowcaseRing() {
    const ring = document.getElementById('showcaseRing');
    if (!ring) return;

    ring.innerHTML = showcaseData.map((item, index) => `
        <div class="ring-item" data-index="${index}">
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name}</span>
        </div>
    `).join('');

    const items = ring.querySelectorAll('.ring-item');
    const radius = Math.min(180, ring.clientWidth / 2 - 80);

    items.forEach((item, index) => {
        const angle = (index / items.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const depth = Math.cos(angle) * 20;

        item.style.transform = `translate3d(${x}px, ${y}px, ${depth}px) rotateZ(${index * -20}deg)`;
        item.addEventListener('click', () => selectShowcaseItem(index));
    });
}

function updateShowcaseDisplay() {
    const item = showcaseData[showcaseActiveIndex];
    if (!item) return;

    const previewImage = document.getElementById('showcasePreviewImage');
    const nameEl = document.getElementById('showcaseName');
    const priceEl = document.getElementById('showcasePrice');
    const descEl = document.getElementById('showcaseDescription');
    const categoryEl = document.getElementById('showcaseCategory');

    previewImage.src = item.image;
    previewImage.alt = item.name;
    nameEl.textContent = item.name;
    priceEl.textContent = formatPrice(item.price);
    descEl.textContent = item.description;
    categoryEl.textContent = item.category;

    document.querySelectorAll('.ring-item').forEach((ringItem, index) => {
        ringItem.classList.toggle('active', index === showcaseActiveIndex);
    });
}

function selectShowcaseItem(index) {
    showcaseActiveIndex = index;
    updateShowcaseDisplay();
    resetShowcaseInterval();
}

function resetShowcaseInterval() {
    if (showcaseInterval) {
        clearInterval(showcaseInterval);
    }
    showcaseInterval = setInterval(() => {
        showcaseActiveIndex = (showcaseActiveIndex + 1) % showcaseData.length;
        updateShowcaseDisplay();
    }, 3000);
}

function initCircularShowcase() {
    if (!document.getElementById('showcaseRing')) return;
    renderShowcaseRing();
    updateShowcaseDisplay();

    const addButton = document.getElementById('showcaseAddButton');
    if (addButton) {
        addButton.addEventListener('click', () => {
            const item = showcaseData[showcaseActiveIndex];
            if (item) addToCart(item.id);
        });
    }

    resetShowcaseInterval();

    const ring = document.getElementById('showcaseRing');
    if (ring) {
        ring.addEventListener('mouseenter', () => { clearInterval(showcaseInterval); });
        ring.addEventListener('mouseleave', () => { resetShowcaseInterval(); });
    }
}

function renderCart() {
    const container = document.getElementById('cartContainer');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-basket"></i>
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added any delicious food yet. Explore our menu and treat yourself!</p>
                <a href="menu.html" class="btn btn-primary" style="margin-top: 30px;">Browse Menu</a>
            </div>
        `;
        return;
    }

    const deliveryFee = 2.99;
    const subtotal = getCartTotal();
    const total = subtotal + deliveryFee;

    container.innerHTML = `
        <div class="cart-items">
            ${cart.map(cartItem => {
                const item = menuItems.find(m => m.id === cartItem.id);
                return `
                    <div class="cart-item reveal">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                        <div class="cart-item-details">
                            <h3>${item.name}</h3>
                            <p>${formatPrice(item.price)}</p>
                        </div>
                        <div class="quantity-control">
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${cartItem.quantity}</span>
                            <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                        <div style="font-weight: 700;">
                            ${formatPrice(item.price * cartItem.quantity)}
                        </div>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                `;
            }).join('')}
        </div>
        <div class="cart-summary reveal">
            <h3>Cart Summary</h3>
            <div class="summary-row">
                <span>Subtotal</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="summary-row">
                <span>Delivery Fee</span>
                <span>${formatPrice(deliveryFee)}</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span>${formatPrice(total)}</span>
            </div>
            <a href="checkout.html" class="btn btn-primary" style="width: 100%; margin-top: 20px; text-align: center;">Proceed to Checkout</a>
        </div>
    `;
    observeRevealTargets();
}

let revealObserver;

function createRevealObserver() {
    if (revealObserver) return revealObserver;

    revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    return revealObserver;
}

function observeRevealTargets() {
    const observer = createRevealObserver();
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function addRevealClass(selectors) {
    document.querySelectorAll(selectors.join(', ')).forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
    });
}

function renderOrderSummary() {
    const container = document.getElementById('orderSummary');
    if (!container) return;

    const deliveryFee = 2.99;
    const subtotal = getCartTotal();
    const total = subtotal + deliveryFee;

    container.innerHTML = `
        ${cart.map(cartItem => {
            const item = menuItems.find(m => m.id === cartItem.id);
            return `
                <div class="order-item">
                    <span>${item.name} x${cartItem.quantity}</span>
                    <span>${formatPrice(item.price * cartItem.quantity)}</span>
                </div>
            `;
        }).join('')}
        <div style="border-top: 1px solid #ddd; margin-top: 15px; padding-top: 15px;">
            <div class="order-item">
                <span>Subtotal</span>
                <span>${formatPrice(subtotal)}</span>
            </div>
            <div class="order-item">
                <span>Delivery Fee</span>
                <span>${formatPrice(deliveryFee)}</span>
            </div>
            <div class="order-item total">
                <span>Total</span>
                <span style="color: var(--primary-color); font-size: 1.3rem;">${formatPrice(total)}</span>
            </div>
        </div>
    `;
    observeRevealTargets();
}

function renderConfirmationDetails() {
    const container = document.getElementById('confirmationDetails');
    if (!container) return;

    const order = JSON.parse(localStorage.getItem('tastePointOrder'));
    if (!order) return;

    container.innerHTML = `
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> #${order.id}</p>
        <p><strong>Customer:</strong> ${order.customerName}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Delivery Address:</strong> ${order.address}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <p><strong>Estimated Delivery:</strong> 30-45 minutes</p>
        <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 20px;">
            <h4 style="margin-bottom: 15px;">Items Ordered:</h4>
            ${order.items.map(item => {
                const menuItem = menuItems.find(m => m.id === item.id);
                return `<p>${menuItem.name} x${item.quantity} - ${formatPrice(menuItem.price * item.quantity)}</p>`;
            }).join('')}
            <h4 style="margin-top: 20px; border-top: 1px solid #ddd; padding-top: 20px;">Total Paid: ${formatPrice(order.total)}</h4>
        </div>
    `;
}

// --- Utility ---

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = 'var(--secondary-color)';
    toast.style.color = '#fff';
    toast.style.padding = '15px 25px';
    toast.style.borderRadius = '50px';
    toast.style.boxShadow = 'var(--shadow-lg)';
    toast.style.zIndex = '10000';
    toast.style.fontWeight = '600';
    toast.style.transform = 'translateY(100px)';
    toast.style.transition = 'transform 0.3s ease';

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
        toast.style.transform = 'translateY(100px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- Event Listeners & Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Page Specific Initializations
    if (document.getElementById('featuredMenu')) {
        renderFeaturedMenu();
    }

    if (document.getElementById('menuGrid')) {
        renderFullMenu();
        initCircularShowcase();

        // Category Buttons
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                renderFullMenu(btn.dataset.category);
            });
        });
    }

    if (document.getElementById('cartContainer')) {
        renderCart();
    }

    if (document.getElementById('orderSummary')) {
        renderOrderSummary();
    }

    if (document.getElementById('confirmationDetails')) {
        renderConfirmationDetails();
    }

    addRevealClass([
        '.section-header',
        '.hero-content',
        '.about-img',
        '.about-text',
        '.testimonial-card',
        '.checkout-form',
        '.order-summary-card',
        '.confirmation-icon',
        '.confirmation-page',
        '.order-details',
        '.footer-col',
        'header',
        '.hero'
    ]);
    observeRevealTargets();

    // Payment Method Selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    if (paymentMethods.length > 0) {
        paymentMethods.forEach(method => {
            method.addEventListener('click', () => {
                paymentMethods.forEach(m => m.classList.remove('active'));
                method.classList.add('active');
            });
        });
    }

    // Checkout Form Submission
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(checkoutForm);
            const customerName = formData.get('fullName');
            const phone = formData.get('phone');
            const address = formData.get('address');
            const paymentMethod = document.querySelector('.payment-method.active')?.dataset.method || 'cod';

            const deliveryFee = 2.99;
            const subtotal = getCartTotal();
            const total = subtotal + deliveryFee;

            const order = {
                id: Date.now().toString(36).toUpperCase(),
                customerName,
                phone,
                address,
                paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery' : (paymentMethod === 'card' ? 'Credit/Debit Card' : 'Online Payment'),
                items: [...cart],
                total
            };

            localStorage.setItem('tastePointOrder', JSON.stringify(order));
            cart = []; // Clear cart
            saveCart();

            window.location.href = 'order-confirmation.html';
        });
    }
});
