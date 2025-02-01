# README

## Features

### 1. Convert PDF to Searchable PDF
This script uses **PaddleOCR** to convert scanned PDFs into searchable PDFs. Key features include:
- **Optical Character Recognition (OCR):** Extracts text from scanned documents.
- **Multi-language Support:** Configurable for different languages.
- **Font Compatibility:** Works with system fonts for accurate text rendering.

### 2. Gemini AI Integration
Utilizes **Google's Gemini AI** to generate text and image-based content. Key features include:
- **Text Generation:** Creates human-like responses based on prompts.
- **Vision Model:** Analyzes images alongside text for rich content generation.

## Requirements

### 1. Python Packages
Ensure the following Python packages are installed:
- `paddleocr`
- `pdf2image`
- `PyPDF2`
- `Pillow`
- `numpy`
- `google-generativeai`

### 2. System Dependencies
- **Tesseract OCR** (for OCR functionality)
- **Poppler** (for PDF to image conversion)

## Installation

```bash
pip install paddleocr pdf2image PyPDF2 Pillow numpy google-generativeai
```

### Additional System Setup
- **Linux:**
  ```bash
  sudo apt-get install tesseract-ocr poppler-utils
  ```
- **Windows:**
  - Download and install Tesseract OCR and Poppler from their official sources.
  - Add them to your system PATH.


This README provides an overview of the project's features, requirements, and usage instructions. Adjust as needed for additional details.
