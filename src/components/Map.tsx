/* eslint-disable no-new */
import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import useGoogleMapApi from "../hooks/useGoogleMapApi";

interface IMap {
  mapTypeControl: boolean;
  location: string;
}

const MapDiv = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 9.5px 9.5px 0 0;
`;

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;

const Map: React.FC<IMap> = ({ mapTypeControl = false, location }: IMap) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();
  const isScriptLoaded = useGoogleMapApi();

  const geocodeAddress = (
    geocoder: google.maps.Geocoder,
    resultsMap: google.maps.Map,
    address: string
  ) => {
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        resultsMap.setCenter(results[0].geometry.location);

        new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
          title: `${address}`,
        });
      } else {
        console.error(
          `Geocode was not successful for the following reason: ${status}`
        );
      }
    });
  };

  const initMap = useCallback(
    (zoomLevel: number, address: GoogleLatLng): void => {
      if (mapRef.current) {
        const myMap = new google.maps.Map(mapRef.current, {
          zoom: zoomLevel,
          center: address,
          mapTypeControl,
          streetViewControl: false,
          rotateControl: false,
          scaleControl: true,
          fullscreenControl: false,
          panControl: false,
          zoomControl: true,
          gestureHandling: "cooperative",
          mapTypeId: "roadmap",
          draggableCursor: "pointer",
        });
        setMap(myMap);
        const geocoder = new google.maps.Geocoder();
        geocodeAddress(geocoder, myMap, location);
      }
    },
    [location, mapTypeControl]
  );

  const defaultMapStart = useCallback((): void => {
    const defaultAddress = new google.maps.LatLng(65.166, 13.369);
    initMap(15, defaultAddress);
  }, [initMap]);

  const startMap = (): void => {
    if (!map && isScriptLoaded) {
      defaultMapStart();
    }
  };

  useEffect(startMap, [isScriptLoaded, defaultMapStart, map]);

  return <MapDiv ref={mapRef} />;
};

export default Map;
