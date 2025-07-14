# 🌍 GlobeVista

> Explore countries around the world with a modern, animated React app.  
> Features Firebase authentication, favorites, smooth UI, and real-time data.

---

## 🚀 Setup & Installation

```bash
# Clone the repository
git clone https://github.com/your-username/globevista.git
cd globevista

# Install dependencies
npm install

# Add your Firebase config (see below)

# Start the app
npm run dev
````

✅ **Firebase setup:**

* Create a project in [Firebase console](https://console.firebase.google.com/)
* Enable Email/Password Authentication
* Copy your config into a `.env` file or `firebaseConfig.js` file

---

## ✨ Features

* Animated landing page with login & signup
* Firebase Authentication & Firestore
* Search, browse & filter countries (REST Countries API)
* Favorite countries (saved to user profile in Firebase)
* Detailed country pages
* Animated navigation & transitions (Framer Motion / AOS)
* Responsive design with Tailwind CSS
* Profile & logout functionality
* Basic unit tests for auth & core components

---

## 🌐 Deployment

App:https://dineshpriyanthagh.github.io/web-globalvista/

Demo video: [Watch here](https://www.youtube.com/watch?v=JuJbKa30rQc)

---

## 🛠 Technologies Used

* React (Vite)
* Firebase Authentication & Firestore
* REST Countries API
* Tailwind CSS
* React Router
* Framer Motion / AOS for animations
* Jest & React Testing Library

---

## 🎨 Color Palette

|   Color |                 Usage |
| ------: | --------------------: |
| #6366F1 |      Indigo (Primary) |
| #06B6D4 |         Cyan (Accent) |
| #F472B6 |         Pink (Accent) |
| #FBBF24 |     Amber (Highlight) |
| #10B981 |     Emerald (Success) |
| #F3F4F6 | Light Gray background |

---

## 🧩 App Architecture

```plaintext
src/
├── components/      # Reusable UI components
├── pages/           # Page components (Landing, Explorer, Favorites, Profile)
├── services/        # Firebase & API logic
├── context/         # AuthContext for managing user state
├── routes/          # Protected & public routes
└── App.js           # Main app component
```

* **AuthContext**: manages user login state and persistence
* **Firebase Service**: handles login, signup, logout, save favorites
* **Country API Service**: fetches all countries, search, filter, details
* **Components**: animated cards, navbar, buttons, etc.

---

## 📺 Demo

[![Watch the demo](https://img.youtube.com/vi/XXXXXXXXX/0.jpg)](https://www.youtube.com/watch?v=JuJbKa30rQc)

---

## 🤝 Contributing

PRs welcome! Please open issues or suggest improvements.

---

## 📄 License

MIT

```
