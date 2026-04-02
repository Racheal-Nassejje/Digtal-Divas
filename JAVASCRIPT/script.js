// Menu Category Filter
// Show all items when page loads
window.onload = function() {
    filterMenu('all');
}

// Menu Category Filter
function filterMenu(category) {
    const items = document.querySelectorAll('.menu-item');

    items.forEach(item => {
        if (category === 'all') {
            item.style.display = 'flex';
        } else if (item.dataset.category === category) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });

    // Reset all buttons
    const buttons = document.querySelectorAll('.filter-buttons button');
    buttons.forEach(btn => {
        btn.style.backgroundColor = 'transparent';
        btn.style.color = '#FFD700';
        btn.style.border = '2px solid #FFD700';
    });

    // Highlight clicked button
    event.target.style.backgroundColor = '#FFD700';
    event.target.style.color = '#8B0000';
}
// Rate Us Section
function rateUs(rating) {
    const messages = {
        5: "Thank you! We're glad you loved Digtal-Divas Meals! 🎉",
        4: "Thank you! We're happy you enjoyed our foods! 😊",
        3: "Thank you! We'll keep improving! 💪",
        2: "Thank you! We'll do better next time! 🙏",
        1: "Thank you! We're sorry to disappoint! 😔"
    }
    document.getElementById('rating-message').innerHTML = 
        `<strong style="color:#FFD700">${messages[rating]}</strong>`;
}