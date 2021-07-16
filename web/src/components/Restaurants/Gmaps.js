import { current } from "immer";
import React, { useRef,useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup,Circle,useMap,Tooltip } from "react-leaflet";
import { useSelector } from "react-redux";

function Test({fly}) {
  const map = useMap()
  useEffect(() => {
    map.panTo(fly, 15, {
      duration: 1
    });
  }, [fly])
  return null
}

const Gmaps = () => {
  const list = useSelector((state) => Object.values(state.Restaurant.restaurants));
  const user = useSelector((state) => state.Client.client);
  let pos={latitude:33.853204,longitude:10.102816}
  if (typeof (list.filter((el)=>el.active==true)[0]) !== 'undefined'){
   pos = {latitude:list.filter((el)=>el.active==true)[0].coordinatelatitude,longitude:list.filter((el)=>el.active==true)[0].coordinatelongitude}
  }
  console.log(pos.latitude,pos.longitude)
  let fly = [pos.latitude, pos.longitude]

  return (
    <div>
      <MapContainer
        center={[user.lat, user.lng]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[user.lat,user.lng]}><Popup>You !</Popup><Tooltip permanent>You !</Tooltip></Marker>
        <Circle color='grey' center={[user.lat,user.lng]} radius={1000}/>
        {list.map((el) => (
          <Marker position={[el.coordinatelatitude,el.coordinatelongitude]}>
            <Popup>
              {el.title}<br /> {el.description}
            </Popup>
          </Marker>
        ))}
        <Test fly={fly}/>
      </MapContainer>
    </div>
  );
};
export default Gmaps;
