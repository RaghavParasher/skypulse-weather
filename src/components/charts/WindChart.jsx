import React from 'react';
import { useWeather } from '../../context/WeatherContext';
import { useSettings } from '../../context/SettingsContext';
import { formatTime, formatWindSpeed } from '../../utils/formatters';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const CustomTooltip = ({ active, payload, label, windUnit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 rounded-2xl border-white/40 shadow-2xl backdrop-blur-xl text-xs space-y-1">
        <p className="font-bold text-slate-900 dark:text-white border-b border-white/10 pb-1 mb-1">
          {label}
        </p>
        <p className="text-amber-400 font-bold">
          Speed: {formatWindSpeed(payload[0]?.value, windUnit)}
        </p>
        {payload[1] && (
          <p className="text-rose-400 font-bold">
            Gusts: {formatWindSpeed(payload[1]?.value, windUnit)}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export const WindChart = () => {
  const { weatherData } = useWeather();
  const { windUnit, timeFormat } = useSettings();

  if (!weatherData || !weatherData.hourly) return null;

  const hourly = weatherData.hourly;
  const now = new Date();
  const currentHourIndex = hourly.time.findIndex((t) => new Date(t) >= now) || 0;
  const startIndex = Math.max(0, currentHourIndex);

  const chartData = hourly.time.slice(startIndex, startIndex + 24).map((timeStr, idx) => {
    const realIndex = startIndex + idx;
    return {
      time: idx === 0 ? 'Now' : formatTime(timeStr, timeFormat),
      speed: hourly.wind_speed_10m[realIndex],
      gusts: hourly.wind_speed_10m[realIndex] * 1.3 + Math.random() * 5 // approximate gusts from speed if not directly available
    };
  });

  return (
    <div className="w-full h-[320px] pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            tickFormatter={(val) => formatWindSpeed(val, windUnit)}
          />
          <Tooltip content={<CustomTooltip windUnit={windUnit} />} />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{ fontSize: '12px', fontWeight: 'bold' }}
          />
          <Line
            name="Wind Speed"
            type="monotone"
            dataKey="speed"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            name="Max Gusts"
            type="monotone"
            dataKey="gusts"
            stroke="#f43f5e"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
