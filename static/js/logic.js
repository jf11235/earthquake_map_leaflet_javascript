var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

    // Create our map, giving it the streetmap and earthquakes layers to display on load.
    var myMap = L.map("map", {
      center: [
        37.09, -75.71
      ],
      zoom: 3
    });
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);



    var geojson;

    // Get the data with d3.
    d3.json(queryUrl).then(function(data) {
    

        function styleInfo(feature) {
            return {
              opacity: 1,
              fillOpacity: 1,
              fillColor: getColor(feature.geometry.coordinates[2]),
              color: "#000000",
              radius: getRadius(feature.properties.mag),
              stroke: true,
              weight: 0.5
            };
          }
        
          // This function determines the color of the marker based on the magnitude of the earthquake.
          function getColor(depth) {
            switch (true) {
              case depth > 90:
                return "#ea2c2c";
              case depth > 70:
                return "#ea822c";
              case depth > 50:
                return "#ee9c00";
              case depth > 30:
                return "#eecc00";
              case depth > 10:
                return "#d4ee00";
              default:
                return "#98ee00";
            }
          }
        
          // This function determines the radius of the earthquake marker based on its magnitude.
          // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
          function getRadius(magnitude) {
            if (magnitude === 0) {
              return 1;
            }
        
            return magnitude * 4;
          }



      // Create a new choropleth layer.
      geojson = L.geoJson(data, {
    
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng)
        },
    

        

        

        style: styleInfo, //calls thefunction named 'styleInfo'
    
        // Binding a popup to each layer
        /*
        onEachFeature: function(feature, layer) {
          layer.bindPopup("<strong>" + feature.properties.NAME + "</strong><br /><br />Estimated employed population with children age 6-17: " +
            feature.properties.DP03_16E + "<br /><br />Estimated Total Income and Benefits for Families: $" + feature.properties.DP03_75E);
        }
        */
      }).addTo(myMap);
    
      /*
      // Set up the legend.
      var legend = L.control({ position: "bottomright" });
      legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var limits = geojson.options.limits;
        var colors = geojson.options.colors;
        var labels = [];
    
        // Add the minimum and maximum.
        var legendInfo = "<h1>Population with Children<br />(ages 6-17)</h1>" +
          "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
          "</div>";
    
        div.innerHTML = legendInfo;
    
        limits.forEach(function(limit, index) {
          labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });
    
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
      };
    
      // Adding the legend to the map
      legend.addTo(myMap);
    */
    
    });
    
  