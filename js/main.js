/**
 * Botswana Flavors - Main JavaScript
 * Handles interactivity and Smart Menu Assistant logic
 */

// ========================================
// Menu Database (Pre-populated dishes)
// ========================================
const menuItems = [
    {
        id: 1,
        name: "Spicy Beef Seswaa Platter",
        description: "Slow-cooked shredded beef with extra peri-peri, served with pap, morogo, and chakalaka.",
        price: 85,
        keywords: ["spicy", "hot", "beef", "seswaa", "peri", "fire"],
        category: "spicy",
        emoji: "🌶️"
    },
    {
        id: 2,
        name: "Peri-Peri Chicken",
        description: "Flame-grilled chicken marinated in our signature peri-peri sauce, served with chips and coleslaw.",
        price: 75,
        keywords: ["spicy", "hot", "chicken", "peri", "grilled", "fire"],
        category: "spicy",
        emoji: "🔥"
    },
    {
        id: 3,
        name: "Morogo & Bean Bowl",
        description: "Hearty African spinach sautéed with garlic, mixed beans, and aromatic spices. Served with brown rice.",
        price: 55,
        keywords: ["vegan", "vegetarian", "healthy", "greens", "beans", "plant"],
        category: "vegan",
        emoji: "🌱"
    },
    {
        id: 4,
        name: "Vegetable Chakalaka Bowl",
        description: "Spiced vegetable relish with bell peppers, tomatoes, and beans. A colorful plant-based feast.",
        price: 50,
        keywords: ["vegan", "vegetarian", "healthy", "vegetables", "plant", "colorful"],
        category: "vegan",
        emoji: "🥗"
    },
    {
        id: 5,
        name: "Family Braai Platter",
        description: "A feast for 4! Grilled boerewors, lamb chops, chicken wings, with pap, chakalaka, and salads.",
        price: 180,
        keywords: ["family", "sharing", "group", "party", "braai", "grill", "big"],
        category: "family",
        emoji: "👨‍👩‍👧‍👦"
    },
    {
        id: 6,
        name: "Mixed Grill for 4",
        description: "Premium cuts of beef, lamb, and chicken with roasted vegetables and traditional sides.",
        price: 220,
        keywords: ["family", "sharing", "group", "mixed", "grill", "premium", "big"],
        category: "family",
        emoji: "🍖"
    },
    {
        id: 7,
        name: "Classic Seswaa",
        description: "Traditional slow-cooked shredded beef, tender and flavorful. Served with creamy pap and morogo.",
        price: 70,
        keywords: ["traditional", "classic", "seswaa", "beef", "authentic", "grandmother"],
        category: "traditional",
        emoji: "🍽️"
    },
    {
        id: 8,
        name: "Mogodu (Tripe)",
        description: "Slow-simmered beef tripe in a rich, spiced tomato sauce. A beloved Botswana delicacy.",
        price: 65,
        keywords: ["traditional", "mogodu", "tripe", "authentic", "classic", "delicacy"],
        category: "traditional",
        emoji: "🥘"
    },
    {
        id: 9,
        name: "Dikgobe",
        description: "Traditional samp and beans stew, slow-cooked to perfection. Comfort food at its finest.",
        price: 45,
        keywords: ["traditional", "dikgobe", "beans", "samp", "comfort", "hearty", "home"],
        category: "traditional",
        emoji: "🫘"
    },
    {
        id: 10,
        name: "Fat Cakes & Mince",
        description: "Fluffy fried dough balls filled with savory spiced mince. Perfect for a filling snack.",
        price: 35,
        keywords: ["fatcakes", "fat cakes", "snack", "mince", "comfort", "fried", "dough"],
        category: "fatcakes",
        emoji: "🍰"
    }
];

// Chef's Special (fallback recommendation)
const chefsSpecial = {
    id: 0,
    name: "Chef's Special of the Day",
    description: "Our chef's daily creation featuring the freshest ingredients. Ask us on WhatsApp for today's special!",
    price: 75,
    keywords: [],
    category: "special",
    emoji: "👨‍🍳"
};

// WhatsApp Configuration
const WHATSAPP_NUMBER = "26771234567";

// ========================================
// Utility Functions
// ========================================

/**
 * Generate WhatsApp URL with pre-filled message
 */
function generateWhatsAppUrl(message) {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

/**
 * Tokenize and clean user input
 */
function tokenizeInput(input) {
    return input
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(word => word.length > 2);
}

/**
 * Find best matching dish based on keywords
 */
function findRecommendation(query) {
    const tokens = tokenizeInput(query);

    if (tokens.length === 0) {
        return { dish: chefsSpecial, score: 0 };
    }

    let bestMatch = null;
    let highestScore = 0;

    for (const item of menuItems) {
        let score = 0;

        for (const token of tokens) {
            // Check direct keyword matches
            for (const keyword of item.keywords) {
                if (keyword.includes(token) || token.includes(keyword)) {
                    score += 2;
                }
            }

            // Check name and description
            if (item.name.toLowerCase().includes(token)) {
                score += 1;
            }
            if (item.description.toLowerCase().includes(token)) {
                score += 0.5;
            }
        }

        if (score > highestScore) {
            highestScore = score;
            bestMatch = item;
        }
    }

    // Return best match or chef's special if no good match
    if (bestMatch && highestScore >= 1) {
        return { dish: bestMatch, score: highestScore };
    }

    return { dish: chefsSpecial, score: 0 };
}

// ========================================
// DOM Elements
// ========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const assistantInput = document.getElementById('assistantInput');
const askAssistantBtn = document.getElementById('askAssistant');
const assistantLoading = document.getElementById('assistantLoading');
const recommendationCard = document.getElementById('recommendationCard');
const noMatchCard = document.getElementById('noMatchCard');
const recommendationName = document.getElementById('recommendationName');
const recommendationDescription = document.getElementById('recommendationDescription');
const recommendationPrice = document.getElementById('recommendationPrice');
const orderRecommendation = document.getElementById('orderRecommendation');
const categoryPills = document.querySelectorAll('.pill');

// ========================================
// Event Handlers
// ========================================

/**
 * Toggle mobile menu
 */
function handleMobileMenuToggle() {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
}

/**
 * Handle input changes for Smart Assistant
 */
function handleInputChange() {
    const inputLength = assistantInput.value.trim().length;
    askAssistantBtn.disabled = inputLength < 5;
}

/**
 * Handle Smart Assistant submission
 */
async function handleAskAssistant() {
    const query = assistantInput.value.trim();

    if (query.length < 5) return;

    // Hide previous results
    recommendationCard.hidden = true;
    noMatchCard.hidden = true;

    // Show loading state
    assistantLoading.hidden = false;
    askAssistantBtn.disabled = true;

    // Simulate AI processing delay (1.5-2 seconds)
    const delay = 1500 + Math.random() * 500;
    await new Promise(resolve => setTimeout(resolve, delay));

    // Find recommendation
    const { dish, score } = findRecommendation(query);

    // Hide loading
    assistantLoading.hidden = true;
    askAssistantBtn.disabled = false;

    // Display result
    if (score > 0 || dish.id === 0) {
        // Show recommendation
        recommendationName.textContent = `${dish.emoji} ${dish.name}`;
        recommendationDescription.textContent = dish.description;
        recommendationPrice.textContent = `P${dish.price}`;

        // Update WhatsApp link
        const orderMessage = `Hi! I'd like to order ${dish.name} (P${dish.price}) based on your Smart Assistant recommendation.`;
        orderRecommendation.href = generateWhatsAppUrl(orderMessage);

        recommendationCard.hidden = false;
    } else {
        // Show no match fallback
        noMatchCard.hidden = false;
    }
}

/**
 * Handle category pill clicks
 */
function handleCategoryClick(event) {
    const pill = event.target;

    // Update active state
    categoryPills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    // Get category and find a matching dish
    const category = pill.dataset.category;
    const matchingDish = menuItems.find(item => item.category === category);

    if (matchingDish) {
        // Pre-fill the assistant input with a relevant query
        const categoryQueries = {
            'spicy': "I'm craving something spicy",
            'vegan': "I want a healthy vegan option",
            'family': "I need a meal for my family",
            'traditional': "I want authentic traditional food",
            'fatcakes': "I'm in the mood for fat cakes"
        };

        assistantInput.value = categoryQueries[category] || '';
        handleInputChange();
    }
}

/**
 * Handle Enter key in assistant input
 */
function handleInputKeydown(event) {
    if (event.key === 'Enter' && !askAssistantBtn.disabled) {
        handleAskAssistant();
    }
}

/**
 * Close mobile menu when clicking a link
 */
function handleNavLinkClick() {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
}

// ========================================
// Initialize Event Listeners
// ========================================
function init() {
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', handleMobileMenuToggle);
    }

    // Navigation link clicks
    navLinks?.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });

    // Smart Assistant input
    if (assistantInput) {
        assistantInput.addEventListener('input', handleInputChange);
        assistantInput.addEventListener('keydown', handleInputKeydown);
    }

    // Ask Assistant button
    if (askAssistantBtn) {
        askAssistantBtn.addEventListener('click', handleAskAssistant);
    }

    // Category pills
    categoryPills.forEach(pill => {
        pill.addEventListener('click', handleCategoryClick);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 72;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optional: Store last query in localStorage
    const lastQuery = localStorage.getItem('lastAssistantQuery');
    if (lastQuery && assistantInput) {
        assistantInput.value = lastQuery;
        handleInputChange();
    }
}

// Save query to localStorage on submission
const originalHandleAskAssistant = handleAskAssistant;
async function handleAskAssistantWithStorage() {
    const query = assistantInput.value.trim();
    if (query) {
        localStorage.setItem('lastAssistantQuery', query);
    }
    await originalHandleAskAssistant();
}

// Override the handler
if (askAssistantBtn) {
    askAssistantBtn.removeEventListener('click', handleAskAssistant);
    askAssistantBtn.addEventListener('click', handleAskAssistantWithStorage);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
