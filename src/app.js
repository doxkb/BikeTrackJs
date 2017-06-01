
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

var platform = tabris.device.get("platform")
var watchPositionFunc;
var watchPositionOptions;

if (platform == "Android"){
  watchPositionOptions = { 
    maximumAge: 3000,
    timeout: 5000,
    enableHighAccuracy: true, 
    priority: LocationServices.priorities.PRIORITY_HIGH_ACCURACY, 
    interval: 1000, fastInterval: 100 };
  watchPositionFunc = cordova.plugins.locationServices.geolocation.watchPosition;
}
else{
  watchPositionFunc = navigator.geolocation.watchPosition;
  watchPositionOptions = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
}

var watchPositionId = watchPositionFunc(onGpsSuccess, onGpsError, watchPositionOptions);
