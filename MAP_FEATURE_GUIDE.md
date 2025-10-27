# Map Feature Implementation Guide

## Overview

This implementation adds interactive map rendering to your WanderLust application using Mapbox GL JS (free tier). Maps display on the listing detail page with markers and hover-enabled popups showing the listing title.

## Features Implemented

✅ Geocoding: Converts location + country to coordinates automatically
✅ Interactive Map: Displays on listing detail page with zoom/pan controls
✅ Custom Marker: Red marker at the listing location
✅ Hover Popup: Shows listing title and location when hovering over marker
✅ Auto-update: Maps update when listings are created or edited

## Changes Made

### 1. Package Installation

- Installed `@mapbox/mapbox-sdk` for geocoding services

### 2. Database Schema (models/listings.js)

- Added `geometry` field to store GeoJSON Point coordinates:
  ```javascript
  geometry: {
      type: {
          type: String,
          enum: ['Point'],
          required: true
      },
      coordinates: {
          type: [Number],  // [longitude, latitude]
          required: true
      }
  }
  ```

### 3. Configuration (mapboxConfig.js - NEW FILE)

- Created Mapbox geocoding client configuration
- Uses MAP_TOKEN from environment variables

### 4. Controllers (controllers/listings.js)

- Modified `createListing`: Geocodes location before saving
- Modified `updateListing`: Re-geocodes when location changes
- Both functions now fetch coordinates from Mapbox Geocoding API

### 5. Views (views/listings/show.ejs)

- Added Mapbox GL CSS and JS libraries
- Added map container with 400px height
- Passed listing data and map token to client-side JavaScript

### 6. Client-Side JavaScript (public/js/map.js - NEW FILE)

- Initializes Mapbox map centered on listing coordinates
- Creates red marker at listing location
- Adds popup with listing title and location
- Enables popup on marker hover (mouseenter/mouseleave)

## Setup Instructions

### Step 1: Get Mapbox API Token (FREE)

1. Go to https://www.mapbox.com/
2. Click "Sign up" (top right)
3. Create a free account (no credit card required)
4. After signup, you'll be redirected to your dashboard
5. Your **default public token** is displayed on the dashboard
6. Copy this token

### Step 2: Add Token to Environment Variables

1. Open your `.env` file (or create one if it doesn't exist)
2. Add this line:
   ```
   MAP_TOKEN=your_mapbox_token_here
   ```
3. Replace `your_mapbox_token_here` with your actual Mapbox token
4. Save the file

### Step 3: Update Existing Listings (IMPORTANT)

Since existing listings don't have geometry data, you need to:

**Option A: Re-save each listing through the edit form**

- Edit each listing and click "Submit" (location will be geocoded)

**Option B: Run a migration script** (see below)

### Step 4: Test the Feature

1. Start your application: `npm start`
2. Create a new listing with location and country
3. View the listing detail page
4. You should see an interactive map with a marker
5. Hover over the marker to see the listing name popup

## Migration Script for Existing Listings

If you have existing listings, create and run this script to geocode them:

```javascript
// migrate-geocode.js
require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listings");
const geocodingClient = require("./mapboxConfig");

const MONGO_URL = process.env.MONGO_URL || "your_mongodb_url";

async function migrateListings() {
  await mongoose.connect(MONGO_URL);

  const listings = await Listing.find({});

  for (let listing of listings) {
    if (!listing.geometry || !listing.geometry.coordinates) {
      try {
        const response = await geocodingClient
          .forwardGeocode({
            query: `${listing.location}, ${listing.country}`,
            limit: 1,
          })
          .send();

        listing.geometry = response.body.features[0].geometry;
        await listing.save();
        console.log(`Updated: ${listing.title}`);
      } catch (err) {
        console.error(`Error geocoding ${listing.title}:`, err.message);
      }
    }
  }

  console.log("Migration complete!");
  mongoose.connection.close();
}

migrateListings();
```

Run it with: `node migrate-geocode.js`

## Mapbox Free Tier Limits

- **50,000 free map loads/month**
- **100,000 free geocoding requests/month**
- More than enough for development and small-scale production!

## Customization Options

### Change Map Style

In `public/js/map.js`, replace the style:

```javascript
style: "mapbox://styles/mapbox/streets-v12";
```

Available styles:

- `streets-v12` - Default street map
- `light-v11` - Light theme
- `dark-v11` - Dark theme
- `satellite-v9` - Satellite imagery
- `outdoors-v12` - Outdoor/terrain

### Change Marker Color

In `public/js/map.js`:

```javascript
const marker = new mapboxgl.Marker({ color: "#fe424d" }); // Change this hex color
```

### Adjust Zoom Level

In `public/js/map.js`:

```javascript
zoom: 12; // Lower = more zoomed out, Higher = more zoomed in
```

## Troubleshooting

### Map not showing?

1. Check console for errors (F12 in browser)
2. Verify MAP_TOKEN is set in .env
3. Ensure listing has geometry.coordinates

### Marker not appearing?

1. Check if listing.geometry exists in database
2. Verify coordinates are valid [longitude, latitude]

### Geocoding failing?

1. Check location and country are valid
2. Verify Mapbox token has geocoding permissions
3. Check network connection

## File Structure

```
Major_Project/
├── mapboxConfig.js         (NEW - Mapbox client config)
├── models/
│   └── listings.js         (MODIFIED - Added geometry field)
├── controllers/
│   └── listings.js         (MODIFIED - Added geocoding)
├── views/
│   └── listings/
│       └── show.ejs        (MODIFIED - Added map display)
└── public/
    └── js/
        └── map.js          (NEW - Map initialization)
```

## Next Steps (Optional Enhancements)

- Add map to index page showing all listings
- Add fullscreen map view
- Add custom marker icons
- Add location search on create/edit forms
- Show nearby attractions

## Support

Mapbox Documentation: https://docs.mapbox.com/
Mapbox GL JS Examples: https://docs.mapbox.com/mapbox-gl-js/example/
