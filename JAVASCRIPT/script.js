// START ALL FUNCTIONS
document.addEventListener("DOMContentLoaded", () => {
    startSlider();
    setActiveFilterButton();
    prefillFoodFromURL();
    setupOrderForm();
    setupFeedback();
});


// Home page slides

let currentSlide = 0;
let slideTimer;

function startSlider() {
    const slides = document.querySelectorAll(".slide");
    if (!slides.length) return;

    showSlide(currentSlide);

    slideTimer = setInterval(() => {
        changeSlide(1);
    }, 3000);
}

function showSlide(index) {
    const slides = document.querySelectorAll(".slide");
    if (!slides.length) return;

    currentSlide = (index + slides.length) % slides.length;

    slides.forEach(slide => slide.classList.remove("active"));
    slides[currentSlide].classList.add("active");
}

function changeSlide(step) {
    showSlide(currentSlide + step);

    clearInterval(slideTimer);
    slideTimer = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 3000);
}


// Menu Filter

function filterMenu(category, button) {
    const items = document.querySelectorAll(".menu-item");
    const buttons = document.querySelectorAll(".filter-buttons button");

    items.forEach(item => {
        item.classList.toggle(
            "hidden",
            category !== "all" && item.dataset.category !== category
        );
    });

    buttons.forEach(btn => btn.classList.remove("active"));
    if (button) button.classList.add("active");
}

function setActiveFilterButton() {
    const firstButton = document.querySelector(".filter-buttons button");
    if (firstButton) firstButton.classList.add("active");
}


// Order Page

function prefillFoodFromURL() {
    const foodSelect = document.getElementById("food");
    if (!foodSelect) return;

    const selectedItem = new URLSearchParams(window.location.search).get("item");
    if (!selectedItem) return;

    foodSelect.value = selectedItem;
    updateOrderSummary();
}

function setupOrderForm() {
    const form = document.getElementById("orderForm");
    const food = document.getElementById("food");
    const quantity = document.getElementById("quantity");

    if (food) food.addEventListener("change", updateOrderSummary);
    if (quantity) quantity.addEventListener("input", updateOrderSummary);

    if (form) {
        form.addEventListener("submit", event => {
            event.preventDefault();
            confirmOrder();
        });
    }

    updateOrderSummary();
}

function updateOrderSummary() {
    const foodSelect = document.getElementById("food");
    const quantityInput = document.getElementById("quantity");

    const summaryFood = document.getElementById("summaryFood");
    const summaryPrice = document.getElementById("summaryPrice");
    const summaryQuantity = document.getElementById("summaryQuantity");
    const summaryTotal = document.getElementById("summaryTotal");

    if (!foodSelect || !quantityInput || !summaryFood || !summaryPrice || !summaryQuantity || !summaryTotal) return;

    const selectedOption = foodSelect.options[foodSelect.selectedIndex];
    const foodName = foodSelect.value || "None";
    const price = Number(selectedOption.dataset.price || 0);
    const quantity = Number(quantityInput.value || 0);
    const total = price * quantity;

    summaryFood.textContent = foodName;
    summaryPrice.textContent = `UGX ${price.toLocaleString()}`;
    summaryQuantity.textContent = quantity;
    summaryTotal.textContent = `UGX ${total.toLocaleString()}`;
}

function confirmOrder() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const foodSelect = document.getElementById("food");
    const quantity = document.getElementById("quantity").value;
    const payment = document.getElementById("payment").value;
    const orderStatus = document.getElementById("orderStatus");
    const feedbackSection = document.getElementById("feedbackSection");

    if (!name || !phone || !foodSelect.value || !quantity || !payment) {
        alert("Please fill in all fields before placing your order.");
        return;
    }

    const price = Number(foodSelect.options[foodSelect.selectedIndex].dataset.price || 0);
    const total = price * Number(quantity);

    orderStatus.style.display = "block";
    orderStatus.innerHTML = `
        <p><strong>Thank you, ${name}!</strong></p>
        <p>Your order has been placed successfully.</p>
        <p><strong>Food:</strong> ${quantity} x ${foodSelect.value}</p>
        <p><strong>Payment Method:</strong> ${payment}</p>
        <p><strong>Total:</strong> UGX ${total.toLocaleString()}</p>
    `;

    if (feedbackSection) feedbackSection.style.display = "block";

    document.getElementById("orderForm").reset();
    updateOrderSummary();
}


// Feedback

function setupFeedback() {
    const feedbackBtn = document.getElementById("submitFeedbackBtn");
    if (!feedbackBtn) return;

    feedbackBtn.addEventListener("click", () => {
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
            <p><strong>Comments:</strong> ${comments || "No comments provided."}</p>
        `;

        document.getElementById("rating").value = "";
        document.getElementById("comments").value = "";
    });
}