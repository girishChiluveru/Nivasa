// Using Leaflet.js with OpenStreetMap - Completely FREE!
// No API key needed, no registration, no bank details!

// Check if listing has geometry data
if (listing.geometry && listing.geometry.coordinates) {
    const coordinates = listing.geometry.coordinates;
    const [lng, lat] = coordinates;
    
    // Initialize the map
    const map = L.map('map').setView([lat, lng], 13);
    
    // Add OpenStreetMap tiles (FREE)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Custom marker icon (red color)
    const redIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    
    // Add marker with popup
    const marker = L.marker([lat, lng], { icon: redIcon }).addTo(map);
    
    // Create popup content
    const popupContent = `<h6><strong>${listing.title}</strong></h6><p>${listing.location}</p>`;
    marker.bindPopup(popupContent);
    
    // Show popup on hover
    marker.on('mouseover', function() {
        this.openPopup();
    });
    
    marker.on('mouseout', function() {
        this.closePopup();
    });
} else {
    // If no coordinates, show message
    document.getElementById('map').innerHTML = '<p class="text-center p-5">Location map not available</p>';
}
