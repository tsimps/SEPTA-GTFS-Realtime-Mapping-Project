// Set up basemap
var Thunderforest_Transport = L.tileLayer(
  "https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=39079820db6845f79a313d7d4724e1a9",
  {
    attribution:
      '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    apikey: "39079820db6845f79a313d7d4724e1a9",
    maxZoom: 22
  }
);

// add map first
var map = L.map("map", {
  center: [39.956853218846675, -75.09658858180046],
  zoom: 12,
  layers: [Thunderforest_Transport]
});
map.zoomControl.setPosition("bottomleft");

var busIcon = L.icon({
  iconUrl: 'js/images/icon-01.png',
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  shadowUrl: 'js/images/icon-02.png',
  shadowSize: [52, 52],
  shadowAnchor: [23, 24]

});

var makeMarks = (point) => {return L.marker([point.lat, point.lng], {icon: busIcon}); };

function fit(marks) {
  //map.fitBounds(marks.getBounds());
}

var shortLink = 'https://www3.septa.org/hackathon/TransitView/?route=';
//var routeID = 42;
var test;

var markers;

function main(route) {
  //console.log();

  var milliseconds = new Date().getTime();
  console.log(new Date());

  var septaLink = shortLink+route+'&dm='+milliseconds+'&callback=?';
  //console.log(septaLink);

  var downloadData = (link) => {return $.getJSON(link);};

  downloadData(septaLink).done(function(response) {
    console.log('download complete');

    //console.log(response);
    test = response;

    markers = L.layerGroup(
      _.map(response.bus,
        function(bus){
          return makeMarks(bus).bindPopup(
            "<h3> Bus ID: " +
            bus.VehicleID + "</h3>" +
            "<h3> Route: " +
            route + "</h3>" +
            "<h4> Direction: " +
            bus.Direction +
            "<br><b> To: </b>" +
            bus.destination + "</h4>" +
            "<b> Last Updated by SEPTA: </b>" +
            bus.Offset_sec + "</h4>"
          );
        }
      )
    ).addTo(map);
  }); // close downloadData
  fit(markers);
} // close main
