/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoianplbmNvZGUiLCJhIjoiY2t2cndsazcxMW5xMTJwcWgxaXEwazlmZyJ9.J6THlQZj8myAE52zGmWlIw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jzencode/ckvrx6ywz0hwg15mmwvehc977',
    scrollZoom: false

    //   center: [-118.113491, 34.111745],
    //   zoom: 8
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);

    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100
      }
    });
  });
};

// Lake Holon coords
// mapboxgl.accessToken =
//   'pk.eyJ1IjoianplbmNvZGUiLCJhIjoiY2t2b3ZmcDBnNzA4cjMybXM4dTZtc2x5NiJ9.a9gYShyeEfI_TiEvOwTPxQ';
// const map = new mapboxgl.Map({
//   container: 'map',
//   zoom: 15,
//   center: [124.875427, 6.101435],
//   pitch: 65,
//   bearing: 100,
//   style: 'mapbox://styles/mapbox-map-design/ckhqrf2tz0dt119ny6azh975y'
// });

// map.on('load', () => {
//   map.addSource('mapbox-dem', {
//     type: 'raster-dem',
//     url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
//     tileSize: 512,
//     maxzoom: 20
//   });
//   // add the DEM source as a terrain layer with exaggerated height
//   map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });

//   // add a sky layer that will show when the map is highly pitched
//   map.addLayer({
//     id: 'sky',
//     type: 'sky',
//     paint: {
//       'sky-type': 'atmosphere',
//       'sky-atmosphere-sun': [0.0, 0.0],
//       'sky-atmosphere-sun-intensity': 15
//     }
//   });
// });
