
document.addEventListener('DOMContentLoaded', function () {
    const sosButton = document.getElementById('sos-button');
    sosButton.addEventListener('click', sendSOS);
});

function sendSOS() {
    alert('SOS signal sent! Help is on the way. \nEmergency HelpLine Number : +91-1770045678');
}
