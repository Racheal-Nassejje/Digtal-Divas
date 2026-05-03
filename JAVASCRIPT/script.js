// Menu Category Filter
// Show all items when page loads
window.onload = function() {
    if (document.querySelector('.menu-item')){
    showAll('all');
  }
}
// Menu Category Filter
function filterMenu(category) {
    // Step 1: Select all menu items on the page
    const items = document.querySelectorAll('.menu-item');

    // Step 2: Loop through every menu item
    items.forEach(item => {
        
        // If user wants to see ALL items
        if (category === 'all') {
            item.style.display = 'flex';        // Show the item
        } 
        // If the item's category matches the selected category
        else if (item.dataset.category === category) {
            item.style.display = 'flex';        // Show the item
        } 
        // If it doesn't match
        else {
            item.style.display = 'none';        // Hide the item
        }
    });


   // Reset all buttons
// This section finds all filter buttons and resets their styles to default

const buttons = document.querySelectorAll('.filter-buttons button');

// Loop through every button inside the .filter-buttons container
buttons.forEach(btn => {
    
    // Make the button background transparent (no fill color)
    btn.style.backgroundColor = 'transparent';
    
    // Set the text color to gold (#FFD700)
    btn.style.color = '#FFD700';
    
    // Add a 2px solid gold border around the button
    btn.style.border = '2px solid #FFD700';
});

    // Highlight clicked button
    event.target.style.backgroundColor = '#FFD700';
    event.target.style.color = '#8B0000';
}
// Rate Us Section
function rateUs(rating) {
    const messages = {
        5: "Thank you! We're glad you loved Digtal-Divas Meals!",
        4: "Thank you! We're happy you enjoyed our foods!",
        3: "Thank you! We'll keep improving!",
        2: "Thank you! We'll do better next time!",
        1: "Thank you! We're sorry to disappoint!"
    }
    document.getElementById('rating-message').innerHTML = 
        `<strong style="color:#FFD700">${messages[rating]}</strong>`;
}

// Show Order Summary
function confirmOrder() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const food = document.getElementById('food').value;
    const quantity = document.getElementById('quantity').value;
    const payment = document.querySelector(
        'input[name="payment"]:checked');

    if (name === '' || phone === '' ||
        food === '' || quantity === '') {
        alert('Please fill in all fields!');
        return false;
    }

    if (!payment) {
        alert('Please select a payment method!');
        return false;
    }

    const price = document.getElementById('food')
        .options[document.getElementById('food')
        .selectedIndex].dataset.price;
    const total = price * quantity;

    // Show Order Summary
    document.getElementById('summary-name')
        .innerHTML = name;
    document.getElementById('summary-phone')
        .innerHTML = phone;
    document.getElementById('summary-food')
        .innerHTML = food;
    document.getElementById('summary-quantity')
        .innerHTML = quantity;
    document.getElementById('summary-payment')
        .innerHTML = payment.value;
    document.getElementById('summary-total')
        .innerHTML = 'UGX ' + 
        Number(total).toLocaleString();

    // Show summary box
    document.getElementById('order-summary')
        .style.display = 'block';

    // Scroll to summary
    document.getElementById('order-summary')
        .scrollIntoView({behavior: 'smooth'});
}

// Confirm Final Order
function confirmFinalOrder() {
    alert(' Thank you! Your order has been placed successfully!');
    document.getElementById('orderForm').reset();
    document.getElementById('order-summary')
        .style.display = 'none';
}

// Cancel Order
function cancelOrder() {
    document.getElementById('order-summary')
        .style.display = 'none';
}

function trackOrder() {
    // Show the tracking result section
    document.getElementById("tracking-result").style.display = "block";

    // Reset all steps first
    const steps = document.querySelectorAll(".step");
    steps.forEach(step => {
        step.classList.remove("active", "completed");
    });

    // Define the order of steps
    const stepIds = ["step1", "step2", "step3", "step4", "step5"];

    // Animate through each step with a delay
    stepIds.forEach((id, index) => {
        setTimeout(() => {
            // Mark previous step as completed
            if (index > 0) {
                document.getElementById(stepIds[index - 1]).classList.add("completed");
            }
            // Mark current step as active
            document.getElementById(id).classList.add("active");
        }, index * 2000); // 2 seconds delay between steps
    });

    // Finally mark the last step as completed
    setTimeout(() => {
        document.getElementById("step5").classList.remove("active");
        document.getElementById("step5").classList.add("completed");
    }, stepIds.length * 2000);
}

