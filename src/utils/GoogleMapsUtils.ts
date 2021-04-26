/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-undef */

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
export const loadMapApi = () => {
    const mapsURL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;

    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.indexOf(mapsURL) === 0) {
            return scripts[i];
        }
    }
    const googleMapScript = document.createElement("script");
    googleMapScript.src = mapsURL;
    googleMapScript.setAttribute("async", "");
    googleMapScript.setAttribute("defer", "");
    window.document.body.appendChild(googleMapScript);
    return googleMapScript;
};

export const getLatLng = (address: string) => {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
            const latitude = results[0].geometry.location.lat();
            const longitude = results[0].geometry.location.lng();
            console.log(latitude, longitude);
            window.open(`https://maps.google.com?q=${latitude}, ${longitude}`)

        }
    });
};
