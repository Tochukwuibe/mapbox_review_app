window.addEventListener("DOMContentLoaded", startApp);

const geojson = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'properties': {
                'message': 'Big Toch',
                'iconSize': [120, 120]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-66.324462890625, -16.024695711685304]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'message': 'Medium Toch',
                'iconSize': [80, 80]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-61.2158203125, -15.97189158092897]
            }
        },
        {
            'type': 'Feature',
            'properties': {
                'message': 'Little Toch',
                'iconSize': [60, 60]
            },
            'geometry': {
                'type': 'Point',
                'coordinates': [-63.29223632812499, -18.28151823530889]
            }
        }
    ]
};

function onLocationClicked() {
    
}

function startApp() {

    mapboxgl.accessToken = window.ACCESS_TOKEN;

    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9 // starting zoom
    });


    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        })
    );


    geojson.features.forEach(function (marker) {
        // create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage =
        'url(/assets/me.png)';

        el.style.backgroundPosition = "center"
        el.style.backgroundSize ="contain"
        el.style.borderRadius = "50%"
        
        el.style.width =  marker.properties.iconSize[0] + 'px';
        el.style.height =  marker.properties.iconSize[1] + 'px';
         
        el.addEventListener('click', function () {
        window.alert(marker.properties.message);
        });
         
        // add marker to map
        new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
        });
        


}