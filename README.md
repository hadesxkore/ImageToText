# Image to Text Converter PWA

A modern, responsive Progressive Web App (PWA) that converts images to text using OCR (Optical Character Recognition) technology. Built with React, Vite, Tailwind CSS, and Tesseract.js.

## 🚀 Features

- **📱 Progressive Web App**: Install on any device for native app-like experience
- **🎨 Modern UI**: Beautiful, responsive design with Tailwind CSS and Shadcn/ui components
- **📤 Multiple Upload Methods**: 
  - Drag & drop images
  - Click to browse files
  - Paste from clipboard (Ctrl+V)
- **🔍 OCR Processing**: Extract text from images using Tesseract.js
- **📋 Text Management**: 
  - Copy extracted text to clipboard
  - Download text as .txt file
  - Real-time character count
- **🎯 User Experience**:
  - Loading screen with progress indicators
  - Toast notifications for user feedback
  - Progress tracking during OCR processing
  - Error handling and validation

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS v4, Shadcn/ui components
- **OCR Engine**: Tesseract.js
- **File Handling**: react-dropzone
- **Icons**: Lucide React
- **PWA**: Service Worker, Web App Manifest

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ImageToText
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📱 PWA Installation

The app can be installed on any device:

1. **Desktop**: Look for the install icon in your browser's address bar
2. **Mobile**: Use "Add to Home Screen" from your browser menu
3. **Offline**: Basic caching support for core functionality

## 🎯 Usage

1. **Loading**: The app starts with an animated loading screen
2. **Upload Image**: 
   - Drag and drop an image file
   - Click the upload area to browse files
   - Paste an image from clipboard (Ctrl+V)
3. **Extract Text**: Click "Extract Text" to process the image
4. **Manage Results**:
   - Copy text to clipboard
   - Download as text file
   - View character count

## 🔧 Supported File Formats

- PNG
- JPG/JPEG
- GIF
- BMP
- WEBP

**File Size Limit**: 10MB per image

## 🌟 Key Components

- **LoadingScreen**: Animated loading with progress indicators
- **ImageUploader**: Main component handling file uploads and OCR
- **Toast**: Notification system for user feedback
- **Shadcn/ui**: Modern UI components (Button, Alert, Skeleton, etc.)

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/           # Shadcn/ui components
│   ├── LoadingScreen.jsx
│   ├── ImageUploader.jsx
│   └── Toast.jsx
├── lib/
│   └── utils.js      # Utility functions
├── App.jsx           # Main app component
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## 🔮 Future Enhancements

- [ ] Multiple language support for OCR
- [ ] Batch processing for multiple images
- [ ] Text formatting options
- [ ] Cloud storage integration
- [ ] Advanced image preprocessing
- [ ] OCR confidence scoring
- [ ] Export to different formats (PDF, Word, etc.)

## 🐛 Troubleshooting

### Common Issues

1. **OCR not working**: Ensure you're using a supported image format and the file isn't corrupted
2. **Slow processing**: Large images take longer to process - consider resizing
3. **Installation issues**: Make sure you have Node.js 18+ installed

### Performance Tips

- Use high-quality, clear images for better OCR results
- Avoid very large images (>5MB) for faster processing
- Ensure good contrast between text and background

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

**Made with ❤️ using React, Vite, and Tailwind CSS**
#   I m a g e T o T e x t  
 