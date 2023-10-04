import { LoadScript, GoogleMap, Polyline, MarkerF } from "@react-google-maps/api";
import React from "react";

const MapWithPolyline = ({Positions, centerPositions}) => {
  
  return (
    <LoadScript googleMapsApiKey={"AIzaSyCjpcBI57XAEzvIqzNBEj4eIpVzRaRe93U"}>
      <GoogleMap
        id="myMap"
        mapContainerStyle={{height: "100vh", width: "80vw"}}
        zoom={22}
        center={centerPositions}
        mapOptions={{
          disabledDefaultUI: true, 
          zoomControl: true,
          streetViewControl: false,
          mapTypeControl: false,
        }}
        mapTypeId="satellite" // 地図タイプを航空写真に設定
      >
        {
          Positions.length > 0 ? (
            <>
              <Polyline 
                path={Positions}
                options={{
                  strokeColor : "#FFFF00",
                  strokeOpacity : 1,
                  strokeWeight : 1
                }}
              />
              <MarkerF position={Positions[0]} icon='https://maps.google.com/mapfiles/ms/micons/blue.png'/>
              <MarkerF position={Positions[Positions.length-1]} icon='https://maps.google.com/mapfiles/ms/micons/red.png'/>
            </>
          )
          : <></>
        }
      </GoogleMap>
    </LoadScript>
  )
}

export const Map = ({Positions, centerPositions}) => {
  // console.log(Positions);
  return (
    <div>
      <MapWithPolyline Positions={Positions} centerPositions={centerPositions}/>
    </div>
  )
};