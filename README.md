# Botswana Flavors - Restaurant Website

A modern, mobile-first restaurant website showcasing traditional Tswana cuisine with WhatsApp ordering and an AI-powered menu assistant.

## Features

- **Responsive Design**: Mobile-first approach, works beautifully on all devices
- **Smart Menu Assistant**: AI-powered dish recommendations based on user preferences
- **WhatsApp Integration**: One-click ordering via WhatsApp with pre-filled messages
- **Modern UI**: Clean, warm design with smooth animations and hover effects
- **Accessibility**: Semantic HTML, keyboard navigation, and proper focus states

## Quick Start

1. Open `index.html` in a browser, or
2. Use VS Code Live Server extension for development

## Project Structure

```
demo-restaurant-site/
├── index.html          # Main HTML page
├── css/
│   └── styles.css      # Complete stylesheet
├── js/
│   └── main.js         # Interactivity & AI assistant
├── images/
│   └── hero-food.png   # Hero section image
├── netlify.toml        # Deployment config
└── README.md           # This file
```

## Smart Menu Assistant

The AI assistant uses keyword matching to recommend dishes:

| Query Contains | Recommendations |
|----------------|-----------------|
| "spicy", "hot" | Spicy Seswaa, Peri-Peri Chicken |
| "vegan", "healthy" | Morogo Bowl, Chakalaka Bowl |
| "family", "group" | Family Braai, Mixed Grill for 4 |
| "traditional" | Classic Seswaa, Mogodu, Dikgobe |
| "fat cakes" | Fat Cakes & Mince |

## Deployment

### Netlify

1. Push to GitHub
2. Connect repository to Netlify
3. Deploy automatically (no build step required)

## WhatsApp Configuration

To change the WhatsApp number, update `WHATSAPP_NUMBER` in `js/main.js`:

```javascript
const WHATSAPP_NUMBER = "26771234567"; // Change this
```

## Tech Stack

- HTML5 (Semantic markup)
- CSS3 (Custom properties, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- Google Fonts (Inter)

## Browser Support

- Chrome, Safari, Firefox, Edge (last 2 versions)
- iOS Safari, Chrome Mobile

---

Built for Kgaile Digital Solutions demo purposes.
