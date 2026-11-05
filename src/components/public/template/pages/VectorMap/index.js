import React from "react";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import styles from "./VectorMap.module.scss";
import map from "../Widget/map.json";

const markers = [
  {
    markerOffset: -25,
    name: "Buenos Aires",
    coordinates: [-58.3816, -34.6037]
  }
];

function VectorMap() {
  return (
    <div>
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{
          scale: 205,
          rotate: [-11, 0, 0]
        }}
        width={980}
        height={551}
        style={{
          width: "100%",
          height: "auto",
          overflow: "auto"
        }}
      >
        <ZoomableGroup center={[0, 20]} filterZoomEvent={() => false}>
          <Geographies geography={map}>
            {({ geographies }) =>
              geographies.map(
                (geography, i) =>
                  geography.id !== "ATA" && (
                    <Geography
                      key={i}
                      geography={geography}
                      className={styles.geography}
                    />
                  )
              )
            }
          </Geographies>
          <g>
            {markers.map((marker, i) => (
              <Marker
                key={i}
                coordinates={marker.coordinates}
                className={styles.marker}
              >
                <circle
                  cx={0}
                  cy={0}
                  r={5}
                  style={{
                    stroke: "#5DC5FF",
                    strokeWidth: 3,
                    opacity: 0.9
                  }}
                />
                <text
                  textAnchor="middle"
                  y={marker.markerOffset}
                  style={{
                    fontFamily: "Roboto, sans-serif",
                    fill: "#607D8B"
                  }}
                >
                  {marker.name}
                </text>
              </Marker>
            ))}
          </g>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}

export default VectorMap;
