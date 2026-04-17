// =========================
// SLIDESHOW VARIABLES
// =========================
let currentSlide = 0;
let slideInterval;

// =========================
// RUN WHEN PAGE LOADS
// =========================
document.addEventListener("DOMContentLoaded", function () {
    setActiveFilterButton();
    prefillFoodFromURL();
    attachOrderFormListener();
    attachSummaryListeners();
    attachFeedbackListener();
    updateOrderSummary();

    showSlide(0);
    startAutoSlide();
});

// =========================
// MENU FILTER FUNCTION
// =========================
function filterMenu(category, button) {
    const items = document.querySelectorAll(".menu-item");
    const buttons = document.querySelectorAll(".filter-buttons button");

    items.forEach(item => {
        if (category === "all" || item.dataset.category === category) {
            item.classList.remove("hidden");
        } else {
            item.classList.add("hidden");
        }
    });

    buttons.forEach(btn => btn.classList.remove("active"));
    if (button) {
        button.classList.add("active");
    }
}

function setActiveFilterButton() {
    const firstButton = document.querySelector(".filter-buttons button");
    if (firstButton) {
        firstButton.classList.add("active");
    }
}

// =========================
// HOMEPAGE SLIDESHOW
// =========================
function showSlide(index) {
    const slides = document.querySelectorAll(".slide");
    if (!slides.length) return;

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach(slide => slide.classList.remove("active"));
    slides[currentSlide].classList.add("active");
}

function changeSlide(step) {
    showSlide(currentSlide + step);
    restartAutoSlide();
}

function startAutoSlide() {
    const slides = document.querySelectorAll(".slide");
    if (!slides.length) return;

    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 3000);
}

function restartAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

// =========================
// PREFILL FOOD FROM MENU PAGE
// =========================
function prefillFoodFromURL() {
    const foodSelect = document.getElementById("food");
    if (!foodSelect) return;

    const params = new URLSearchParams(window.location.search);
    const selectedItem = params.get("item");

    if (selectedItem) {
        for (let i = 0; i < foodSelect.options.length; i++) {
            if (foodSelect.options[i].value === selectedItem) {
                foodSelect.selectedIndex = i;
                break;
            }
        }
    }
}

// =========================
// ORDER SUMMARY
// =========================
function attachSummaryListeners() {
    const food = document.getElementById("food");
    const quantity = document.getElementById("quantity");

    if (food) {
        food.addEventListener("change", updateOrderSummary);
    }

    if (quantity) {
        quantity.addEventListener("input", updateOrderSummary);
    }
}

function updateOrderSummary() {
    const foodSelect = document.getElementById("food");
    const quantityInput = document.getElementById("quantity");

    const summaryFood = document.getElementById("summaryFood");
    const summaryPrice = document.getElementById("summaryPrice");
    const summaryQuantity = document.getElementById("summaryQuantity");
    const summaryTotal = document.getElementById("summaryTotal");

    if (!foodSelect || !quantityInput || !summaryFood || !summaryPrice || !summaryQuantity || !summaryTotal) {
        return;
    }

    const selectedOption = foodSelect.options[foodSelect.selectedIndex];
    const foodName = selectedOption.value || "None";
    const price = Number(selectedOption.dataset.price || 0);
    const quantity = Number(quantityInput.value || 0);
    const total = price * quantity;

    summaryFood.textContent = foodName;
    summaryPrice.textContent = `UGX ${price.toLocaleString()}`;
    summaryQuantity.textContent = quantity;
    summaryTotal.textContent = `UGX ${total.toLocaleString()}`;
}

// =========================
// ORDER FORM SUBMISSION
// =========================
function attachOrderFormListener() {
    const orderForm = document.getElementById("orderForm");
    if (!orderForm) return;

    orderForm.addEventListener("submit", function (e) {
        e.preventDefault();
        confirmOrder();
    });
}

function confirmOrder() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const foodSelect = document.getElementById("food");

    if (!foodSelect) return;

    const food = foodSelect.value;
    const quantity = document.getElementById("quantity").value;
    const payment = document.getElementById("payment").value;
    const orderStatus = document.getElementById("orderStatus");
    const feedbackSection = document.getElementById("feedbackSection");

    if (!name || !phone || !food || !quantity || !payment) {
        alert("Please fill in all fields before placing your order.");
        return;
    }

    const selectedOption = foodSelect.options[foodSelect.selectedIndex];
    const price = Number(selectedOption.dataset.price || 0);
    const total = price * Number(quantity);

    orderStatus.style.display = "block";
    orderStatus.innerHTML = `
        <p><strong>Thank you, ${name}!</strong></p>
        <p>Your order has been placed successfully.</p>
        <p><strong>Food:</strong> ${quantity} x ${food}</p>
        <p><strong>Payment Method:</strong> ${payment}</p>
        <p><strong>Total:</strong> UGX ${total.toLocaleString()}</p>
    `;

    if (feedbackSection) {
        feedbackSection.style.display = "block";
    }

    document.getElementById("orderForm").reset();
    updateOrderSummary();
}

function attachFeedbackListener() {
    const feedbackBtn = document.getElementById("submitFeedbackBtn");
    if (!feedbackBtn) return;

    feedbackBtn.addEventListener("click", function () {
        const rating = document.getElementById("rating").value;
        const comments = document.getElementById("comments").value.trim();
        const feedbackMessage = document.getElementById("feedbackMessage");

        if (!rating) {
            alert("Please enter a rating before submitting feedback.");
            return;
        }

        feedbackMessage.style.display = "block";
        feedbackMessage.innerHTML = `
            <p><strong>Thank you for your feedback!</strong></p>
            <p><strong>Rating:</strong> ${rating}/5</p>
            <p><strong>Comments:</strong> ${comments ? comments : "No comments provided."}</p>
        `;

        document.getElementById("rating").value = "";
        document.getElementById("comments").value = "";
    });
}
