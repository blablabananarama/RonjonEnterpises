var map;
var lat;
var lng;
var pos;
var type;
var btn;
var markers = [];

//gets position of user
navigator.geolocation.getCurrentPosition(savPos);


//saves position in object
function savPos(position){
  pos={
  lat: position.coords.latitude,
  lng: position.coords.longitude
};

//scrolls map to user position and places marker
  map.setCenter(pos);
  map.setZoom(15);
  var marker = new google.maps.Marker({
    position: pos,
    map: map
  });

};

function search(){
  var request = {
    location: pos,
    radius: 2000,
    type: type
  };
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
  clearMarkers();
  markers = [];
  callback();

};

//iterates trough search results and calls with every single one a function
function callback(results, status) {
    for(i = 0; i <= results.length; i++ )
    {
      createMarker(results[i]);

      };
    }

//creates marker on map for every place
    function createMarker(place) {
       var marker = new google.maps.Marker({
         map: map,
         position: place.geometry.location
       });
       markers.push(marker);
     };

     function setMapOnAll(map) {
           for (var i = 0; i < markers.length; i++) {
             markers[i].setMap(map);
           }
         }

    function clearMarkers() {
         setMapOnAll(null);
}


//creates map
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6

  });

};



//buttons are clickable and save id in type
btn = document.getElementsByClassName("field");
for(var i = 0; i<= btn.length; i++){
btn[i].addEventListener('click',
function(){
  type = this.getAttribute('id');
  search();
});
};
