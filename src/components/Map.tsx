/* eslint-disable no-new */
import React, { useRef, useState, useEffect, useCallback } from "react";
import styled from "styled-components";

interface IMap {
  mapType: google.maps.MapTypeId;
  mapTypeControl: boolean;
}

const MapDiv = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 5px;
`;

type GoogleLatLng = google.maps.LatLng;
type GoogleMap = google.maps.Map;

const Map: React.FC<IMap> = ({ mapType, mapTypeControl = false }: IMap) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap>();
  const itemAddress = "HBG WORKS";
  const geocodeAddress = (
    geocoder: google.maps.Geocoder,
    resultsMap: google.maps.Map,
    address: string
  ) => {
    // const address = `Stockholm`;
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        resultsMap.setCenter(results[0].geometry.location);

        new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
          title: `${address}`,
        });
      } else {
        alert(`Geocode was not successful for the following reason: ${status}`);
      }
    });
  };

  // init Map
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
          mapTypeId: mapType,
          draggableCursor: "pointer",
        });
        setMap(myMap);
        const geocoder = new google.maps.Geocoder();
        geocodeAddress(geocoder, myMap, itemAddress);
      }
    },
    [mapType, mapTypeControl]
  );

  const defaultMapStart = useCallback((): void => {
    const defaultAddress = new google.maps.LatLng(65.166, 13.369);
    initMap(15, defaultAddress);
  }, [initMap]);

  const startMap = (): void => {
    // if map is null or undefined
    if (!map) {
      defaultMapStart();
    }
  };
  useEffect(startMap, [defaultMapStart, map]);

  return (
    <>
      <MapDiv ref={mapRef} />
    </>
  );
};

export default Map;
