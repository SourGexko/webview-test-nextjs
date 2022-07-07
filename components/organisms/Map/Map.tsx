import { useEffect } from "react";
import styled from "styled-components";

interface MapProps extends MapContainerProps {
  latitude: number;
  longitude: number;
}

function Map({ width, height, latitude, longitude }: MapProps) {
  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=6ed31aafa6de3dc082fecfe8a2d2d605&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);

    return () => mapScript.removeEventListener("load", onLoadKakaoMap);
  }, [latitude, longitude]);

  return <MapContainer width={width} height={height} id="map" />;
}

interface MapContainerProps {
  width?: string | number;
  height?: string | number;
}

const MapContainer = styled.div<MapContainerProps>`
  width: 100%;
  height: 100%;
`;

export default Map;
