import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500/10 border-green-500/20',
          accent: 'bg-green-500/20',
          progress: 'bg-green-400'
        };
      case 'error':
        return {
          bg: 'bg-red-500/10 border-red-500/20',
          accent: 'bg-red-500/20',
          progress: 'bg-red-400'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500/10 border-yellow-500/20',
          accent: 'bg-yellow-500/20',
          progress: 'bg-yellow-400'
        };
      default:
        return {
          bg: 'bg-blue-500/10 border-blue-500/20',
          accent: 'bg-blue-500/20',
          progress: 'bg-blue-400'
        };
    }
  };

  const colors = getColors();

  const toastVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      x: 50,
      scale: 0.8,
      rotate: 5
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      x: 50,
      scale: 0.8,
      rotate: -5,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const progressVariants = {
    initial: { width: "100%" },
    animate: { width: "0%" },
    transition: { 
      duration: duration / 1000, 
      ease: "linear" 
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed top-4 right-4 z-50 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl max-w-sm min-w-[300px] ${colors.bg}`}
          variants={toastVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          whileHover={{ scale: 1.02, y: -2 }}
        >
          <div className="flex items-start space-x-3">
            <motion.div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${colors.accent}`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
            >
              {getIcon()}
            </motion.div>
            
            <motion.div
              className="flex-1 min-w-0"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm font-medium text-white leading-relaxed">
                {message}
              </p>
            </motion.div>
            
            <motion.button
              onClick={() => {
                setIsVisible(false);
                setTimeout(onClose, 300);
              }}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>
          
          {/* Enhanced progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 bg-white/10 rounded-b-2xl overflow-hidden"
            initial={{ width: "100%" }}
          >
            <motion.div
              className={`h-full ${colors.progress} relative`}
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast; 