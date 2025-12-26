# Lordicon Gallery

A professional, modern animated icon gallery built with vanilla JavaScript, showcasing premium animated icons from Lordicon. Features a beautiful dark theme UI with smooth animations, search functionality, and fully interactive icons.

![Lordicon Gallery](https://img.shields.io/badge/Lordicon-Gallery-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- **🎨 Professional UI Design**
  - Modern dark theme with gradient accents
  - Smooth animations and transitions
  - Fully responsive design (mobile, tablet, desktop)
  - Glassmorphism effects and beautiful shadows

- **🔍 Search Functionality**
  - Real-time icon search
  - Filter by name or category
  - Clear search button

- **🎯 Interactive Icons**
  - Hover animations on all icons
  - Click to trigger animations
  - Keyboard navigation support (Enter/Space)
  - Visual feedback on interactions

- **⚡ Performance**
  - Fast loading with optimized code
  - Automatic fallback system for failed icon loads
  - Smooth staggered animations
  - Error handling and retry mechanisms

- **♿ Accessibility**
  - ARIA labels for screen readers
  - Keyboard navigation support
  - Focus indicators
  - Reduced motion support

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional, for development)

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser

That's it! No build process or dependencies required.

### Running Locally

For the best development experience, use a local web server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (http-server):**
```bash
npx http-server
```

**Using VS Code:**
- Install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

Then open `http://localhost:8000` in your browser.

## 📁 Project Structure

```
Lordicon/
├── index.html          # Main HTML file
├── style.css           # Styles and theme
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `style.css`:

```css
:root {
    --bg-primary: #0f172a;        /* Main background */
    --bg-secondary: #1e293b;      /* Secondary background */
    --accent-primary: #3b82f6;    /* Primary accent color */
    --accent-secondary: #8b5cf6;  /* Secondary accent color */
    --text-primary: #f1f5f9;      /* Primary text color */
    /* ... more variables */
}
```

### Adding Icons

Edit the `icons` array in `script.js`:

```javascript
const icons = [
    { 
        src: 'https://cdn.lordicon.com/YOUR_ICON_ID.json', 
        name: 'Icon Name', 
        category: 'category' 
    },
    // Add more icons...
];
```

### Icon Fallbacks

If an icon fails to load, the system automatically tries fallback URLs. Configure fallbacks in the `iconFallbacks` object:

```javascript
const iconFallbacks = {
    'Icon Name': [
        'https://cdn.lordicon.com/fallback1.json',
        'https://cdn.lordicon.com/fallback2.json',
    ]
};
```

## 🎯 Usage

### Basic Usage

1. **View Icons**: All icons are displayed in a responsive grid
2. **Search**: Type in the search box to filter icons
3. **Interact**: 
   - Hover over icons to see animations
   - Click icons or cards to trigger animations
   - Use keyboard (Enter/Space) for accessibility

### Icon Interactions

- **Hover**: Icons automatically animate on hover
- **Click**: Click any icon or card to trigger animation
- **Keyboard**: Focus an icon and press Enter or Space

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and CSS Variables
- **Vanilla JavaScript**: No frameworks, pure JavaScript
- **Lordicon**: Premium animated icon library
- **Google Fonts**: Inter font family

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Icons Not Loading

1. **Check Console**: Open browser DevTools (F12) and check for errors
2. **Network Issues**: Ensure you have internet connection (icons load from CDN)
3. **Icon URLs**: Verify icon URLs are correct in `script.js`
4. **Lordicon Script**: Ensure `lordicon.js` is loading correctly

### Icons Not Animating

1. **Check Trigger**: Icons should have `trigger="hover"` attribute
2. **Browser Support**: Ensure your browser supports Web Components
3. **Script Loading**: Verify Lordicon script loads before icons are created

### Styling Issues

1. **CSS Not Loading**: Check that `style.css` is linked correctly
2. **Cache**: Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
3. **Responsive**: Test on different screen sizes

## 📝 Icon List

Current icons included:

- ❤️ Heart Pulse
- ✅ Check
- ⏳ Loader
- ☀️ Weather Sun
- 📧 Mail Send
- 🔍 Search
- 🛒 Shopping Cart
- 🔖 Bookmark

## 🔗 Resources

- [Lordicon Website](https://lordicon.com)
- [Lordicon Documentation](https://lordicon.com/docs)
- [Lordicon Icon Library](https://lordicon.com/icons)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

Created with ❤️ for showcasing beautiful animated icons.

---

**Note**: This project uses Lordicon's CDN for icon delivery. Some icons may require a Lordicon account or subscription for access.

