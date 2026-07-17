import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { useSettings } from '../context/SettingsContext';
import {
  getHumidityComfort,
  getPressureStatus,
  formatVisibility,
  formatTime,
  getWindDirectionLabel,
  getUVLevel,
  formatWindSpeed
} from '../utils/formatters';
import { SearchBar } from '../components/SearchBar';
import { WeatherCard } from '../components/WeatherCard';
import { HighlightCard } from '../components/HighlightCard';
import { AirQualityCard } from '../components/AirQualityCard';
import { HourlyForecast } from '../components/HourlyForecast';
import { DailyForecast } from '../components/DailyForecast';
import { TemperatureChart } from '../components/charts/TemperatureChart';
import { WeatherActions } from '../components/WeatherActions';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ErrorPage } from '../components/ErrorPage';
import {
  FiDroplet,
  FiWind,
  FiCompass,
  FiEye,
  FiCloud,
  FiSun,
  FiSunrise,
  FiSunset,
  FiCloudRain,
  FiAlertCircle,
  FiTrendingUp
} from 'react-icons/fi';
import { motion } from 'framer-motion';

export const Home = ({ onOpenSearchModal }) => {
  const { weatherData, loading, error } = useWeather();
  const { timeFormat, windUnit } = useSettings();

  if (loading && !weatherData) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        <SearchBar />
        <LoadingSkeleton />
      </main>
    );
  }

  if (error || !weatherData || !weatherData.current) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        <SearchBar />
        <ErrorPage onOpenSearch={onOpenSearchModal} />
      </main>
    );
  }

  const current = weatherData.current;
  const daily = weatherData.daily || {};

  const humidity = current.relative_humidity_2m ?? 50;
  const windSpeed = current.wind_speed_10m ?? 0;
  const windDir = current.wind_direction_10m ?? 0;
  const pressure = current.pressure_msl || current.surface_pressure || 1013;
  const visibility = current.visibility ?? 10000;
  const cloudCover = current.cloud_cover ?? 0;
  const uvIndex = current.uv_index ?? 3;
  const uvMeta = getUVLevel(uvIndex);

  const sunriseStr = daily.sunrise ? daily.sunrise[0] : null;
  const sunsetStr = daily.sunset ? daily.sunset[0] : null;
  const rainChance = daily.precipitation_probability_max ? daily.precipitation_probability_max[0] : 0;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full space-y-8 flex-1">
      {/* Top Search Bar */}
      <div className="pt-2">
        <SearchBar />
      </div>

      {/* Action Tools & PDF Printable Container */}
      <div id="report-container" className="space-y-8 pb-12">
        <WeatherActions />

        {/* Hero Card */}
        <WeatherCard />

        {/* Today's Highlights Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase mb-6 flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 animate-ping inline-block" />
            <span>Today's Highlights & Atmospheric Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* 1. Humidity Card */}
            <HighlightCard
              icon={<FiDroplet className="w-4 h-4 text-teal-400" />}
              title="Humidity"
              value={`${humidity}%`}
              subtext={getHumidityComfort(humidity)}
              delay={1}
            >
              <div className="w-full h-2.5 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-400 to-blue-500 rounded-full transition-all duration-700"
                  style={{ width: `${humidity}%` }}
                />
              </div>
            </HighlightCard>

            {/* 2. Wind Speed & Direction Card */}
            <HighlightCard
              icon={<FiWind className="w-4 h-4 text-amber-400" />}
              title="Wind Status"
              value={formatWindSpeed(windSpeed, windUnit)}
              subtext={`Direction: ${getWindDirectionLabel(windDir)} (${Math.round(windDir)}°)`}
              delay={2}
            >
              <div className="flex items-center space-x-3 bg-white/20 dark:bg-slate-900/50 rounded-2xl p-2.5 border border-white/10">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center relative">
                  <FiCompass
                    className="w-6 h-6 text-amber-400 transition-transform duration-1000"
                    style={{ transform: `rotate(${windDir}deg)` }}
                  />
                </div>
                <div className="text-xs">
                  <span className="font-bold block text-slate-800 dark:text-slate-100">Compass Needle</span>
                  <span className="text-slate-500 dark:text-slate-400">Heading {getWindDirectionLabel(windDir)}</span>
                </div>
              </div>
            </HighlightCard>

            {/* 3. Pressure Card */}
            <HighlightCard
              icon={<FiCompass className="w-4 h-4 text-purple-400" />}
              title="Pressure"
              value={`${Math.round(pressure)} hPa`}
              subtext={getPressureStatus(pressure)}
              delay={3}
            >
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase pt-1">
                <span>Low (&lt;1000)</span>
                <span className="text-purple-400">Normal (1013)</span>
                <span>High (&gt;1020)</span>
              </div>
            </HighlightCard>

            {/* 4. Visibility Card */}
            <HighlightCard
              icon={<FiEye className="w-4 h-4 text-sky-400" />}
              title="Visibility"
              value={formatVisibility(visibility, windUnit)}
              subtext={visibility >= 10000 ? 'Clear horizon view' : 'Hazy or restricted atmospheric visibility'}
              delay={4}
            />

            {/* 5. Cloud Cover Card */}
            <HighlightCard
              icon={<FiCloud className="w-4 h-4 text-blue-400" />}
              title="Cloud Cover"
              value={`${cloudCover}%`}
              subtext={cloudCover < 30 ? 'Mostly clear sky conditions' : cloudCover < 70 ? 'Partly cloudy sky overhead' : 'Dense overcast cloud cover'}
              delay={5}
            >
              <div className="w-full h-2.5 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-300 to-indigo-500 rounded-full transition-all duration-700"
                  style={{ width: `${cloudCover}%` }}
                />
              </div>
            </HighlightCard>

            {/* 6. UV Index Card */}
            <HighlightCard
              icon={<FiSun className="w-4 h-4 text-orange-400" />}
              title="UV Index"
              value={uvIndex.toFixed(1)}
              badge={uvMeta.level}
              badgeColor="bg-orange-500/20 text-orange-300 border-orange-400/30"
              subtext={uvIndex >= 6 ? 'High risk of harm from unprotected sun exposure' : 'Minimal danger from UV rays'}
              delay={6}
            >
              <div className="w-full h-2.5 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${uvMeta.barColor} transition-all duration-700`}
                  style={{ width: `${Math.min((uvIndex / 11) * 100, 100)}%` }}
                />
              </div>
            </HighlightCard>

            {/* 7. Sunrise & Sunset Card */}
            <HighlightCard
              icon={<FiSunrise className="w-4 h-4 text-amber-500" />}
              title="Sunrise & Sunset"
              value={sunriseStr ? formatTime(sunriseStr, timeFormat) : '06:00 AM'}
              subtext={`Sunset: ${sunsetStr ? formatTime(sunsetStr, timeFormat) : '07:30 PM'}`}
              delay={7}
            >
              <div className="flex items-center justify-between bg-white/20 dark:bg-slate-900/40 rounded-2xl p-2.5 border border-white/10 text-xs">
                <div className="flex items-center space-x-1.5">
                  <FiSunrise className="w-4 h-4 text-amber-400" />
                  <span className="font-bold">{sunriseStr ? formatTime(sunriseStr, timeFormat) : '06:00'}</span>
                </div>
                <div className="h-0.5 flex-1 mx-2 bg-gradient-to-r from-amber-400 via-orange-400 to-purple-400 rounded-full" />
                <div className="flex items-center space-x-1.5">
                  <FiSunset className="w-4 h-4 text-purple-400" />
                  <span className="font-bold">{sunsetStr ? formatTime(sunsetStr, timeFormat) : '19:30'}</span>
                </div>
              </div>
            </HighlightCard>

            {/* 8. Rain Probability Card */}
            <HighlightCard
              icon={<FiCloudRain className="w-4 h-4 text-blue-500" />}
              title="Rain Chance"
              value={`${Math.round(rainChance)}%`}
              subtext={rainChance > 50 ? 'High probability of rain showers today' : 'Dry conditions expected for most of the day'}
              delay={8}
            >
              <div className="w-full h-2.5 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-400 to-blue-600 rounded-full transition-all duration-700"
                  style={{ width: `${rainChance}%` }}
                />
              </div>
            </HighlightCard>

            {/* 9. Real Air Quality Card (Takes 2 columns) */}
            <AirQualityCard delay={9} />

            {/* 10. Weather Alerts Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card rounded-[2rem] p-6 flex flex-col justify-between hover:scale-[1.02] hover:-translate-y-1.5 transition-all duration-300 border border-white/40 dark:border-white/15 col-span-1 md:col-span-2 shadow-xl backdrop-blur-2xl bg-white/35 dark:bg-slate-900/60 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2.5 text-slate-700 dark:text-slate-300">
                  <span className="p-2.5 rounded-2xl bg-white/40 dark:bg-slate-800/80 border border-white/40 dark:border-white/15 text-emerald-500 shadow-md shrink-0">
                    <FiAlertCircle className="w-5 h-5 animate-pulse" />
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest">National Weather Alerts</span>
                </div>
                <span className="text-xs font-black px-3.5 py-1 rounded-full bg-emerald-500/25 text-emerald-300 border border-emerald-400/30 shadow-sm">
                  Normal Status
                </span>
              </div>

              <div className="my-3">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950 dark:text-white drop-shadow-sm">
                  No Severe Weather Warnings
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  All atmospheric parameters are stable across this region. No extreme storms, floods, or high-wind advisories are currently in effect by meteorological centers.
                </p>
              </div>

              <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 dark:text-slate-400 mt-3 border-t border-white/20 dark:border-white/10 pt-3">
                <span>⚡ Alert status monitored 24/7 automatically via satellite streams</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 24-Hour Forecast */}
        <HourlyForecast />

        {/* 7-Day Forecast Grid */}
        <DailyForecast />

        {/* Quick Temperature Chart Preview */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border-white/30 dark:border-white/15 backdrop-blur-2xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2.5 text-slate-700 dark:text-slate-200">
              <span className="p-2 rounded-xl bg-blue-500/20 text-blue-500 shadow-sm">
                <FiTrendingUp className="w-5 h-5" />
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight uppercase">24-Hour Temperature Curve</h2>
            </div>
          </div>
          <TemperatureChart />
        </div>
      </div>
    </main>
  );
};
