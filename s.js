// Define a JavaScript object containing aircraft names and their corresponding passenger capacities
var aircraftData = {
    "commercial": {
        "Boeing 737": 189,
        "Airbus A320": 180,
        "Cessna Citation X": 8,
        // Add more commercial aircraft as needed
    },
    "fighter": {
        "F-16 Fighting Falcon": 1,
        "Mig-29": 1,
        // Add more fighter aircraft as needed
    }
};

function getPassengerCapacity() {
    var aircraftType = document.getElementById("aircraftType").value;
    var aircraftName = document.getElementById("aircraftName").value;

    var passengerCapacity = aircraftData[aircraftType][aircraftName];

    if (passengerCapacity !== undefined) {
        document.getElementById("passengerCapacity").textContent = "Passenger Capacity of " + aircraftName + " (" + aircraftType + "): " + passengerCapacity;
    } else {
        document.getElementById("passengerCapacity").textContent = "Aircraft not found in the database.";
    }
}

$(document).ready(function() {
    // Initialize map
    var map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    // Handle form submission using event delegation
    $(document).on('submit', '#searchForm', function(e) {
        e.preventDefault();
        var lastLatitude = parseFloat($('#latitude').val());
        var lastLongitude = parseFloat($('#longitude').val());
        var timeElapsed = parseFloat($('#time').val());
        var windSpeed = parseFloat($('#windSpeed').val());
        var searchRadius = parseFloat($('#searchRadius').val());

        // Calculate search area
        var maxDriftDistance = windSpeed * timeElapsed;
        var searchAreaRadius = maxDriftDistance + searchRadius;

        // Clear previous markers
        map.eachLayer(function(layer) {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Add marker for last known position
        L.marker([lastLatitude, lastLongitude]).addTo(map)
            .bindPopup('Last Known Position')
            .openPopup();

        // Add circle representing search area
        L.circle([lastLatitude, lastLongitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: searchAreaRadius * 1000 // Convert km to meters
        }).addTo(map)
            .bindPopup('Search Area');

        // Center map on last known position
        map.setView([lastLatitude, lastLongitude], 10);
    });
});
