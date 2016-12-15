
var map;

var marker;

var markers = [ ];

function initMap() {
    map= new google.maps.Map(document.getElementById('map'), {
        center: {lat: 19.0760, lng: 72.8777},
        zoom: 11,
        /*styles: styles,*/
        mapTypeControl: false
    });

var locations = [
    {title: 'Marine Drive', location: {lat: 18.938358, lng: 72.824038}},
    {title: 'Essel World', location: {lat: 19.230973, lng: 72.806482}},
    {title: 'Mount Mary Church', location: {lat: 19.046538, lng: 72.822417}},
    {title: 'Film City', location: {lat: 19.162949, lng: 72.883660}},
    {title: 'Worli Sea Face', location: {lat: 19.009320, lng: 72.815079}},
    {title: 'Jehangir Art Gallery', location: {lat: 18.927476, lng: 72.831682}}
 ];

var largeInfowindow = new google.maps.InfoWindow();

var defaultIcon = makeMarkerIcon('FE7569');

var highlightedIcon = makeMarkerIcon('00FF00');

var bounds = new google.maps.LatLngBounds();

for (var i = 0; i < locations.length; i++) {
   // Get the position from the location array.
   var position = locations[i].location;
   var title = locations[i].title;
   // Create a marker per location, and put into markers array.
   var marker = new google.maps.Marker({
     map: map,
     position: position,
     title: title,
     animation: google.maps.Animation.DROP,
     icon: defaultIcon,
     id: i
   });

    markers.push(marker);

//  }
    marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
    });

    marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
    });

    marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
    });
    bounds.extend(markers[i].position);
    locations[i].marker = marker;

  }
// To render higher level zoom
  map.fitBounds(bounds);

function populateInfoWindow(marker, largeInfowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (largeInfowindow.marker != marker) {
       largeInfowindow.marker = marker;
       largeInfowindow.setContent('<div>' + marker.title + ' ' + marker.position + '</div>');
       largeInfowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
       largeInfowindow.addListener('closeclick',function(){
       largeInfowindow.setMarker = null;
       });
     }
    }

function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor + '|40|_|%E2%80%A2',
        new google.maps.Size(25, 40),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 40),
        new google.maps.Size(25,40));
        return markerImage;
        }
}