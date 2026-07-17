# 🌦️ SkyPulse Weather OS

A state-of-the-art, **frontend-only** Weather Forecast web application inspired by **Apple Weather** aesthetics mixed with **Windows 11 Mica Glassmorphism** and **Material Design**.

![SkyPulse Banner](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white) ![Open--Meteo](https://img.shields.io/badge/Open--Meteo_API-00B4D8?style=for-the-badge&logo=icloud&logoColor=white)

---

## ✨ Features & Highlights

- **🎨 Apple & Windows 11 Hybrid Design**: Vibrant HSL-curated color palettes, deep glassmorphic cards (`backdrop-blur-2xl`), floating elements, soft drop shadows, and micro-animations.
- **🌤️ Dynamic Animated Sky Engine**: Real-time celestial and weather particle simulations based on live conditions:
  - Spinning sun with glowing flares (`clear`)
  - Drifting clouds across multi-layered altitudes (`cloudy`)
  - Animated rainfall streaks & splash effects (`rain`)
  - Floating snowflakes (`snow`)
  - Pulsing thunderstorm lightning bolts (`thunderstorm`)
  - Twinkling stars at night (`night-clear`)
- **🚀 100% Client-Side Architecture**: No Node.js server, no database, no Firebase, and no API keys required!
- **🌐 Free & Open APIs**:
  - **Open-Meteo Weather API**: Current, hourly, daily, and real-time Air Quality (`US AQI`, PM2.5, PM10, Ozone).
  - **Open-Meteo Geocoding API**: Instant debounced city search with latitude/longitude & administrative zones.
  - **BigDataCloud Reverse Geocoding**: Automatically identifies your current city name from GPS coordinates.
- **📊 Interactive Recharts Analytics**: 24-hour visual trend curves for Temperature, Relative Humidity, Wind Speed/Gusts, and Precipitation Probability/Volume.
- **📍 Smart Location Management**: Manual default city selection, browser GPS Geolocation trigger, and up to 10 saved recent searches.
- **❤️ Favorites & Bookmarks**: Save favorite cities for quick live overview and offline caching.
- **⚙️ Custom Preferences**: Switch between `°C / °F`, `km/h / mph`, `12h / 24h` clock, and `Dark / Light / System` themes—all persisted in `localStorage`.
- **📄 Professional PDF Export**: Generate clean, print-ready PDF weather reports right from your browser using `jsPDF` & `html2canvas`.
- **⌨️ Keyboard Shortcuts**: Press `Ctrl + K` (or `Cmd + K`) anywhere to open the city search bar instantly! `ESC` closes modals.
- **📱 PWA Ready**: Includes offline fallback service worker (`sw.js`) and web app manifest for installation on iOS, Android, and Desktop.

---

## 🛠️ Technology Stack

- **React 19** + **Vite** (Ultra-fast build & HMR)
- **Tailwind CSS** (Custom design tokens, glassmorphic utilities & animations)
- **Framer Motion** (Fluid layout transitions & micro-interactions)
- **React Router DOM v7** (Using `HashRouter` for 100% reliable GitHub Pages routing)
- **Recharts** (Custom styled area, bar, and line charts)
- **Axios** (Robust API request handling)
- **React Hot Toast** (Glassmorphic toast alerts)
- **jsPDF + html2canvas** (Client-side PDF report builder)

---

## ⚡ Getting Started Locally

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/skypulse-weather.git
cd skypulse-weather
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
npm run preview
```

---

## 🚀 How to Deploy Directly to GitHub Pages

SkyPulse Weather is pre-configured with `base: './'` and `HashRouter` to deploy seamlessly to GitHub Pages without zero extra server configuration or path issues.

### Option A: Automated via GitHub Actions (Recommended)
1. Push this repository to your GitHub account (`main` branch).
2. In your GitHub Repository repository, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.
4. That's it! Every push to `main` automatically triggers the `.github/workflows/deploy.yml` workflow, builds the app, and publishes your live site at `https://username.github.io/repo-name/`.

### Option B: Manual via `gh-pages` CLI
If you prefer deploying from your local terminal using the `gh-pages` package:
```bash
npm install --save-dev gh-pages
```
Add to `package.json` scripts:
```json
"scripts": {
  "deploy": "vite build && gh-pages -d dist"
}
```
Run:
```bash
npm run deploy
```

---

## 🔑 API Reference & Attribution

All weather and geocoding data provided by [Open-Meteo.com](https://open-meteo.com/) and [BigDataCloud.net](https://www.bigdatacloud.com/) under open Creative Commons licenses without commercial API key restrictions.
