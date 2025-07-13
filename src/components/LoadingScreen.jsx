import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from './ui/skeleton';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const loadingSteps = [
      { progress: 20, text: 'Loading OCR Engine...' },
      { progress: 40, text: 'Setting up Image Processing...' },
      { progress: 60, text: 'Preparing Text Recognition...' },
      { progress: 80, text: 'Finalizing Setup...' },
      { progress: 100, text: 'Ready!' }
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < loadingSteps.length) {
        setProgress(loadingSteps[stepIndex].progress);
        setLoadingText(loadingSteps[stepIndex].text);
        setCurrentStep(stepIndex);
        stepIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => onComplete(), 1000);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [onComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="text-center space-y-12 max-w-md mx-auto">
        {/* Logo/Icon with enhanced glassmorphism */}
        <motion.div
          className="relative"
          variants={logoVariants}
        >
          <motion.div
            className="w-32 h-32 mx-auto bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center shadow-2xl border border-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </motion.svg>
          </motion.div>
          
          {/* Enhanced animated rings */}
          <motion.div
            className="absolute inset-0 border-2 border-purple-400/30 rounded-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 0.2, 0.6]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-0 border border-blue-400/20 rounded-3xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.4, 0.1, 0.4]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute inset-0 border border-white/10 rounded-3xl"
            animate={{
              scale: [1, 1.7, 1],
              opacity: [0.2, 0.05, 0.2]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </motion.div>

        {/* Enhanced Title with gradient text */}
        <motion.div
          className="space-y-4"
          variants={itemVariants}
        >
          <motion.h1
            className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Image to Text
          </motion.h1>
          <motion.p
            className="text-gray-300 text-lg font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Convert images to text instantly with AI
          </motion.p>
        </motion.div>

        {/* Enhanced Progress Section */}
        <motion.div
          className="space-y-8"
          variants={itemVariants}
        >
          {/* Progress Container with glassmorphism */}
          <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            {/* Progress Bar */}
            <div className="relative mb-6">
              <div className="w-full bg-white/10 rounded-full h-4 overflow-hidden border border-white/20">
                <motion.div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 rounded-full relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              </div>
              
              {/* Progress percentage with better positioning */}
              <motion.div
                className="absolute -top-8 text-sm font-mono text-white/80 bg-white/10 px-2 py-1 rounded-lg backdrop-blur-sm"
                animate={{ 
                  left: `${Math.max(0, Math.min(progress - 5, 90))}%`
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {progress}%
              </motion.div>
            </div>

            {/* Loading Text with better animation */}
            <AnimatePresence mode="wait">
              <motion.p
                key={loadingText}
                className="text-white/90 text-base font-medium text-center"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                {loadingText}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Enhanced Loading Dots Animation */}
          <motion.div
            className="flex justify-center space-x-3"
            variants={itemVariants}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Additional loading steps indicator */}
        <motion.div
          className="flex justify-center space-x-2"
          variants={itemVariants}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i <= currentStep 
                  ? 'bg-gradient-to-r from-purple-400 to-blue-400' 
                  : 'bg-white/20'
              }`}
              animate={{
                scale: i === currentStep ? [1, 1.3, 1] : 1
              }}
              transition={{
                duration: 0.5,
                repeat: i === currentStep ? Infinity : 0
              }}
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen; 