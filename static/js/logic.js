var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
  });
  
  function createFeatures(earthquakeData) {
  
    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and time of the earthquake.
    function onEachFeature(feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }
  
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    });

   console.log(earthquakeData)

  
    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);
  }

 
  
  function createMap(earthquakes) {
  

    // THESE LINKS ARENT WORKING

    // Create the base layers.
    var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Map data &copy; <a href="https://www.esri.com/en-us/home">Esri</a>, <a href="https://www.microsoft.com/en-us/maps">Microsoft</a>, <a href="https://www.maxar.com/">Maxar</a>, <a href="https://www.mapbox.com/">Mapbox</a>, <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, and the GIS user community'
});

    // Create a baseMaps object.
    var baseMaps = {
        "Topographic Map": topo,
      "Satellite Map": satellite
    };
  
    // Create an overlay object to hold our overlay.
    var overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
      center: [
        37.09, -75.71
      ],
      zoom: 3,
      layers: [satellite, earthquakes]
    });

  


// Loop through the cities array, and create one marker for each city object.
for (var i = 0; i < earthquakeData.length; i++) {
    var location = [earthquakeData[i].coordinates[1], earthquakeData[i].coordinates[0]]
    var depth = earthquakeData[i].coordinates[2]
    // Conditionals for country mag
    var color = "";
    if (earthquakeData[i].mag > 8) {
      color = "red";
    }
    else if (earthquakeData[i].mag > 5) {
      color = "yellow";
    }
    else if (earthquakeData[i].mag > 3) {
      color = "blue";
    }
    else {
      color = "green";
    }
  
    // Add circles to the map.
    L.circle(earthquakeData[i].location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: color,
      // Adjust the radius.
      radius: (earthquakeData[i].mag) * 500
    }).bindPopup(`<h1>${earthquakeData[i].place}</h1> <hr> <h3>Earthquake Magnitude: ${earthquakeData[i].mag}</h3>`).addTo(myMap);
  }

  // Create a legend to display information about our map.
    var info = L.control({
        position: "bottomright"
        }).addTo(myMap);
  
  
  
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
  }
  