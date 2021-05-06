/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
import { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const useGoogleMapApi = (): boolean => {
  const [isLoaded, setIsLoaded] = useState(false);
  const mapsURL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;

  const isInstalled = () => {
    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src.indexOf(mapsURL) === 0) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (isInstalled()) {
      setIsLoaded(true);
      return;
    }

    const googleMapScript = document.createElement("script");
    googleMapScript.src = mapsURL;
    googleMapScript.addEventListener("load", () => setIsLoaded(true));
    window.document.body.appendChild(googleMapScript);
  }, []);

  return isLoaded;
};

export default useGoogleMapApi;
