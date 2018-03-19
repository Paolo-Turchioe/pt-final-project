var map = L.map('my-map')
		.setView([37.8, -96], 3);

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	minZoom: 3,
	maxZoom: 10,
	ext: 'png'
}).addTo(map);

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

	//reset button
		$('.reset').click(function() {
	  map.flyTo([37.8, -96], 3)
	});
