import React,{useEffect} from "react";
import {Marker,Popup, useMap,Tooltip} from 'react-leaflet';
import icon from "./icon"


export default function Markerposition({address}) {
    const map= useMap()
    // eslint-disable-next-line react-hooks/exhaustive-deps
     const position = [address.location.lat,address.location.lng]
   
  useEffect(() => {
    map.flyTo(position,13,{
      animate:true
    })
    
  },[map,position])
//   const position = [51.505, -0.09]
// const redOptions = { color: 'red' }
    return (
        <>
            <Marker icon={icon} position={position}>
            {/* <CircleMarker center={position} pathOptions={redOptions} radius={20}> */}
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
      <Tooltip direction="bottom"  opacity={1} permanent>your searching location here</Tooltip>
    </Marker>
    {/* </CircleMarker> */}
        </>
    )
}