const NodeGeocoder = require('node-geocoder');

// Using OpenStreetMap - Completely FREE, no API key needed!
const options = {
    provider: 'openstreetmap',
    httpAdapter: 'https',
    formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
