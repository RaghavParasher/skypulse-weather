import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import { useSettings } from '../../context/SettingsContext';
import { formatTime } from '../../utils/formatters';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 rounded-2xl border-white/40 shadow-2xl backdrop-blur-xl text-xs space-y-1">
        <p className="font-bold text-slate-900 dark:text-white border-b border-white/10 pb-1 mb-1">
          {label}
        </p>
        <p className="text-sky-400 font-extrabold">
          Probability: {payload[0].value}%
        </p>
        {payload[1] && (
          <p className="text-blue-300 font-bold">
            Volume: {payload[1].value} mm
          </p>
        )}
      </div>
    );
  }
  return null;
};

export const RainChart = () => {
  const { weatherData } = useWeather();
  const { timeFormat } = useSettings();

  if (!weatherData || !weatherData.hourly) return null;

  const hourly = weatherData.hourly;
  const now = new Date();
  const currentHourIndex = hourly.time.findIndex((t) => new Date(t) >= now) || 0;
  const startIndex = Math.max(0, currentHourIndex);

  const chartData = hourly.time.slice(startIndex, startIndex + 24).map((timeStr, idx) => {
    const realIndex = startIndex + idx;
    return {
      time: idx === 0 ? 'Now' : formatTime(timeStr, timeFormat),
      prob: hourly.precipitation_probability ? hourly.precipitation_probability[realIndex] : 0,
      vol: hourly.precipitation ? hourly.precipitation[realIndex] : 0
    };
  });

  return (
    <div className="w-full h-[320px] pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.9} />
              <stop offset="100%" stopColor="#0284c7" stopOpacity={0.3} />
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
            domain={[0, 100]}
            tickFormatter={(val) => `${val}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            name="Rain Chance (%)"
            dataKey="prob"
            fill="url(#rainGradient)"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
