var map = L.map('my-map').setView([37.8, -96], 3);
	  layers: [group1, group2],

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	minZoom: 3,
	maxZoom: 10,
	ext: 'png'
}).addTo(map);

var participation=	$.getScript("participation.js", function() {
		});
var unemployment=	$.getScript("participation.js", function() {
		});
var group1 = L.layerGroup(participation);
var group2 = L.layerGroup(unemployment);

// add layer control
L.control.layers({}, {
	participation: group1,
	unemployment: group2,
}).addTo(map);

// add event listeners for overlayadd and overlayremove
map.on('overlayadd', handleLayerToggle);
map.on('overlayremove', handleLayerToggle);

function handleLayerToggle(eventLayer) {
// get the name of the layergroup, and whether it is being added or removed
var type = eventLayer.type;
var name = eventLayer.name;

//this allows for a way to disabale and enable the scroll when going over the map
scrollWheelZoom: false
map.once('focus', function() { map.scrollWheelZoom.enable(); });
map.on('click', function() {
  if (map.scrollWheelZoom.enabled()) {
    map.scrollWheelZoom.disable();
    }
    else {
    map.scrollWheelZoom.enable();
    }
  });
