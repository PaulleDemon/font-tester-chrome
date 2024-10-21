import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import { createCanvas, registerFont } from 'canvas'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Load API key from .env file
const API_KEY = process.env.GOOGLE_FONTS_API_KEY
const API_URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`
const OUTPUT_FILE = path.join(__dirname, 'google-fonts.json')

const RAW_FILE = path.join(__dirname, 'google-fonts-raw.json')

const IMAGE_OUTPUT_DIR = 'font-images/'
const FONTS_FILES_DIR = path.join(__dirname, 'font-files')

// Create the image output directory if it doesn't exist
if (!fs.existsSync(IMAGE_OUTPUT_DIR)) {
  fs.mkdirSync(IMAGE_OUTPUT_DIR)
}
if (!fs.existsSync(FONTS_FILES_DIR)) {
  fs.mkdirSync(FONTS_FILES_DIR)
}


async function fetchGoogleFonts() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()

    if (data.items) {
      fs.writeFileSync(RAW_FILE, JSON.stringify(data.items, null, 2))

      const fonts = data.items.reduce((result, font) => {
        result.push({
          family: font.family,
          category: font.category
        })
        return result
      }, [])

      // Save fonts to a JSON file
      fs.writeFileSync(OUTPUT_FILE, JSON.stringify(fonts, null))
      console.log(`Fonts saved to ${OUTPUT_FILE}`)
    } else {
      console.error('No fonts found.')
    }
  } catch (error) {
    console.error('Error fetching Google Fonts:', error)
  }
}

// below is for woff2 format for tiff format use the other function
async function generateFontImages(fonts) {
  for (const font of fonts) {
    const fontFamily = font.family.replace(/ /g, '+'); // Replace spaces with '+' for URL

    // Try to get the regular font URL
    const fontUrl = font.files?.regular;
    if (!fontUrl) {
      console.error(`No regular font available for ${font.family}`);
      continue;
    }

    // Fetch the font file from the URL
    try {
      const response = await fetch(fontUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch font: ${font.family} from ${fontUrl}`);
      }

      // Create a buffer for the font file
      const fontBuffer = await response.buffer();

      // Save the font file locally (optional, for registering later)
      const fontFileName = `${font.family.replace(/ /g, '_')}.woff2`; // Safe filename
      const fontFilePath = path.join(FONTS_FILES_DIR, fontFileName);
      fs.writeFileSync(fontFilePath, fontBuffer);

      // Register the font in canvas
      registerFont(fontFilePath, { family: font.family });

      // Measure the width of the text on the canvas
      const tempCanvas = createCanvas(0, 0);
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.font = '24px ' + font.family;
      const textMetrics = tempCtx.measureText(font.family);
      const textWidth = Math.ceil(textMetrics.width); // Get the exact text width

      // Create a new canvas with the exact width
      const canvas = createCanvas(textWidth + 20, 24); // Add some padding (e.g., 20px)
      const ctx = canvas.getContext('2d');
      ctx.font = '24px ' + font.family;
      ctx.fillStyle = 'black';
      ctx.textBaseline = 'middle';
      ctx.fillText(font.family, 10, 12); // Draw the text with a 10px left padding

      // Save the image
      const buffer = canvas.toBuffer('image/png');
      const imageFileName = `${font.family.replace(/ /g, '_')}.png`; // Safe filename
      fs.writeFileSync(path.join(IMAGE_OUTPUT_DIR, imageFileName), buffer);
      console.log(`Generated image for font: ${font.family}`);
    } catch (error) {
      console.error(`Error processing font ${font.family}:`, error);
    }
  }
}

// uncomment below line to first fetch the fonts

// fetchGoogleFonts()

// use google fonts raw
const fonts = JSON.parse(fs.readFileSync(RAW_FILE))
generateFontImages(fonts)