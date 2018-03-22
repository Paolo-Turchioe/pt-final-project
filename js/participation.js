//this is basically an if/else statement, so if it's greater than 5 it would be the top hex, but if less it will go down to 4
function getparticipationcolor(d) {
    return d > 69  ? '#01665e' :
           d > 66 ? '#5ab4ac' :
           d > 63 ? '#c7eae5' :
           d > 60   ? '#f6e8c3' :
           d > 40   ? '#d8b365' :
                      '#ffffff';
}

//this colors the states according to their data and also includes other styling, like outlines
function style(feature) {
    return {
        fillColor: getparticipationcolor(feature.properties.participation),
        weight: .5,
        opacity: 1,
        color: 'white',
        dashArray: '1',
        fillOpacity: 0.7
    };
}

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
		participationinfo.update(layer.feature.properties);
		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
		}}

function resetHighlight(e) {
    participationlayer.resetStyle(e.target);
		participationinfo.update();
}

//state data layer
var participationlayer;
participationlayer = L.geoJson(participationdata, {
    style: style,
    onEachFeature: onEachFeature
});

//this function resets the white outline and data in the top right if you stop hovering over it
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    });
			}

//adds info to the top right corner
var participationinfo = L.control();

		participationinfo.onAdd = function (map) {
		    this._div = L.DomUtil.create('div', 'info');
		    this.update();
		    return this._div;
		};
		participationinfo.update = function (props) {
		    this._div.innerHTML = '<h4>participation Rate</h4>' +  (props ?
		        '<b>' + props.name + '</b><br />' + props.participation + '%'
		        : 'Hover over a state');
		};
		// participationinfo.addTo(map);



//adds leged to the bottom right
var participationlegend = L.control({position: 'bottomright'});

participationlegend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [40, 60, 63, 66, 69],
        labels = [];

// a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getparticipationcolor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};

// participationlegend.addTo(map);
