# 🌐 Govind Mishra | Web Developer Portfolio

[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Animation-ff69b4?logo=framer)](https://www.framer.com/motion/)
[![Firebase](https://img.shields.io/badge/Firebase-Backend-orange?logo=firebase)](https://firebase.google.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Hi 👋 I’m **Govind Mishra**, a **MERN Stack Developer** passionate about building fast, responsive, and dynamic web apps.  
This is my **personal portfolio website** built with **React, Tailwind, Framer Motion, and Firebase** — to showcase my projects, skills, and professional journey.  

---

## 🚀 Tech Stack

- ⚛️ **React.js** – Frontend  
- 💡 **JavaScript (ES6+)**  
- 🎨 **Tailwind CSS** – Styling  
- 🎞 **Framer Motion** – Animations  
- 🔥 **Firebase** – Database & Hosting (dynamic data fetching)  
- 🌍 **Vercel** – Deployment  

---

## ✨ Features

✅ Fully Responsive Design (Desktop + Mobile)  
✅ Dynamic Data Fetching from Firebase  
✅ Smooth Animations & Transitions  
✅ Projects Showcase with Live Links  
✅ About Me & Skills Section  
✅ Professional Experience Timeline  
✅ Contact Form (Integrated with Firebase)  

---

## 🌐 Live Demo

🔗 [View Portfolio Live](https://govind-mishra-portfolio.vercel.app/)  

---

## 📸 Screenshots

### Hero Section  
![Hero](public/assets/images/Screenshot/HeroScreenshot.png)

### About Section  
![About](public/assets/images/Screenshot/AboutScreenshot.png)

### Skills Section  
![Skills](public/assets/images/Screenshot/SkillScreenshot.png)

### Projects  
![Projects](public/assets/images/Screenshot/ProjectScreenshot.png)

### Experience  
![Experience](public/assets/images/Screenshot/ExperienceScreenshot.png)

### Contact  
![Contact](public/assets/images/Screenshot/ContactScreenshot.png)

### Footer  
![Footer](public/assets/images/Screenshot/FotterScreenshot.png)

---

## 💻 Run Locally

Clone this repository and run locally:

```bash
# Clone the repository
git clone https://github.com/GovindMishra8445/govind-mishra-portfolio.git

# Navigate to project folder
cd govind-mishra-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
Now open http://localhost:5173
 in your browser.


 .

🔥 Firebase Setup

This project uses Firebase for storing and fetching dynamic data.

Create a Firebase project at Firebase Console

Enable Firestore Database and Authentication if required

Get your Firebase config keys and create .env file in root:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id


Import and initialize Firebase in your project:

// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

📝 License

This project is licensed under the MIT License. See LICENSE
 for details.

👨‍💻 About Me

I’m passionate about building modern web applications that are user-friendly and performant.
I love working with React + Firebase and continuously explore new technologies to deliver smooth user experiences.

📬 Contact

📧 Email: govindranjan8445@gmail.com

💼 LinkedIn: linkedin.com/in/govindmishra-bca

🐦 Twitter: @govindmishra8445

🔮 Future Improvements

🌙 Add Dark Mode

🤖 Integrate Chatbot Feature

🔗 Make Projects Dynamically Fetchable from Firebase Admin Panel

✨ Enhance Animations & Micro-interactions
