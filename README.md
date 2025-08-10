**Muse-AI** is a mood-based recommendation app that uses **Google’s Gemini Flash 1.5** to suggest **books**, **movies**, and **music** based on your current feelings — all directly in the browser.  

Project structure
```
Muse-AI/
├── public/
│ ├── favicon.ico # Website icon
│ ├── index.html # Main HTML file for React app
│ ├── logo192.png # App logo (192px)
│ ├── logo512.png # App logo (512px)
│ ├── manifest.json # PWA manifest
│ └── robots.txt # Search engine crawler rules
│
├── src/
│ ├── components/ # Reusable React components
│ ├── App.js # Main app logic with Gemini API calls
│ ├── App.css # Styling
│ ├── index.js # React DOM entry point
│ ├── index.css # Global styles
│ └── apiKey.js # Gemini API key config (keep private!)
│
├── package.json # Node.js dependencies and scripts
├── package-lock.json # Dependency lock file
├── README.md # Project documentation
└── .gitignore # Files/folders to ignore in Git
```

Tech Stack

- **Frontend:** React.js, HTML5, CSS3, JavaScript (ES6+)
- **AI:** Google Gemini Flash 1.5 API
- **Hosting:** GitHub Pages / Vercel / Netlify

How It Works
1. You tell Muse-AI your mood.
2. The app sends your prompt to Google Gemini Flash 1.5.
3. Gemini instantly returns tailored books, music, and movie suggestions.
4. All processing happens client-side — nothing is stored, ever.

Look what MUSE AI does:
https://drive.google.com/file/d/1I5PUjhWbFGQzwVZ3mnwr8whaL-w8whIY/view?usp=sharing
https://drive.google.com/file/d/1VSK4BXUIsVOZy0pyrgQ7b_ILBq0cyPWn/view?usp=sharing

Future Enhancements
🎨 Better UI with animated transitions
🎤 Voice mood input
📱 Mobile-first redesign
🔗 Direct links to recommendations
