
// ===============================
// Starbucks Website JavaScript
// ===============================

const PRICE = 3;

// Cart data
let cart = {};

// Get HTML elements
const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cart");
const closeCart = document.getElementById("closeCart");
const clearCart = document.getElementById("clearCart");

const cartList = document.getElementById("cartList");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const toast = document.getElementById("toast");

// ===============================
// Show notification
// ===============================

function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2000);
}

// ===============================
// Add product to cart
// ===============================

document.querySelectorAll(".add").forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name;

        if (!name) return;

        if (cart[name]) {
            cart[name]++;
        } else {
            cart[name] = 1;
        }

        renderCart();
        showToast(name + " added to cart!");
    });
});

// ===============================
// Display cart
// ===============================

function renderCart() {
    if (!cartList || !cartCount || !cartTotal) return;

    cartList.innerHTML = "";

    let totalItems = 0;
    let totalPrice = 0;

    for (const name in cart) {
        const quantity = cart[name];

        totalItems += quantity;
        totalPrice += quantity * PRICE;

        const li = document.createElement("li");

        const productName = document.createElement("span");
        productName.textContent = name + " x " + quantity;

        const removeButton = document.createElement("button");
        removeButton.textContent = "−";
        removeButton.type = "button";
        removeButton.setAttribute("aria-label", "Remove one " + name);

        removeButton.addEventListener("click", () => {
            cart[name]--;

            if (cart[name] <= 0) {
                delete cart[name];
            }

            renderCart();
        });

        li.appendChild(productName);
        li.appendChild(removeButton);

        cartList.appendChild(li);
    }

    cartCount.textContent = totalItems;
    cartTotal.textContent = totalPrice.toFixed(2);
}

// ===============================
// Open cart
// ===============================

if (cartBtn && cartPanel) {
    cartBtn.addEventListener("click", () => {
        cartPanel.classList.add("open");
    });
}

// ===============================
// Close cart
// ===============================

if (closeCart && cartPanel) {
    closeCart.addEventListener("click", () => {
        cartPanel.classList.remove("open");
    });
}

// ===============================
// Clear cart
// ===============================

if (clearCart) {
    clearCart.addEventListener("click", () => {
        cart = {};
        renderCart();
        showToast("Cart cleared!");
    });
}

// ===============================
// Mobile menu
// ===============================

if (burger && menu) {
    burger.addEventListener("click", () => {
        menu.classList.toggle("open");
    });

    // Close menu after clicking a link
    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("open");
        });
    });
}

// ===============================
// Close cart/menu with Escape
// ===============================

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        cartPanel?.classList.remove("open");
        menu?.classList.remove("open");
    }
});

// Initial cart display
renderCart();
