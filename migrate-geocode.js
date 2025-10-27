// Migration script to add geometry coordinates to existing listings
// Using FREE OpenStreetMap geocoding - NO API KEY NEEDED!
require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('./models/listings');
const geocoder = require('./geocoderConfig');

const MONGO_URL = process.env.MONGO_URL || process.env.ATLASDB_URL || "mongodb://localhost:27017/wander-lust";

async function migrateListings() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connected to MongoDB');
        
        const listings = await Listing.find({});
        console.log(`Found ${listings.length} listings to process`);
        
        let updated = 0;
        let skipped = 0;
        let errors = 0;
        
        for (let listing of listings) {
            // Skip if geometry already exists
            if (listing.geometry && listing.geometry.coordinates && listing.geometry.coordinates.length === 2) {
                console.log(`✓ Skipped (already has coordinates): ${listing.title}`);
                skipped++;
                continue;
            }
            
            try {
                const geoData = await geocoder.geocode(`${listing.location}, ${listing.country}`);
                
                if (geoData && geoData.length > 0) {
                    listing.geometry = {
                        type: 'Point',
                        coordinates: [geoData[0].longitude, geoData[0].latitude]
                    };
                    await listing.save();
                    console.log(`✓ Updated: ${listing.title} -> [${listing.geometry.coordinates}]`);
                    updated++;
                } else {
                    console.error(`✗ No coordinates found for: ${listing.title} (${listing.location}, ${listing.country})`);
                    errors++;
                }
                
                // Add small delay to respect API rate limits (OpenStreetMap fair use policy)
                await new Promise(resolve => setTimeout(resolve, 1000));
                
            } catch (err) {
                console.error(`✗ Error geocoding ${listing.title}:`, err.message);
                errors++;
            }
        }
        
        console.log('\n=== Migration Complete ===');
        console.log(`Total listings: ${listings.length}`);
        console.log(`Updated: ${updated}`);
        console.log(`Skipped: ${skipped}`);
        console.log(`Errors: ${errors}`);
        
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
}

migrateListings();
