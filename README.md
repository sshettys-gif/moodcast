# Project Title

A brief description of what this project does and who it's for

# MoodCast

## Table of Contents
1. [Project Overview](#project-overview)
2. [User Guide](#user-guide)
   - [Description](#description)
   - [Features](#features)
   - [APIs Used](#apis-used)
   - [Background on Weather & Mental Health](#background-on-weather--mental-health)
   - [Target Browsers](#target-browsers)
   - [Accessing the App](#accessing-the-app)
3. [Developer Manual](#developer-manual)
   - [Overview](#overview)
   - [Installation & Setup](#installation--setup)
   - [API Endpoints](#api-endpoints)
   - [Known Bugs](#known-bugs)
   - [Future Improvements](#future-improvements)
   - [Running Tests](#running-tests)
   - [Roadmap for Future Developers](#roadmap-for-future-developers)

---

## Project Overview

### Description
MoodCast is a web application that allows users to track their mood alongside real-time weather data. Users can log daily moods and compare them to weather conditions, helping them understand how weather impacts emotional wellbeing. Interactive charts visualize mood trends over time.

### Features
- Real-time weather data based on user location
- Quick mood logging with six emotion options (Happy, Sad, Nervous, Excited, Angry, Calm)
- Visual trends using interactive charts
- Personal insights into correlations between weather and mood

### APIs Used
- **Open-Meteo API:** Free, real-time weather data  
- **Chart.js:** Interactive charts to display mood trends 
 **Days.js:** Provides reader friendly dates on chart 

### Background on Weather & Mental Health
Research shows weather conditions can influence mood, energy levels, and overall mental health. MoodCast was created to help users identify patterns between weather and their emotional state.

### Target Browsers
- **Desktop:** Chrome, Firefox, Edge, Safari  
- **Mobile:** Safari (iOS), Chrome (Android)  
The app is responsive and designed for both desktop and mobile devices.

### Accessing the App
- **Locally:** Run `npm run dev` and visit `http://localhost:3000`  
- **Deployed on Vercel:** After deployment, Vercel will provide a public URL

---

## Developer Manual

### Overview
MoodCast is a web application that allows users to log daily moods and visualize how weather impacts emotional wellbeing.

### Installation & Setup

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd finalproject
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env.local if using Supabase**
```bash
SUPABASE_URL=<your-supabase-url>
SUPABASE_KEY=<your-supabase-anon-key>
```

4. **Run application locally**
```bash
npm run dev
```

5. **Deploy on Vercel**
```bash
vercel login      # Log in to Vercel account
vercel            # Deploy the app
```

6. **Visit application using link generated**
http://localhost:3000 (example)



### API Endpoints

**Open-Meteo (Weather API):**

```bash
GET /api/weather?lat=<latitude>lon=<longitude>
```
Returns current weather for the given coordinates.

```bash
POST /api/entries
```
Adds a new mood entry. Requires JSON body: 
```bash
{
  "date": "YYYY-MM-DD",
  "mood": "happy",
  "temperature": 72,
  "weather": "Clear"
}
```

```bash
GET /api/entries
```
Fetch all saved mood entries

### Known Bugs

No user authentication implementation
Weather may not load if browser denied geolocation access

### Future Improvements

Add user login and accounts
Expand charts to show more historical data
Improve UI with more animations

### Running Tests

If you add any tests, you can run them with:

npm run test

