import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { useSettings } from '../context/SettingsContext';
import { formatTemperature } from '../utils/formatters';
import { FiShare2, FiCopy, FiPrinter, FiMaximize, FiCheck, FiDownload } from 'react-icons/fi';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const WeatherActions = () => {
  const { activeLocation, weatherData } = useWeather();
  const { tempUnit } = useSettings();

  const handleShare = async () => {
    if (!weatherData || !weatherData.current) return;
    const current = weatherData.current;
    const text = `Current weather in ${activeLocation.name}: ${formatTemperature(current.temperature_2m, tempUnit)}, Humidity: ${current.relative_humidity_2m}%. Check out SkyPulse Weather!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `SkyPulse Weather - ${activeLocation.name}`,
          text,
          url: window.location.href
        });
      } catch (e) {
        // user cancelled share
      }
    } else {
      // Fallback copy to clipboard + social options
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      toast.success('Summary & link copied to clipboard!');
    }
  };

  const handleCopySummary = () => {
    if (!weatherData || !weatherData.current) return;
    const current = weatherData.current;
    const summary = `Weather Report for ${activeLocation.name} (${activeLocation.country || ''})\nTemperature: ${formatTemperature(current.temperature_2m, tempUnit)} (Feels like ${formatTemperature(current.apparent_temperature, tempUnit)})\nHumidity: ${current.relative_humidity_2m}%\nWind Speed: ${Math.round(current.wind_speed_10m)} km/h\nPowered by SkyPulse Weather`;

    navigator.clipboard.writeText(summary);
    toast.success('Formatted weather summary copied!');
  };

  const handleDownloadPDF = async () => {
    const toastId = toast.loading('Generating professional weather report PDF...');
    try {
      const element = document.getElementById('report-container') || document.body;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#0f172a'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`SkyPulse_Weather_${activeLocation.name.replace(/\s+/g, '_')}.pdf`);
      toast.success('PDF report downloaded successfully!', { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error('Could not generate PDF. Opening browser print dialog...', { id: toastId });
      window.print();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {
        toast.error('Fullscreen mode is not supported by your browser.');
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 my-4">
      <button
        onClick={handleShare}
        className="flex items-center space-x-1.5 glass-pill px-3 py-1.5 text-xs hover:bg-blue-500/30 hover:text-white transition-all text-slate-100 font-bold border-white/20"
        title="Share weather on social media or apps"
      >
        <FiShare2 className="w-3.5 h-3.5 text-sky-400" />
        <span>Share</span>
      </button>

      <button
        onClick={handleCopySummary}
        className="flex items-center space-x-1.5 glass-pill px-3 py-1.5 text-xs hover:bg-emerald-500/30 hover:text-white transition-all text-slate-100 font-bold border-white/20"
        title="Copy text summary to clipboard"
      >
        <FiCopy className="w-3.5 h-3.5 text-emerald-400" />
        <span>Copy Data</span>
      </button>

      <button
        onClick={handleDownloadPDF}
        className="flex items-center space-x-1.5 glass-pill px-3 py-1.5 text-xs hover:bg-purple-500/30 hover:text-white transition-all text-slate-100 font-bold border-white/20"
        title="Download high-resolution PDF report or Print"
      >
        <FiDownload className="w-3.5 h-3.5 text-purple-400" />
        <span>Download PDF</span>
      </button>

      <button
        onClick={() => window.print()}
        className="flex items-center space-x-1.5 glass-pill px-3 py-1.5 text-xs hover:bg-amber-500/30 hover:text-white transition-all text-slate-100 font-bold border-white/20"
        title="Print current forecast"
      >
        <FiPrinter className="w-3.5 h-3.5 text-amber-400" />
        <span className="hidden sm:inline">Print</span>
      </button>

      <button
        onClick={toggleFullscreen}
        className="p-1.5 rounded-full glass-card hover:bg-white/30 text-white font-bold transition-all border-white/20"
        title="Toggle Fullscreen"
      >
        <FiMaximize className="w-3.5 h-3.5 text-sky-300" />
      </button>
    </div>
  );
};
