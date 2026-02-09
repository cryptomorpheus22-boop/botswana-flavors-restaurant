/**
 * Pixel Events for Restaurant Demo
 * Tracks user interactions for Meta Ads optimization
 */

document.addEventListener('DOMContentLoaded', function () {
    // Helper function to track Facebook Pixel events safely
    function trackPixelEvent(eventName, params) {
        if (typeof fbq === 'function') {
            fbq('track', eventName, params);
            console.log(`Pixel Event Fired: ${eventName}`, params);
        } else {
            console.warn('Facebook Pixel (fbq) not initialized.');
        }
    }

    // Helper function to track Google Analytics events
    function trackGAEvent(eventName, params) {
        if (typeof gtag === 'function') {
            gtag('event', eventName, params);
            console.log(`GA Event Fired: ${eventName}`, params);
        } else {
            console.warn('Google Analytics (gtag) not initialized.');
        }
    }

    // 1. Track WhatsApp Clicks as 'Lead'
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], .btn-whatsapp');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function () {
            trackPixelEvent('Lead', {
                content_name: 'WhatsApp Click - Restaurant Demo',
                content_category: 'Demo Engagement',
                value: 0.00,
                currency: 'BWP'
            });
            trackGAEvent('whatsapp_click', {
                event_category: 'engagement',
                event_label: 'Restaurant Demo - WhatsApp'
            });
        });
    });

    // 2. Track AI Assistant Usage
    const askAssistantBtn = document.getElementById('askAssistant');
    if (askAssistantBtn) {
        askAssistantBtn.addEventListener('click', function () {
            trackPixelEvent('ViewContent', {
                content_name: 'AI Menu Assistant Used',
                content_category: 'Demo Interaction',
                content_type: 'ai_assistant'
            });
            trackGAEvent('ai_assistant_used', {
                event_category: 'engagement',
                event_label: 'Restaurant - AI Assistant Query'
            });
        });
    }

    // 3. Track Category Pill Clicks
    const categoryPills = document.querySelectorAll('.pill');
    categoryPills.forEach(pill => {
        pill.addEventListener('click', function () {
            const category = this.getAttribute('data-category') || this.innerText;
            trackPixelEvent('ViewContent', {
                content_name: category,
                content_category: 'Menu Category',
                content_type: 'category_browse'
            });
            trackGAEvent('category_click', {
                event_category: 'engagement',
                event_label: `Category: ${category}`
            });
        });
    });

    // 4. Track Recommendation Order Button
    const orderRecommendationBtn = document.getElementById('orderRecommendation');
    if (orderRecommendationBtn) {
        orderRecommendationBtn.addEventListener('click', function () {
            const recommendedItem = document.getElementById('recommendationName')?.innerText || 'Unknown';
            trackPixelEvent('InitiateCheckout', {
                content_name: recommendedItem,
                content_category: 'AI Recommendation Order',
                value: 0.00,
                currency: 'BWP'
            });
            trackGAEvent('ai_recommendation_order', {
                event_category: 'conversion',
                event_label: `Ordered: ${recommendedItem}`
            });
        });
    }

    // 5. Track Main Order Button (Hero)
    const navOrderBtn = document.getElementById('navOrderBtn');
    if (navOrderBtn) {
        navOrderBtn.addEventListener('click', function () {
            trackPixelEvent('Lead', {
                content_name: 'Nav Order Button Click',
                content_category: 'Primary CTA',
                value: 0.00,
                currency: 'BWP'
            });
        });
    }

    // 6. Track Scroll Depth (for engagement metrics)
    let scrollTracked = { quarter: false, half: false, threeQuarter: false, full: false };
    window.addEventListener('scroll', function () {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

        if (scrollPercent >= 25 && !scrollTracked.quarter) {
            scrollTracked.quarter = true;
            trackGAEvent('scroll_depth', { event_category: 'engagement', event_label: '25%' });
        }
        if (scrollPercent >= 50 && !scrollTracked.half) {
            scrollTracked.half = true;
            trackGAEvent('scroll_depth', { event_category: 'engagement', event_label: '50%' });
        }
        if (scrollPercent >= 75 && !scrollTracked.threeQuarter) {
            scrollTracked.threeQuarter = true;
            trackGAEvent('scroll_depth', { event_category: 'engagement', event_label: '75%' });
        }
        if (scrollPercent >= 95 && !scrollTracked.full) {
            scrollTracked.full = true;
            trackGAEvent('scroll_depth', { event_category: 'engagement', event_label: '100%' });
        }
    });

    // 7. Track Time on Page
    let timeOnPage = 0;
    const timeTracker = setInterval(function () {
        timeOnPage += 10;
        if (timeOnPage === 30) {
            trackGAEvent('time_on_page', { event_category: 'engagement', event_label: '30_seconds' });
        } else if (timeOnPage === 60) {
            trackGAEvent('time_on_page', { event_category: 'engagement', event_label: '60_seconds' });
            clearInterval(timeTracker);
        }
    }, 10000);

});
