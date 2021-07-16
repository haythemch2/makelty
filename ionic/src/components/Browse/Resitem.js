import React from "react";
import ReactStars from "react-rating-stars-component";
import {Link} from 'react-router-dom'
import { useSelector } from "react-redux";
import {IonCard,IonCardHeader,IonCardTitle,IonCardContent} from "@ionic/react"




function Resitem({ rest},props) {
  const user = useSelector((state) => state.Client.client);
  const Distance=({lat1,lat2,lon1,lon2})=>{
    
    const R = 6371e3; // metres
    var pi = Math.PI;
    const φ1 = lat1 * (pi/180); // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    
    const d = R * c; // in metres
    return (
      <p>{Math.round(d)}m away !</p>
    )
    
    }
  return (
    <>
    <Link to={`/menu/${rest._id}`}>
    <IonCard style={{ width: "18rem",height:'25rem' }} class='restaurantCard' >
      <img variant="top" src={rest.image} style={{height:'191px'}} />
      <IonCardHeader>
        <IonCardTitle style={{ color: "black" }}>{rest.title}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
        <p style={{ color: "black" }}>{rest.description}</p>
        <Distance lat1={user.lat} lon1={user.lng} lat2={rest.coordinatelatitude} lon2={rest.coordinatelongitude} />
        <ReactStars
          count={5}
          value={rest.rating}
          size={24}
          activeColor="#ffd700"
          edit={false}
        />
      </IonCardContent>
    </IonCard>
    </Link>
    </>
  );
}

export default Resitem;
