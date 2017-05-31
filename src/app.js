
var navigationView = new tabris.NavigationView({
  left: 0, top: 0, right: 0, bottom: 0
}).appendTo(tabris.ui.contentView);

var mainPage = new tabris.Page({
  title: 'Cordova Examples'
}).appendTo(navigationView);

var contentContainer = new tabris.ScrollView({
  left: 0, top: 0, right: 0, bottom: 0
}).appendTo(mainPage);

[
  './modules/SharingPage', 
  './modules/MotionPage',
  './modules/NetworkPage',
  './modules/CameraPage',
].forEach(function(page) {
  addPageSelector(require(page).create().page);
});

function addPageSelector(page) {
  new tabris.Button({
    left: 16, top: ['prev()', 16], right: 16,
    text: page.title
  }).on('select', function() {
    page.appendTo(navigationView);
  }).appendTo(contentContainer);
}

var acceleratorText = new tabris.TextView({
    top: ['prev()', 20], left: 20, right: 20
  }).appendTo(contentContainer);

var gpsText = new tabris.TextView({
  top: ['prev()',20], left:20, right:20
}).appendTo(contentContainer)

gpsText.text = "GPS";
var options = {frequency: 100};  // Update every 100ms
var onAccelSuccess = function(acceleration) {
  acceleratorText.text = 'Acceleration X: ' + acceleration.x + '\n' +
                  'Acceleration Y: ' + acceleration.y + '\n' +
                  'Acceleration Z: ' + acceleration.z + '\n' +
                  'Timestamp: '      + acceleration.timestamp + '\n';
};

var onError = function() {
  acceleratorText.text = "Error";
};

var onGpsError = function(error){
  gpsText.text = "Error: " + error.message;
}

var onGpsSuccess = function(position) {
  gpsText.text = 'Latitude: '       + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n';
    };
var watchID = navigator.accelerometer.watchAcceleration(onAccelSuccess, onError, options);

var gpsWatchId = navigator.geolocation.watchPosition(onGpsSuccess, onError, { enableHighAccuracy: false, timeout: 5000, maximumAge: 3000 });
