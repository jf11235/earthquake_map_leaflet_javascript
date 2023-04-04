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
          // I had written this in a previous code. I was stuck and Chris helped me clean up my code in office hours. 
          // He had deleted the conditional portion of my code, and gave me this
          // so I didnt have to re-write it all. 
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



      
      geojson = L.geoJson(data, {
    
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng)
        },
    

        

        

        style: styleInfo, //calls thefunction named 'styleInfo'
    
      
      }).addTo(myMap);
    
      
    
    });
    
  