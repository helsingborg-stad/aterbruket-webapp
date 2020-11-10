/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
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
