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

function onLocationClicked({ lngLat }, map) {

    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage =
        'url(/assets/me.png)';

    el.style.backgroundPosition = "center"
    el.style.backgroundSize = "contain"
    el.style.borderRadius = "50%"

    el.style.width = '60px';
    el.style.height = '60px';

    // add marker to map
    new mapboxgl.Marker(el)
        .setLngLat(lngLat)
        .addTo(map);

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

    map.on("click", (e) => onLocationClicked(e, map))


    geojson.features.forEach(function (marker) {
        // create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundImage =
            'url(/assets/me.png)';

        el.style.backgroundPosition = "center"
        el.style.backgroundSize = "contain"
        el.style.borderRadius = "50%"

        el.style.width = marker.properties.iconSize[0] + 'px';
        el.style.height = marker.properties.iconSize[1] + 'px';

        el.addEventListener('click', function () {
            window.alert(marker.properties.message);
        });

        // add marker to map
        new mapboxgl.Marker(el)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
    });

    var swatches = document.getElementById('swatches');
    var layer = document.getElementById('layer');
    var colors = [
        '#ffffcc',
        '#a1dab4',
        '#41b6c4',
        '#2c7fb8',
        '#253494',
        '#fed976',
        '#feb24c',
        '#fd8d3c',
        '#f03b20',
        '#bd0026'
    ];

    colors.forEach(function (color) {
        var swatch = document.createElement('button');
        swatch.style.backgroundColor = color;
        swatch.addEventListener('click', function () {
            map.setPaintProperty(layer.value, 'fill-color', color);
        });
        swatches.appendChild(swatch);
    });

    map.addControl(
        new MapboxDirections({
            accessToken: mapboxgl.accessToken
        }),
        'bottom-left'
    );


}