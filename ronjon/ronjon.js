var map;
var lat;
var lng;
var pos;


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

//request object for nearbySearch, toDo: userinput = content
  var request = {
    location: pos,
    radius: 500,
    types:'restaurant'
  };

  //creates places object search, then searches
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);

};


//iterates trough search results and class create marker function
function callback(results, status) {
    for(i = 0; i <= results.length; i++ )
    {
      createMarker(results[i]);

      };
    }

//saves position of places in object and creates marker
    function createMarker(place) {
       var placeLoc = place.geometry.location;
       var marker = new google.maps.Marker({
         map: map,
         position: place.geometry.location
       });
     };



//creates map
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6

  });

};
