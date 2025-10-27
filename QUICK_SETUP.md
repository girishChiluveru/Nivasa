# Quick Setup for Map Feature

## Step 1: Get Your FREE Mapbox Token

1. Visit: https://www.mapbox.com/
2. Click "Sign up" (top right corner)
3. Fill in your details (no credit card needed!)
4. After login, you'll see your **Access Token** on the dashboard
5. Copy the token (starts with "pk....")

## Step 2: Configure Your Application

1. Create a `.env` file in your project root (copy from `.env.example`):

   ```bash
   cp .env.example .env
   ```

   Or manually create `.env` with this content:

   ```
   MAP_TOKEN=your_actual_mapbox_token_here
   ```

2. Replace `your_actual_mapbox_token_here` with the token you copied from Mapbox

## Step 3: Update Existing Listings (If Any)

If you have existing listings in your database that need coordinates:

```bash
node migrate-geocode.js
```

This will automatically geocode all your existing listings.

## Step 4: Start Your Application

```bash
npm start
```

## Step 5: Test It!

1. Go to http://localhost:8080 (or your configured port)
2. Create a new listing with location and country
3. Click on the listing to view details
4. You should see an interactive map!
5. Hover over the red marker to see the listing name popup

## That's It! 🎉

Your map feature is now ready to use!

## Need Help?

- Read the full guide: `MAP_FEATURE_GUIDE.md`
- Mapbox Documentation: https://docs.mapbox.com/
- Check console for errors (F12 in browser)

## Map Preview Features:

✅ Interactive zoom and pan
✅ Red marker at listing location  
✅ Popup shows listing title on hover
✅ Professional street map style
✅ Mobile-responsive
