import React from 'react';
import toast, { Toaster, resolveValue } from 'react-hot-toast';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export const CustomToaster = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
        },
      }}
    >
      {(t) => (
        <AnimatePresence>
          {t.visible && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="glass-panel px-4 py-3 rounded-2xl flex items-center space-x-3 shadow-2xl border-white/40 max-w-sm backdrop-blur-2xl text-slate-800 dark:text-slate-100"
            >
              <div className="shrink-0">
                {t.type === 'success' && <FiCheckCircle className="w-5 h-5 text-emerald-500" />}
                {t.type === 'error' && <FiAlertCircle className="w-5 h-5 text-rose-500" />}
                {t.type === 'loading' && (
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                )}
                {t.type !== 'success' && t.type !== 'error' && t.type !== 'loading' && (
                  <FiInfo className="w-5 h-5 text-blue-500" />
                )}
              </div>

              <div className="text-xs sm:text-sm font-semibold flex-1 leading-snug">
                {resolveValue(t.message, t)}
              </div>

              {t.type !== 'loading' && (
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="p-1 rounded-full hover:bg-white/20 text-slate-400 hover:text-white transition-colors"
                >
                  <FiX className="w-3.5 h-3.5" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Toaster>
  );
};
