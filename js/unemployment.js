//this is basically an if/else statement, so if it's greater than 5 it would be the top hex, but if less it will go down to 4
function getunemploymentcolor(d) {
  return d > 5 ? '#006d2c' :
    d > 4 ? '#2ca25f' :
    d > 3 ? '#66c2a4' :
    d > 2 ? '#99d8c9' :
    d > 1 ? '#ccece6' :
    d > 0 ? '#edf8fb' :
    '#ffffff';
}

//this colors the states according to their data and also includes other styling, like outlines
function style(feature) {
  return {
    fillColor: getunemploymentcolor(feature.properties.unemployment),
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
  unemploymentinfo.update(layer.feature.properties);
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

function resetHighlight(e) {
  unemploymentlayer.resetStyle(e.target);
  unemploymentinfo.update();
}


//state data layer
var unemploymentlayer;
unemploymentlayer = L.geoJson(unemploymentdata, {
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
var unemploymentinfo = L.control();

unemploymentinfo.onAdd = function(map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
};
unemploymentinfo.update = function(props) {
  this._div.innerHTML = '<h4>Unemployment Rate</h4>' + (props ?
    '<b>' + props.name + '</b><br />' + props.unemployment + '%' :
    'Hover over a state');
};
// unemploymentinfo.addTo(map);

//adds leged to the bottom right
var unemploymentlegend = L.control({
  position: 'bottomright'
});

unemploymentlegend.onAdd = function(map) {
  var div = L.DomUtil.create('div', 'info legend'),
    grades = [1, 2, 3, 4, 5],
    labels = [];

  // a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getunemploymentcolor(grades[i] + 1) + '"></i> ' +
      grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }
  return div;
};
// unemploymentlegend.addTo(map);
