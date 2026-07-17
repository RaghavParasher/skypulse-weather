import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import { useSettings } from '../../context/SettingsContext';
import { formatTime, formatTemperature } from '../../utils/formatters';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, label, tempUnit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 rounded-2xl border-white/40 shadow-2xl backdrop-blur-xl text-xs">
        <p className="font-bold text-slate-900 dark:text-white border-b border-white/10 pb-1 mb-1">
          {label}
        </p>
        <p className="text-blue-500 dark:text-blue-400 font-extrabold text-sm">
          Temperature: {formatTemperature(payload[0].value, tempUnit)}
        </p>
      </div>
    );
  }
  return null;
};

export const TemperatureChart = () => {
  const { weatherData } = useWeather();
  const { tempUnit, timeFormat } = useSettings();

  if (!weatherData || !weatherData.hourly) return null;

  const hourly = weatherData.hourly;
  const now = new Date();
  const currentHourIndex = hourly.time.findIndex((t) => new Date(t) >= now) || 0;
  const startIndex = Math.max(0, currentHourIndex);

  const chartData = hourly.time.slice(startIndex, startIndex + 24).map((timeStr, idx) => {
    const realIndex = startIndex + idx;
    return {
      time: idx === 0 ? 'Now' : formatTime(timeStr, timeFormat),
      temp: hourly.temperature_2m[realIndex]
    };
  });

  return (
    <div className="w-full h-[320px] pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis
            dataKey="time"
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.15)' }}
          />
          <YAxis
            stroke="#94a3b8"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(val) => formatTemperature(val, tempUnit)}
          />
          <Tooltip content={<CustomTooltip tempUnit={tempUnit} />} />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#3b82f6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#tempGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
