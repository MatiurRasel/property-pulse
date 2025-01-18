////With Mapbox & Google GeoCode
// 'use client';
// import { useEffect, useState } from 'react';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import Map, { Marker } from 'react-map-gl';
// import { setDefaults, fromAddress } from 'react-geocode';
// import Spinner from './Spinner';
// import Image from 'next/image';
// import pin from '@/assets/images/pin.svg';

// import Map, { Marker } from 'react-map-gl';
// import maplibregl from 'maplibre-gl';

// const PropertyMap = ({ property }) => {

//     const [lat, setLat] = useState(null);
//     const [lng, setLng] = useState(null);
//     const [viewport, setViewport] = useState({
//       latitude: 0,
//       longitude: 0,
//       zoom: 12,
//       width: '100%',
//       height: '500px',
//     });
//     const [loading, setLoading] = useState(true);

//     setDefaults({
//         key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
//         language: 'en',
//         region: 'bd',
//       });

//       useEffect(() => {
//         const fetchCoordinates = async () => {
//           const res = await fromAddress(
//             `${property.location.street} ${property.location.city}, ${property.location.state} ${property.zipcode}`
//           );
//           const { lat, lng } = res.results[0].geometry.location;
//           //console.log(lat,lng)
//           setLat(lat);
//           setLng(lng);
//           setViewport({
//             ...viewport,
//             latitude: lat,
//             longitude: lng,
//           });
      
//           setLoading(false);
//         };
//         fetchCoordinates();
//       }, []);
//       if (loading) return <Spinner loading={loading} />;
//     return (
//         !loading && (
//             <Map
//               mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
//               mapLib={import('mapbox-gl')}
//               initialViewState={{
//                 longitude: lng,
//                 latitude: lat,
//                 zoom: 15,
//               }}
//               style={{ width: '100%', height: 500 }}
//               mapStyle='mapbox://styles/mapbox/streets-v9'
//             >
//               <Marker longitude={lng} latitude={lat} anchor='bottom'>
//                 <Image src={pin} alt='location' width={40} height={40} />
//               </Marker>
//             </Map>
//           )
//     );
//   };
  
//   export default PropertyMap;


////With OpenCageAPI
// 'use client';
// import { useEffect, useState } from 'react';
// import 'maplibre-gl/dist/maplibre-gl.css';
// import maplibregl from 'maplibre-gl';
// import { Map, Marker } from 'react-map-gl';
// import Spinner from './Spinner';
// import Image from 'next/image';
// import pin from '@/assets/images/pin.svg';

// const PropertyMap = ({ property }) => {
//     const [lat, setLat] = useState(null);
//     const [lng, setLng] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchCoordinates = async () => {
//             try {
//                 const address = `${property.location.street}, ${property.location.city}, ${property.location.state}, ${property.location.zipcode}`;
//                 console.log("Requesting address: ", address); // Log the full address
                
//                 const res = await fetch(
//                     `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
//                 );

//                 if (!res.ok) {
//                     console.error('Failed to fetch coordinates:', res.statusText);
//                     return;
//                 }

//                 const data = await res.json();
//                 console.log(data); // Log the API response to inspect
                
//                 if (data.results && data.results.length > 0) {
//                     const { lat, lng } = data.results[0].geometry;
//                     setLat(lat);
//                     setLng(lng);
//                 } else {
//                     console.error('No results found for the given address.');
//                 }
//             } catch (error) {
//                 console.error('Error fetching coordinates:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCoordinates();
//     }, [property]);

//     if (loading) return <Spinner loading={loading} />;

//     return (
//         <Map
//             mapLib={maplibregl}
//             initialViewState={{
//                 longitude: lng,
//                 latitude: lat,
//                 zoom: 15,
//             }}
//             style={{ width: '100%', height: 500 }}
//             mapStyle='https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
//         >
//             <Marker longitude={lng} latitude={lat} anchor='bottom'>
//                 <Image src={pin} alt='location' width={40} height={40} />
//             </Marker>
//         </Map>
//     );
// };

// export default PropertyMap;

////With Nominatim API
'use client';
import { useEffect, useState } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import { Map, Marker } from 'react-map-gl';
import Spinner from './Spinner';
import Image from 'next/image';
import pin from '@/assets/images/pin.svg';

const PropertyMap = ({ property }) => {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [loading, setLoading] = useState(true);
    const [geoCodeError,setGeocodeError] = useState(false);

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const address = `${property.location.street}, ${property.location.city}, ${property.location.state}, ${property.location.zipcode}`;
                console.log("Requesting address: ", address);
                //LocationIQ 
                //Shows but Need More RND
                const api_key = process.env.NEXT_PUBLIC_LOCATIONIQ_API_KEY;
                //console.log(api_key)
                const res = await fetch(
                    `https://eu1.locationiq.com/v1/search.php?key=${api_key}&q=${encodeURIComponent(address)}&format=json`
                );

                //Check for results
                if (!res.ok) {
                    //No Result found
                    console.error('failed to fetch coordinates from LocationIQ:', res.statusText);
                    setGeocodeError(true);
                    setLoading(false);
                    return;
                }
                //Geoapify
                // const API_KEY = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
                // console.log(API_KEY)
                // const res = await fetch(
                //     `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${API_KEY}`
                // );
        
                // if (!res.ok) {
                //     console.error('Failed to fetch coordinates from Geoapify:', res.statusText);
                //     return;
                // }
                // const res = await fetch(
                //     `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`
                // );
        
                // if (!res.ok) {
                //     console.error('Failed to fetch coordinates from Nominatim:', res.statusText);
                //     return;
                // }
        
                const data = await res.json();
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    setLat(lat);
                    setLng(lon);
                } else {
                    console.error('No results found for the given address.');
                    geoCodeError(true);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching coordinates:', error);
                geoCodeError(true);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchCoordinates();
    }, [property]);

    if (loading) return <Spinner loading={loading} />;

    //handle case where geocoding failed.
    if(geoCodeError) {
        return (
            <div className='text-xl'>No location data found.</div>
        )
    }
    return (
        <Map
            mapLib={maplibregl}
            initialViewState={{
                longitude: lng,
                latitude: lat,
                zoom: 15,
            }}
            style={{ width: '100%', height: 500 }}
            mapStyle='https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
        >
            <Marker longitude={lng} latitude={lat} anchor='bottom'>
                <Image src={pin} alt='location' width={40} height={40} />
            </Marker>
        </Map>
    );
};

export default PropertyMap;
