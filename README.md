<div align="center">

# 🌦️ SkyPulse Weather OS

### A Next-Generation, Frontend-Only Weather Operating System
**Built with React 19, Three.js (WebGL 3D Earth & Atmosphere), Tailwind CSS, Framer Motion & Recharts**

[![Live Production Deployment](https://img.shields.io/badge/🌟_Live_Production_Deploy-Visit_SkyPulse_OS-0055FF?style=for-the-badge&logo=googlechrome&logoColor=white)](https://raghavparasher.github.io/skypulse-weather/#/)

[![React 19](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js%20WebGL-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite%208-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS%20v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-111111?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Open-Meteo](https://img.shields.io/badge/Open--Meteo_API-00B4D8?style=for-the-badge&logo=icloud&logoColor=white)](https://open-meteo.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Workbox_Offline-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

<p className="mt-4 text-slate-300">
  Experience hyper-local meteorology through an ultra-sleek hybrid of <b>Apple Weather aesthetics</b> and <b>Windows 11 Mica Glassmorphism</b>—powered entirely on the client without a backend or API keys!
</p>

</div>

---

## 💎 Why This Project Stands Out (Recruiter Highlights)

**SkyPulse Weather OS** was engineered to showcase cutting-edge modern frontend capabilities, clean spatial graphics rendering, and enterprise-grade architectural design without the overhead or security risks of server-side API keys.

```
+-----------------------------------------------------------------------------------+
|                        SKYPULSE ZERO-SERVER ARCHITECTURE                          |
+-----------------------------------------------------------------------------------+
|  +---------------------+      +---------------------+      +-------------------+  |
|  |   Open-Meteo API    |      |   BigDataCloud API  |      |   Three.js WebGL  |  |
|  |  (Weather & AQI)    |      |  (Reverse Geocoding)|      |   3D Spatial View |  |
|  +----------+----------+      +----------+----------+      +---------+---------+  |
|             |                            |                           |            |
|             +---------------------+------+---------------------------+            |
|                                   |                                               |
|                                   v                                               |
|                      +--------------------------+                                 |
|                      |  React 19 State Engine   |                                 |
|                      |  Context + LocalStorage  |                                 |
|                      +--------------------------+                                 |
+-----------------------------------------------------------------------------------+
```

### 🚀 1. 100% Zero-Server & Zero-API-Key Architecture
- **Eliminates Backend Costs & Key Leakage**: Directly communicates from the browser with the **Open-Meteo Meteorological & Air Quality APIs** and **BigDataCloud Reverse Geocoding**.
- **Instant Debounced Geocoding**: Features real-time multi-character city search across global administrative boundaries with instant coordinate mapping.
- **GPS Geolocation & Auto-Detection**: Leverages the HTML5 Geolocation API to detect coordinates on launch, reverse-lookup the city name, and instantly load hyper-local atmospheric conditions.

### 🌍 2. Spatial WebGL 3D Earth & Particle Atmosphere
- **Interactive 3D Globe (`Globe3D.jsx`)**: Built on `@react-three/fiber` and `@react-three/drei`, rendering a procedural textured Three.js sphere with realistic atmospheric glow, night lights, cloud layering, and touch-responsive orbit controls.
- **Dynamic 3D Sky Particles (`WeatherParticles3D.jsx`)**: Renders up to **1,500 real-time 3D particles** floating across the viewport whose velocities, gravity, and swirl angles dynamically react to live wind speeds (`wind_speed_10m`) and weather conditions (`rain`, `snow`, `thunderstorm`, or `clear` floating stardust).

### 🎨 3. Apple Weather x Windows 11 Mica Glassmorphism
- **Deep Glass Utilities**: Custom CSS layers (`backdrop-blur-3xl`, `glass-panel`, `glass-card`) with multi-layered drop shadows and inner border highlights (`border-white/40`).
- **100% Accessible High-Contrast Typography**: Every card, header, modal, chart label, and interactive button enforces crystal-clear bright white (`text-white`) and metallic silver (`text-slate-200`) typography to ensure maximum contrast across both dark and light modes.
- **Micro-Interactions**: Powered by `Framer Motion` (`AnimatePresence`, smooth layout shifts, scale-on-hover cards, and custom toast notifications).

---

## ✨ Comprehensive Feature Matrix

| Feature Module | Technical Implementation & Capability |
| :--- | :--- |
| **🌤️ Real-Time Forecasts** | Live current temperature, apparent "feels like" temp, day high/low, UV index, relative humidity, barometric pressure trend arrows, and visibility metrics. |
| **📊 Recharts Analytics** | Deep-dive analytical charts (`Forecast.jsx`) with interactive 24-hour area curves and bar charts for Temperature, Humidity, Wind Speed/Gusts, and Precipitation. |
| **🫁 Real-Time Air Quality** | Live Air Quality Index (`US AQI`) calculation accompanied by detailed breakdown cards for **PM2.5**, **PM10**, and **Ozone (O₃)** with actionable health guidance. |
| **⏰ 24-Hour & 7-Day Outlook** | Horizontal scrollable hourly forecast strip (`HourlyForecast.jsx`) with high-elevation scroll buttons (`<` / `>`) and interactive 7-day daily projection cards. |
| **📍 Multi-City Bookmarks** | Save up to 10 favorite global cities (`Favorites.jsx`) stored in `localStorage` for quick one-click switching and persistent monitoring across browser sessions. |
| **⚙️ Custom Preferences** | Instant live toggling between **Metric (`°C`, `km/h`)** and **Imperial (`°F`, `mph`)** units, **`12h AM/PM / 24h`** clock formats, and **Dark / Light / System** themes. |
| **📄 Client-Side PDF Reports** | Generate executive-ready, print-formatted PDF meteorological summaries directly inside the browser using `jsPDF` and `html2canvas` (`WeatherActions.jsx`). |
| **⌨️ Global Keyboard Shortcuts** | Press `Ctrl + K` (or `Cmd + K` on macOS) anywhere across the application to instantly trigger the global city search modal! Press `ESC` to dismiss modals. |
| **📱 PWA Offline Support** | Pre-configured with custom `sw.js` Workbox service worker caching and `manifest.json` for full standalone installation on iOS, Android, macOS, and Windows. |

---

## 🏛️ Engineering Architecture & Folder Breakdown

```bash
skypulse-weather/
├── public/
│   ├── manifest.json            # PWA standalone configuration & icons
│   └── sw.js                    # Offline caching & API fetch fallback service worker
├── src/
│   ├── components/
│   │   ├── 3d/                  # WebGL Spatial Canvas Components
│   │   │   ├── AtmosphericBackground3D.jsx # Full-viewport 3D canvas wrap
│   │   │   ├── FloatingWeatherIcon3D.jsx   # 3D floating weather sculpture
│   │   │   ├── Globe3D.jsx                 # Interactive Three.js Earth sphere
│   │   │   ├── InteractiveGlobeSection.jsx # Section wrapper with orbit controls
│   │   │   └── WeatherParticles3D.jsx      # Wind-reactive 3D particle engine
│   │   ├── background/          # Celestial CSS & SVG Sky Animations
│   │   │   ├── WeatherBackground.jsx       # Dynamic HSL gradient orchestrator
│   │   │   ├── SunAnimation.jsx / MoonAnimation.jsx / StarsAnimation.jsx
│   │   │   └── MovingClouds.jsx / RainAnimation.jsx / SnowParticles.jsx
│   │   ├── charts/              # Recharts Analytics Visualizations
│   │   │   ├── TemperatureChart.jsx / HumidityChart.jsx
│   │   │   └── WindChart.jsx / RainChart.jsx
│   │   ├── AirQualityCard.jsx   # Live US AQI, PM2.5, PM10 & Ozone card
│   │   ├── Clock.jsx            # Live animated digital clock with 12h/24h support
│   │   ├── DailyForecast.jsx    # 7-day interactive projection list
│   │   ├── FavoriteCard.jsx     # Saved bookmark overview card
│   │   ├── Footer.jsx           # Glass footer with rotating weather facts
│   │   ├── HighlightCard.jsx    # UV, Wind, Humidity, and Pressure capsules
│   │   ├── HourlyForecast.jsx   # Horizontal 24-hour scroll strip with arrows
│   │   ├── InitialLocationModal.jsx # First-launch city/GPS selector
│   │   ├── Navbar.jsx           # Sticky glassmorphic navigation bar
│   │   ├── SearchBar.jsx        # Instant debounced geocoding search input
│   │   ├── SettingsModal.jsx    # System settings & local storage management
│   │   └── WeatherCard.jsx      # Main hero display with 3D canvas icon
│   ├── context/                 # React Context State Providers
│   │   ├── FavoritesContext.jsx # Bookmarked cities & recent search history
│   │   ├── SettingsContext.jsx  # Unit toggles, time formats & theme manager
│   │   └── WeatherContext.jsx   # Core API orchestration & location tracking
│   ├── pages/                   # Route Views (HashRouter for GitHub Pages)
│   │   ├── Home.jsx             # Main dashboard view
│   │   ├── Forecast.jsx         # Analytics deep-dive tabbed dashboard
│   │   ├── Favorites.jsx        # Saved cities management grid
│   │   ├── About.jsx            # Project overview & interactive weather tips
│   │   └── NotFound.jsx         # 404 fallback page
│   ├── services/                # API Integration Layer
│   │   ├── geocodingApi.js      # Open-Meteo search & BigDataCloud reverse lookup
│   │   └── weatherApi.js        # Open-Meteo forecast, AQI & WMO code mapper
│   ├── utils/                   # Unit Formatters & Helpers
│   │   └── formatters.js        # Temperature conversion, UV alerts & wind directions
│   ├── App.jsx                  # Main application router & modal controller
│   ├── index.css                # Tailwind base + custom glassmorphic utilities
│   └── main.jsx                 # Application entry point & PWA registration
├── index.html                   # HTML entry point with metadata & CDN icon
├── package.json                 # Project dependencies & build scripts
└── vite.config.js               # Vite bundler, alias & Workbox PWA configuration
```

---

## ⚡ Quickstart & Local Development

### 1. Clone the Repository
```bash
git clone https://github.com/raghavparasher/skypulse-weather.git
cd skypulse-weather
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** inside your web browser. You can immediately test GPS detection, instant city searches, and 3D interactions.

### 4. Build Production Bundle
```bash
npm run build
npm run preview
```

---

## 🌐 Seamless Deployment to GitHub Pages

SkyPulse Weather OS uses **React Router (`<HashRouter>`)** and sets `base: './'` inside `vite.config.js`. This guarantees that all assets, CSS chunks, textures, and routes work flawlessly out of the box when deployed on static hosting platforms like **GitHub Pages** without path 404 errors.

### Deploying via GitHub Actions:
1. Push your changes to the `main` branch.
2. In your GitHub repository, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions** (or let `.github/workflows/deploy.yml` run automatically).
4. Your application will be live at: **`https://raghavparasher.github.io/skypulse-weather/#/`**.

---

## 🔑 Open API Attribution & Credits

- **[Open-Meteo Weather API](https://open-meteo.com/)**: Free, high-accuracy weather model output, air quality index calculations, and geocoding services.
- **[BigDataCloud API](https://www.bigdatacloud.com/)**: Client-side reverse geocoding for instant GPS city recognition.
- **[Three.js & React Three Fiber](https://docs.pmnd.rs/react-three-fiber)**: High-performance 3D spatial WebGL rendering engine.

---

<div align="center">
  <p className="text-xs text-slate-400 font-mono">
    Designed & Developed with ❤️ by Raghav Parasher • SkyPulse Weather OS © 2026
  </p>
</div>
