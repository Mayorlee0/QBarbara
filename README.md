# 💘 Barbara's Valentine Website

A premium, romantic, and playful multi-page Valentine's Day website built with vanilla HTML, CSS, and JavaScript.

## ✨ Features

- **Interactive Question Page** - Dodging "No" button with smooth animations
- **Success Celebration** - Confetti animation and romantic message
- **Date Selection** - Interactive cards for choosing the perfect date
- **Web Audio API Sounds** - UI sound effects without audio files
- **Fully Responsive** - Optimized for mobile, tablet, and desktop
- **Accessibility** - Keyboard navigation and reduced-motion support
- **No Dependencies** - Pure vanilla JavaScript, no frameworks or libraries

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   cd valentine-site
   vercel
   ```

3. **Follow the prompts**:
   - Set up and deploy? `Yes`
   - Which scope? Select your account
   - Link to existing project? `No`
   - Project name? `barbara-valentine` (or your choice)
   - In which directory is your code? `./`
   - Want to override settings? `No`

4. **Done!** Your site will be live at the provided URL.

### Alternative: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository (or drag/drop the folder)
4. Deploy with default settings
5. Your site is live!

## 📁 Project Structure

```
valentine-site/
├── index.html          # Main question page with dodging button
├── yes.html           # Success page with confetti
├── date.html          # Date selection page
├── styles.css         # Shared styling for all pages
├── script.js          # Shared JavaScript (audio, utilities)
├── vercel.json        # Vercel deployment configuration
└── README.md          # This file
```

## 🎨 Pages Overview

### Page 1: index.html
- Title: "Barbara, will you be my Valentine? 💘"
- "Yes" button → navigates to success page
- "No" button → dodges cursor/touch with smooth animations
- Attempts counter with funny messages
- Custom alert if "No" is clicked

### Page 2: yes.html
- Confetti celebration animation
- Success message: "Approved! 💘"
- Romantic text
- Button to plan the date

### Page 3: date.html
- Four interactive date option cards
- Selection highlights chosen card
- Confirmation message with screenshot prompt
- Options: Cozy dinner, Movie night, Ice cream + walk, Surprise me

## 🔊 Audio Features

- All sounds generated using Web Audio API (no files needed)
- Sounds include: click, hover, dodge, error, success, celebration
- Mute/unmute toggle in top-right corner
- Respects user's mute preference (saved in localStorage)
- Audio initializes after first user interaction

## 📱 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## 🎯 Accessibility

- Keyboard navigation support
- Focus indicators
- Reduced-motion support (disables confetti if user prefers)
- Semantic HTML
- ARIA labels where appropriate

## 💻 Local Development

Simply open `index.html` in your browser. No build step required!

```bash
# Option 1: Double-click index.html

# Option 2: Use a simple server
python -m http.server 8000
# or
npx serve
```

Then visit `http://localhost:8000`

## 🎁 Customization

To personalize for someone else:

1. **Change the name**: Find and replace "Barbara" in all files
2. **Modify colors**: Edit CSS variables in `styles.css` (`:root` section)
3. **Update date options**: Edit the date cards in `date.html`
4. **Adjust messages**: Modify text content in each HTML file

## 📝 License

Made with 💕 for Barbara

---

**Note**: This is a static site with no backend. All interactions happen in the browser. Perfect for sharing via URL or QR code!
