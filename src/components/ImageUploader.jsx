import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Image, FileText, Copy, Download, Trash2, Zap, Sparkles, Eye, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import Toast from './Toast';
import Tesseract from 'tesseract.js';

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setError('');
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage({
          file,
          preview: e.target.result,
          name: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const handlePaste = async (e) => {
    const items = e.clipboardData.items;
    for (let item of items) {
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) {
          setError('');
          const reader = new FileReader();
          reader.onload = (e) => {
            setImage({
              file,
              preview: e.target.result,
              name: 'pasted-image.png'
            });
          };
          reader.readAsDataURL(file);
        }
        break;
      }
    }
  };

  const extractText = async () => {
    if (!image) return;

    setIsProcessing(true);
    setProgress(0);
    setError('');
    setExtractedText('');

    try {
      const result = await Tesseract.recognize(image.file, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });

      setExtractedText(result.data.text);
      addToast('Text extracted successfully!', 'success');
    } catch (err) {
      setError('Failed to extract text from image. Please try again.');
      addToast('Failed to extract text from image', 'error');
      console.error('OCR Error:', err);
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(extractedText);
      addToast('Text copied to clipboard!', 'success');
    } catch (err) {
      console.error('Failed to copy text:', err);
      addToast('Failed to copy text', 'error');
    }
  };

  const downloadText = () => {
    try {
      const element = document.createElement('a');
      const file = new Blob([extractedText], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'extracted-text.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      addToast('Text downloaded successfully!', 'success');
    } catch (err) {
      console.error('Failed to download text:', err);
      addToast('Failed to download text', 'error');
    }
  };

  const clearAll = () => {
    setImage(null);
    setExtractedText('');
    setError('');
    setProgress(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
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

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      className="min-h-screen p-4 sm:p-6 lg:p-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
        >
          <motion.div
            className="flex items-center justify-center mb-6"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-10 h-10 text-purple-400 mr-4" />
            </motion.div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent tracking-tight">
              Image to Text
            </h1>
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <Sparkles className="w-10 h-10 text-blue-400 ml-4" />
            </motion.div>
          </motion.div>
          <motion.p
            className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Transform your images into editable text with AI-powered OCR technology
          </motion.p>
        </motion.div>

        <div className="grid xl:grid-cols-2 gap-8 lg:gap-12">
          {/* Upload Section */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            {/* Upload Zone */}
            <motion.div
              {...getRootProps()}
              className={`relative bg-white/5 backdrop-blur-xl border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-500 overflow-hidden ${
                isDragActive
                  ? 'border-purple-400 bg-purple-500/10 scale-[1.02]'
                  : 'border-white/20 hover:border-white/40 hover:bg-white/10'
              }`}
              onPaste={handlePaste}
              tabIndex={0}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <input {...getInputProps()} />
              
              {/* Background shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />

              <div className="relative z-10 space-y-6">
                <motion.div
                  className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20"
                  animate={{
                    scale: isDragActive ? [1, 1.2, 1] : 1,
                    rotate: isDragActive ? [0, 10, -10, 0] : 0
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: isDragActive ? Infinity : 0
                  }}
                >
                  <Upload className="w-12 h-12 text-white" />
                </motion.div>
                
                <div className="space-y-3">
                  <motion.h3
                    className="text-xl sm:text-2xl font-bold text-white"
                    animate={{
                      color: isDragActive ? '#a855f7' : '#ffffff'
                    }}
                  >
                    {isDragActive ? 'Drop it like it\'s hot!' : 'Upload Your Image'}
                  </motion.h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Drag & drop, click to browse, or paste from clipboard (Ctrl+V)
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-400">
                  {['PNG', 'JPG', 'JPEG', 'GIF', 'BMP', 'WEBP'].map((format, index) => (
                    <motion.span
                      key={format}
                      className="px-3 py-1 bg-white/10 rounded-full backdrop-blur-sm border border-white/20"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {format}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Image Preview */}
            <AnimatePresence>
              {image && (
                <motion.div
                  className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold text-white text-lg">Preview</span>
                    </div>
                    <motion.button
                      onClick={clearAll}
                      className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-xl hover:bg-red-500/10 border border-red-500/20"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                  
                  <motion.div
                    className="relative group"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={image.preview}
                      alt="Preview"
                      className="w-full h-64 sm:h-72 object-contain bg-black/20 rounded-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-300"
                    />
                    <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-sm text-gray-300 truncate font-medium">
                        📁 {image.name}
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.button
                    onClick={extractText}
                    disabled={isProcessing}
                    className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-4 px-6 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-white/20"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-3">
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Processing... {progress}%</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3">
                        <Zap className="w-5 h-5" />
                        <span>Extract Text</span>
                      </div>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Results Section */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            {/* Error Display */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 backdrop-blur-xl"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <RotateCcw className="w-4 h-4 text-red-400" />
                    </div>
                    <p className="text-red-300 font-medium">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Extracted Text Display */}
            <AnimatePresence>
              {extractedText && (
                <motion.div
                  className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10"
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-semibold text-white text-lg">Extracted Text</span>
                    </div>
                    <div className="flex space-x-2">
                      <motion.button
                        onClick={copyToClipboard}
                        className="text-blue-400 hover:text-blue-300 transition-colors p-2 rounded-xl hover:bg-blue-500/10 border border-blue-500/20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Copy to clipboard"
                      >
                        <Copy className="w-5 h-5" />
                      </motion.button>
                      <motion.button
                        onClick={downloadText}
                        className="text-green-400 hover:text-green-300 transition-colors p-2 rounded-xl hover:bg-green-500/10 border border-green-500/20"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Download as text file"
                      >
                        <Download className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                  
                  <motion.div
                    className="bg-black/20 rounded-2xl p-4 max-h-96 overflow-y-auto border border-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <pre className="whitespace-pre-wrap text-sm text-gray-100 font-mono leading-relaxed">
                      {extractedText}
                    </pre>
                  </motion.div>
                  
                  <motion.div
                    className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between text-xs text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span>📊 {extractedText.length} characters</span>
                    <span>📝 {extractedText.split(/\s+/).filter(word => word.length > 0).length} words</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State */}
            {!extractedText && !error && (
              <motion.div
                className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
                variants={cardVariants}
                whileHover={{ y: -2 }}
              >
                <div className="text-center py-16">
                  <motion.div
                    className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-6 border border-white/20"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FileText className="w-10 h-10 text-gray-300" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Ready to Extract Text
                  </h3>
                  <p className="text-gray-400 text-base">
                    Upload an image to get started with AI-powered text extraction
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default ImageUploader; 