
var map = L.map('my-map').setView([37.8, -96], 3);

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

L.geoJson(unemploymentdata).addTo(map);

//this is basically an if/else statement, so if it's greater than 5 it would be the top hex, but if less it will go down to 4
function getColor(d) {
    return d > 5  ? '#006d2c' :
           d > 4  ? '#2ca25f' :
           d > 3  ? '#66c2a4' :
           d > 2   ? '#99d8c9' :
           d > 1   ? '#ccece6' :
           d > 0   ? '#edf8fb' :
                      '#ffffff';
}

//this colors the states according to their data and also includes other styling, like outlines
function style(feature) {
    return {
        fillColor: getColor(feature.properties.unemployment),
        weight: .5,
        opacity: 1,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.7
    };
}

//this is the data, including state outline
L.geoJson(unemploymentdata, {style: style}).addTo(map);

//this function sets up what happens when hovering over a state
function highlightFeature(e) {
    var layer = e.target;

//the function above uses this below to outline the state in a thick white outline
    layer.setStyle({
        weight: 3,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.7
    });

//the function above uses this to populate the top right with data
		info.update(layer.feature.properties);
		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
		}}

//this function resets the white outline and data in the top right if you stop hovering over it
function resetHighlight(e) {
    geojson.resetStyle(e.target);
		info.update();
}

//state data layer
var geojson;
geojson = L.geoJson(unemploymentdata, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

// L.control.layers(unemploymentdata).addTo(map);

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
			}

//adds info to the top right corner
var info = L.control();

		info.onAdd = function (map) {
		    this._div = L.DomUtil.create('div', 'info');
		    this.update();
		    return this._div;
		};
		info.update = function (props) {
		    this._div.innerHTML = '<h4>Unemployment Rate</h4>' +  (props ?
		        '<b>' + props.name + '</b><br />' + props.unemployment + '%'
		        : 'Hover over a state');
		};
		info.addTo(map);

//reset button
		$('.reset').click(function() {
  map.flyTo([37.8, -96], 3)
});

//adds leged to the bottom right
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1, 2, 3, 4, 5],
        labels = [];

// a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

legend.addTo(map);
