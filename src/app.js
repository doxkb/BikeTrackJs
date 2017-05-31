
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

  var textView = new tabris.TextView({
    top: ['prev()', 20], left: 20, right: 20
  }).appendTo(contentContainer);

var options = {frequency: 100};  // Update every 100ms
var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
var onSuccess = function(acceleration) {
  textView.text = 'Acceleration X: ' + acceleration.x + '\n' +
                  'Acceleration Y: ' + acceleration.y + '\n' +
                  'Acceleration Z: ' + acceleration.z + '\n' +
                  'Timestamp: '      + acceleration.timestamp + '\n';
};

var onError = function() {
  console.log('onError!');
};
