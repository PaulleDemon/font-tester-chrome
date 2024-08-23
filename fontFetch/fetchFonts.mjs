import dotenv from 'dotenv'
import fetch from 'node-fetch'
import fs from 'fs'

dotenv.config()

// Load API key from .env file
const API_KEY = process.env.GOOGLE_FONTS_API_KEY
const API_URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`
const OUTPUT_FILE = 'google-fonts.json'

async function fetchGoogleFonts() {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()

    if (data.items) {
      fs.writeFileSync("google-fonts-raw.json", JSON.stringify(data.items, null, 2))

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

fetchGoogleFonts()
