import { LoadScript, GoogleMap, Polyline, MarkerF } from "@react-google-maps/api";
import React from "react";



const MapWithPolyline = ({Positions, centerPositions, sliderSelectLatLng}) => {
  if(Object.keys(sliderSelectLatLng).length !== 0){
    console.log(sliderSelectLatLng);
  }
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
          Object.keys(sliderSelectLatLng).length !== 0 ? (
            <MarkerF position={sliderSelectLatLng} icon='https://maps.google.com/mapfiles/ms/micons/red.png'/>
          )
          : <></>
        }
        {
          Positions.length > 0 ? (
            <Polyline
              path={Positions}
              options={{
                strokeColor : "#FFFF00",
                strokeOpacity : 1,
                strokeWeight : 1
              }}
            />
          )
          : <></>
        }
      </GoogleMap>
    </LoadScript>
  )
}

const Map = ({Positions, centerPositions, sliderSelectLatLng}) => {
  return (
    <div>
      <MapWithPolyline Positions={Positions} centerPositions={centerPositions} sliderSelectLatLng={sliderSelectLatLng}/>
    </div>
  )
};

export default Map;