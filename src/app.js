
var navigationView = new tabris.NavigationView({
  left: 0, top: 0, right: 0, bottom: 0
}).appendTo(tabris.ui.contentView);

var mainPage = new tabris.Page({
  title: 'Bike Track'
}).appendTo(navigationView);

var contentContainer = new tabris.ScrollView({
  left: 0, top: 0, right: 0, bottom: 0
}).appendTo(mainPage);

var acceleratorText = new tabris.TextView({
    top: ['prev()', 20], left: 20, right: 20
  }).appendTo(contentContainer);

var map = new esmaps.Map({
  left: 0, right: 0, top: ['prev()', 20], bottom: 0
}).on("ready", function() {

}).appendTo(page); 

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
  var pos = [position.coords.latitude, position.coords.longitude];

  var marker =  new esmaps.Marker({position: pos})
  map.addMarker(marker)

  map.moveToPosition(pos, 2000);
  gpsText.text = 'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + (position.coords.speed * 3.6)             + '\n';
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
    priority: cordova.plugins.locationServices.priorities.PRIORITY_HIGH_ACCURACY, 
    interval: 1000, fastInterval: 100 };
  watchPositionFunc = cordova.plugins.locationServices.geolocation.watchPosition;
}
else{
  watchPositionFunc = navigator.geolocation.watchPosition;
  watchPositionOptions = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
}

var watchPositionId = watchPositionFunc(onGpsSuccess, onGpsError, watchPositionOptions);
